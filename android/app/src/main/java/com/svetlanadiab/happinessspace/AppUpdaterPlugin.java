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
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@CapacitorPlugin(name = "AppUpdater")
public class AppUpdaterPlugin extends Plugin {
    private static final String PREFS_NAME = "sveta_app_updater";
    private static final String CHANNEL_UPDATES = "updates";
    private static final String DOWNLOADED_VERSION = "downloaded_version";
    private static final String DOWNLOADED_FILE = "downloaded_file";

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        result.put("currentVersionName", getInstalledVersionName());
        result.put("currentVersionCode", getInstalledVersionCode());
        result.put("downloadedVersion", getDownloadedVersionIfReady());
        result.put("canInstallPackages", canRequestPackageInstalls());
        call.resolve(result);
    }

    @PluginMethod
    public void notifyUpdateAvailable(PluginCall call) {
        String versionName = call.getString("versionName", "");
        showUpdateNotification(
                buildNotificationId(680000, "available_" + versionName),
                "Update available",
                "New app version available open the app to download and install",
                true
        );
        call.resolve();
    }

    @PluginMethod
    public void downloadUpdate(PluginCall call) {
        String url = call.getString("url", "");
        String versionName = call.getString("versionName", "");
        String fileName = sanitizeFileName(call.getString("fileName", ""));

        if (url.isEmpty() || versionName.isEmpty() || fileName.isEmpty()) {
            call.reject("Missing update url, version, or file name.");
            return;
        }

        new Thread(() -> {
            try {
                File updatesDir = getUpdatesDir();
                if (!updatesDir.exists() && !updatesDir.mkdirs()) {
                    throw new IllegalStateException("Could not create updates folder.");
                }

                File finalFile = new File(updatesDir, fileName);
                File tempFile = new File(updatesDir, fileName + ".download");
                downloadFile(url, tempFile);

                if (finalFile.exists() && !finalFile.delete()) {
                    throw new IllegalStateException("Could not replace old update file.");
                }

                if (!tempFile.renameTo(finalFile)) {
                    throw new IllegalStateException("Could not finalize update download.");
                }

                getPrefs().edit()
                        .putString(DOWNLOADED_VERSION, versionName)
                        .putString(DOWNLOADED_FILE, finalFile.getAbsolutePath())
                        .apply();

                showUpdateNotification(
                        buildNotificationId(681000, "ready_" + versionName),
                        "Update ready",
                        "The new version " + versionName + " is downloaded and ready for installation",
                        true
                );

                JSObject result = new JSObject();
                result.put("versionName", versionName);
                result.put("fileName", fileName);
                result.put("filePath", finalFile.getAbsolutePath());
                call.resolve(result);
            } catch (Exception error) {
                call.reject(error.getMessage(), error);
            }
        }).start();
    }

    @PluginMethod
    public void installDownloadedUpdate(PluginCall call) {
        File updateFile = getDownloadedFile(call.getString("versionName", ""));

        if (updateFile == null || !updateFile.exists()) {
            call.reject("Downloaded update was not found.");
            return;
        }

        if (!canRequestPackageInstalls()) {
            openInstallPermissionSettings();
            JSObject result = new JSObject();
            result.put("started", false);
            result.put("needsPermission", true);
            call.resolve(result);
            return;
        }

        try {
            Uri apkUri = FileProvider.getUriForFile(
                    getContext(),
                    getContext().getPackageName() + ".fileprovider",
                    updateFile
            );
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);

            JSObject result = new JSObject();
            result.put("started", true);
            call.resolve(result);
        } catch (Exception error) {
            call.reject(error.getMessage(), error);
        }
    }

    private SharedPreferences getPrefs() {
        return getContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    private File getUpdatesDir() {
        return new File(getContext().getFilesDir(), "updates");
    }

    private String getInstalledVersionName() {
        try {
            String versionName = getContext()
                    .getPackageManager()
                    .getPackageInfo(getContext().getPackageName(), 0)
                    .versionName;
            return versionName == null ? "" : versionName;
        } catch (Exception error) {
            return "";
        }
    }

    private long getInstalledVersionCode() {
        try {
            android.content.pm.PackageInfo packageInfo = getContext()
                    .getPackageManager()
                    .getPackageInfo(getContext().getPackageName(), 0);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                return packageInfo.getLongVersionCode();
            }

            return packageInfo.versionCode;
        } catch (Exception error) {
            return 0;
        }
    }

    private String getDownloadedVersionIfReady() {
        File file = getDownloadedFile("");
        return file == null || !file.exists()
                ? ""
                : getPrefs().getString(DOWNLOADED_VERSION, "");
    }

    private File getDownloadedFile(String requestedVersion) {
        SharedPreferences prefs = getPrefs();
        String downloadedVersion = prefs.getString(DOWNLOADED_VERSION, "");

        if (!requestedVersion.isEmpty() && !requestedVersion.equals(downloadedVersion)) {
            return null;
        }

        String filePath = prefs.getString(DOWNLOADED_FILE, "");
        return filePath.isEmpty() ? null : new File(filePath);
    }

    private boolean canRequestPackageInstalls() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return true;
        }

        return getContext().getPackageManager().canRequestPackageInstalls();
    }

    private void openInstallPermissionSettings() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        Intent intent = new Intent(
                Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                Uri.parse("package:" + getContext().getPackageName())
        );
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getContext().startActivity(intent);
    }

    private void downloadFile(String sourceUrl, File destination) throws Exception {
        HttpURLConnection connection = (HttpURLConnection) new URL(sourceUrl).openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "Our-Universe-Android-Updater");
        connection.setConnectTimeout(15000);
        connection.setReadTimeout(45000);

        int responseCode = connection.getResponseCode();
        if (responseCode < 200 || responseCode >= 300) {
            throw new IllegalStateException("Update download failed with " + responseCode);
        }

        try (
                InputStream input = connection.getInputStream();
                FileOutputStream output = new FileOutputStream(destination)
        ) {
            byte[] buffer = new byte[1024 * 64];
            int read;

            while ((read = input.read(buffer)) != -1) {
                output.write(buffer, 0, read);
            }
        } finally {
            connection.disconnect();
        }
    }

    private void showUpdateNotification(
            int notificationId,
            String title,
            String body,
            boolean openUpdate
    ) {
        Context context = getContext().getApplicationContext();

        if (
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                        ContextCompat.checkSelfPermission(
                                context,
                                Manifest.permission.POST_NOTIFICATIONS
                        ) != PackageManager.PERMISSION_GRANTED
        ) {
            return;
        }

        createUpdateChannel(context);
        Intent launchIntent = context
                .getPackageManager()
                .getLaunchIntentForPackage(context.getPackageName());

        if (launchIntent == null) {
            launchIntent = new Intent(context, MainActivity.class);
        }

        if (openUpdate) {
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
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_UPDATES)
                .setSmallIcon(R.drawable.ic_stat_notification)
                .setContentTitle(title)
                .setContentText(body)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .setCategory(NotificationCompat.CATEGORY_STATUS)
                .setDefaults(Notification.DEFAULT_ALL)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setWhen(System.currentTimeMillis());

        NotificationManagerCompat.from(context).notify(notificationId, builder.build());
    }

    private void createUpdateChannel(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        NotificationManager manager = context.getSystemService(NotificationManager.class);

        if (manager == null || manager.getNotificationChannel(CHANNEL_UPDATES) != null) {
            return;
        }

        NotificationChannel channel = new NotificationChannel(
                CHANNEL_UPDATES,
                "App updates",
                NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("Our Universe app update notifications");
        channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        channel.enableLights(true);
        channel.setLightColor(0xFFC9A45D);
        channel.enableVibration(true);
        manager.createNotificationChannel(channel);
    }

    private static int buildNotificationId(int prefixValue, String seedText) {
        int hash = prefixValue;
        String seed = seedText == null ? "" : seedText;

        for (int index = 0; index < seed.length(); index++) {
            hash = (hash * 31 + seed.charAt(index)) % 100000;
        }

        return Math.max(1, prefixValue + Math.abs(hash));
    }

    private static String sanitizeFileName(String fileName) {
        String safeName = fileName == null ? "" : fileName.replaceAll("[^A-Za-z0-9._-]+", "-");
        return safeName.endsWith(".apk") ? safeName : "";
    }
}
