package com.svetlanadiab.happinessspace;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;
import org.json.JSONArray;
import org.json.JSONObject;

public class BackgroundMessageWorker extends Worker {
    private static final String WORK_NAME = "sveta_message_background_sync";
    private static final String CHANNEL_ID = "messages";
    private static final String DELETED_MARKER = "__SVETA_APP_DELETED__";

    public BackgroundMessageWorker(
            @NonNull Context context,
            @NonNull WorkerParameters workerParams
    ) {
        super(context, workerParams);
    }

    public static void schedule(Context context) {
        SharedPreferences prefs =
                context.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            return;
        }

        Constraints constraints = new Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build();
        PeriodicWorkRequest request = new PeriodicWorkRequest.Builder(
                BackgroundMessageWorker.class,
                15,
                TimeUnit.MINUTES
        )
                .setConstraints(constraints)
                .build();
        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
                WORK_NAME,
                ExistingPeriodicWorkPolicy.UPDATE,
                request
        );
    }

    public static void cancel(Context context) {
        WorkManager.getInstance(context).cancelUniqueWork(WORK_NAME);
    }

    @NonNull
    @Override
    public Result doWork() {
        Context context = getApplicationContext();
        SharedPreferences prefs =
                context.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            return Result.success();
        }

        String supabaseUrl = prefs.getString("supabase_url", "");
        String anonKey = prefs.getString("anon_key", "");
        String accessToken = prefs.getString("access_token", "");
        String roomSlug = prefs.getString("room_slug", "svetlana-diab");
        String userKey = prefs.getString("user_key", "");
        String lastCreatedAt = prefs.getString("last_message_created_at", "");

        if (supabaseUrl.isEmpty() || anonKey.isEmpty() || userKey.isEmpty()) {
            return Result.success();
        }

        try {
            String response = fetchLatestMessages(
                    supabaseUrl,
                    anonKey,
                    accessToken,
                    roomSlug,
                    lastCreatedAt
            );
            JSONArray messages = new JSONArray(response);
            String newestCreatedAt = lastCreatedAt;

            for (int index = 0; index < messages.length(); index++) {
                JSONObject message = messages.getJSONObject(index);
                String senderKey = message.optString("sender_key", "");
                String text = message.optString("text", "");
                String createdAt = message.optString("created_at", "");

                if (!createdAt.isEmpty() && createdAt.compareTo(newestCreatedAt) > 0) {
                    newestCreatedAt = createdAt;
                }

                if (senderKey.equals(userKey) || text.equals(DELETED_MARKER)) {
                    continue;
                }

                showMessageNotification(context, message);
            }

            if (!newestCreatedAt.equals(lastCreatedAt)) {
                prefs.edit().putString("last_message_created_at", newestCreatedAt).apply();
            }

            return Result.success();
        } catch (Exception error) {
            return Result.retry();
        }
    }

    private String fetchLatestMessages(
            String supabaseUrl,
            String anonKey,
            String accessToken,
            String roomSlug,
            String lastCreatedAt
    ) throws Exception {
        StringBuilder endpoint = new StringBuilder();
        endpoint.append(supabaseUrl.replaceAll("/+$", ""));
        endpoint.append("/rest/v1/app_live_messages?select=id,sender_key,sender_name,text,created_at");
        endpoint.append("&room_slug=");
        endpoint.append(urlEncode("eq." + roomSlug));
        endpoint.append("&order=created_at.asc&limit=12");

        if (!lastCreatedAt.isEmpty()) {
            endpoint.append("&created_at=");
            endpoint.append(urlEncode("gt." + lastCreatedAt));
        }

        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint.toString()).openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("apikey", anonKey);
        connection.setRequestProperty(
                "Authorization",
                "Bearer " + (accessToken.isEmpty() ? anonKey : accessToken)
        );
        connection.setRequestProperty("Accept", "application/json");
        connection.setConnectTimeout(10000);
        connection.setReadTimeout(10000);

        int responseCode = connection.getResponseCode();
        InputStream stream = responseCode >= 200 && responseCode < 300
                ? connection.getInputStream()
                : connection.getErrorStream();
        String body = readStream(stream);
        connection.disconnect();

        if (responseCode < 200 || responseCode >= 300) {
            throw new IllegalStateException("Supabase response " + responseCode + ": " + body);
        }

        return body;
    }

    private static String readStream(InputStream stream) throws Exception {
        if (stream == null) {
            return "[]";
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

    private static String urlEncode(String value) throws Exception {
        return URLEncoder.encode(value, StandardCharsets.UTF_8.name());
    }

    private void showMessageNotification(Context context, JSONObject message) {
        if (
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                        ContextCompat.checkSelfPermission(
                                context,
                                Manifest.permission.POST_NOTIFICATIONS
                        ) != PackageManager.PERMISSION_GRANTED
        ) {
            return;
        }

        createNotificationChannel(context);
        Intent launchIntent = context
                .getPackageManager()
                .getLaunchIntentForPackage(context.getPackageName());

        if (launchIntent == null) {
            launchIntent = new Intent(context, MainActivity.class);
        }

        launchIntent.putExtra("open_panel", "messages");
        launchIntent.putExtra("message_id", message.optString("id", ""));
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        int requestCode = Math.abs(message.optString("id", "").hashCode());
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                requestCode,
                launchIntent,
                flags
        );
        String senderName = message.optString("sender_name", "Message");
        String body = message.optString("text", "");
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_stat_notification)
                .setContentTitle(senderName)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .addAction(R.drawable.ic_stat_notification, "Reply", pendingIntent);

        NotificationManagerCompat.from(context).notify(600000 + requestCode % 100000, builder.build());
    }

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        NotificationManager manager = context.getSystemService(NotificationManager.class);

        if (manager == null || manager.getNotificationChannel(CHANNEL_ID) != null) {
            return;
        }

        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Messages",
                NotificationManager.IMPORTANCE_DEFAULT
        );
        channel.setDescription("Private message notifications");
        manager.createNotificationChannel(channel);
    }
}
