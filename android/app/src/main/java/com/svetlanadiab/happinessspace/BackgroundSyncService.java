package com.svetlanadiab.happinessspace;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class BackgroundSyncService extends Service {
    public static final String CHANNEL_ID = "background-sync";
    private static final int NOTIFICATION_ID = 700001;
    private static final long POLL_INTERVAL_MS = TimeUnit.SECONDS.toMillis(3);
    private ExecutorService executor;
    private volatile boolean running = false;

    public static void start(Context context) {
        Context appContext = context.getApplicationContext();
        SharedPreferences prefs =
                appContext.getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            return;
        }

        Intent intent = new Intent(appContext, BackgroundSyncService.class);
        ContextCompat.startForegroundService(appContext, intent);
    }

    public static void stop(Context context) {
        context.getApplicationContext().stopService(
                new Intent(context.getApplicationContext(), BackgroundSyncService.class)
        );
    }

    @Override
    public void onCreate() {
        super.onCreate();
        BackgroundMessageWorker.createNotificationChannel(this, CHANNEL_ID);
        startForeground(NOTIFICATION_ID, buildServiceNotification());
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        SharedPreferences prefs =
                getSharedPreferences(BackgroundSyncPlugin.PREFS_NAME, Context.MODE_PRIVATE);

        if (!prefs.getBoolean("enabled", false)) {
            stopSelf();
            return START_NOT_STICKY;
        }

        startLoop();
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        running = false;
        if (executor != null) {
            executor.shutdownNow();
            executor = null;
        }
        super.onDestroy();
    }

    private void startLoop() {
        if (running) {
            return;
        }

        running = true;
        executor = Executors.newSingleThreadExecutor();
        executor.execute(() -> {
            while (running) {
                BackgroundMessageWorker.syncOnce(getApplicationContext());
                try {
                    Thread.sleep(POLL_INTERVAL_MS);
                } catch (InterruptedException error) {
                    Thread.currentThread().interrupt();
                    running = false;
                }
            }
        });
    }

    private Notification buildServiceNotification() {
        Intent launchIntent = getPackageManager().getLaunchIntentForPackage(getPackageName());

        if (launchIntent == null) {
            launchIntent = new Intent(this, MainActivity.class);
        }

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this,
                NOTIFICATION_ID,
                launchIntent,
                flags
        );

        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_stat_notification)
                .setContentTitle("Our Universe is listening")
                .setContentText("Background sync is keeping private notifications active.")
                .setContentIntent(pendingIntent)
                .setOngoing(true)
                .setSilent(true)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build();
    }
}
