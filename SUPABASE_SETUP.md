# Supabase Setup

1. Create a Supabase project.
2. In `Authentication > Providers > Email`, keep email/password enabled.
3. Create two users in `Authentication > Users`:
   - one for Svetlana
   - one for Diab
4. Open the SQL editor and run:
   - [SUPABASE_SETUP.sql](C:/Users/yasse/OneDrive/CODING/Codex/Sveta/SUPABASE_SETUP.sql)
5. Open `Project Settings > API` and copy:
   - project URL
   - anon public key
6. Fill:
   - [supabase-config.js](C:/Users/yasse/OneDrive/CODING/Codex/Sveta/supabase-config.js)
   - use [supabase-config.example.js](C:/Users/yasse/OneDrive/CODING/Codex/Sveta/supabase-config.example.js) as the model
7. Put the real emails for:
   - `svetlana`
   - `diab`
8. Keep the password in your app as `Wolf&Luna`, and create the same password for both Supabase users if you want the current login screen to keep working unchanged.
9. Redeploy the updated files to GitHub.

## Notes

- The GitHub-hosted app is now designed to use Supabase directly from the browser.
- `memories`, `events`, and `live messages` are shared through Supabase when the config is filled in.
- Message attachments and memory images are currently stored as text data in the database so the app works without an extra storage bucket setup.
- Realtime is enabled for `app_live_messages`, so chat updates should appear live for both users.
