import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';

const App = () => {
  const [deviceIp, setDeviceIp] = useState(null);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeviceIp();
  }, []);

  // Fetch the device's own IP address
  const fetchDeviceIp = async () => {
    try {
      const ip = await NetworkInfo.getIPAddress();
      setDeviceIp(ip);
    } catch (error) {
      console.error('Error fetching device IP:', error);
    }
  };

  // Simulate fetching connected devices
  const fetchConnectedDevices = async () => {
    try {
      setLoading(true);

      // Simulate a delay for fetching data
      setTimeout(() => {
        // Mock connected devices data
        const mockConnectedDevices = [
          {ip: '192.168.43.2', name: 'Device 1'},
          {ip: '192.168.43.3', name: 'Device 2'},
          {ip: '192.168.43.4', name: 'Device 3'},
        ];
        setConnectedDevices(mockConnectedDevices);
        setLoading(false);
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch connected devices.');
      setLoading(false);
    }
  };

  // Request permissions for network access (required on Android)
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Network Access Permission',
            message: 'This app needs permission to access network details.',
            buttonPositive: 'Allow',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          fetchConnectedDevices();
        } else {
          Alert.alert(
            'Permission Denied',
            'Cannot fetch connected devices without permission.',
          );
        }
      } catch (error) {
        console.error('Permission error:', error);
      }
    } else {
      // For iOS or platforms where permissions are not required
      fetchConnectedDevices();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Hotspot Device Scanner</Text>
      <Text style={styles.info}>Device IP: {deviceIp || 'Fetching...'}</Text>

      <Button
        title={loading ? 'Scanning...' : 'Scan for Devices'}
        onPress={requestPermissions}
        disabled={loading}
      />

      <FlatList
        data={connectedDevices}
        keyExtractor={item => item.ip}
        renderItem={({item}) => (
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <Text style={styles.deviceIp}>{item.ip}</Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.noDevices}>
              No connected devices found. Start scanning!
            </Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  deviceItem: {
    padding: 15,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
  },
  deviceIp: {
    fontSize: 16,
    color: '#555',
  },
  noDevices: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default App;
