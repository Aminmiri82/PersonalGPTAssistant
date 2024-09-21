package com.amin04.SRC

import okhttp3.Dns
import okhttp3.HttpUrl
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.dnsoverhttps.DnsOverHttps
import java.net.InetAddress

class DnsOverTlsResolver {

    fun createDnsOverHttpsClient(): OkHttpClient {
        // Use Google's DoT server as an example
        val dns = DnsOverHttps.Builder()
            .client(OkHttpClient())
            .url(HttpUrl.get("https://free.shecan.ir/dns-query"))  // Fix: Convert string to HttpUrl
            .includeIPv6(true)
            .build()

        return OkHttpClient.Builder()
            .dns(dns)
            .build()
    }

    fun resolve(hostname: String): List<InetAddress> {
        val client = createDnsOverHttpsClient()
        val request = Request.Builder().url("https://$hostname").build()

        client.newCall(request).execute().use { response ->
            // Handle response if needed
            return Dns.SYSTEM.lookup(hostname)
        }
    }
}
