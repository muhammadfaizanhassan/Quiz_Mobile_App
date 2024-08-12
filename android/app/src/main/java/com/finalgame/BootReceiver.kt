package com.finalgame

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (Intent.ACTION_BOOT_COMPLETED == intent.action) {
            Log.d("BootReceiver", "Boot completed, starting service...")
            val serviceIntent = Intent(context, YourBackgroundService::class.java)
            context.startService(serviceIntent)
        }
    }
}
