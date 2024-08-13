package com.quiz
import com.quiz.BuildConfig

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log

class YourBackgroundService : Service() {

    companion object {
        private const val TAG = "YourBackgroundService"
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "Background service started")
        // Implement your background logic here

        return START_STICKY
    }

    override fun onDestroy() {
        Log.d(TAG, "Background service destroyed")
        super.onDestroy()
    }
}
