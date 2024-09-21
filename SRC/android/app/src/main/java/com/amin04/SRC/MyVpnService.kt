package com.amin04.SRC

import android.net.VpnService
import android.content.Intent
import android.os.ParcelFileDescriptor
import java.io.IOException

class MyVpnService : VpnService() {

    private var vpnInterface: ParcelFileDescriptor? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Here, configure the VPN connection
        val builder = Builder()
        

        // Set the VPN configuration here
        builder.addAddress("178.22.122.100", 24)
        builder.addRoute("0.0.0.0", 0)

        // Get the DNS server from the intent
        val dnsServer = intent?.getStringExtra("185.51.200.2")

        // If a DNS server is provided, add it to the builder
        if (!dnsServer.isNullOrEmpty()) {
            builder.addDnsServer(dnsServer)
        }

        try {
            vpnInterface = builder.establish()
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        try {
            vpnInterface?.close()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    override fun onRevoke() {
        onDestroy()
    }
}
