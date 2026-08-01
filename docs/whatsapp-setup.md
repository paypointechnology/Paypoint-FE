# WhatsApp OTP Verification — Meta Cloud API Setup

Goal: get the credentials Paypoint needs to send real one-time codes over WhatsApp
during the seller onboarding step (`/dashboard/setup/whatsapp`).

By the end you will have four values for `.env.local` plus one approved template:

| Value | Env var | Where it comes from |
|---|---|---|
| Phone number ID | `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp > API Setup |
| Permanent access token | `WHATSAPP_ACCESS_TOKEN` | System User token |
| WhatsApp Business Account ID | `WHATSAPP_BUSINESS_ACCOUNT_ID` | WhatsApp > API Setup |
| Webhook verify token | `WHATSAPP_VERIFY_TOKEN` | You invent it (any random string) |
| Auth template name + language | (used in code) | WhatsApp Manager > Message templates |

> Meta changes this console often, so menu names may differ slightly. The stable
> landmarks are: **My Apps**, **Add Product**, **API Setup**, **WhatsApp Manager**,
> **Message templates**, **System Users**, **Business Verification**.

---

## 1. Accounts (once)
1. A personal Facebook account (used only to administer the app).
2. A **Meta Business Portfolio** at business.facebook.com. Create one if you don't
   have it (business name, your email).
3. A **Meta for Developers** account at developers.facebook.com (register with the
   same Facebook login).

## 2. Create the app + add WhatsApp
4. developers.facebook.com > **My Apps** > **Create App** > type **Business** >
   name it `Paypoint` > link it to your Business Portfolio.
5. On the app dashboard, find **WhatsApp** and click **Set up** (adds the product).
6. This creates (or links) a **WhatsApp Business Account (WABA)** and gives you a
   free Meta-provided **test number** for development.

## 3. Grab the dev values (test now, no verification needed)
7. App > **WhatsApp > API Setup**. Here you can see and copy:
   - **Phone number ID** of the test number  →  `WHATSAPP_PHONE_NUMBER_ID`
   - **WhatsApp Business Account ID**  →  `WHATSAPP_BUSINESS_ACCOUNT_ID`
   - A **temporary access token** (valid ~24h) — fine for first tests, not for prod.
8. Under **To**, add your own WhatsApp number as a **recipient** (you can add up to
   5 test recipients without business verification). Send the sample `hello_world`
   template to confirm the pipe works and the code lands on your phone.

## 4. Create the OTP template (required — OTPs can't be free-form)
9. Open **WhatsApp Manager** (business.facebook.com/wa/manage) > **Account tools >
   Message templates** > **Create template**.
10. Category: **Authentication**. Use Meta's built-in authentication format (it
    renders the code with a **Copy code** button). Language: **English**.
11. Submit for approval. Authentication templates are usually approved fast
    (minutes to a few hours). Note the **template name** and **language code**
    (e.g. `en_US`) — the code will reference these.

## 5. Permanent access token (for production)
The 24h token expires. Create a non-expiring one:
12. business.facebook.com > **Business Settings > Users > System Users** > **Add** >
    make a system user (e.g. `paypoint-server`, role Admin).
13. **Assign assets**: give it your app and your WABA with full control.
14. **Generate new token** > select the app > permissions
    `whatsapp_business_messaging` and `whatsapp_business_management` > set no
    expiry > copy it once  →  `WHATSAPP_ACCESS_TOKEN` (you can't view it again).

## 6. Your own business number (for going live)
The test number is dev-only. For production:
15. **WhatsApp Manager > Phone numbers > Add phone number** > enter a number that is
    NOT already on a personal WhatsApp app > verify by SMS/voice.
16. Set a **display name** (this goes through a short approval).
17. Copy that number's **Phone number ID** — it replaces the test one in
    `WHATSAPP_PHONE_NUMBER_ID` when you go live.

## 7. Business verification (for scale)
18. **Business Settings > Security Center > Start Verification.** Required to lift
    messaging limits beyond the starter tier and to run in production at volume.
    Meta reviews business documents; allow a few days.

## 8. Webhook (optional now, needed for delivery receipts + future inbound)
19. App > **WhatsApp > Configuration > Webhook**: set callback URL to
    `https://<your-domain>/api/webhooks/whatsapp`, set the **Verify token** to any
    random string you choose  →  `WHATSAPP_VERIFY_TOKEN`. Subscribe to the
    `messages` field.
    - Send-only OTP does NOT strictly need this; it's how we later read delivery
      status and inbound replies. We can wire the endpoint when we build the code.

---

## What to hand back to me
Once you have them, paste into `.env.local` (or send me the non-secret ones and add
the token yourself — it's gitignored):

```
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_BUSINESS_ACCOUNT_ID=...
WHATSAPP_ACCESS_TOKEN=...            # secret, keep server-side
WHATSAPP_VERIFY_TOKEN=...            # a random string you pick
```

Plus tell me the **template name** and **language code** you got approved.

## Good to know
- OTP delivery MUST use the approved **Authentication template**; free-form messages
  to a user who hasn't messaged you in the last 24h are blocked.
- WhatsApp **authentication conversations are billed per message** in Nigeria.
- The recipient must have WhatsApp installed on the number.
- For development you can go end-to-end with the **test number + your own number as a
  test recipient + your approved auth template** — no business verification needed yet.
