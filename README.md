# Hotspot Scanner App

This is a React Native app that allows users to scan and display the list of devices connected to their mobile hotspot. The app provides features to check the connection status, scan for connected devices, and handle required permissions. It is designed to work with Android devices, including those running Android 13 (API level 33) or higher.

# Features

    Device Scanning:
        Scan for devices connected to the mobile hotspot.
        Display the list of devices with their IP addresses.

    Permissions Handling:
        Requests location and Wi-Fi permissions at runtime to ensure the app functions correctly.

    Simple UI:
        User-friendly interface to scan for devices and display their information.

# Prerequisites

    React Native Environment: Ensure that your development environment is set up for React Native. You can follow the official guide here.

    Android Device/Emulator: The app is tested on Android, including API levels 30 to 33.

# Installation

    Clone the Repository:

git clone https://github.com/Umesh-ui/HotspotScanner.git
cd HotspotScanner

Install Dependencies & Run the App:

    npm install
    npx react-native run-android

How to Use
Grant Permissions:

On the first launch, the app will ask for location and Wi-Fi permissions. Make sure to allow these permissions for the app to function correctly.
Scan for Devices:

    Press the "Scan for Devices" button to start scanning for devices connected to your mobile hotspot.
    The app will list the connected devices along with their IP addresses.

App Behavior for Android 13+ (API Level 33+):

    On newer versions of Android, certain permissions or behaviors may require additional steps, such as redirecting the user to the settings if required permissions are not granted.

Permissions Required

    ACCESS_FINE_LOCATION: Required to access location for scanning nearby devices.
    ACCESS_COARSE_LOCATION: Allows access to approximate location information for better device scanning.
    NEARBY_WIFI_DEVICES: Required to check the status of the Wi-Fi and connected devices.

# Note

    In newer versions of android the permissions are restricted kindly test the app in OS version below 31.