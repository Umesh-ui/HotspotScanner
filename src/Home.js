import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeModules } from 'react-native';
import { check, request, RESULTS, PERMISSIONS } from 'react-native-permissions';

const { HotspotModule } = NativeModules;

const Home = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Request Permissions
  const requestPermissions = async () => {
    try {
      const fineLocation = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const coarseLocation = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      const wifiState = await request(PERMISSIONS.ANDROID.ACCESS_WIFI_STATE);

      if (fineLocation === RESULTS.GRANTED && coarseLocation === RESULTS.GRANTED && wifiState === RESULTS.GRANTED) {
        console.log('Permissions granted');
      } else {
        Alert.alert('Permissions Required', 'You need to grant all permissions to scan devices.');
      }
    } catch (error) {
      console.log('Error getting permissions:', error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  // Fetch connected devices
  const fetchConnectedDevices = async () => {
    setLoading(true);
    try {
      const devices = await HotspotModule.getConnectedDevices();
      if (Array.isArray(devices)) {
        setConnectedDevices(devices);
        console.log('Devices found:', devices);
      } else {
        console.log('No devices found', devices);
        setConnectedDevices([]);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Hotspot Scanner</Text>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={fetchConnectedDevices}>
        <Text style={styles.scanButtonText}>
          {loading ? 'Scanning...' : 'Scan for Devices'}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={styles.loadingIndicator}
        />
      ) : connectedDevices.length > 0 ? (
        <FlatList
          data={connectedDevices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.deviceContainer}>
              <Text style={styles.deviceText}>Device IP: {item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDevicesText}>No Connected Devices Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginVertical: 20,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  deviceContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  deviceText: {
    fontSize: 16,
    color: '#333333',
  },
  noDevicesText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;
