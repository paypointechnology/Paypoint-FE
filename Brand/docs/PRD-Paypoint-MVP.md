# Paypoint MVP — 2-Week Launch PRD
**Version**: 1.0  **Author**: Newman Haruna  **Stakeholder**: Yvonne Joseph  **Date**: 16 June 2026  **Status**: Build-ready

**Objective.** Ship Paypoint's core loop in **2 weeks**: a seller creates a payment page in about a minute, connects Paystack, shares one link, and a stranger pays — with money settling **directly to the seller's bank via a Paystack Subaccount. Paypoint never holds funds.** The MVP exists to prove one thing fast: *a stranger will trust and complete a Paypoint checkout.*

## 1. Success Metrics (at launch)

| Metric | Definition | Target |
|---|---|---|
| **North Star — Checkout conversion** | distinct buyers who pay ÷ distinct genuine checkout viewers (photo pages, ≥20 views) | **≥ 40%** |
| Onboarding speed | median time to create first page | **< 90s** |
| Time-to-first-payment (seller "aha") | median signup → first real payment | **< 72h** |
| Receipt-reach | % of initiated payments that render a receipt (incl. WhatsApp/IG in-app browser) | **≥ 98%** |
| Money records correct | Paystack-success payments stuck as `pending` | **< 0.5%** |
| Go-live proof | one real ₦100 payment, end-to-end, settling to the seller's bank | **Pass** |

## 2. In Scope — Ships in 2 Weeks

- **Auth & profile** — email/password + Google sign-in; profile auto-created on first login.
- **Create a page** — Product/Service toggle, title, ₦ price (stored as kobo), optional photo + description + delivery, buyer fields to collect (Name on by default; Phone/Email/Address optional); URL-safe slug with reserved-word denylist; **live preview**; success panel with **Copy / QR / Share**.
- **Pages grid** — cards (thumb, title, price, true paid-count), active/inactive toggle, Copy/QR/Share. *(Edit disabled at launch — fast-follow.)*
- **Public checkout `/p/:slug`** (chrome-free, mobile-first) — seller logo + business name, real photo (or branded neutral state — never a placeholder icon), price, **true social proof** ("N paid", hidden at 0), tappable seller contact, "Payments processed by Paystack" trust line, collected fields, Pay button. *(CRO P0s: real-photo nudge, post-payment trust line, seller contact, honest social proof.)*
- **Payments** — `initialize-payment` + `verify-payment` edge functions (server re-reads price, re-checks `is_active`, idempotent settle on `paystack_reference`, **Subaccount + split**); **`paystack-webhook`** (signature-verified, authoritative settle); **`reconciliation-sweep`** (>15min `pending` → re-verify → `success`/`abandoned`).
- **Receipt** — `/pay/callback` success/failed + stable **`/pay/receipt/:reference`** (survives a closed tab); Download PDF + Share.
- **Dashboard & payments** — three metric cards (Total collected, This month, Active pages), recent payments table with status pills.
- **Settings** — business name + logo; **Connect Paystack** (provisions the seller's Subaccount) with the "we never hold your money" explainer; sign out.
- **Instrumentation** — `events` table + capture (`view / pay_tap / pay_initiated / receipt_rendered`) — without it the North Star is unmeasurable.
- **"You got paid" email** to the seller on each successful payment.
- **Self-test flow** — seller pays their own page once (test-mode, excluded from all counts).
- **Marketing landing `/`** — built last.

## 3. Out of Scope (not in this 2 weeks)

Storefront / multi-product · custom domain · Pro tier & billing · Flutterwave second route · analytics dashboards · **edit-page** (Week 3–4 fast-follow) · payments search/filter · multi-currency (**NGN only**) · any funds-holding / wallet / escrow / payout · CBN PSSP licensing · KYC/BVN/NIN · refund **adjudication** (Paypoint only *reconciles* reversals).

## 4. Non-Negotiable Architecture Decisions

- **Settlement via Paystack Subaccounts** (one per seller) — settlement routes to the seller's bank; Paypoint's commission is split by Paystack. Paypoint is **never in the money path**. *(This is the fact the entire "never holds funds" promise rests on — not the build spec's single shared key.)*
- **Webhook is the authoritative settle path**, idempotent on `paystack_reference` — callback-only loses tab-close payments and undercounts social proof.
- **`events` table is required** — the locked 3-table schema cannot measure the North Star.
- **Redirect to Paystack's hosted page** (no inline card field) — keeps Paypoint in the lightest PCI scope; card data never touches Paypoint.
- **Strict RLS on every table + sanitized public read by slug** — the public checkout exposes only checkout fields, never `user_id`, buyer rows, or subaccount codes.

## 5. Two-Week Build Plan

| Days | Milestone | Exit check |
|---|---|---|
| **1–2** | Foundation: theme tokens + Inter, auth screens, app shell, schema (`profiles`, `pages`, `payments`, `events`) + RLS | Sign up → land on empty dashboard |
| **3–4** | Routing + auth guards; Create flow; Pages grid | Create a page; open its `/p/:slug` (no payment yet) |
| **5–6** | Public checkout `/p/:slug` — sanitized read, branding, CRO P0s | Checkout renders correctly on mobile @375px |
| **7–9** | **Paystack (highest risk — most time):** Subaccount connect, initialize/verify, webhook, reconciliation sweep, receipt + stable URL | Test-card payment → row flips `success`, settles to seller, receipt + email fire |
| **10–11** | Dashboard + payments table, receipts, settings, "you got paid" email, events capture | Metrics populate from real events |
| **12** | Marketing landing | Live at `/` |
| **13** | Go-live prep: switch to live keys, connect domain, WhatsApp/IG in-app browser device test, compliance gates | All launch gates green (§6) |
| **14** | One real ₦100 end-to-end → announce | Money lands in seller's bank |

## 6. Launch Gates (all must pass before announce)

**Technical:** live ₦100 payment settles to the **seller's** bank (not Paypoint) · webhook confirms · row → `success` with correct `customers_served` · receipt reachable by reference · seller "you got paid" email sends · RLS CI tests green · WhatsApp/IG in-app browser redirect passes the device matrix · self-test flow live.
**Compliance:** lawyer opinion letter that the MVP is not a regulated payment service · written SAQ-A eligibility confirmation from Paystack · privacy policy published · DPAs executed with Supabase & Paystack · Supabase region decided. *(Several items need a Nigerian fintech lawyer — start now.)*

## 7. Top Risks

| Risk | Mitigation |
|---|---|
| **Buyers don't trust the checkout** (the whole business) | Run a 50–100 real-buyer funnel test before public launch; gate on ≥60% land→pay |
| Redirect breaks inside WhatsApp/IG in-app browsers | Device-lab matrix on top Nigerian Android + in-app browsers with real test transactions |
| Payment lost when buyer closes the tab | Webhook (authoritative) + reconciliation sweep + stable receipt URL |
| Fund-flow makes Paypoint "accidentally regulated" | Subaccounts/split only; lead revenue with Pro subscription until lawyer-confirmed |
| RLS / sanitized-read leak exposes private data | CI asserts anon cannot read `user_id`, buyer rows, or subaccount codes (red blocks deploy) |
| Live-key / Subaccount provisioning delay | Start Paystack business verification + Subaccount setup on Day 1 |
