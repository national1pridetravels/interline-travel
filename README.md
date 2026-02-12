# Interline Travel Website

Public website + admin portal with production-ready backend using Supabase (DB + Auth + RLS).

## Project Pages
- `/index.html` public website
- `/admin.html` admin portal

## Production Setup (Supabase)
1. Create a Supabase project.
2. Open SQL Editor and run `/supabase/schema.sql`.
3. Copy `/config.example.js` to `/config.js` and set:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. In Supabase Auth settings:
   - Enable Email/Password auth provider.
   - Configure your site URL and redirect URLs (your Vercel domain).

## First Admin Bootstrap
1. Open `/admin.html`.
2. Sign up (or sign in) with your email/password.
3. If `admin_users` is empty, the first logged-in user is auto-bootstrapped as admin.
4. After that, only admins can modify data.

## Deploy on Vercel
1. Push this repo to GitHub.
2. Import repo in Vercel.
3. Framework preset: `Other`.
4. No build command needed (static deployment).
5. Deploy.

## Notes
- Public content is read from Supabase.
- Admin writes are protected by Row Level Security policies (`public.is_admin()`).
- If `config.js` is empty, app falls back to local browser storage for development only.
