package com.svetlanadiab.happinessspace;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

public class BackgroundBootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (!Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            return;
        }

        SharedPreferences prefs =
                context.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            return;
        }

        BackgroundMessageWorker.schedule(context);
        BackgroundSyncService.start(context);
    }
}
