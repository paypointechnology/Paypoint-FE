# Paypoint — Backend Setup (Phase 0 + 1)

This connects the scaffolded Supabase foundation and auth to a real Supabase
project. The code ships with **placeholder** env values so `npm run build`
compiles; follow the steps below to make auth actually work.

Estimated time: ~15 minutes.

---

## 1. Create a Supabase project

1. Go to <https://supabase.com/dashboard> and create a new project.
2. **Region:** pick the region closest to your users. Paypoint serves Nigerian
   sellers and handles personal data, so under the **NDPA (Nigeria Data
   Protection Act)** you should prefer the lowest-latency region with an
   appropriate data-processing posture — **EU (West / Ireland)** is the common
   choice today (Supabase has no Africa region yet). Document the region you
   pick; data residency is a compliance decision, not just a latency one.
3. Set a strong database password and save it in your password manager.

## 2. Copy your keys into `.env.local`

In the dashboard: **Project Settings → API**. Copy these into `.env.local`
(replacing the placeholders):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co   # "Project URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>           # "anon" / "public"
SUPABASE_SERVICE_ROLE_KEY=<service_role secret key>       # "service_role" — SECRET
```

- `.env.local` is gitignored — never commit real keys.
- The `service_role` key bypasses RLS. Keep it server-side only (it is only ever
  imported by `lib/supabase/admin.ts`, which is marked `server-only`).

## 3. Run the database migration

The full schema, RLS policies, triggers, and storage buckets live in
`supabase/migrations/0001_init.sql`. Apply it one of two ways:

**Option A — SQL editor (fastest):**
Dashboard → **SQL Editor** → New query → paste the entire contents of
`supabase/migrations/0001_init.sql` → **Run**.

**Option B — Supabase CLI:**
```bash
npm i -g supabase          # or: brew install supabase/tap/supabase
supabase login
supabase link --project-ref <your-ref>
supabase db push
```

After it runs, verify under **Table Editor** that `profiles`, `pages`,
`payments`, `events` exist, and under **Storage** that the `page-images` and
`logos` buckets exist.

## 4. Enable Google sign-in

1. Create a Google OAuth client (Google Cloud Console → **APIs & Services →
   Credentials → Create OAuth client ID → Web application**).
2. Under **Authorized redirect URIs**, add the Supabase callback shown in the
   next step (Supabase gives you the exact URL).
3. In Supabase: **Authentication → Providers → Google** → enable it → paste the
   **Client ID** and **Client Secret** → save.
4. In Supabase: **Authentication → URL Configuration**:
   - **Site URL:** `http://localhost:3000` (use your production URL in prod).
   - **Redirect URLs:** add `http://localhost:3000/auth/callback`
     (and your production `https://<domain>/auth/callback`).

The app's own callback route is `app/auth/callback/route.ts`, which runs
`exchangeCodeForSession` and forwards to `/dashboard`.

## 5. Enable "Confirm email"

Signup is now frictionless (email + password only) and we require the seller to
confirm their email before they get a session:

- **Authentication → Providers → Email** → turn **ON** "Confirm email".

With this on, `signUp` does **not** return a session. Instead:

1. The user submits `/signup` → we send them to `/verify?email=...`, a
   "check your inbox" screen (with a **Resend email** action).
2. They click the confirmation link in their inbox → it lands on
   `app/auth/callback/route.ts`, which runs `exchangeCodeForSession` and
   forwards them to **`/dashboard`**.
3. On the dashboard, the **"Finish setting up"** checklist walks them through
   brand, WhatsApp, business verification (KYB) and bank — each persisted to the
   `profiles` row. Creating a payment page (`/dashboard/create`) stays gated
   until all four are done.

So the confirmed-email flow is: **signup → email link → `/auth/callback` →
`/dashboard`** (then the setup checklist). WhatsApp/KYB/bank verification are
simulated in the UI today and swap in real providers (WhatsApp Cloud API, Dojah,
Paystack Subaccounts) in later phases.

## 6. Set the site URL

Already in `.env.local` from step 2:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
Set this to your deployed origin in production (used to build OAuth/email
redirect URLs; falls back to `window.location.origin` on the client).

---

## Verify

```bash
rm -rf .next && npm run build   # compiles with placeholders or real keys
npm run dev                     # http://localhost:3000
```

Then, with real keys in place:
1. Visit `/signup`, create an account → you should land on `/verify` and a row
   should appear in `profiles` (created by the `handle_new_user` trigger).
2. Sign out from **Dashboard → Settings** → you should land on `/login`.
3. Log back in at `/login` → `/dashboard`.
4. Try visiting `/dashboard` while logged out → redirected to `/login`.

---

## What's wired vs. what's next

- **Wired now (Phase 0/1):** Supabase clients (browser / server / admin /
  middleware), session-refreshing middleware with route protection, OAuth +
  email callback route, full DB schema with RLS, storage buckets, email/password
  signup + login, Google OAuth, and sign-out.
- **Next (Phase 2+):** WhatsApp + email OTP on `/verify` (Meta WhatsApp Cloud
  API + Resend), onboarding persistence, Dojah KYB, and Paystack Subaccounts /
  split payments. Placeholder env vars for these already exist in `.env.example`.
