package com.svetlanadiab.happinessspace;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "BackgroundSync")
public class BackgroundSyncPlugin extends Plugin {
    public static final String PREFS_NAME = "sveta_background_sync";
    private static final String LAST_IMMEDIATE_SYNC_AT = "last_immediate_sync_at";
    private static final long IMMEDIATE_SYNC_MIN_INTERVAL_MS = 30000L;

    @PluginMethod
    public void configure(PluginCall call) {
        Context context = getContext();
        SharedPreferences.Editor editor =
                context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE).edit();
        boolean enabled = call.getBoolean("enabled", false);
        editor.putBoolean("enabled", enabled);
        editor.putString("supabase_url", call.getString("supabaseUrl", ""));
        editor.putString("anon_key", call.getString("anonKey", ""));
        editor.putString("access_token", call.getString("accessToken", ""));
        editor.putString("refresh_token", call.getString("refreshToken", ""));
        editor.putString("room_slug", call.getString("roomSlug", "svetlana-diab"));
        editor.putString("user_key", call.getString("userKey", ""));
        editor.putString("cycle_data", call.getString("cycleData", ""));
        editor.putString("app_update_source_url", call.getString("appUpdateSourceUrl", ""));
        editor.putString("app_version_name", call.getString("appVersionName", ""));
        Integer appVersionCode = call.getInt("appVersionCode");
        if (appVersionCode != null) {
            editor.putInt("app_version_code", appVersionCode);
        }
        String lastMessageCreatedAt = call.getString("lastMessageCreatedAt", "");
        String currentLastMessageCreatedAt = context
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                .getString("last_message_created_at", "");
        if (
                !lastMessageCreatedAt.isEmpty() &&
                        (
                                currentLastMessageCreatedAt.isEmpty() ||
                                        lastMessageCreatedAt.compareTo(currentLastMessageCreatedAt) > 0
                        )
        ) {
            editor.putString("last_message_created_at", lastMessageCreatedAt);
            editor.putBoolean("message_notification_cursor_ready", true);
        }
        editor.apply();

        if (enabled) {
            BackgroundMessageWorker.schedule(context);
            BackgroundSyncService.start(context);
            SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            long now = System.currentTimeMillis();
            long lastImmediateSyncAt = prefs.getLong(LAST_IMMEDIATE_SYNC_AT, 0);
            if (now - lastImmediateSyncAt > IMMEDIATE_SYNC_MIN_INTERVAL_MS) {
                prefs.edit().putLong(LAST_IMMEDIATE_SYNC_AT, now).apply();
                new Thread(() -> BackgroundMessageWorker.syncOnce(context.getApplicationContext())).start();
            }
        } else {
            BackgroundMessageWorker.cancel(context);
            BackgroundSyncService.stop(context);
        }

        JSObject result = new JSObject();
        result.put("enabled", enabled);
        call.resolve(result);
    }

    @PluginMethod
    public void requestBatteryOptimizationBypass(PluginCall call) {
        Context context = getContext();
        boolean ignoringBatteryOptimizations = true;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PowerManager powerManager =
                    (PowerManager) context.getSystemService(Context.POWER_SERVICE);
            ignoringBatteryOptimizations =
                    powerManager != null &&
                            powerManager.isIgnoringBatteryOptimizations(context.getPackageName());

            if (!ignoringBatteryOptimizations) {
                try {
                    Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                    intent.setData(Uri.parse("package:" + context.getPackageName()));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent);
                } catch (Exception error) {
                    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    intent.setData(Uri.parse("package:" + context.getPackageName()));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent);
                }
            }
        }

        JSObject result = new JSObject();
        result.put("ignoring", ignoringBatteryOptimizations);
        call.resolve(result);
    }
}
