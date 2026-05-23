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
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;

@CapacitorPlugin(name = "BackgroundSync")
public class BackgroundSyncPlugin extends Plugin {
    public static final String PREFS_NAME = "sveta_background_sync";
    private static final String LAST_IMMEDIATE_SYNC_AT = "last_immediate_sync_at";
    private static final String TOKEN_SOURCE = "token_source";
    private static final String TOKEN_SOURCE_NATIVE = "native_password";
    private static final String TOKEN_SOURCE_NATIVE_PENDING = "native_signing_in";
    private static final String TOKEN_SOURCE_WEB_ACCESS = "web_access_only";
    private static final long IMMEDIATE_SYNC_MIN_INTERVAL_MS = 3000L;

    @PluginMethod
    public void configure(PluginCall call) {
        Context context = getContext();
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor =
                prefs.edit();
        boolean enabled = call.getBoolean("enabled", false);
        String suppliedAccessToken = call.getString("accessToken", "");
        String nativeAuthEmail = call.getString("nativeAuthEmail", "");
        String nativeAuthPassword = call.getString("nativeAuthPassword", "");
        boolean hasNativeAuth = !nativeAuthEmail.isEmpty() && !nativeAuthPassword.isEmpty();
        boolean hasNativeSession =
                TOKEN_SOURCE_NATIVE.equals(prefs.getString(TOKEN_SOURCE, "")) &&
                        !prefs.getString("refresh_token", "").isEmpty() &&
                        (
                                nativeAuthEmail.isEmpty() ||
                                        nativeAuthEmail.equals(prefs.getString("native_auth_email", ""))
                        );
        editor.putBoolean("enabled", enabled);
        editor.putString("supabase_url", call.getString("supabaseUrl", ""));
        editor.putString("anon_key", call.getString("anonKey", ""));
        editor.putString("room_slug", call.getString("roomSlug", "svetlana-diab"));
        editor.putString("user_key", call.getString("userKey", ""));
        editor.putString("cycle_data", call.getString("cycleData", ""));
        editor.putString("app_update_source_url", call.getString("appUpdateSourceUrl", ""));
        editor.putString("app_version_name", call.getString("appVersionName", ""));
        Integer appVersionCode = call.getInt("appVersionCode");
        if (appVersionCode != null) {
            editor.putInt("app_version_code", appVersionCode);
        }
        if (!enabled) {
            editor.remove("access_token");
            editor.remove("refresh_token");
            editor.remove("native_auth_email");
            editor.remove(TOKEN_SOURCE);
        } else if (hasNativeAuth && !hasNativeSession) {
            editor.putString("access_token", suppliedAccessToken);
            editor.remove("refresh_token");
            editor.putString("native_auth_email", nativeAuthEmail);
            editor.putString(TOKEN_SOURCE, TOKEN_SOURCE_NATIVE_PENDING);
        } else if (!hasNativeSession) {
            editor.putString("access_token", suppliedAccessToken);
            editor.remove("refresh_token");
            editor.remove("native_auth_email");
            editor.putString(
                    TOKEN_SOURCE,
                    suppliedAccessToken.isEmpty() ? "" : TOKEN_SOURCE_WEB_ACCESS
            );
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
        editor.commit();

        if (enabled) {
            if (hasNativeAuth && !hasNativeSession) {
                Context appContext = context.getApplicationContext();
                String supabaseUrl = call.getString("supabaseUrl", "");
                String anonKey = call.getString("anonKey", "");
                new Thread(
                        () -> signInNativeBackgroundSession(
                                appContext,
                                supabaseUrl,
                                anonKey,
                                nativeAuthEmail,
                                nativeAuthPassword
                        )
                ).start();
            }
            BackgroundMessageWorker.schedule(context);
            BackgroundSyncService.start(context);
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

    private static void signInNativeBackgroundSession(
            Context context,
            String supabaseUrl,
            String anonKey,
            String email,
            String password
    ) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        try {
            SessionTokens tokens = requestPasswordSession(supabaseUrl, anonKey, email, password);
            prefs.edit()
                    .putString("access_token", tokens.accessToken)
                    .putString("refresh_token", tokens.refreshToken)
                    .putString("native_auth_email", email)
                    .putString(TOKEN_SOURCE, TOKEN_SOURCE_NATIVE)
                    .apply();
            BackgroundMessageWorker.syncOnce(context);
        } catch (Exception error) {
            prefs.edit()
                    .remove("refresh_token")
                    .putString(
                            TOKEN_SOURCE,
                            prefs.getString("access_token", "").isEmpty()
                                    ? ""
                                    : TOKEN_SOURCE_WEB_ACCESS
                    )
                    .apply();
        }
    }

    private static SessionTokens requestPasswordSession(
            String supabaseUrl,
            String anonKey,
            String email,
            String password
    ) throws Exception {
        String endpoint = supabaseUrl.replaceAll("/+$", "") +
                "/auth/v1/token?grant_type=password";
        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint).openConnection();
        String body = "{\"email\":\"" + jsonEscape(email) + "\",\"password\":\"" +
                jsonEscape(password) + "\"}";
        byte[] bodyBytes = body.getBytes(StandardCharsets.UTF_8);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("apikey", anonKey);
        connection.setRequestProperty("Authorization", "Bearer " + anonKey);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setConnectTimeout(7000);
        connection.setReadTimeout(10000);

        try (OutputStream output = connection.getOutputStream()) {
            output.write(bodyBytes);
        }

        int responseCode = connection.getResponseCode();
        InputStream stream = responseCode >= 200 && responseCode < 300
                ? connection.getInputStream()
                : connection.getErrorStream();
        String responseBody = readStream(stream);
        connection.disconnect();

        if (responseCode < 200 || responseCode >= 300) {
            throw new IllegalStateException("Supabase native sign-in failed " + responseCode);
        }

        JSONObject session = new JSONObject(responseBody);
        String accessToken = session.optString("access_token", "");
        String refreshToken = session.optString("refresh_token", "");

        if (accessToken.isEmpty() || refreshToken.isEmpty()) {
            throw new IllegalStateException("Supabase native sign-in missed tokens");
        }

        return new SessionTokens(accessToken, refreshToken);
    }

    private static String readStream(InputStream stream) throws Exception {
        if (stream == null) {
            return "";
        }

        StringBuilder builder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(stream, StandardCharsets.UTF_8)
        )) {
            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
        }
        return builder.toString();
    }

    private static String jsonEscape(String value) {
        return value == null
                ? ""
                : value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }

    private static class SessionTokens {
        final String accessToken;
        final String refreshToken;

        SessionTokens(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
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
