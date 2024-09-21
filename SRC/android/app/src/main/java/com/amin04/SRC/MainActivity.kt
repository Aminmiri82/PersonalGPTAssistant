package com.amin04.SRC

import android.os.Build
import android.os.Bundle
import android.content.Intent
import android.net.VpnService
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper
import okhttp3.OkHttpClient
import java.net.InetAddress
import com.amin04.SRC.DnsOverTlsResolver

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null)
    val intent = VpnService.prepare(this)
    if (intent != null) {
        startActivityForResult(intent, 0)
    } else {
        onActivityResult(0, RESULT_OK, null)
    }

    resolveDnsOverTls("free.shecan.ir")
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    if (requestCode == 0 && resultCode == RESULT_OK) {
        val intent = Intent(this, MyVpnService::class.java)

        intent.putExtra("185.51.200.2", "8.8.8.8")
        startService(intent)
    }
  }

  /**
     * Function to resolve DNS over TLS using DnsOverTlsResolver
     */
    private fun resolveDnsOverTls(hostname: String) {
        val resolver = DnsOverTlsResolver()

        // Resolve the hostname asynchronously to avoid blocking the UI thread
        Thread {
            try {
                val resolvedAddresses: List<InetAddress> = resolver.resolve(hostname)
                resolvedAddresses.forEach { address ->
                    println("Resolved IP for $hostname: ${address.hostAddress}")
                }
            } catch (e: Exception) {
                e.printStackTrace()
                println("DNS-over-TLS resolution failed: ${e.message}")
            }
        }.start() // Start a new thread to perform the DNS lookup
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}
