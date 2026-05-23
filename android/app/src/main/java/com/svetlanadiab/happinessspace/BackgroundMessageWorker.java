package com.svetlanadiab.happinessspace;

import android.Manifest;
import android.app.Notification;
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
import androidx.work.ExistingWorkPolicy;
import androidx.work.NetworkType;
import androidx.work.OneTimeWorkRequest;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

public class BackgroundMessageWorker extends Worker {
    private static final String PERIODIC_WORK_NAME = "sveta_message_background_sync";
    private static final String IMMEDIATE_WORK_NAME = "sveta_message_background_sync_now";
    private static final String CHANNEL_MESSAGES = "messages-live";
    private static final String CHANNEL_ACTIVITY = "activity";
    private static final String CHANNEL_CYCLE = "cycle";
    private static final String CHANNEL_UPDATES = "updates";
    private static final String DELETED_MARKER = "__SVETA_APP_DELETED__";
    private static final String PRESENCE_MARKER = "__SVETA_APP_PRESENCE__";
    private static final String CYCLE_MARKER = "__SVETA_APP_CYCLE_STATE__";
    private static final String SHARED_MUSIC_MARKER = "__SVETA_APP_SHARED_MUSIC__";
    private static final String SHARED_ACTIVITY_MARKER = "__SVETA_APP_SHARED_ACTIVITY__";
    private static final String NOTIFIED_ACTIVITY_KEYS = "notified_activity_keys";
    private static final String SVETLANA_ONLINE_STATE = "svetlana_online_state";
    private static final String SVETLANA_ONLINE_AT = "svetlana_online_at";
    private static final String TOKEN_SOURCE_NATIVE = "native_password";
    private static final String UPDATE_SOURCE_URL =
            "https://api.github.com/repos/Yasser-Diab/li-wang/releases?per_page=20";
    private static final String[] UPDATE_FALLBACK_SOURCE_URLS = new String[] {
            "https://api.github.com/repos/Yasser-Diab/li-wang/releases/latest",
            "https://api.github.com/repos/Yasser-Diab/li-wang/releases?per_page=20"
    };
    private static final String LAST_UPDATE_CHECK_AT = "last_update_check_at";
    private static final String NOTIFIED_UPDATE_VERSION = "notified_update_version";
    private static final String MESSAGE_CURSOR_READY = "message_notification_cursor_ready";
    private static final String LAST_NOTIFICATION_EVENT_AT = "last_notification_event_at";
    private static final String NOTIFICATION_EVENT_CURSOR_READY = "notification_event_cursor_ready";
    private static final long UPDATE_CHECK_INTERVAL_MS = TimeUnit.MINUTES.toMillis(5);

    public BackgroundMessageWorker(
            @NonNull Context context,
            @NonNull WorkerParameters workerParams
    ) {
        super(context, workerParams);
    }

    public static void schedule(Context context) {
        Context appContext = context.getApplicationContext();
        SharedPreferences prefs =
                appContext.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            return;
        }

        Constraints constraints = new Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build();
        PeriodicWorkRequest periodicRequest = new PeriodicWorkRequest.Builder(
                BackgroundMessageWorker.class,
                15,
                TimeUnit.MINUTES
        )
                .setConstraints(constraints)
                .build();
        OneTimeWorkRequest immediateRequest = new OneTimeWorkRequest.Builder(
                BackgroundMessageWorker.class
        )
                .setConstraints(constraints)
                .build();
        WorkManager workManager = WorkManager.getInstance(appContext);
        workManager.enqueueUniquePeriodicWork(
                PERIODIC_WORK_NAME,
                ExistingPeriodicWorkPolicy.UPDATE,
                periodicRequest
        );
        workManager.enqueueUniqueWork(
                IMMEDIATE_WORK_NAME,
                ExistingWorkPolicy.REPLACE,
                immediateRequest
        );
    }

    public static void cancel(Context context) {
        WorkManager workManager = WorkManager.getInstance(context.getApplicationContext());
        workManager.cancelUniqueWork(PERIODIC_WORK_NAME);
        workManager.cancelUniqueWork(IMMEDIATE_WORK_NAME);
    }

    @NonNull
    @Override
    public Result doWork() {
        return syncOnce(getApplicationContext()) ? Result.success() : Result.retry();
    }

    public static boolean syncOnce(Context context) {
        Context appContext = context.getApplicationContext();
        SharedPreferences prefs =
                appContext.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            return true;
        }

        long webAppActiveAt = prefs.getLong("web_app_active_at", 0L);
        boolean webAppActive =
                prefs.getBoolean("web_app_active", false) &&
                        webAppActiveAt > 0L &&
                        System.currentTimeMillis() - webAppActiveAt < TimeUnit.SECONDS.toMillis(45);

        maybeShowAppUpdateNotification(appContext, prefs, webAppActive);

        String supabaseUrl = prefs.getString("supabase_url", "");
        String anonKey = prefs.getString("anon_key", "");
        String roomSlug = prefs.getString("room_slug", "svetlana-diab");
        String userKey = prefs.getString("user_key", "");
        String lastSeenAt = prefs.getString(LAST_NOTIFICATION_EVENT_AT, "");
        String deliveredThroughAt = prefs.getString("delivered_message_activity_at", "");

        if (supabaseUrl.isEmpty() || anonKey.isEmpty() || userKey.isEmpty()) {
            return true;
        }

        try {
            String response = fetchLatestNotificationEvents(
                    appContext,
                    supabaseUrl,
                    anonKey,
                    roomSlug,
                    userKey,
                    lastSeenAt
            );
            JSONArray events = new JSONArray(response);
            String newestSeenAt = lastSeenAt;
            boolean firstSync = lastSeenAt.isEmpty();
            String newestDeliveredActivityAt = "";

            for (int index = 0; index < events.length(); index++) {
                JSONObject event = events.getJSONObject(index);
                String activityAt = event.optString("created_at", "");
                boolean shouldMarkDelivered = shouldMarkDeliveredEvent(event, userKey);

                if (!activityAt.isEmpty() && compareTimestamp(activityAt, newestSeenAt) > 0) {
                    newestSeenAt = activityAt;
                }

                if (
                        shouldMarkDelivered &&
                                !activityAt.isEmpty() &&
                                compareTimestamp(activityAt, deliveredThroughAt) > 0 &&
                                compareTimestamp(activityAt, newestDeliveredActivityAt) > 0
                ) {
                    newestDeliveredActivityAt = activityAt;
                }

                if (!firstSync && compareTimestamp(activityAt, lastSeenAt) > 0) {
                    if (webAppActive && shouldNotifyEvent(event, userKey)) {
                        rememberNotificationActivity(prefs, "event:" + event.optString("id", ""));
                        continue;
                    }

                    notifyForEvent(appContext, prefs, event, userKey);
                }
            }

            if (!newestSeenAt.equals(lastSeenAt)) {
                prefs.edit()
                        .putString(LAST_NOTIFICATION_EVENT_AT, newestSeenAt)
                        .putString("last_message_created_at", newestSeenAt)
                        .apply();
            }

            if (!prefs.getBoolean(NOTIFICATION_EVENT_CURSOR_READY, false)) {
                prefs.edit()
                        .putBoolean(NOTIFICATION_EVENT_CURSOR_READY, true)
                        .putBoolean(MESSAGE_CURSOR_READY, true)
                        .apply();
            }

            if (!newestDeliveredActivityAt.isEmpty()) {
                boolean deliverySynced = updateRemoteDeliveryReceipt(
                        supabaseUrl,
                        anonKey,
                        prefs.getString("access_token", ""),
                        roomSlug,
                        userKey,
                        newestDeliveredActivityAt
                );
                if (deliverySynced) {
                    prefs.edit()
                            .putString("delivered_message_activity_at", newestDeliveredActivityAt)
                            .apply();
                }
            }

            maybeShowCycleReminder(appContext, prefs, webAppActive);
            return true;
        } catch (Exception error) {
            return false;
        }
    }

    private static boolean shouldMarkDeliveredEvent(JSONObject event, String userKey) {
        return "message".equals(event.optString("event_type", "")) &&
                shouldNotifyEvent(event, userKey);
    }

    private static boolean shouldNotifyEvent(JSONObject event, String userKey) {
        String actorKey = event.optString("actor_key", "");
        String targetUserKey = event.optString("target_user_key", "");

        return !actorKey.isEmpty() &&
                !actorKey.equals(userKey) &&
                (targetUserKey.isEmpty() || targetUserKey.equals(userKey));
    }

    private static void notifyForEvent(
            Context context,
            SharedPreferences prefs,
            JSONObject event,
            String userKey
    ) {
        if (!shouldNotifyEvent(event, userKey)) {
            return;
        }

        String eventId = event.optString("id", "");
        String eventType = event.optString("event_type", "activity");
        String actorKey = event.optString("actor_key", "");
        String title = event.optString("title", "");
        String body = event.optString("body", "");
        String messageId = event.optString("message_id", "");
        String channelId = CHANNEL_ACTIVITY;
        String kind = "activity";
        int baseId = 630000;

        if (title.isEmpty()) {
            title = displayNameForUser(actorKey);
        }
        if (body.isEmpty()) {
            body = "Open Our Universe to see what changed.";
        }

        if ("message".equals(eventType)) {
            channelId = CHANNEL_MESSAGES;
            kind = "message";
            baseId = 610000;
        } else if ("reaction".equals(eventType)) {
            channelId = CHANNEL_MESSAGES;
            kind = "message";
            baseId = 645000;
        } else if ("cycle".equals(eventType)) {
            channelId = CHANNEL_CYCLE;
            kind = "cycle";
            baseId = 620000;
        } else if ("presence_online".equals(eventType)) {
            if (!"diab".equals(userKey) || !"svetlana".equals(actorKey)) {
                return;
            }
            channelId = CHANNEL_ACTIVITY;
            kind = "activity";
            baseId = 655000;
        } else if ("shared_music".equals(eventType)) {
            channelId = CHANNEL_ACTIVITY;
            kind = "activity";
            baseId = 640000;
        }

        if (!rememberNotificationActivity(prefs, "event:" + eventId)) {
            return;
        }

        showNotification(
                context,
                channelId,
                buildNotificationId(baseId, eventId),
                title,
                body,
                kind,
                messageId
        );
    }

    private static void notifyForMessage(
            Context context,
            SharedPreferences prefs,
            JSONObject message,
            String userKey,
            String lastSeenAt
    ) {
        String senderKey = message.optString("sender_key", "");
        String text = message.optString("text", "");
        JSONObject reactionAttachment = findAttachment(message, "message_reactions");
        String activityAt = latestMessageActivityTimestamp(message);

        if (senderKey.equals(userKey)) {
            if (reactionAttachment != null && !reactionAttachment.optString("updated_by", "").equals(userKey)) {
                String reactingUserKey = reactionAttachment.optString("updated_by", "");
                String reactionEmoji = reactionEmojiForUser(reactionAttachment, reactingUserKey);

                if (reactionEmoji.isEmpty()) {
                    return;
                }

                if (!rememberNotificationActivity(prefs, "reaction:" + message.optString("id", "") + ":" + reactionAttachment.optString("updated_at", ""))) {
                    return;
                }

                showNotification(
                        context,
                        CHANNEL_MESSAGES,
                        buildNotificationId(645000, message.optString("id", "") + reactionAttachment.optString("updated_at", "")),
                        displayNameForUser(reactingUserKey) + " reacted with " + reactionEmoji,
                        "to your message \"" + reactionMessagePreview(message) + "\"",
                        "message",
                        message.optString("id", "")
                );
            }
            return;
        }

        if (isReactionOnlyActivity(message, reactionAttachment, lastSeenAt)) {
            return;
        }

        if (text.equals(PRESENCE_MARKER)) {
            maybeNotifySvetlanaOnline(context, prefs, message, userKey);
            return;
        }

        if (text.equals(DELETED_MARKER)) {
            if (!rememberNotificationActivity(prefs, "delete:" + message.optString("id", "") + ":" + activityAt)) {
                return;
            }

            showNotification(
                    context,
                    CHANNEL_MESSAGES,
                    buildNotificationId(615000, message.optString("id", "") + message.optString("edited_at", "")),
                    message.optString("sender_name", "Message"),
                    "A message was deleted.",
                    "message",
                    message.optString("id", "")
            );
            return;
        }

        if (text.equals(CYCLE_MARKER)) {
            JSONObject attachment = findAttachment(message, "cycle_state");
            if (attachment == null || attachment.optString("updated_by", "").equals(userKey)) {
                return;
            }
            String changeType = attachment.optString("change_type", "");
            if (!rememberNotificationActivity(prefs, "cycle:" + message.optString("id", "") + ":" + attachment.optString("updated_at", activityAt))) {
                return;
            }

            showNotification(
                    context,
                    CHANNEL_CYCLE,
                    buildNotificationId(620000, message.optString("id", "") + attachment.optString("updated_at", "")),
                    cycleTitle(changeType),
                    "Cycle calendar was updated.",
                    "cycle",
                    message.optString("id", "")
            );
            maybeUpdateCycleData(prefs, attachment);
            return;
        }

        if (text.equals(SHARED_ACTIVITY_MARKER)) {
            JSONObject attachment = findAttachment(message, "shared_activity");
            if (attachment == null || attachment.optString("updated_by", "").equals(userKey)) {
                return;
            }
            String title = attachment.optString("title", "");
            String body = attachment.optString("body", "");
            if (title.isEmpty()) {
                title = activityTitle(attachment.optString("activity_type", ""));
            }
            if (body.isEmpty()) {
                body = title;
            }
            if ("memory".equals(attachment.optString("activity_type", ""))) {
                title = "💛 " + title + " ✨";
                body = body.isEmpty()
                        ? "A memory changed in Our Universe."
                        : "A memory changed in Our Universe. " + body;
            }
            if (!rememberNotificationActivity(prefs, "activity:" + message.optString("id", "") + ":" + activityAt)) {
                return;
            }

            showNotification(
                    context,
                    CHANNEL_ACTIVITY,
                    buildNotificationId(630000, message.optString("id", "")),
                    title,
                    body,
                    "activity",
                    message.optString("id", "")
            );
            return;
        }

        if (text.equals(SHARED_MUSIC_MARKER)) {
            JSONObject attachment = findAttachment(message, "shared_music");
            if (attachment == null || attachment.optString("updated_by", "").equals(userKey)) {
                return;
            }
            if (!rememberNotificationActivity(prefs, "music:" + message.optString("id", "") + ":" + activityAt)) {
                return;
            }

            showNotification(
                    context,
                    CHANNEL_ACTIVITY,
                    buildNotificationId(640000, message.optString("id", "")),
                    "Shared music updated",
                    "New music is available in the app.",
                    "activity",
                    message.optString("id", "")
            );
            return;
        }

        String body = plainText(text);
        if (body.isEmpty()) {
            body = "Sent a photo or file.";
        }
        if (!rememberNotificationActivity(prefs, "message:" + message.optString("id", "") + ":" + activityAt)) {
            return;
        }

        showNotification(
                context,
                CHANNEL_MESSAGES,
                buildNotificationId(610000, message.optString("id", "")),
                message.optString("sender_name", "Message"),
                body,
                "message",
                message.optString("id", "")
        );
    }

    private static void maybeUpdateCycleData(SharedPreferences prefs, JSONObject attachment) {
        JSONObject cycleData = attachment.optJSONObject("cycle_data");
        if (cycleData == null) {
            return;
        }

        prefs.edit().putString("cycle_data", cycleData.toString()).apply();
    }

    private static boolean shouldMarkDelivered(JSONObject message, String userKey) {
        String senderKey = message.optString("sender_key", "");
        String text = message.optString("text", "");

        return !senderKey.isEmpty() &&
                !senderKey.equals(userKey) &&
                !text.equals(PRESENCE_MARKER) &&
                !text.equals(CYCLE_MARKER) &&
                !text.equals(SHARED_MUSIC_MARKER) &&
                !text.equals(SHARED_ACTIVITY_MARKER) &&
                !text.equals(DELETED_MARKER);
    }

    private static boolean isSystemMessage(JSONObject message) {
        String text = message.optString("text", "");
        return text.equals(PRESENCE_MARKER) ||
                text.equals(CYCLE_MARKER) ||
                text.equals(SHARED_MUSIC_MARKER) ||
                text.equals(SHARED_ACTIVITY_MARKER);
    }

    private static void maybeShowAppUpdateNotification(
            Context context,
            SharedPreferences prefs,
            boolean webAppActive
    ) {
        long now = System.currentTimeMillis();
        long lastUpdateCheckAt = prefs.getLong(LAST_UPDATE_CHECK_AT, 0);

        if (now - lastUpdateCheckAt < UPDATE_CHECK_INTERVAL_MS) {
            return;
        }

        prefs.edit().putLong(LAST_UPDATE_CHECK_AT, now).apply();

        try {
            String sourceUrl = prefs.getString("app_update_source_url", UPDATE_SOURCE_URL);
            if (sourceUrl == null || sourceUrl.isEmpty()) {
                sourceUrl = UPDATE_SOURCE_URL;
            }

            UpdateCandidate candidate = fetchLatestUpdateCandidate(sourceUrl);
            int currentVersionCode = prefs.getInt("app_version_code", getInstalledVersionCode(context));
            String currentVersionName = prefs.getString("app_version_name", getInstalledVersionName(context));

            if (candidate == null || !isUpdateNewer(candidate, currentVersionName, currentVersionCode)) {
                return;
            }

            if (candidate.versionName.equals(prefs.getString(NOTIFIED_UPDATE_VERSION, ""))) {
                return;
            }

            if (webAppActive) {
                return;
            }

            prefs.edit().putString(NOTIFIED_UPDATE_VERSION, candidate.versionName).apply();
            showNotification(
                    context,
                    CHANNEL_UPDATES,
                    buildNotificationId(690000, "app_update_" + candidate.versionName),
                    "Update available",
                    "New app version available open the app to download and install",
                    "update",
                    ""
            );
        } catch (Exception error) {
            // Update checks should never block private message notifications.
        }
    }

    private static UpdateCandidate fetchLatestUpdateCandidate(String primarySourceUrl) {
        ArrayList<String> sourceUrls = new ArrayList<>();
        if (primarySourceUrl != null && !primarySourceUrl.isEmpty()) {
            sourceUrls.add(primarySourceUrl);
        }

        for (String sourceUrl : UPDATE_FALLBACK_SOURCE_URLS) {
            if (!sourceUrls.contains(sourceUrl)) {
                sourceUrls.add(sourceUrl);
            }
        }

        ArrayList<UpdateCandidate> candidates = new ArrayList<>();
        for (String sourceUrl : sourceUrls) {
            try {
                UpdateCandidate candidate = fetchLatestUpdateCandidateFromUrl(sourceUrl);
                if (candidate != null) {
                    candidates.add(candidate);
                }
            } catch (Exception error) {
                // Other update sources may still have the APK listing.
            }
        }

        if (candidates.isEmpty()) {
            return null;
        }

        Collections.sort(candidates, BackgroundMessageWorker::compareUpdateCandidates);
        return candidates.get(candidates.size() - 1);
    }

    private static UpdateCandidate fetchLatestUpdateCandidateFromUrl(String sourceUrl) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(sourceUrl).openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("User-Agent", "Our-Universe-Android-Updater");
        connection.setConnectTimeout(6000);
        connection.setReadTimeout(8000);

        int responseCode = connection.getResponseCode();
        InputStream stream = responseCode >= 200 && responseCode < 300
                ? connection.getInputStream()
                : connection.getErrorStream();
        String body = readStream(stream);
        connection.disconnect();

        if (responseCode < 200 || responseCode >= 300 || body.isEmpty()) {
            return null;
        }

        Object payload = new JSONTokener(body).nextValue();
        ArrayList<UpdateCandidate> candidates = new ArrayList<>();

        if (payload instanceof JSONArray) {
            JSONArray items = (JSONArray) payload;
            for (int index = 0; index < items.length(); index++) {
                collectUpdateCandidates(items.optJSONObject(index), candidates);
            }
        } else if (payload instanceof JSONObject) {
            JSONObject object = (JSONObject) payload;
            collectUpdateCandidates(object, candidates);

            JSONObject latest = object.optJSONObject("latest");
            if (latest != null) {
                collectUpdateCandidates(latest, candidates);
            }

            JSONArray versions = object.optJSONArray("versions");
            if (versions != null) {
                for (int index = 0; index < versions.length(); index++) {
                    collectUpdateCandidates(versions.optJSONObject(index), candidates);
                }
            }
        }

        if (candidates.isEmpty()) {
            return null;
        }

        Collections.sort(candidates, BackgroundMessageWorker::compareUpdateCandidates);
        return candidates.get(candidates.size() - 1);
    }

    private static void collectUpdateCandidates(JSONObject object, ArrayList<UpdateCandidate> candidates) {
        if (object == null) {
            return;
        }

        JSONArray assets = object.optJSONArray("assets");
        if (assets != null) {
            String releaseVersionName = firstNonEmpty(
                    object.optString("versionName", ""),
                    object.optString("version", ""),
                    object.optString("tag_name", ""),
                    object.optString("name", "")
            );
            int releaseVersionCode = object.optInt("versionCode", object.optInt("version_code", 0));

            for (int index = 0; index < assets.length(); index++) {
                JSONObject asset = assets.optJSONObject(index);
                if (asset == null) {
                    continue;
                }

                JSONObject merged = new JSONObject();
                try {
                    merged.put("fileName", asset.optString("name", ""));
                    merged.put(
                            "downloadUrl",
                            firstNonEmpty(
                                    asset.optString("browser_download_url", ""),
                                    asset.optString("download_url", ""),
                                    asset.optString("url", "")
                            )
                    );
                    merged.put("versionName", firstNonEmpty(
                            asset.optString("versionName", ""),
                            releaseVersionName
                    ));
                    merged.put(
                            "versionCode",
                            asset.optInt("versionCode", asset.optInt("version_code", releaseVersionCode))
                    );

                    UpdateCandidate candidate = normalizeUpdateCandidate(merged);
                    if (candidate != null) {
                        candidates.add(candidate);
                    }
                } catch (Exception error) {
                    // Ignore malformed release assets.
                }
            }
            return;
        }

        UpdateCandidate candidate = normalizeUpdateCandidate(object);
        if (candidate != null) {
            candidates.add(candidate);
        }
    }

    private static UpdateCandidate normalizeUpdateCandidate(JSONObject object) {
        if (object == null) {
            return null;
        }

        String fileName = firstNonEmpty(
                object.optString("fileName", ""),
                object.optString("file", ""),
                object.optString("name", "")
        );
        String downloadUrl = firstNonEmpty(
                object.optString("browser_download_url", ""),
                object.optString("downloadUrl", ""),
                object.optString("download_url", ""),
                object.optString("url", "")
        );

        if (fileName == null || !fileName.toLowerCase(Locale.US).endsWith(".apk")) {
            return null;
        }

        String versionName = firstNonEmpty(
                object.optString("versionName", ""),
                object.optString("version", ""),
                object.optString("tag_name", ""),
                object.optString("releaseTag", ""),
                versionFromApkFileName(fileName)
        );

        if (versionName == null || versionName.isEmpty() || downloadUrl == null || downloadUrl.isEmpty()) {
            return null;
        }

        return new UpdateCandidate(
                versionName.replaceFirst("^[vV]", ""),
                object.optInt("versionCode", object.optInt("version_code", 0)),
                fileName,
                downloadUrl
        );
    }

    private static String firstNonEmpty(String... values) {
        for (String value : values) {
            if (value != null && !value.isEmpty()) {
                return value;
            }
        }
        return "";
    }

    private static String versionFromApkFileName(String fileName) {
        String version = fileName.replaceFirst(".*-[vV]([0-9.]+).*", "$1");
        return version.equals(fileName) ? "" : version;
    }

    private static boolean isUpdateNewer(
            UpdateCandidate candidate,
            String currentVersionName,
            int currentVersionCode
    ) {
        if (candidate.versionCode > 0 && currentVersionCode > 0) {
            return candidate.versionCode > currentVersionCode;
        }

        return compareVersionNames(candidate.versionName, currentVersionName) > 0;
    }

    private static String getInstalledVersionName(Context context) {
        try {
            String versionName = context
                    .getPackageManager()
                    .getPackageInfo(context.getPackageName(), 0)
                    .versionName;
            return versionName == null ? "" : versionName;
        } catch (Exception error) {
            return "";
        }
    }

    private static int getInstalledVersionCode(Context context) {
        try {
            android.content.pm.PackageInfo packageInfo = context
                    .getPackageManager()
                    .getPackageInfo(context.getPackageName(), 0);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                long versionCode = packageInfo.getLongVersionCode();
                return versionCode > Integer.MAX_VALUE ? Integer.MAX_VALUE : (int) versionCode;
            }

            return packageInfo.versionCode;
        } catch (Exception error) {
            return 0;
        }
    }

    private static int compareUpdateCandidates(UpdateCandidate left, UpdateCandidate right) {
        int versionComparison = compareVersionNames(left.versionName, right.versionName);
        if (versionComparison != 0) {
            return versionComparison;
        }

        return left.versionCode - right.versionCode;
    }

    private static int compareVersionNames(String left, String right) {
        String[] leftParts = (left == null ? "" : left.replaceFirst("^[vV]", "")).split("[^0-9]+");
        String[] rightParts = (right == null ? "" : right.replaceFirst("^[vV]", "")).split("[^0-9]+");
        int length = Math.max(leftParts.length, rightParts.length);

        for (int index = 0; index < length; index++) {
            int leftValue = index < leftParts.length && !leftParts[index].isEmpty()
                    ? Integer.parseInt(leftParts[index])
                    : 0;
            int rightValue = index < rightParts.length && !rightParts[index].isEmpty()
                    ? Integer.parseInt(rightParts[index])
                    : 0;

            if (leftValue != rightValue) {
                return leftValue - rightValue;
            }
        }

        return 0;
    }

    private static void maybeNotifySvetlanaOnline(
            Context context,
            SharedPreferences prefs,
            JSONObject message,
            String userKey
    ) {
        if (!"diab".equals(userKey) || !"svetlana".equals(message.optString("sender_key", ""))) {
            return;
        }

        JSONObject attachment = findAttachment(message, "presence_state");

        if (attachment == null) {
            return;
        }

        String activityAt = attachment.optString(
                "updated_at",
                latestMessageActivityTimestamp(message)
        );
        boolean isOnline =
                attachment.optBoolean("visible", true) &&
                        attachment.optBoolean("active", false);
        boolean wasRecentlyOnline =
                prefs.getBoolean(SVETLANA_ONLINE_STATE, false) &&
                        isRecentIsoTimestamp(prefs.getString(SVETLANA_ONLINE_AT, ""), 90_000);

        prefs.edit()
                .putBoolean(SVETLANA_ONLINE_STATE, isOnline)
                .putString(SVETLANA_ONLINE_AT, isOnline ? activityAt : "")
                .apply();

        if (!isOnline || wasRecentlyOnline) {
            return;
        }

        if (!rememberNotificationActivity(prefs, "presence_online:svetlana:" + activityAt)) {
            return;
        }

        showNotification(
                context,
                CHANNEL_ACTIVITY,
                buildNotificationId(655000, "svetlana_online_" + activityAt),
                "Svetlana is online",
                "Svetlana just opened Our Universe.",
                "activity",
                ""
        );
    }

    private static boolean updateRemoteDeliveryReceipt(
            String supabaseUrl,
            String anonKey,
            String accessToken,
            String roomSlug,
            String userKey,
            String deliveredActivityAt
    ) {
        if (deliveredActivityAt.isEmpty()) {
            return false;
        }

        try {
            String now = isoNow();
            String safeRoom = roomSlug.replaceAll("[^A-Za-z0-9_-]+", "_").toLowerCase(Locale.US);
            JSONObject attachment = new JSONObject()
                    .put("kind", "presence_state")
                    .put("user_key", userKey)
                    .put("visible", true)
                    .put("active", false)
                    .put("last_seen_at", "")
                    .put("updated_at", now)
                    .put("typing_until", "")
                    .put("delivered_message_activity_at", deliveredActivityAt)
                    .put("delivered_at", now)
                    .put("hidden_deleted_message_ids", new JSONArray());
            JSONArray attachments = new JSONArray().put(attachment);
            JSONObject body = new JSONObject()
                    .put("id", "presence_" + safeRoom + "_" + userKey)
                    .put("room_slug", roomSlug)
                    .put("sender_key", userKey)
                    .put("sender_name", displayNameForUser(userKey))
                    .put("text", PRESENCE_MARKER)
                    .put("created_at", now)
                    .put("edited_at", now)
                    .put("attachments", attachments);
            String endpoint = supabaseUrl.replaceAll("/+$", "") +
                    "/rest/v1/app_live_messages?on_conflict=id";
            HttpURLConnection connection = (HttpURLConnection) new URL(endpoint).openConnection();
            byte[] payload = body.toString().getBytes(StandardCharsets.UTF_8);
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("apikey", anonKey);
            connection.setRequestProperty(
                    "Authorization",
                    "Bearer " + (accessToken.isEmpty() ? anonKey : accessToken)
            );
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Prefer", "resolution=merge-duplicates");
            connection.setConnectTimeout(4000);
            connection.setReadTimeout(4000);

            try (OutputStream output = connection.getOutputStream()) {
                output.write(payload);
            }

            int responseCode = connection.getResponseCode();
            connection.disconnect();
            return responseCode >= 200 && responseCode < 300;
        } catch (Exception error) {
            // Delivery receipts should not block background notifications.
            return false;
        }
    }

    private static boolean rememberNotificationActivity(SharedPreferences prefs, String activityKey) {
        if (activityKey == null || activityKey.isEmpty()) {
            return true;
        }

        Set<String> storedKeys = prefs.getStringSet(NOTIFIED_ACTIVITY_KEYS, Collections.emptySet());
        HashSet<String> nextKeys = new HashSet<>(storedKeys);

        if (nextKeys.contains(activityKey)) {
            return false;
        }

        nextKeys.add(activityKey);
        prefs.edit().putStringSet(NOTIFIED_ACTIVITY_KEYS, nextKeys).apply();
        return true;
    }

    private static JSONObject findAttachment(JSONObject message, String kind) {
        JSONArray attachments = message.optJSONArray("attachments");
        if (attachments == null) {
            return null;
        }

        for (int index = 0; index < attachments.length(); index++) {
            JSONObject attachment = attachments.optJSONObject(index);
            if (attachment != null && kind.equals(attachment.optString("kind", ""))) {
                return attachment;
            }
        }

        return null;
    }

    private static String fetchLatestMessages(
            Context context,
            String supabaseUrl,
            String anonKey,
            String roomSlug,
            String userKey,
            String lastSeenAt
    ) throws Exception {
        SharedPreferences prefs =
                context.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);
        String accessToken = prefs.getString("access_token", "");
        HttpResponse response = requestMessages(supabaseUrl, anonKey, accessToken, roomSlug, lastSeenAt);

        boolean canRefreshNativeSession =
                TOKEN_SOURCE_NATIVE.equals(prefs.getString("token_source", "")) &&
                        !prefs.getString("refresh_token", "").isEmpty();

        if ((response.code == 401 || response.code == 403) && canRefreshNativeSession) {
            SessionTokens tokens = refreshSession(supabaseUrl, anonKey, prefs.getString("refresh_token", ""));
            prefs.edit()
                    .putString("access_token", tokens.accessToken)
                    .putString("refresh_token", tokens.refreshToken)
                    .putString("token_source", TOKEN_SOURCE_NATIVE)
                    .apply();
            response = requestMessages(supabaseUrl, anonKey, tokens.accessToken, roomSlug, lastSeenAt);
        }

        if ((response.code == 401 || response.code == 403) && !canRefreshNativeSession) {
            return "[]";
        }

        if (response.code < 200 || response.code >= 300) {
            throw new IllegalStateException("Supabase response " + response.code + ": " + response.body);
        }

        return response.body;
    }

    private static String fetchLatestNotificationEvents(
            Context context,
            String supabaseUrl,
            String anonKey,
            String roomSlug,
            String userKey,
            String lastSeenAt
    ) throws Exception {
        SharedPreferences prefs =
                context.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);
        String accessToken = prefs.getString("access_token", "");
        HttpResponse response =
                requestNotificationEvents(supabaseUrl, anonKey, accessToken, roomSlug, userKey, lastSeenAt);

        boolean canRefreshNativeSession =
                TOKEN_SOURCE_NATIVE.equals(prefs.getString("token_source", "")) &&
                        !prefs.getString("refresh_token", "").isEmpty();

        if ((response.code == 401 || response.code == 403) && canRefreshNativeSession) {
            SessionTokens tokens = refreshSession(supabaseUrl, anonKey, prefs.getString("refresh_token", ""));
            prefs.edit()
                    .putString("access_token", tokens.accessToken)
                    .putString("refresh_token", tokens.refreshToken)
                    .putString("token_source", TOKEN_SOURCE_NATIVE)
                    .apply();
            response = requestNotificationEvents(
                    supabaseUrl,
                    anonKey,
                    tokens.accessToken,
                    roomSlug,
                    userKey,
                    lastSeenAt
            );
        }

        if ((response.code == 401 || response.code == 403) && !canRefreshNativeSession) {
            return "[]";
        }

        if (response.code < 200 || response.code >= 300) {
            throw new IllegalStateException(
                    "Supabase notification event response " + response.code + ": " + response.body
            );
        }

        return response.body;
    }

    private static HttpResponse requestNotificationEvents(
            String supabaseUrl,
            String anonKey,
            String accessToken,
            String roomSlug,
            String userKey,
            String lastSeenAt
    ) throws Exception {
        StringBuilder endpoint = new StringBuilder();
        endpoint.append(supabaseUrl.replaceAll("/+$", ""));
        endpoint.append("/rest/v1/app_notification_events");
        endpoint.append("?select=id,event_type,actor_key,target_user_key,message_id,title,body,created_at,metadata");
        endpoint.append("&room_slug=");
        endpoint.append(urlEncode("eq." + roomSlug));
        endpoint.append("&target_user_key=");
        endpoint.append(urlEncode("eq." + userKey));
        String normalizedLastSeenAt = lastSeenAt == null ? "" : lastSeenAt.trim();
        if (normalizedLastSeenAt.isEmpty()) {
            endpoint.append("&order=created_at.desc&limit=80");
        } else {
            endpoint.append("&created_at=");
            endpoint.append(urlEncode("gt." + normalizedLastSeenAt));
            endpoint.append("&order=created_at.asc&limit=80");
        }

        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint.toString()).openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("apikey", anonKey);
        connection.setRequestProperty(
                "Authorization",
                "Bearer " + (accessToken.isEmpty() ? anonKey : accessToken)
        );
        connection.setRequestProperty("Accept", "application/json");
        connection.setConnectTimeout(4000);
        connection.setReadTimeout(4000);

        int responseCode = connection.getResponseCode();
        InputStream stream = responseCode >= 200 && responseCode < 300
                ? connection.getInputStream()
                : connection.getErrorStream();
        String body = readStream(stream);
        connection.disconnect();
        return new HttpResponse(responseCode, body);
    }

    private static HttpResponse requestMessages(
            String supabaseUrl,
            String anonKey,
            String accessToken,
            String roomSlug,
            String lastSeenAt
    ) throws Exception {
        StringBuilder endpoint = new StringBuilder();
        endpoint.append(supabaseUrl.replaceAll("/+$", ""));
        endpoint.append("/rest/v1/app_live_messages");
        endpoint.append("?select=id,sender_key,sender_name,text,created_at,edited_at,attachments");
        endpoint.append("&room_slug=");
        endpoint.append(urlEncode("eq." + roomSlug));
        String normalizedLastSeenAt = lastSeenAt == null ? "" : lastSeenAt.trim();
        if (normalizedLastSeenAt.isEmpty()) {
            endpoint.append("&order=created_at.desc&limit=120");
        } else {
            endpoint.append("&created_at=");
            endpoint.append(urlEncode("gt." + normalizedLastSeenAt));
            endpoint.append("&order=created_at.asc&limit=80");
        }

        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint.toString()).openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("apikey", anonKey);
        connection.setRequestProperty(
                "Authorization",
                "Bearer " + (accessToken.isEmpty() ? anonKey : accessToken)
        );
        connection.setRequestProperty("Accept", "application/json");
        connection.setConnectTimeout(4000);
        connection.setReadTimeout(4000);

        int responseCode = connection.getResponseCode();
        InputStream stream = responseCode >= 200 && responseCode < 300
                ? connection.getInputStream()
                : connection.getErrorStream();
        String body = readStream(stream);
        connection.disconnect();
        return new HttpResponse(responseCode, body);
    }

    private static SessionTokens refreshSession(
            String supabaseUrl,
            String anonKey,
            String refreshToken
    ) throws Exception {
        String endpoint = supabaseUrl.replaceAll("/+$", "") + "/auth/v1/token?grant_type=refresh_token";
        HttpURLConnection connection = (HttpURLConnection) new URL(endpoint).openConnection();
        byte[] body = ("{\"refresh_token\":\"" + jsonEscape(refreshToken) + "\"}")
                .getBytes(StandardCharsets.UTF_8);
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("apikey", anonKey);
        connection.setRequestProperty("Authorization", "Bearer " + anonKey);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setConnectTimeout(4000);
        connection.setReadTimeout(4000);

        try (OutputStream output = connection.getOutputStream()) {
            output.write(body);
        }

        int responseCode = connection.getResponseCode();
        InputStream stream = responseCode >= 200 && responseCode < 300
                ? connection.getInputStream()
                : connection.getErrorStream();
        String responseBody = readStream(stream);
        connection.disconnect();

        if (responseCode < 200 || responseCode >= 300) {
            throw new IllegalStateException("Supabase refresh response " + responseCode + ": " + responseBody);
        }

        JSONObject session = new JSONObject(responseBody);
        String nextAccessToken = session.optString("access_token", "");
        String nextRefreshToken = session.optString("refresh_token", refreshToken);

        if (nextAccessToken.isEmpty()) {
            throw new IllegalStateException("Supabase refresh response missed access_token");
        }

        return new SessionTokens(nextAccessToken, nextRefreshToken);
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

    private static void maybeShowCycleReminder(
            Context context,
            SharedPreferences prefs,
            boolean webAppActive
    ) {
        String cycleDataText = prefs.getString("cycle_data", "");
        if (cycleDataText.isEmpty()) {
            return;
        }

        try {
            JSONObject cycleData = new JSONObject(cycleDataText);
            JSONArray rawEntries = cycleData.optJSONArray("entries");
            if (rawEntries == null || rawEntries.length() == 0) {
                return;
            }

            ArrayList<JSONObject> entries = new ArrayList<>();
            for (int index = 0; index < rawEntries.length(); index++) {
                JSONObject entry = rawEntries.optJSONObject(index);
                if (entry != null && !entry.optString("startDate", "").isEmpty()) {
                    entries.add(entry);
                }
            }

            if (entries.isEmpty()) {
                return;
            }

            Collections.sort(entries, Comparator.comparing(entry -> entry.optString("startDate", "")));
            JSONObject lastEntry = entries.get(entries.size() - 1);
            int cycleLength = clamp(lastEntry.optInt(
                    "cycleLength",
                    cycleData.optInt("typical_cycle_length", 28)
            ), 18, 60, 28);
            int periodLength = clamp(lastEntry.optInt(
                    "periodLength",
                    cycleData.optInt("typical_period_length", 5)
            ), 2, 12, 5);
            Calendar predictedStart = parseLocalDate(lastEntry.optString("startDate", ""));
            if (predictedStart == null) {
                return;
            }
            addDays(predictedStart, cycleLength);

            Calendar today = today();
            while (daysBetween(today, predictedStart) < -periodLength) {
                addDays(predictedStart, cycleLength);
            }

            int daysUntil = daysBetween(today, predictedStart);
            String todayKey = formatLocalDate(today);
            String reminderKey = "";
            String title = "";
            String body = "";

            if (daysUntil == 2) {
                reminderKey = todayKey + "_cycle_minus_2";
                title = "Two days before predicted cycle";
                body = "Cycle may start in about 2 days.";
            } else if (daysUntil == 1) {
                reminderKey = todayKey + "_cycle_minus_1";
                title = "One day before predicted cycle";
                body = "Cycle may start tomorrow.";
            } else if (daysUntil == 0) {
                reminderKey = todayKey + "_cycle_start";
                title = "It is your predicted cycle day";
                body = "Cycle may start today.";
            } else {
                Calendar predictedEnd = (Calendar) predictedStart.clone();
                addDays(predictedEnd, Math.max(periodLength - 1, 0));
                if (daysBetween(today, predictedEnd) == 0) {
                    reminderKey = todayKey + "_cycle_end";
                    title = "Predicted cycle end";
                    body = "This may be the predicted cycle end day.";
                }
            }

            if (reminderKey.isEmpty() || reminderKey.equals(prefs.getString("last_cycle_reminder_key", ""))) {
                return;
            }

            if (webAppActive) {
                return;
            }

            showNotification(
                    context,
                    CHANNEL_CYCLE,
                    buildNotificationId(650000, reminderKey),
                    title,
                    body,
                    "cycle",
                    ""
            );
            prefs.edit().putString("last_cycle_reminder_key", reminderKey).apply();
        } catch (Exception error) {
            // Cycle reminders should not block message sync.
        }
    }

    private static void showNotification(
            Context context,
            String channelId,
            int notificationId,
            String title,
            String body,
            String kind,
            String messageId
    ) {
        if (
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                        ContextCompat.checkSelfPermission(
                                context,
                                Manifest.permission.POST_NOTIFICATIONS
                        ) != PackageManager.PERMISSION_GRANTED
        ) {
            return;
        }

        createNotificationChannel(context, channelId);
        Intent launchIntent = context
                .getPackageManager()
                .getLaunchIntentForPackage(context.getPackageName());

        if (launchIntent == null) {
            launchIntent = new Intent(context, MainActivity.class);
        }

        if ("message".equals(kind)) {
            launchIntent.putExtra("open_panel", "messages");
            launchIntent.putExtra("message_id", messageId);
        } else if ("cycle".equals(kind)) {
            launchIntent.putExtra("open_panel", "cycle");
        } else if ("update".equals(kind)) {
            launchIntent.putExtra("open_update", "true");
        }

        launchIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                notificationId,
                launchIntent,
                flags
        );
        String category = NotificationCompat.CATEGORY_STATUS;
        if ("message".equals(kind)) {
            category = NotificationCompat.CATEGORY_MESSAGE;
        } else if ("cycle".equals(kind)) {
            category = NotificationCompat.CATEGORY_REMINDER;
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelId)
                .setSmallIcon(R.drawable.ic_stat_notification)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .setCategory(category)
                .setDefaults(Notification.DEFAULT_ALL)
                .setOnlyAlertOnce(false)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setShowWhen(true)
                .setVibrate(new long[] { 0, 180, 90, 180 })
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setWhen(System.currentTimeMillis());

        NotificationManagerCompat.from(context).notify(notificationId, builder.build());
    }

    static void createNotificationChannel(Context context, String channelId) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        NotificationManager manager = context.getSystemService(NotificationManager.class);

        if (manager == null || manager.getNotificationChannel(channelId) != null) {
            return;
        }

        String name = "Shared updates";
        String description = "Private app updates";
        int importance = NotificationManager.IMPORTANCE_HIGH;

        if (CHANNEL_MESSAGES.equals(channelId)) {
            name = "Messages";
            description = "Private message notifications";
        } else if (CHANNEL_CYCLE.equals(channelId)) {
            name = "Cycle calendar";
            description = "Cycle reminders and updates";
        } else if (CHANNEL_UPDATES.equals(channelId)) {
            name = "App updates";
            description = "Our Universe app update notifications";
        } else if (BackgroundSyncService.CHANNEL_ID.equals(channelId)) {
            name = "Background sync";
            description = "Keeps Our Universe listening for private updates";
            importance = NotificationManager.IMPORTANCE_LOW;
        }

        NotificationChannel channel = new NotificationChannel(channelId, name, importance);
        channel.setDescription(description);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        if (!BackgroundSyncService.CHANNEL_ID.equals(channelId)) {
            channel.enableLights(true);
            channel.setLightColor(0xFFC9A45D);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[] { 0, 180, 90, 180 });
        }
        manager.createNotificationChannel(channel);
    }

    private static String cycleTitle(String changeType) {
        if ("start".equals(changeType)) {
            return "Cycle start confirmed";
        }
        if ("end".equals(changeType)) {
            return "Cycle end confirmed";
        }
        if ("note".equals(changeType)) {
            return "Cycle note updated";
        }
        if ("mood".equals(changeType)) {
            return "Cycle mood updated";
        }
        if ("checkin".equals(changeType)) {
            return "Cycle feeling updated";
        }
        if ("settings".equals(changeType)) {
            return "Cycle settings updated";
        }
        return "Cycle calendar updated";
    }

    private static String activityTitle(String activityType) {
        if ("memory".equals(activityType)) {
            return "💛 Memory updated ✨";
        }
        if ("event".equals(activityType)) {
            return "Event updated";
        }
        if ("cycle".equals(activityType)) {
            return "Cycle calendar updated";
        }
        if ("music".equals(activityType)) {
            return "Shared music updated";
        }
        if ("file".equals(activityType)) {
            return "File saved to shared storage";
        }
        return "Shared update";
    }

    private static String plainText(String rawText) {
        return rawText == null
                ? ""
                : rawText.replaceAll("<[^>]*>", " ")
                        .replaceAll("\\s+", " ")
                        .trim();
    }

    private static String latestMessageActivityTimestamp(JSONObject message) {
        JSONObject reactionAttachment = findAttachment(message, "message_reactions");
        return latestTimestamp(
                latestTimestamp(
                        message.optString("created_at", ""),
                        message.optString("edited_at", "")
                ),
                reactionAttachment == null ? "" : reactionAttachment.optString("updated_at", "")
        );
    }

    private static String messageReceiptTimestamp(JSONObject message) {
        String createdAt = message.optString("created_at", "");
        return createdAt == null ? "" : createdAt;
    }

    private static boolean isReactionOnlyActivity(
            JSONObject message,
            JSONObject reactionAttachment,
            String lastSeenAt
    ) {
        String reactionUpdatedAt =
                reactionAttachment == null ? "" : reactionAttachment.optString("updated_at", "");

        return !reactionUpdatedAt.isEmpty() &&
                compareTimestamp(reactionUpdatedAt, lastSeenAt) > 0 &&
                compareTimestamp(message.optString("created_at", ""), lastSeenAt) <= 0 &&
                compareTimestamp(message.optString("edited_at", ""), lastSeenAt) <= 0;
    }

    private static String reactionEmojiForUser(JSONObject reactionAttachment, String userKey) {
        JSONObject reactions = reactionAttachment.optJSONObject("reactions");

        if (reactions == null || userKey == null || userKey.isEmpty()) {
            return "";
        }

        return reactions.optString(userKey, "").trim();
    }

    private static String displayNameForUser(String userKey) {
        if ("svetlana".equals(userKey)) {
            return "Svetlana";
        }
        if ("diab".equals(userKey)) {
            return "Diab";
        }
        return userKey == null || userKey.isEmpty() ? "Someone" : userKey;
    }

    private static String reactionMessagePreview(JSONObject message) {
        String preview = truncateForQuote(
                plainText(message.optString("text", "")).replace("\"", "'"),
                88
        );
        return preview.isEmpty() ? "a photo or file" : preview;
    }

    private static String truncateForQuote(String value, int maxLength) {
        String safeValue = value == null ? "" : value.trim();

        if (safeValue.length() <= maxLength) {
            return safeValue;
        }

        int endIndex = Math.max(1, maxLength - 3);
        return safeValue.substring(0, endIndex).trim() + "...";
    }

    private static int buildNotificationId(int prefixValue, String seedText) {
        int hash = prefixValue;
        String seed = seedText == null ? "" : seedText;
        for (int index = 0; index < seed.length(); index++) {
            hash = (hash * 31 + seed.charAt(index)) % 100000;
        }
        return Math.max(1, prefixValue + Math.abs(hash));
    }

    private static String latestTimestamp(String left, String right) {
        if (compareTimestamp(left, right) >= 0) {
            return left == null ? "" : left;
        }
        return right == null ? "" : right;
    }

    private static int compareTimestamp(String left, String right) {
        String safeLeft = left == null ? "" : left;
        String safeRight = right == null ? "" : right;

        if (safeLeft.isEmpty() && safeRight.isEmpty()) {
            return 0;
        }
        if (safeLeft.isEmpty()) {
            return -1;
        }
        if (safeRight.isEmpty()) {
            return 1;
        }
        return safeLeft.compareTo(safeRight);
    }

    private static String urlEncode(String value) throws Exception {
        return URLEncoder.encode(value, StandardCharsets.UTF_8.name());
    }

    private static String jsonEscape(String value) {
        return (value == null ? "" : value)
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }

    private static String isoNow() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        return format.format(new Date());
    }

    private static boolean isRecentIsoTimestamp(String value, long maxAgeMs) {
        long timestamp = parseIsoMillis(value);
        return timestamp > 0 && System.currentTimeMillis() - timestamp < maxAgeMs;
    }

    private static long parseIsoMillis(String value) {
        if (value == null || value.isEmpty()) {
            return 0;
        }

        String[] patterns = {
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                "yyyy-MM-dd'T'HH:mm:ss'Z'"
        };

        for (String pattern : patterns) {
            try {
                SimpleDateFormat format = new SimpleDateFormat(pattern, Locale.US);
                format.setTimeZone(TimeZone.getTimeZone("UTC"));
                Date date = format.parse(value);

                if (date != null) {
                    return date.getTime();
                }
            } catch (Exception error) {
                // Try the next timestamp shape.
            }
        }

        return 0;
    }

    private static int clamp(int value, int min, int max, int fallback) {
        int safeValue = value <= 0 ? fallback : value;
        return Math.min(max, Math.max(min, safeValue));
    }

    private static Calendar today() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }

    private static Calendar parseLocalDate(String value) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
            format.setTimeZone(TimeZone.getDefault());
            Date date = format.parse(value);
            if (date == null) {
                return null;
            }
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            return calendar;
        } catch (Exception error) {
            return null;
        }
    }

    private static String formatLocalDate(Calendar calendar) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        format.setTimeZone(TimeZone.getDefault());
        return format.format(calendar.getTime());
    }

    private static void addDays(Calendar calendar, int days) {
        calendar.add(Calendar.DATE, days);
    }

    private static int daysBetween(Calendar left, Calendar right) {
        long difference = right.getTimeInMillis() - left.getTimeInMillis();
        return (int) Math.round(difference / (24d * 60d * 60d * 1000d));
    }

    private static class HttpResponse {
        final int code;
        final String body;

        HttpResponse(int code, String body) {
            this.code = code;
            this.body = body;
        }
    }

    private static class UpdateCandidate {
        final String versionName;
        final int versionCode;
        final String fileName;
        final String downloadUrl;

        UpdateCandidate(
                String versionName,
                int versionCode,
                String fileName,
                String downloadUrl
        ) {
            this.versionName = versionName;
            this.versionCode = versionCode;
            this.fileName = fileName;
            this.downloadUrl = downloadUrl;
        }
    }

    private static class SessionTokens {
        final String accessToken;
        final String refreshToken;

        SessionTokens(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}
