# Supabase setup for V2.068

V2.068 moves the app to the new Supabase project and changes Android notifications to a tiny event table so the phone does not poll the full chat history.

## New project

Project URL:

```text
https://uwxjtarrgkznkollwqko.supabase.co
```

The app is already configured with the new public anon key in `supabase-config.js`.

## 1. Create the database tables

Open the new Supabase project, go to SQL Editor, and run these files in this order:

```text
SUPABASE_SETUP.sql
SUPABASE_SHARED_MUSIC_SETUP.sql
```

`SUPABASE_SETUP.sql` creates the main app tables, the `app-media` storage bucket, realtime settings, and the new `app_notification_events` table used by Android background notifications.

`SUPABASE_SHARED_MUSIC_SETUP.sql` creates the `shared_music_files` table and the `shared-music` storage bucket.

## 2. Auth users

Keep these users in Supabase Auth:

```text
svetlanamorlang91@online.de
yasserdiabhassan@gmail.com
```

Their Supabase passwords must match the password used in the app, or native background notifications cannot refresh their session after the web token expires.

After running SQL, open the app once as Diab and once as Svetlana. This creates each `app_profiles` row, which the row-level security policies need.

## 3. Migrate old data

Run the migration from this project folder after the SQL files are installed:

```powershell
$env:SUPABASE_MIGRATION_EMAIL="yasserdiabhassan@gmail.com"
$env:SUPABASE_MIGRATION_PASSWORD="Wolf&Luna"
node scripts/migrate-supabase-v2068.mjs
```

Use Diab for the migration unless you intentionally want to migrate as Svetlana:

```powershell
$env:SUPABASE_MIGRATION_USER_KEY="diab"
```

If the old shared music lived in the separate shared-music Supabase project, set these before running the migration:

```powershell
$env:OLD_SHARED_MUSIC_SUPABASE_URL="https://YOUR-OLD-MUSIC-PROJECT.supabase.co"
$env:OLD_SHARED_MUSIC_SUPABASE_ANON_KEY="YOUR-OLD-MUSIC-ANON-KEY"
```

The migration copies:

- memories
- events
- cycle data
- live messages
- app media metadata
- shared music metadata
- photos, voice files, shared files, and music files when their old public URLs are reachable

It intentionally does not copy `app_notification_events`. That table must start clean so old message notifications cannot replay after login.

If you only want metadata and do not want to copy media files yet:

```powershell
$env:MIGRATE_MEDIA="0"
node scripts/migrate-supabase-v2068.mjs
```

## Why the old egress became huge

The text messages were not the real size problem. Old versions could store photo/audio fallbacks as `data_url` inside message or memory rows, then the app and native worker repeatedly loaded rows containing that large JSON. A single base64 photo or voice row can be many megabytes, and repeated realtime/poll/history loads multiply that into gigabytes.

V2.068 changes this:

- Android notification checks read only `app_notification_events`, not full messages with attachments.
- The notification query filters to only the current user.
- New uploads must go to Storage; the app no longer writes base64 media into Supabase message rows.
- Message loading uses the local cache plus a recent remote sync window instead of redownloading the full chat history every time.
- The migration strips old media `data_url` fields when it successfully moves the file to new Storage.

## Phone notification checklist

On each phone, install V2.068, sign in once, and allow notifications. Keep battery usage unrestricted for Our Universe if the phone has aggressive battery saving. The app now starts a foreground low-data background sync service so closed-app notifications do not depend on the WebView staying open.
