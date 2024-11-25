import {StatusBar, Platform, Alert} from 'react-native';
import React, {useEffect} from 'react';
import HomePage from './src/HomePage';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const App = () => {
  const askPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      try {
        const nearbyDevicesPermission = await request(
          PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES,
        );
        if (nearbyDevicesPermission === RESULTS.GRANTED) {
          console.log('Nearby Wi-Fi Devices Permission Granted');
        } else {
          console.log(
            'Nearby Wi-Fi Devices Permission Denied or Restricted:',
            nearbyDevicesPermission,
          );
          Alert.alert(
            'Permission Required',
            'The app needs nearby Wi-Fi devices permission for functionality. Please enable it in settings.',
          );
        }
      } catch (error) {
        console.error(
          'Error requesting NEARBY_WIFI_DEVICES permission:',
          error,
        );
      }
    } else {
      console.log(
        'Nearby Wi-Fi devices permission not required for this Android version.',
      );
    }
  };

  const requestLocationPermission = async () => {
    try {
      const locationPermission = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (locationPermission === RESULTS.GRANTED) {
        console.log('Location Permission Granted');
      } else {
        console.log(
          'Location Permission Denied or Restricted:',
          locationPermission,
        );
        Alert.alert(
          'Permission Required',
          'Location permission is necessary to fetch connected Wi-Fi devices. Please enable it in settings.',
        );
      }
    } catch (error) {
      console.error('Error requesting ACCESS_FINE_LOCATION permission:', error);
    }
  };

  const checkPermission = async () => {
    await askPermission();
    await requestLocationPermission();
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <>
      <StatusBar />
      <HomePage />
    </>
  );
};

export default App;
