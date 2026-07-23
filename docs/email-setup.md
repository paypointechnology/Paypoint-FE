# Email setup (Brevo)

Paypoint uses **Brevo** for all outbound email. There are two independent paths:

| Path | What it sends | How it's wired |
|------|---------------|----------------|
| **App transactional (Brevo API)** | Waitlist welcome (and future receipts/notifications) | Code: `lib/email/brevo.ts` + `lib/email/templates.ts`. Needs `BREVO_API_KEY`, `EMAIL_FROM`, `EMAIL_FROM_NAME`. |
| **Supabase Auth (Brevo SMTP)** | Signup confirmation, password reset, magic links | Supabase dashboard → custom SMTP pointing at Brevo. No code. |

Do **both** so every email leaves through Brevo with your branding and deliverability.

---

## 1. Create Brevo + verify your sender

1. Sign up at [brevo.com](https://www.brevo.com) (free tier is fine to start).
2. **Verify a sender identity** (required, or mail is rejected):
   - Quick start: **Senders, Domains & IPs → Senders → Add a sender** (e.g. `hello@paypoint.co`) and click the verification link Brevo emails you.
   - Recommended for production: **Domains → Authenticate your domain** and add the **SPF, DKIM, and DMARC** DNS records Brevo shows. This is what keeps you out of spam.
3. Use the verified address as `EMAIL_FROM`.

## 2. App transactional emails (Brevo API)

1. Brevo → **SMTP & API → API Keys → Generate a new API key** (value starts with `xkeysib-`).
2. Put it in `.env.local`:
   ```
   BREVO_API_KEY=xkeysib-...
   EMAIL_FROM=hello@paypoint.co        # a VERIFIED Brevo sender
   EMAIL_FROM_NAME=Paypoint
   ```
3. That's it. The waitlist welcome email now sends on new signups. If `BREVO_API_KEY`
   is empty, `sendEmail()` no-ops safely (it logs and returns `{ ok:false }`) so signups
   never break.

**Test:** with the key set and dev running, join the waitlist at
`/early-access` with a real inbox you control. You should receive
"You're in. Welcome to Paypoint early access" within a few seconds.

## 3. Supabase Auth emails (Brevo SMTP)

Route Supabase's confirmation / reset emails through Brevo instead of its default sender.

1. Brevo → **SMTP & API → SMTP** tab. Note your **SMTP login** (a long login shown
   there) and **generate an SMTP key** (password).
2. Supabase dashboard → **Project Settings → Authentication → SMTP Settings** →
   **Enable Custom SMTP**, then:

   | Field | Value |
   |-------|-------|
   | Host | `smtp-relay.brevo.com` |
   | Port | `587` |
   | Username | your Brevo **SMTP login** |
   | Password | your Brevo **SMTP key** |
   | Sender email | `hello@paypoint.co` (a verified Brevo sender) |
   | Sender name | `Paypoint` |

3. Save. Supabase throttles default email hard; custom SMTP lifts that.

## 4. Branded auth templates

Supabase dashboard → **Authentication → Email Templates**. For each of
**Confirm signup** and **Reset password**, paste the matching file from
[`docs/email-templates/`](email-templates/):

- Confirm signup → `docs/email-templates/confirm-signup.html`
- Reset password → `docs/email-templates/reset-password.html`

Keep Supabase's `{{ .ConfirmationURL }}` variable intact (it's already in the files).

## 5. Deliverability checklist

- [ ] Sender verified (or domain authenticated with SPF + DKIM).
- [ ] `EMAIL_FROM` matches a verified Brevo sender.
- [ ] Custom SMTP enabled in Supabase and a test signup email received.
- [ ] `BREVO_API_KEY` set and a test waitlist welcome received.
- [ ] In production, set `EMAIL_FROM` to your real domain address and add DMARC.
