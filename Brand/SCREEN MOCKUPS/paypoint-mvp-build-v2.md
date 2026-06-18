# Paypoint MVP — Full Build (Stripe-clean, on-brand) · 24-hour launch

Everything below is brand-locked to your real identity and ordered to get you live fast. Paste the prompts into Lovable in order. You handle the Paystack keys; the build handles everything around them.

---

## 0 · Brand + design system (the source of truth)

**Primary — Paypoint Indigo:** `#5F58F4` (sampled from your logo). This is the only strong color in the whole product. Used for: primary buttons, active nav, links, focus rings, the logo mark.

```
Brand
  --brand            #5F58F4   primary actions, links, active states
  --brand-hover      #4A43D6   hover/pressed
  --brand-tint       #EEEDFE   badges, active-nav background, soft fills
  --brand-tint-soft  #F5F4FF   faint section backgrounds

Ink & neutrals (cool, indigo-leaning to sit under the brand)
  --ink              #14132B   headings, key numbers, near-black
  --text             #33323F   body text
  --text-muted       #6C6B7B   secondary text, labels
  --text-subtle      #9A99A8   hints, placeholders
  --bg               #FFFFFF   app + checkout background
  --bg-soft          #FAFAFE   page background, sidebar, metric cards
  --surface          #FFFFFF   cards
  --border           #ECEBF3   default borders / dividers
  --border-strong    #E3E2EE   input borders

Status
  --success          #12B76A   paid        tint #E7F8EF  text #0B7A4B
  --warning          #F79009   pending     tint #FEF0DC  text #9A5A00
  --danger           #F04438   failed      tint #FEECEB  text #B42318
  --star             #F5A623   trust stars
```

**Type:** UI font `Inter` (Google Fonts), weights 400 / 500 / 600 / 700. Headings 600–700, `letter-spacing: -0.01em`. Body 400. Numbers and prices 700. The wordmark itself is your supplied PNG — don't try to recreate "Paypoint." in CSS.

**Shape & depth:** radius 8px (inputs, small), 12px (buttons, cards), 16px (large cards, modals), 999px (status pills). Shadows almost invisible: `0 1px 2px rgba(20,19,43,.06)` for cards, a slightly larger soft shadow only on the checkout card and modals. Borders do most of the separation work — keep them at 1px and light.

**The Stripe-clean rules** (state these to Lovable verbatim so it doesn't drift):
- White everywhere. One accent color (the indigo). No second bright color except the green/amber/red status pills.
- Lots of whitespace. Generous padding. Let things breathe.
- Crisp 1px light borders instead of heavy shadows.
- Big, confident numbers for money. Quiet, muted labels.
- Buttons: solid indigo, white text, 12px radius, 44–48px tall, clear hover.
- No emojis, no clip-art, no gradients in the app. (One subtle indigo gradient is allowed on the marketing hero only.)
- Mobile-first — everything must look right at 375px wide.

**Logo assets you uploaded:**
- `Electric_Blue.png` — the indigo `P.` mark in a circle → app favicon, sidebar, checkout header.
- `Electric_Blue__1_.png` — the indigo `Paypoint.` wordmark → marketing header, light backgrounds.
- `Wordmark.png` / black icon → for use on indigo or photographic backgrounds.
Upload these into Lovable's assets and reference them; don't redraw them.

---

## PROMPT 0 — Foundation + design system (paste first)

```
Build the foundation for a web app called Paypoint — a tool for sellers and service providers (starting in Nigeria) to turn any product or service into a clean, hosted payment page they share by link. Buyers pay on that page through Paystack. Paypoint never holds funds; Paystack settles directly to the seller's bank.

Aesthetic: clean, modern, Stripe-like. Calm, trustworthy, lots of whitespace, one accent color. NOT busy, NOT colorful.

TECH: React + Tailwind, mobile-first. Supabase for auth, database, storage, edge functions. Email/password auth plus Google sign-in.

DESIGN SYSTEM — set these as theme tokens and use them everywhere:
- Brand indigo #5F58F4 (primary buttons, links, active nav, focus rings). Hover #4A43D6. Soft tint #EEEDFE.
- Ink #14132B (headings, prices). Body text #33323F. Muted #6C6B7B. Subtle/placeholder #9A99A8.
- Background #FFFFFF. Soft background (page bg, sidebar, metric cards) #FAFAFE. Borders #ECEBF3, input borders #E3E2EE.
- Status: paid green #12B76A on #E7F8EF; pending amber on #FEF0DC; failed red on #FEECEB. Status shown as small rounded pills.
- Font: Inter (400/500/600/700). Headings 600–700 with slight negative letter-spacing. Prices 700.
- Radius: 8px inputs, 12px buttons/cards, 16px large cards, 999px pills. Very subtle shadows; rely on 1px light borders.
- Buttons: solid indigo, white text, 44–48px tall, 12px radius, clear hover. Secondary buttons: white with 1px border.
No gradients in the app, no emojis, no second bright color.

I'll upload logo files: a circular indigo "P." mark and a "Paypoint." wordmark. Use the mark as favicon and in the sidebar; use the wordmark on the marketing header.

APP SHELL (authenticated): left sidebar (collapses to bottom tab bar on mobile) with the P. mark + "Paypoint" at top, then nav: Home, Pages, Payments, Settings. Active item uses the indigo tint background with indigo text.

For now build: the theme/token file, Inter loaded, the auth screens, the app shell with working navigation, and an empty Dashboard placeholder. We'll add pages next.
```

---

## PROMPT 1 — Database schema

```
Set up the Supabase database for Paypoint.

profiles: id (uuid → auth.users), business_name (text), logo_url (text null), phone (text null), paystack_connected (bool default false), created_at.

pages (each payment page = a "Paypoint"): id (uuid pk), user_id (→ profiles), slug (text unique, used in the public URL), title (text), type ('product'|'service'), price (integer, kobo), currency (text default 'NGN'), description (text null), image_url (text null), delivery_info (text null), collect_fields (jsonb: which of name/phone/email/address to require), is_active (bool default true), customers_served (integer default 0), created_at.

payments: id (uuid pk), page_id (→ pages), user_id (→ profiles), customer_name (text null), customer_phone (text null), customer_email (text null), amount (integer kobo), status ('pending'|'success'|'failed' default 'pending'), paystack_reference (text null), created_at.

RULES:
- Row Level Security: a seller can only read/write their own profile, pages, and payments.
- Public read: the checkout page must read a single ACTIVE page by slug WITHOUT auth, exposing only what checkout needs (title, price, description, image, delivery_info, collect_fields, currency, customers_served, and the owner's business_name + logo_url) — never the user_id or other private fields.
- Storage bucket "page-images" (public read) for product/service images.
- Auto-create a profile row on a user's first login.
```

---

## PROMPT 2 — Marketing landing page (public, `/`)

```
Build the public marketing landing page for Paypoint at "/". Clean and Stripe-like, mobile-first.

HEADER: the Paypoint wordmark (uploaded) on the left; on the right, "Log in" (text) and "Get started" (solid indigo button → /signup).

HERO: a confident headline "Turn any product or service into a professional payment page — and get paid in minutes." Subline: "No website. No code. Share a link, get paid. Paypoint creates the page, Paystack handles the money." Two buttons: "Get started free" (indigo) and "See how it works" (white, bordered). Behind/around the hero, allow ONE very subtle indigo gradient wash (this is the only place gradients are allowed). Beside the hero text, show a small framed preview of a checkout page (a card with a sample product, ₦ price, and a Pay button) so visitors see the output immediately.

"HOW IT WORKS" — three steps, icon + short text: 1) Create a page (add your product or service, price, photo). 2) Share the link (paste it anywhere — bio, chat, post). 3) Get paid (money settles to your bank through Paystack). 

TRUST STRIP: a quiet line — "Payments secured by Paystack. We never hold your money." with a small lock/shield icon.

FOOTER: wordmark, short tagline, basic links (Login, Get started), copyright.

Keep it to one screen of scrolling. No stock-photo clutter. Whitespace and the indigo accent carry it.
```

---

## PROMPT 3 — Routing, auth guards, and the chrome-free checkout shell

```
Set up Paypoint's routing and access rules so the seller app and the public buyer pages are cleanly separated.

ROUTES:
- "/"            public marketing landing
- "/login", "/signup"  auth screens (redirect to /dashboard if already logged in)
- "/dashboard"  seller home (PROTECTED)
- "/dashboard/pages", "/dashboard/payments", "/dashboard/settings", "/dashboard/create", "/dashboard/pages/:id/edit" (all PROTECTED)
- "/p/:slug"    PUBLIC buyer checkout — rendered with NO sidebar, NO app nav, NO dashboard chrome. Just the centered checkout card on a plain background.
- "/pay/callback"  PUBLIC payment result/receipt page (no chrome).

PROTECTION: any /dashboard route checks for a Supabase session; if none, redirect to /login. The marketing, /p/:slug, and /pay/callback routes never require auth.

Make sure the public checkout and callback routes do not import or render the authenticated app shell — a buyer must never see seller UI or any "log in" prompt.
```

---

## PROMPT 4 — Create flow + Pages list (seller)

```
Build the Create flow and the Pages screen for Paypoint, in the Stripe-clean style.

CREATE (/dashboard/create) — one clean, well-spaced form:
- Type toggle: Product / Service.
- Title (required).
- Price in Naira with a ₦ prefix (required) — store as kobo.
- Description (optional, textarea).
- Image upload (optional) → "page-images" bucket, with preview.
- Delivery info (optional) — e.g. "Nationwide · 3 days".
- "Details to collect from the buyer" — checkboxes: Name (default on), Phone, Email, Address.
- Save: generate a URL-safe slug from the title (random suffix if taken), insert the page, then show a success panel with the live link, a Copy button, and Share.

PAGES (/dashboard/pages) — a clean card grid of the seller's payment pages. Each card: image thumb, title, price, type, a paid-count line ("24 customers"), and an active/inactive switch. Card actions: Copy link, QR code (generate from the public URL), Share (Web Share API; fallback copies the link and offers WhatsApp + X), Edit. Friendly empty state with a "Create your first Paypoint" button.
```

---

## PROMPT 5 — Public buyer checkout page (`/p/:slug`)

```
Build the public buyer checkout page at /p/:slug — this is the most important screen in the product. Clean, trustworthy, mobile-first, no app chrome.

It loads one ACTIVE page by slug. If missing/inactive: a calm "This page isn't available right now" state.

CARD LAYOUT (centered, white card, soft shadow, max ~400px wide):
- Header row: the seller's logo (or the Paypoint P. mark) + business name on the left; a small "Secure" lock on the right.
- Product/service image (if any), full-width at the top of the card.
- Title (large, ink).
- Short description (muted).
- Price — large and bold (e.g. ₦35,000).
- A small meta row: delivery info with a truck icon, and "★ {customers_served} paid" if > 0.
- The buyer fields this page is set to collect (name / phone / email / address), as labeled inputs.
- A full-width indigo "Pay ₦{amount}" button with a lock icon.
- Footer line: "Payments secured by Paystack" with a shield icon.

On Pay: validate the collected fields, then call the initialize-payment edge function and redirect the buyer to the returned Paystack URL. Show a loading state on the button. Match the brand tokens exactly — indigo #5F58F4 button, ink #14132B price, muted #6C6B7B secondary text.
```

---

## PROMPT 6 — Paystack integration (two edge functions)

> You're getting the keys from Paystack now. The build sets up the two functions and a secret slot — drop your key in and test.

```
Add Paystack payments to Paypoint with two Supabase edge functions. Never hold funds — Paystack settles to the seller. Use a Supabase secret PAYSTACK_SECRET_KEY.

initialize-payment:
- Input: page slug + the buyer fields collected.
- Look up the active page (amount, owner). Create a 'pending' payment row.
- Call Paystack /transaction/initialize with amount (kobo), buyer email (or a placeholder if email isn't collected), and metadata holding the payment id + page id + buyer details. Set callback_url to the app's /pay/callback route.
- Save the returned reference on the payment row. Return authorization_url to the client.

verify-payment:
- Called from /pay/callback with the reference.
- Call Paystack /transaction/verify/:reference.
- On success: set the payment row to 'success' and increment the page's customers_served by 1. On failure: set 'failed'. Return the result.

/pay/callback page (public, no chrome):
- Read the reference, call verify-payment, then show:
  SUCCESS → a clean receipt card: business name + logo, item, amount paid, reference, date, buyer name; "Payment successful" header in green; buttons Download receipt (PDF) and Share.
  FAILED → calm "Payment didn't go through" with a Try again button.
```

---

## PROMPT 7 — Payments dashboard + receipts (seller)

```
Build the Payments screen at /dashboard/payments, Stripe-clean.

- Top: three metric cards (soft #FAFAFE bg) — Total collected (sum of successful, big bold ₦), This month, Active pages.
- A "Recent payments" table: Customer, Item (page title), Amount, Status pill (Paid green / Pending amber / Failed red), Date. Newest first. Search by customer name + filter by status.
- Row → opens a receipt: business name + logo, item, amount, reference, buyer details, status, date; Download PDF + Share.
- Wire the Dashboard home (/dashboard) to show the same metric cards + the 5 most recent payments + a prominent "Create Paypoint" button and a friendly greeting.
```

---

## PROMPT 8 — Settings (seller)

```
Build /dashboard/settings, Stripe-clean.

BUSINESS: edit business_name, phone, and upload a logo (shown on checkout pages and receipts).

PAYSTACK: a "Connect Paystack" section. Field for the seller's Paystack public key; the secret key is stored server-side as the Supabase secret. Show a clear explainer: "Paypoint creates your page and link. Paystack processes the payment and settles to your bank. We never touch your money." A "Connected" state sets profiles.paystack_connected = true.

ACCOUNT: sign out; basic account info.
```

---

## 24-hour launch order

Build in this sequence — each block is a checkpoint, don't move on until it works:

1. **Prompts 0 + 1** — foundation, theme, auth, schema. (Confirm you can sign up, log in, land on an empty dashboard.)
2. **Prompt 3** — routing + guards. (Confirm /dashboard redirects when logged out, and a dummy /p/test renders with no sidebar.)
3. **Prompts 4 + 5** — create a page, see it in Pages, open its public /p/:slug link. (No payment yet — the page just renders.)
4. **Prompt 6** — Paystack. Drop in your **test** secret key, run a full payment with a Paystack test card, confirm the payment row flips to 'success' and customers_served increments. *This is the only genuinely risky block — give it the most time.*
5. **Prompts 7 + 8** — payments dashboard, receipts, settings.
6. **Prompt 2** — marketing landing page (cheap to do last; nothing depends on it).
7. **Go live:** switch Paystack from test to **live** keys, connect your domain in Lovable → Settings → Domains, do one real ₦100 end-to-end payment yourself, then announce.

## Paystack handoff — what to ask/confirm on your call

- You need a **test public + secret key** now (for building) and **live keys** for launch (live keys activate after business verification — start that today, it can take a little time).
- Settlement goes to **your Paystack account's bank**, which is exactly why Paypoint never holds funds.
- Confirm the APIs you're relying on: `transaction/initialize` and `transaction/verify` (that's all the MVP needs).
- Optional but nice for reliability: a Paystack **webhook** pointing at a Supabase function so a payment is confirmed even if the buyer closes the tab before the callback runs. Skip for v1 if it slows you down — the verify-on-callback flow is enough to launch.
- Start with **Paystack only.** Flutterwave can slot in later behind the same initialize → redirect → verify pattern.
```
