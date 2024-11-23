package com.hotspotscanner

import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.BufferedReader
import java.io.InputStreamReader

class HotspotModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context: Context = reactContext

    override fun getName(): String {
        return "HotspotModule"
    }

    @ReactMethod
    fun getConnectedDevices(promise: Promise) {
        try {
            val connectedDevices = mutableListOf<String>()

            // Read the ARP table to find connected devices
            val process = Runtime.getRuntime().exec("cat /proc/net/arp")
            BufferedReader(InputStreamReader(process.inputStream)).use { reader ->
                var line: String?
                while (reader.readLine().also { line = it } != null) {
                    val columns = line?.split("\\s+".toRegex()) ?: continue
                    if (columns.size >= 4 && columns[0] != "IP") {
                        connectedDevices.add(columns[0]) 
                    }
                }
            }

            if (connectedDevices.isEmpty()) {
                promise.resolve("No connected devices found.")
            } else {
                promise.resolve(connectedDevices)
            }
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
