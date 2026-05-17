# Android Mobile Build

This project is wrapped with Capacitor for Android.

## Commands

- `npm run mobile:prepare` copies the web app into `dist/mobile`, bundles the Supabase browser client locally, and writes a static sound manifest for the packaged app.
- `npm run mobile:sync` refreshes the Android project with the prepared web assets.
- `npm run android:apk` builds a debug APK at `android/app/build/outputs/apk/debug/app-debug.apk`.
- `npm run android:aab` builds a release Android App Bundle at `android/app/build/outputs/bundle/release/app-release.aab`.

The build scripts use `JAVA_HOME`/`ANDROID_HOME` when they are already set. Otherwise they fall back to the local ignored toolchain under `.mobile-sdk`.

## Google Play Notes

Before uploading to Google Play, create a private release keystore, configure release signing, increment `versionCode`/`versionName` in `android/app/build.gradle`, and upload the signed `.aab`.

The Android package id is `com.svetlanadiab.happinessspace`. Treat that id as permanent once the app is published.
