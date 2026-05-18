package com.svetlanadiab.happinessspace;

import android.content.Context;
import android.content.SharedPreferences;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "BackgroundSync")
public class BackgroundSyncPlugin extends Plugin {
    public static final String PREFS_NAME = "sveta_background_sync";

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
        editor.putString("room_slug", call.getString("roomSlug", "svetlana-diab"));
        editor.putString("user_key", call.getString("userKey", ""));
        String lastMessageCreatedAt = call.getString("lastMessageCreatedAt", "");
        if (!lastMessageCreatedAt.isEmpty()) {
            editor.putString("last_message_created_at", lastMessageCreatedAt);
        }
        editor.apply();

        if (enabled) {
            BackgroundMessageWorker.schedule(context);
        } else {
            BackgroundMessageWorker.cancel(context);
        }

        JSObject result = new JSObject();
        result.put("enabled", enabled);
        call.resolve(result);
    }
}
