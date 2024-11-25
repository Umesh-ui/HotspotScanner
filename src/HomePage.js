import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import HotspotTethering from '@react-native-tethering/hotspot';

const HomePage = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDevices = async () => {
    if (Platform.OS === 'android' && Platform.Version < 31) {
      setLoading(true);
      try {
        setConnectedDevices([]);

        const data = await HotspotTethering.getConnectedDevices();
        setConnectedDevices(data);

        console.log('Connected Devices:', data);
        if (data.length === 0) {
          Alert.alert('No Devices', 'No devices are currently connected.');
        }
      } catch (error) {
        console.log('Error getting devices:', error);
        Alert.alert('Error', 'Failed to fetch connected devices.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert(
        'Incompatible Device',
        'This feature is only supported on devices with Android versions below 32.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={getDevices}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Refreshing...' : 'Get Devices / Refresh'}
        </Text>
      </TouchableOpacity>

      {/* Device List */}
      {connectedDevices.length > 0 ? (
        <FlatList
          data={connectedDevices}
          keyExtractor={(item, index) => `${item.ipAddress}-${index}`}
          renderItem={({item}) => (
            <View style={styles.deviceItem}>
              <Text style={styles.deviceText}>
                IP ADDRESS: {item.ipAddress}
              </Text>
            </View>
          )}
        />
      ) : (
        !loading && (
          <Text style={styles.noDevicesText}>No devices connected.</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#17a8c5',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  deviceItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  deviceText: {
    fontWeight: '500',
    fontSize: 16,
  },
  noDevicesText: {
    marginTop: 20,
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

export default HomePage;
