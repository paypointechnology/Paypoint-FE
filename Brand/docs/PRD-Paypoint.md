# PRD: Paypoint — MVP + Near-Term Roadmap
**Status**: Final (ready for sign-off)  **Author**: Newman Haruna  **Last Updated**: 2026-06-16  **Version**: 2.0
**Stakeholders**: Yvonne Joseph

> **PM confidence statement.** Paypoint is pre-launch (Pre-Seed, 2026). Every user-behavior and market figure below is a *grounded assumption* unless explicitly marked verified. The strongest evidence is structural (GSMA: 56% of Nigerian MSMEs sell *only* via social media) and behavioral (the "send your account number + screenshot" status quo is universal). The single most load-bearing untested assumption — *that a stranger will trust and complete a Paypoint checkout* — is also the entire business. The MVP is therefore deliberately scoped as an instrument to falsify that assumption fast and cheaply.
>
> **What changed in v2.0 (after adversarial review).** Three things were materially under-specified or contradictory in v1.0 and are now resolved as load-bearing decisions: **(1) the settlement architecture** — Paypoint uses **Paystack Subaccounts**, so settlement routes to the seller's bank and the fee is split by Paystack; Paypoint never receives buyer funds (this is the technical fact the entire "never holds funds" posture depends on, and v1.0 left it ambiguous against a single-secret-key build spec); **(2) a minimal `events` table** is now a Must-have, because half the metrics — including the North Star denominator — were uninstrumentable on the locked 3-table schema; **(3) money-integrity completeness** — failed-payment, refund/reversal, abandoned-row, and deactivate-mid-checkout flows are now specified, because a money product that misrecords payments is not shippable. Buyer-PII retention is corrected from 6–7yr to a 90-day minimum (Paypoint is not the statutory record-keeper). Two locked-mockup defects (the AA-failing avatar and the placeholder image) are flagged non-authoritative and corrected. Public/press copy is brought into line with the substantiated, measured numbers.

---

## 0. TL;DR / Press Release

**FOR IMMEDIATE RELEASE — Lagos, Nigeria.** Today Paypoint launches the fastest way for Africa's social sellers to get paid. Any Instagram, WhatsApp or TikTok seller — fashion vendors, food sellers, beauty merchants, coaches, event organisers, digital creators — can turn a product or service into a clean, trustworthy, shareable payment page in about a minute (as fast as 30 seconds), with no website and no code. The seller shares one link (or a QR code) in their bio, a post, or a DM; the buyer pays on a branded checkout; and the money settles **directly to the seller's own bank account via Paystack — Paypoint never holds the funds.** It replaces the awkward, fraud-prone ritual of *"send me your account number and screenshot the transfer"* with a real checkout. "Selling online in Nigeria shouldn't require a developer or a leap of faith from your buyer," said Yvonne, founder. "Paypoint gives every social seller a real checkout — and keeps their money theirs."

**FAQ**

1. **Does Paypoint hold my money?** No. Ever. Payments are processed by Paystack and settle straight to the bank account you connect, via a Paystack Subaccount in your name. Paypoint has no wallet, no balance, and never receives or touches your funds. This is a deliberate promise and a regulatory stance.
2. **Why would a buyer who's never heard of me trust the page?** Because the checkout carries *your* business name and logo, shows how many people have already paid, says "Payments processed by Paystack" (a name Nigerians already trust with money — card details are entered on Paystack's secure page; Paypoint never sees them), shows how to reach you, and issues an instant receipt with a reference number.
3. **What does it cost?** Creating and sharing a page is free. On the Pro plan (custom domain, unlimited pages, branding, analytics) we charge a subscription. On free pages, our small commission is **collected by Paystack as a split at the moment of payment — we are never paid out of your money before you are.** Compared to ₦5,000–₦6,500/month gates on heavier competitors, your first Paypoint costs nothing.

> *Voice note (binding): no copy — press, FAQ, in-app — may claim or imply buyer protection, refunds, or that the page is "as safe as it is." Paypoint does not adjudicate disputes (§3). Substantiated trust claims only: "processed by Paystack," "instant receipt with a reference number," "money goes straight to {business}'s bank."*

---

## 1. Problem Statement

**The problem:** A Nigerian social seller can reach thousands of buyers from their phone, but the moment a stranger says "I want it," the sale falls into a trust hole. The seller types out an account number; the buyer hesitates to send money to a personal account they can't verify; the buyer transfers and sends a screenshot; the seller can't tell a real transfer from a Photoshopped "alert"; reconciliation is a notebook and mental math. **Getting paid is the single weakest, least-trusted, most fraud-exposed step in the transaction** — done with tools (a raw bank account number) that signal "amateur" or "scam" to exactly the cautious stranger the seller needs to convert.

### Evidence

| Type | Evidence | Confidence |
|---|---|---|
| **Behavioral (verified-structural)** | 56% of Nigerian MSMEs sell *only* via social media; ~75% touch social channels (GSMA 2023), against ~39.6M MSMEs (SMEDAN/NBS Dec 2021). A huge population selling on channels with no native checkout. | **High** |
| **Behavioral (observed)** | "Send account number + screenshot the transfer" is the universal incumbent — free and habitual, the true competitor. | **High** |
| **User (assumed, pre-launch)** | Sellers report shipping against fake transfer screenshots; rank "get paid before I ship" top-2; distrust any tool that *holds* their money. *(Assumption — validate via 8–12 seller interviews; Risk #10.)* | **Medium** |
| **User (assumed, pre-launch)** | Buyers default to suspicion of new account numbers/links, look for trust signals, abandon in seconds if a page looks off or breaks in the WhatsApp in-app browser. *(Assumption — validate via live buyer funnel test; Risk #1.)* | **Medium** |
| **Competitive (verified)** | No incumbent owns the ~30-second, no-website, single-link job for a non-technical IG/WhatsApp seller. Selar is creator/digital-skewed and expensive (4% + ₦50); Bumpa/Catlog are subscription suites (₦5k–₦6.5k/mo) over-built for a first checkout; Paystack's own Payment Pages/Storefront are generic and not social-seller-onboarded. | **High** |

**The opportunity:** own the job everyone touches and no one has nailed — *the fastest path from "DM me" to a trustworthy, paid checkout, for a seller who will never build a website* — and let every branded checkout recruit the next seller.

---

## 2. Goals & Success Metrics

**North Star Metric: Checkout conversion rate on `/p/:slug`** = `count(distinct successful, non-test payments) ÷ count(distinct genuine checkout viewers)` per active page per rolling 7-day window. *Rationale: the whole business is whether a stranger pays. It captures buyer trust (the binding constraint), seller value (they get paid), and indirectly the viral loop. It cannot be gamed without real money moving.*

> **Instrumentation note (critical — closes the metrics critique).** The locked schema (`profiles`, `pages`, `payments`) records **no view, funnel, or share events** and `payments` has only `created_at`. The North Star denominator and several CRO/funnel metrics were therefore **uninstrumentable as drafted.** v2.0 makes a minimal **`events` table a Must-have (M13, §9)** — `events(id, page_id, anon_id, event_type, source, ua_class, created_at)` where `event_type ∈ {view, pay_tap, pay_initiated, receipt_rendered}`, `anon_id` is a first-party localStorage UUID, and `ua_class` flags WhatsApp/IG/Facebook/Twitter crawlers so OG-unfurl prefetches are **excluded** from view counts. Every metric below names its source.

| Goal | Metric (precise definition) | Source | Baseline | Target | Window |
|---|---|---|---|---|---|
| Buyers trust & complete checkout | **North Star.** `distinct anon_id with success ÷ distinct genuine-view anon_id`, segmented `image_url IS NOT NULL` vs `NULL`, pages with **≥20 unique views** (min-n gate) | `events` + `payments` | None (new) | Photo segment **≥40% AND ≥10pp above** no-photo segment | rolling, 90 days post-launch |
| Sellers reach "aha" (get paid) | **Time-to-A1** = `median(first non-test success.created_at − profiles.created_at)` over sellers with ≥1 page | `payments` + `profiles` | None | **Median < 72h** | 90 days |
| Onboarding is ~30 seconds | **Time-to-first-page** = `median(pages.created_at − create_started event)`, first page per seller | `events` + `pages` | None | **Median < 90s; p25 < 30s** | rolling 30 days |
| Sellers come back | **W1→W4 paid-active retention** = % of *week-1 paid-active sellers* who are paid-active again in *week 4* (paid-active in week N = ≥1 non-test success that ISO week) — a single cohort number | `payments` | None | **≥ 35%** | cohorts whose W4 falls in first 120 days |
| The loop recruits sellers | **Viral K** = `(new sellers in 14-day cycle with referred_by_user_id set who reach A1) ÷ (sellers who shared a ref-tagged surface in prior cycle)`, reported **with attribution-coverage %** | `profiles` + `events` (ref_click) | None | **K ≥ 0.15 by day 90 (coverage ≥60%)** → on path to **0.3 at 6mo** | 6 months |
| In-app browser doesn't eat payments | **Receipt-reach** = `% of pay_initiated rows that fire receipt_rendered`, segmented by `ua_class` (WhatsApp/IG in-app) | `events` | None | **≥ 98%**, no segment < 95% | Launch + ongoing |
| Money records are correct | **Stuck-pending** = `pending rows >15min old that Paystack /verify returns success ÷ Paystack-verified-success rows` (computed by the reconciliation sweep) | sweep + Paystack | None | **< 0.5%** | rolling 24h, Launch + ongoing |
| Social proof is true | Re-running `verify` on the same `paystack_reference` does **not** change `customers_served` (test-asserted); count derived as `count(success AND is_test=false)` | CI + `payments` | n/a | **idempotent; 0 test/self payments in count** | every release |
| Data boundary holds | Anon `SELECT user_id FROM pages` denied; `SELECT * FROM payments` → 0/denied; RPC response keys ⊆ allowlist | CI | n/a | **0 leaks** (red CI blocks deploy) | every release |

**Zero-custody is an invariant, not a metric** (moved to §8 controls): monthly audit asserts **0 Paypoint bank-settlement entries originating from buyer transactions**; the fee reaches Paypoint only via Paystack Split (commission to Paypoint's subaccount) or seller-side Pro billing — never by Paypoint receiving and netting buyer funds.

> **PM note on targets.** 40% checkout conversion and <72h A1 are *aspirational hypotheses*, not forecasts. The pre-launch buyer-funnel test (Risk #1) gates them: if it returns <60% land→pay on instrumented links, we re-scope before public launch. **Baseline freeze:** the **30-day post-launch North Star value is named baseline B₀**; all later "+Xpp vs baseline" targets (e.g. §10 epic 1) are measured against B₀ on the equivalent (photo, ≥20-view) segment.

---

## 3. Non-Goals (and why)

| We are NOT building (this cycle) | Why |
|---|---|
| **Any funds-holding: wallet, balance, escrow, payout, "cash out"** | Deliberate strategic + regulatory choice. Holding funds requires a CBN MMO licence and destroys the "your money, your bank" message. Permanent for the foreseeable horizon. |
| **Buyer dispute resolution / escrow protection** | We never hold funds, so we *cannot* offer escrow. No copy may imply buyer protection or refunds (§0 voice rule). Buyer reassurance is via receipt + reference + seller contactability, not adjudication. |
| **Refund/chargeback adjudication** — but Paypoint **must still reconcile** reversals | Refunds are initiated by the seller in their Paystack dashboard (their account, their money). Paypoint does **not** process refunds, but it **does** listen for Paystack `refund.processed` / `charge.dispute.*` webhooks and flips the row to `reversed`/`refunded`, decrements `customers_served`, and excludes it from totals — so social proof and "Total collected" never lie. *(Closes completeness #3; not a new feature, a money-integrity must.)* |
| **Storefront / multiple products per seller** | Roadmap (Next, 6–12mo). MVP proves the single-link loop first; storefront is the heaviest, lowest-confidence build (RICE 125) and must be demand-validated (Risk #8). |
| **Custom domain / custom link, Pro subscription & billing, analytics dashboards** | Phase-1 monetization, gated behind Pro, which must exist first. |
| **Multi-currency** | **NGN-only at MVP.** The `currency` column is forward-compatible but only `'NGN'` is supported and rendered; diaspora buyers pay foreign cards charged in NGN by Paystack. *(Closes completeness #14.)* |
| **Second payment route (Flutterwave)** | Designed-for from day 1 (same initialize→verify pattern) but built only when triggered by Paystack downtime/fee/term risk. |
| **CBN PSSP direct processing** | 24-month independence play; a 9–18mo licensing program. Near-term roadmap rides Paystack with no Paypoint licence. |
| **KYC / BVN / NIN / DOB collection** | None needed to render a checkout. Collecting it pulls Paypoint toward KYC/AML obligations it has no licence basis for. Out. |
| **Personal finance / budgeting (the 2024 brand guideline)** | Reconciled OUT. The 2026 product is a focused social-commerce checkout tool. |
| **Payments search/filter** | Post-launch fast-follow. |
| **Edit-page flow** | **Resolved (was a 3-way contradiction):** edit is **OUT of the launch sprint** — the locked `/dashboard/pages/:id/edit` route and the "Edit" card action are **disabled/hidden at launch**; delete-and-recreate is the launch workaround. Edit is the **first Wk1–4 fast-follow** (§10 NOW), not a permanent non-goal. *(Closes completeness #12.)* |

---

## 4. Personas & User Stories

### Persona 1 — Amaka the Instagram Vendor (Primary / Seller)
27, Surulere, Lagos. Sells women's ready-to-wear + thrift to ~11,400 IG followers / ~2,800 WhatsApp contacts; ₦350k–₦600k/mo gross. Android, mobile-data-first, one phone. GTBank + an OPay/Moniepoint wallet. Fluent in IG/WhatsApp/Canva-lite, **not** a website builder, zero tolerance for setup friction. Closes sales in DMs; gets paid by transfer + screenshot; has shipped against a fake alert; tracks orders in a notebook; **will not trust a startup to hold her cash.**

### Persona 2 — Tunde the Cautious First-Time Buyer (Secondary but conversion-critical)
31, Lekki, salaried (also represents diaspora buyers paying NGN). A **stranger** to the seller, reached via an IG post or WhatsApp forward. iPhone/high-Android, pays inside the WhatsApp/IG in-app browser on mobile data. Pays by card/transfer; has been scammed or knows someone who has. Spends ₦8k–₦60k, impulse-leaning. **Defaults to suspicion**, decides to trust in under ~10 seconds, abandons fast, wants an instant receipt as leverage.

### Core user stories with acceptance criteria

**S1 — Seller: one trustworthy link instead of an account number**
> *As a seller, I want to send one trustworthy link instead of my account number, so I can get paid before I ship without arguing over screenshots.*
- **Given** I'm logged in with my Paystack Subaccount connected, **when** I complete the Create form (title + price minimum) and tap Save, **then** a live `/p/:slug` link is generated in under ~30s with Copy/QR/Share actions.
- **Given** I have **not** finished connecting Paystack, **when** I create a page, **then** the page is saved as **`setup_incomplete` (a distinct state — not `is_active`)**: it is **not publicly shareable** (the Share/QR/Copy actions are disabled with "Connect Paystack to start getting paid"), and any direct hit on its slug returns the calm "This page isn't available yet" state, **excluded from North Star view counting.** *(Closes completeness #2 — no shareable dead-end Pay button.)*

**S2 — Seller: look like a real business**
> *As a seller, I want my checkout to look like a credible business, so I can convert strangers and reduce haggling.*
- **Given** I've set a business name + logo, **when** a buyer opens my page, **then** the header shows my logo + business name (fallback: my initials on indigo with a **white** glyph — never ink-on-indigo, never a generic mark with no identity).
- **Given** ≥1 **real, non-test, non-self** successful payment, **when** the page renders, **then** "★ N paid" shows the true count derived as `count(success AND is_test=false)`; **given** 0, **then** the social-proof row is hidden entirely. *(is_test and seller-as-own-buyer A0 payments never count — closes consistency #5.)*

**S3 — Seller: money lands in my own bank + clean records + I'm told instantly**
> *As a seller, I want money to settle to my own bank and a clean record of who paid, so I can ship confidently.*
- **Given** a buyer completes payment, **when** Paystack confirms (webhook or callback, whichever first, idempotent on `paystack_reference`), **then** the row flips to `success`, `customers_served` reflects the true derived count, settlement routes to **my Subaccount's bank**, and I get a **real-time "you got paid" email** (see channel below).
- **Given** a payment is unverified, **when** I view the dashboard, **then** it shows an amber `pending` pill, **excluded** from "Total collected" — never shown as paid.

**S3a — Seller: the "you got paid" notification channel (was asserted, never specified)**
> *As a seller, I want to know the instant I'm paid even when I'm not in the app.*
- **Given** a payment reaches `success`, **when** the settle path runs, **then** an **email** is sent to the seller (channel: transactional email via Resend or Supabase SMTP — **a Must-have dependency, §7/§9 M14**) with business name, item, amount, buyer name, Paypoint + Paystack references. *(In-app-only is not a retention cue; web push/WhatsApp are out of MVP scope. Closes completeness #9.)*

**B1 — Buyer: confirm it's legit before paying**
> *As a buyer, I want to instantly see the page is tied to the exact seller I'm chatting with, so I can pay without fear.*
- **Given** I open `/p/:slug`, **when** the page loads (≤2.0s LCP on Slow 4G), **then** I see the seller's business name + logo, the real product photo (or a branded neutral state — never a placeholder icon), the price, "Payments processed by Paystack," and tappable seller contact (WhatsApp/IG).
- **Given** the seller deactivated the page, **when** I open it, **then** I see a calm "This page isn't available right now" — never a broken or scam-reading state.

**B2 — Buyer: pay in a couple of taps, get proof that survives a closed tab**
> *As a buyer, I want to pay with a method I trust and get an instant receipt I can find again, so I can prove I paid.*
- **Given** I tap "Pay ₦X", **when** I'm redirected to Paystack and complete payment, **then** I return to `/pay/callback` and a receipt renders with business name, item, amount, Paypoint reference, Paystack reference, date, and Download/Share.
- **Given** I close the tab on Paystack's page after paying, **when** the webhook fires, **then** my payment still reaches `success` and the seller is notified. **The receipt is reachable at a stable URL `/pay/receipt/:reference`** (sanitized, no seller PII beyond business name/logo/contact), so a buyer who lost the callback tab can still retrieve proof. *(Closes completeness #8 — receipt must not silently fail to reach the buyer; email is not relied on because email is not a required field.)*

**B3 — Buyer: a failed or retried payment behaves predictably (NEW — closes completeness #1)**
> *As a buyer, when a payment fails, I want to retry cleanly without confusion, and the system must record it honestly.*
- **Given** Paystack returns `failed`, **when** `verify`/webhook fires, **then** the existing row keyed on `paystack_reference` flips to `failed` — **never a duplicate row**; `customers_served` is untouched.
- **Given** I tap "Try again," **when** I re-initialize, **then** a **new `paystack_reference` and a new `pending` row** are created (one row per Paystack transaction attempt — chosen for clean reconciliation; the prior failed row is retained as `failed`). The North Star denominator is **distinct `anon_id`**, so retries by one buyer do **not** inflate it.
- **Given** I abandon on Paystack's page **before** paying, **when** no verify/webhook arrives within 15 min, **then** the reconciliation sweep moves the row from `pending` to a distinct **`abandoned`** status, so the stuck-pending metric measures only the dangerous case (Paystack-success-but-unrecorded). *(Closes completeness #6.)*

**B4 — Buyer: I paid on a page the seller turned off mid-flow (NEW — closes completeness #7)**
> *As a buyer, if I already paid, my money and receipt must be honored even if the seller deactivated the page after I started.*
- **Given** I passed `initialize` while the page was active, then the seller deactivated it, **when** I complete payment on Paystack, **then** `verify`/webhook **still settles and notifies** (money moved — never hidden); `customers_served` increments. `is_active = false` gates **only new `initialize` calls**, never an in-flight payment.

---

## 5. Solution Overview

**Narrative.** Paypoint is two physically separate surfaces that never share chrome, state, or session: a **Seller App** (authenticated, app-shell) and **Public Buyer Surfaces** (chrome-free, unauthenticated, sanitized read-only). A seller signs up, creates a page in one short form with a live preview, connects Paystack once (which provisions a Subaccount in their name), and shares a link. A buyer taps that link in WhatsApp/IG, lands on a single trustworthy checkout card, pays via Paystack, and gets a receipt reachable later by reference. Money settles seller-direct to the seller's Subaccount bank. Every checkout and receipt quietly recruits the next seller.

### Key UX flows
1. **Seller onboarding + Paystack connect** — signup → empty dashboard (single CTA) → create page (saved `setup_incomplete`, previewable to the seller only) → **connect Paystack** → "Connected" badge → page becomes shareable/`is_active`. *Pages are not shareable and not counted until Paystack is connected (S1).*
2. **Create-a-page** — Product/Service toggle, title, ₦ price (stored as integer kobo), optional photo/description/delivery, buyer-fields-to-collect (Name locked-on), live preview → success panel with Copy/QR/Share.
3. **Buyer checkout → pay → verify → receipt** — sanitized public read of one active page → fill fields → `initialize-payment` (re-reads price server-side, never trusts client; re-checks `is_active`) → redirect to Paystack → `/pay/callback` → `verify-payment` (idempotent on reference) → receipt; webhook is the authoritative settle path; stable receipt URL by reference.
4. **Activate/deactivate page** — optimistic toggle; inactive pages return the unavailable state; server re-checks `is_active` at `initialize` only (an in-flight payment always settles — B4).

Screens (reference the locked mockups, **with two mandatory corrections in §6**): marketing landing, seller dashboard (3 metric cards + recent payments), create builder, pages grid, **buyer checkout (the conversion surface)**, receipt.

### Key design decisions & trade-offs

| Decision | Trade-off accepted | Confidence |
|---|---|---|
| **Settlement via Paystack Subaccounts (resolved architecture)** — connecting "Paystack" provisions/links a **Subaccount in the seller's name** under Paypoint's integration; `initialize` sets `subaccount` + a `bearer`/split so the **seller's bank receives settlement** and Paypoint's commission is **split by Paystack to Paypoint's subaccount**. | More connect-flow work than "paste your public key"; depends on Paystack Subaccount onboarding. **Worth it:** it is the *only* model where "settles to the seller's bank / Paypoint never holds funds" is **true.** The single-`PAYSTACK_SECRET_KEY`, paste-your-own-key model in the build spec would settle to *Paypoint's* account (custody — the existential non-goal) or require custodying N sellers' secret keys (a credential/PCI/NDPA liability). **Subsumes old Q3.** | **High** |
| **Verify on Paystack webhook (promoted to launch-blocking)** | More edge-function + signature-verification work at MVP. **Worth it:** callback-only produces phantom-`pending` when buyers close the tab, undercounts `customers_served` (the social proof driving the loop), and breaks the "you got paid" notification (core retention cue). I overrule the spec's "skip for v1" and the priority team's "fast-follow" — it is a revenue-integrity and trust bug. | **High** |
| **Redirect-to-Paystack-hosted-page (not Inline/Popup)** | Slightly clunkier than an inline card field. **Worth it:** keeps Paypoint in the lightest PCI scope (SAQ-A class) — card data never touches Paypoint. Switching to Inline risks SAQ-A-EP. | **High** |
| **Single-product page at MVP (not storefront)** | Multi-SKU vendors make multiple pages. **Worth it:** ships the core loop fast; storefront validated and built in Next. *Risk: if >50% of interviewed sellers need multi-product, pull storefront forward (Risk #8).* | **Medium** |
| **Real product photo strongly nudged; branded neutral state, never a placeholder icon** | Adds a builder nudge + a neutral state. **Worth it:** CRO flags placeholder image as the **critical** anxiety trigger. *(The locked mockup's `ti-shirt` icon is the exact anti-pattern — flagged non-authoritative, §6.)* | **High** |
| **Name-only required by default; warn on each extra field** | Sellers may want more data. **Worth it:** every extra required field likely costs conversion; default to the floor, let sellers opt in with a warning (validate, Risk #12). | **Medium** |
| **One `payments` row per Paystack attempt (not row-reuse on retry)** | A retried purchase produces multiple rows for one buyer. **Worth it:** clean idempotency keyed on `paystack_reference`; the North Star dedups on `anon_id`, so the funnel is not inflated. | **High** |

---

## 6. Brand & Experience Requirements

**Positioning (2026, reconciled — the 2024 personal-finance framing is retired).**
> For Nigerian social-commerce sellers who close sales with *"send me your account number and screenshot the transfer,"* Paypoint is the ~30-second payment-page tool that turns any product or service into one clean, trustworthy link a stranger will actually pay on — money settling straight to the seller's own bank. Unlike Selar/Bumpa/Catlog (heavier stores you build and maintain) or a bare bank transfer (no trust, no record), we get you to a branded checkout fast, never hold your funds, and put buyer trust first on the one screen that matters: checkout.

**Voice:** Plain, confident-not-loud, trust-forward, concrete (₦ + names + real numbers), honest, respectful of the seller's time. **Hard rules:** no emojis anywhere; no exclamation marks in-app; never imply Paypoint holds/stores/moves money; **never imply buyer protection, refunds, or self-certified "safety"** (e.g. strike "looks as safe as it is," keep "engineered to convert" out of buyer/press copy — internal CRO language only); use "payment page / your Paypoint" not "store"; "get paid / settles to your bank" not "wallet/balance/cash out"; "₦35,000" (₦ glyph, comma) not "35k". Public claims must match the measured numbers — say "about a minute / as fast as 30 seconds," not a flat "under 30 seconds" (median target is <90s; §2). *(Closes consistency #6, #8, #10.)*

**Tone by surface:** Checkout = calm, minimal, zero marketing, never leaks seller-app or growth language. Dashboard = brisk, big numbers, quiet labels, no confetti. Marketing = warm, benefit-led, one indigo gradient hero allowed. Errors = honest, never blame the user, reassure that money is safe.

**Design system (LOCKED — no additions).** Stripe-clean. One accent: Paypoint Indigo `#5F58F4` (hover `#4A43D6`, tint `#EEEDFE`, soft `#F5F4FF`). Ink `#14132B`, text `#33323F`, muted `#6C6B7B`, subtle `#9A99A8`. Bg `#FFFFFF`/soft `#FAFAFE`, border `#ECEBF3`, input border `#E3E2EE`. Status pills (icon + text, never color alone): success `#12B76A`, warning `#F79009`, danger `#F04438`; trust star `#F5A623`. Inter (400/500/600/700), headings -0.01em, prices 700. Radius 8/12/16/20(checkout)/999. Near-invisible shadows; 1px borders do separation. No gradients in-app, no second bright color, no emojis. Mobile-first @375px. Sidebar (≥768px) → bottom tab bar (<768px) from one shared `navItems` config. **Accessibility WCAG 2.1 AA, non-negotiable on checkout/callback:** ≥44×44px tap targets, real `<label>`s, visible indigo focus rings, status by icon+text, `#9A99A8` subtle text restricted to non-essential hints (fails AA as body).

> **Locked-mockup corrections (mandatory; the mockup is reference, NOT pixel-authoritative where it conflicts with the locked spec). Closes completeness #4 and consistency #7.**
> 1. **Header avatar contrast.** The checkout mockup renders the fallback `P.`/initials as `color:#14132B` (ink) on `background:#5F58F4` (indigo) ≈ 2.0:1 — **fails the AA bar the spec calls non-negotiable on checkout.** **Correction:** white (`#FFFFFF`) glyph on `#5F58F4` (or ink on the `#EEEDFE` tint). The header avatar is **added to the AA-contrast CI check.**
> 2. **Image placeholder.** The mockup uses a `ti-shirt` icon on `#EEEDFE` as the image — the exact placeholder anti-pattern CR-1 forbids as the "critical anxiety trigger." **Correction:** when no photo, render the specified **branded neutral state**, never a generic icon; the builder warns before publish.
> 3. **Social proof.** The mockup hard-codes "24 paid"; production must derive the true non-test count (S2/CR-4) and hide the row at 0.
> 4. **Trust line wording.** Pair "Payments processed by Paystack" once, on first prominence, with CR-2's precise meaning ("Card details are entered on Paystack's secure page; Paypoint never sees them"). *(consistency #8)*

### Checkout CRO requirements (buyer trust is the whole business)

| ID | Requirement | Addresses | Priority |
|---|---|---|---|
| **CR-1** | Real product photo mandatory & prominent; if absent, a **branded neutral state** (never a broken/placeholder feel); builder warns before publish ("Pages with a photo get paid more"). | "Is this the real item?" | **P0** |
| **CR-2** | Post-payment trust line: "After payment you'll get an instant receipt with a reference number. Card details are entered on Paystack's secure page; Paypoint never sees them. Money goes to {business} via Paystack." | "Where does my money go?" | **P0** |
| **CR-3** | Tappable seller contact (WhatsApp/IG) on checkout, from profile. | Ghost-fear | **P0** |
| **CR-4** | System-generated social proof "{N} buyers paid here," `count(success AND is_test=false)`, hidden if 0; **never inflated by test/self payments.** | "Did she type that number?" | **P0** |
| **CR-5** | Seller logo (fallback **white** initials on indigo), replacing the generic mark. | "Is this really her shop?" | **P1** |
| **CR-6** | Honest total / delivery clarity; button amount equals what is charged. | Surprise-fee fear | **P1** |
| **CR-7** | Conditional address field for physical products (Address default ON for Product, OFF for Service). | "How will it reach me?" | **P1** |
| **CR-9** | Microcopy under Pay: "You won't be charged until you confirm on the secure Paystack page." | Pre-tap flinch | **P1** |
| **CR-8 / CR-10** | Honest seller-set urgency only (no fake countdowns); inline Nigerian phone validation. | Urgency / data integrity | **P2** |

**Measurable CRO success (all from `events` + `payments`, min-n ≥20 views/page, rolling 30 days):** view→Pay-tap ≥ 55%; **pay_initiated→verified ≥ 80%** (DB-derivable); overall view→success ≥ 40% (photo pages) with a **≥10pp observational gap** over no-photo pages (causal lift to CR-1 only claimed if the builder-nudge holdout/A-B runs — see Risk #12); median time-to-pay (`view → success`) ≤ 45s; ≥85% of **active** pages have a photo (`is_active AND image_url IS NOT NULL ÷ is_active`).

---

## 7. Technical Considerations

**Architecture.** React + Tailwind (mobile-first @375px). Supabase (auth, Postgres, storage, edge functions). Tables: `profiles`, `pages`, `payments`, **`events`** (new, M13) — **strict RLS on every table** (`events` write-only via the public surfaces' RPC, no anon read). Public checkout served via a **security-definer view/RPC `public_page_by_slug(slug)`** returning ONLY `title, price, currency, description, image_url, delivery_info, collect_fields, customers_served, business_name, logo_url, seller_contact` filtered `WHERE is_active = true` — never `user_id`, buyer rows, secrets, or subaccount codes. Anon role has no direct SELECT on base tables; RPC is **rate-limited** (per-IP) to deter enumeration. Edge functions: `initialize-payment`, `verify-payment`, **`paystack-webhook`** (promoted to MVP), **`reconciliation-sweep`** (promoted to MVP — see below). Buyer surfaces (`/p/:slug`, `/pay/callback`, `/pay/receipt/:reference`) import no app-shell module (security boundary + perf: checkout JS ≤120KB gzipped, LCP ≤2.0s Slow 4G).

**Settlement & secret-key model (RESOLVED — the load-bearing fact behind "never holds funds"). Closes consistency #2 and completeness #5.**
- The build spec's single `PAYSTACK_SECRET_KEY` + "paste your public key" is **Paypoint's own integration key**, used **only** to call Paystack on the seller's behalf with a **Subaccount** that settles to the seller's bank.
- **Connect flow** provisions/links a **Paystack Subaccount per seller** (seller's settlement bank account + percentage charge), storing the returned **`subaccount_code` on `profiles`** (not a seller secret key — Paypoint never custodies seller secrets).
- `initialize-payment` passes `subaccount` (+ split config) so **settlement routes to the seller's bank** and **Paypoint's commission is split by Paystack** to Paypoint's own subaccount. Paypoint is **never in the money path.**
- The **webhook signature is verified against Paypoint's own `PAYSTACK_SECRET_KEY`** (the integration that owns the transactions) — unambiguous now that the model is settled.

**Schema additions to the build spec (decided):**
- **`payments.status` enum extended** to `'pending' | 'success' | 'failed' | 'abandoned' | 'refunded' | 'reversed'` *(B3/B4, §3 refund row — money-integrity).*
- **`payments.paid_at`** (timestamp, null until success) and **`payments.updated_at`** — needed for time-to-pay and reconciliation; `created_at` alone is insufficient.
- **Unique constraint on `payments.paystack_reference`** — settle-once, idempotent; re-running verify on the same reference is a no-op (test-asserted).
- **`payments.is_test`** — A0/self-test payments never pollute totals, milestone copy, or social proof.
- **`profiles.referral_source`, `profiles.referred_by_user_id`, `profiles.subaccount_code`.**
- **`events`** table (M13) as defined in §2 — the analytics sink the North Star and CRO funnel require.
- `customers_served` is **derived/recomputed** as `count(payments WHERE status='success' AND is_test=false AND page_id=…)` (or guarded by the unique-reference settle-once), so callback+webhook double-fire cannot inflate it.

**Slug safety (closes completeness #13).** Title-derived slug + random suffix, plus: a **reserved-word denylist** (`login`, `signup`, `admin`, `dashboard`, `p`, `pay`, `api`, …); an **anti-impersonation clause** in the abuse policy (using a known brand in a title is grounds for takedown); rate-limit on `public_page_by_slug` to deter enumeration of active pages.

**Email/placeholder hygiene (closes consistency #4).** When email isn't collected, `initialize-payment` sends a **non-deliverable, clearly-synthetic, per-transaction** address (`noreply+{reference}@checkout.paypoint.<domain>`) that cannot collide with a real inbox; Paypoint does **not** rely on Paystack to email the buyer when no email is collected — the in-app/stable-URL receipt is the buyer's proof.

**Callback/webhook risk (the highest-risk item in the build). Mitigation (decided, in order):** (1) **Paystack webhook → `paystack-webhook` edge function (`charge.success`, plus `refund.processed`/`charge.dispute.*`), signature-verified, as the authoritative idempotent settle path — launch-blocking;** (2) callback and webhook share one settle function keyed on `paystack_reference`, whichever first wins; (3) **`reconciliation-sweep` re-verifies `pending` rows >15min and auto-`abandoned`s those with no Paystack success — promoted to launch-blocking** because the §2 stuck-pending metric is computed from its output (resolves the v1.0 contradiction where the metric was "Launch" but the sweep was "fast-follow"); (4) `pending` amber, excluded from totals; (5) buyer fallback "Checking your payment… / Refresh status" instead of a hard error.

### Risks (technical)

| # | Risk | L×I | Mitigation | Measurable signal |
|---|---|---|---|---|
| T1 | Verify-on-callback misses tab-close payments | High×High | Webhook at launch; idempotent settle; sweep auto-abandons orphans | <0.5% Paystack-success stuck `pending` (rolling 24h) |
| T2 | Redirect round-trip breaks inside WhatsApp/IG in-app browsers | High×High | Device-lab matrix: top-6 Android + WhatsApp/IG in-app iOS+Android, real Paystack test txns | receipt-reach ≥98%, no UA segment <95%; 0 stuck-pending in 100 runs |
| T3 | RLS / sanitized-read leak exposes `user_id`, buyer rows, or `subaccount_code` | Low×Existential | Allowlisted view; CI asserts anon `select user_id`/`select * from payments`/subaccount denied | 0 private fields in public read (CI, red blocks deploy) |
| T4 | Tampered-price attack (client submits amount) | Low×High | `initialize-payment` always re-reads price + `is_active` from page row server-side | Client amount never used (code-asserted) |
| T5 | Paystack is rail **and** competitor (fee/term/throttle/feature land-grab) | Med×High | 2nd route (Flutterwave) designed-for day 1; avoid Paystack-only lock-in | Flutterwave adapter passes the same initialize→verify CI suite in staging when built |
| T6 | Live-key / business-verification / **Subaccount provisioning** delay blocks launch | Med×High | Start Paystack business verification + Subaccount setup **today**; build on test keys | Live keys + test Subaccount split confirmed before go-live |
| T7 | Double-settle inflates `customers_served`/totals | Low×High | Unique `paystack_reference`; settle-once; derived count | Re-verify same reference changes nothing (test-asserted) |

### Open questions (technical) — with owners

| Q | Owner | Deadline |
|---|---|---|
| Does the full redirect round-trip survive WhatsApp + IG in-app browsers across the top-6 Nigerian Android browsers? | Eng | Before public launch |
| Which Supabase region (NDPA-adequate vs. document transfer basis)? | Eng + Legal | Before launch |
| Subaccount split mechanics: percentage charge vs. flat, and `bearer` of Paystack's own processing fee | Founder + Eng | Before enabling transaction fees |

---

## 8. Compliance, Security & Privacy (decision-ready)

**PCI-DSS — lightest scope (SAQ-A class), by construction.** Card data is entered only on Paystack's PCI Level-1 hosted page; Paypoint transmits amount/email/metadata/reference/subaccount — never PAN/CVV/expiry. **Load-bearing rules:** never render a card field in Paypoint; never log/store card data; keep the redirect model (no Inline/Popup without a PCI re-check); secret key server-side only. CI grep for card-field patterns = 0. **[LAWYER/PCI-CONFIRM]** SAQ-A eligibility with Paystack **in writing before launch (hard gate, §11).**

**NDPA 2023 / NDPR.** Paypoint is a **data controller** for seller PII and (likely) processor for buyer fulfilment PII — *the controller/processor split for buyer data* **[LAWYER-CONFIRM]** determines who owes buyers notices and is reflected in the published policy. **Strengths in design:** data minimization (`collect_fields` — address never default; no BVN/NIN/DOB), sanitized public read, RLS as access-control of record, synthetic non-deliverable placeholder email. **MVP must-do:** publish a plain-language privacy policy (footer + signup + checkout); execute **DPAs with Supabase and Paystack** before launch; choose Supabase region deliberately; designate Yvonne as responsible person.
- **Buyer-PII retention — corrected (closes consistency #3).** Paypoint is **not** the seller's statutory financial record-keeper (the seller/merchant and Paystack are). Default buyer-PII retention on **successful** rows to the **minimum needed for receipt re-issue and dispute contact — propose 90 days** **[LAWYER-CONFIRM]**, after which the purge job nulls buyer name/phone/email/address. The 90-day purge already covers `pending`/`failed`/`abandoned`. The old "6–7yr as financial records" assertion is struck. The open question is reframed: *confirm Paypoint is NOT the statutory record-keeper* **[LAWYER-CONFIRM]**.

**CBN PSSP path.** Today Paypoint is a **software layer on a licensed PSP (Paystack)** — money settles seller-direct via Subaccounts, Paypoint holds no funds, no licence required *(secure a lawyer's opinion letter for investor diligence — hard gate, §11)*. **PSSP is Phase-2** (a PSSP may process/aggregate but **may not hold funds** — aligned). **Capital figure:** the widely-cited PSSP minimum is **₦100M**, not ₦250M (the ₦250M is the *Switching & Processing* tier). **Do not put a hard capital number in the deck without [LAWYER/CBN-CONFIRM]** of the current circular. Timeline ~9–18mo — a fundraising/ops project, not gating the near-term roadmap.

**The "are we accidentally regulated?" risk — fee collection (now bound everywhere, not just here). Closes consistency #1.** *How* the fee is collected determines licensing exposure. **Binding rule across the whole document:** the per-transaction commission is collected **only** via **Paystack Split / Subaccounts** (Paystack routes Paypoint's commission; the seller is the merchant; Paypoint never receives buyer money and never "deducts our fee from buyer money we received" — that is fund-holding). **Until [LAWYER-CONFIRM], lead with the Pro subscription (billed seller-side, off the payment rails) as the primary revenue line.** FAQ #3 and §1 copy are corrected to never imply Paypoint receives and nets buyer funds.

**Zero-custody control (the invariant moved out of §2).** Monthly audit: **0 Paypoint bank-settlement entries originating from buyer transactions**; CI/audit asserts no Paypoint-owned Paystack balance receives buyer funds (commission only, via split).

**Key compliance risks (decision-ready):** A1 fee mechanism puts us in the money path (Med×High → Split/Subaccounts, lawyer-confirm before enabling fees); F1 fraudulent sellers (Med×High → Paystack KYC on settlement Subaccounts as first line, abuse-report link on `/p/:slug`, reserved-slug/anti-impersonation policy, fast takedown); D1/D2 RLS misconfig / over-exposed read (Low×Existential → CI tests + pre-launch pen spot-check); R1 regulator deems MVP a regulated service (Low–Med×High → keep money seller-direct, lawyer opinion letter on file).

---

## 9. Scope & Prioritized Backlog

**MVP boundary:** *a seller creates a payment page in about a minute, connects Paystack, shares it, and a stranger pays with money settling to the seller's bank via a Paystack Subaccount — recorded correctly even on tab-close, failure, retry, or mid-flow deactivation.* Everything else defers.

### MoSCoW

**Must (cannot launch without):**
- M1 Email/Google auth + auto-profile
- M2 Schema + strict RLS + sanitized public read (+ extended status enum, unique `paystack_reference`, `paid_at`/`updated_at`)
- M3 Create builder (toggle/title/kobo-price/photo/fields/slug + reserved-slug denylist)
- M4 Public chrome-free checkout `/p/:slug` (branded neutral state, corrected avatar)
- M5 `initialize-payment` + `verify-payment` (server price re-read, `is_active` re-check, idempotent settle, **Subaccount + split**)
- M6 `/pay/callback` receipt (success/failed) **+ stable `/pay/receipt/:reference`**
- M7 Routing + auth guards (public never renders app shell)
- M8 Pages grid (active toggle + Copy + Share; **Edit action disabled at launch**)
- M9 **Connect Paystack via Subaccount provisioning** + "we never hold your money" explainer
- M10 Dashboard + Payments table (3 metric cards, recent, status pills)
- **M11 `paystack-webhook`** (signature-verified; `charge.success` + `refund.processed`/`charge.dispute.*`) — *promoted from "skip for v1."*
- **M12 P0 CRO requirements CR-1/CR-2/CR-3/CR-4.**
- **M13 `events` table + view/pay_tap/pay_initiated/receipt_rendered capture** — *without it the North Star and CRO funnel are unmeasurable (closes the metrics critique).* 
- **M14 Transactional email** ("you got paid" to seller; receipt-by-reference link) via Resend/Supabase SMTP — *the asserted retention cue made real.*
- **M15 `reconciliation-sweep`** (>15min `pending` → re-verify → `success`/`abandoned`) — *promoted; the stuck-pending launch metric is computed from it.*
- **M16 A0 self-test flow** — seller pays their own page once (Paystack test-mode detection sets `is_test=true`); excluded from all counts; satisfies the §10/§11 "live ₦100 self-test" checklist item.

**Should (pulled into MVP — cheap, high-leverage; see RICE):** social-proof counter (S5), WhatsApp/X share fallback (S3), QR on cards (S1). PDF receipt (S2) if time. *(These are growth-loop bets, not falsification requirements — if the launch sprint slips they are the first cuts; the 30-second/Copy-link core is protected. Acknowledges completeness #15.)*

**Could (post-launch):** payments search/filter, "This month" card refinements.

**Won't (out — see §3):** storefront, custom domain, Pro tier, Flutterwave route, analytics dashboards, funds-holding, PSSP, personal-finance, multi-currency, refund *adjudication* (reconciliation only), edit-page *during the launch sprint* (Wk1–4 fast-follow).

### RICE — contested items (Score = R×I×C ÷ E)

| Item | Reach/qtr* | Impact | Conf | Effort(pw) | RICE | Verdict |
|---|--:|--:|--:|--:|--:|---|
| Social-proof "N paid" (S5) | 1,500 | 1 | 70% | 0.2 | 5,250 | **Pull into MVP** |
| `events` table + capture (M13) | 1,500 | 3 | 80% | 0.8 | 4,500 | **Must (metrics gate)** |
| Webhook (M11) | 1,500 | 3 | 80% | 1.0 | 3,600 | **Launch-blocking** |
| Reconciliation sweep (M15) | 1,500 | 2 | 75% | 0.6 | 3,750 | **Launch-blocking** |
| "You got paid" email (M14) | 1,500 | 2 | 75% | 0.7 | 3,214 | **Must (retention cue)** |
| PDF receipt (S2) | 1,500 | 1 | 65% | 0.6 | 1,625 | MVP if time, else day-2 |
| Trust-signals bundle | 1,500 | 2 | 60% | 2.0 | 900 | **Phase 1, first** |
| WhatsApp/X share (S3) | 1,500 | 1 | 85% | 0.4 | 3,188 | **Pull into MVP** |
| QR on cards (S1) | 1,500 | 0.5 | 80% | 0.3 | 2,000 | **Pull into MVP** |
| Flutterwave 2nd route | 1,500 | 1.5 | 45% | 4.0 | 253 | Phase 2 (trigger-based) |
| Edit-page flow | 1,500 | 1 | 90% | 0.8 | 1,688 | **Wk1–4 fast-follow** |
| Storefront / multi-product | 1,500 | 3 | 50% | 6.0 | 375 | Phase 2 (lead item) |
| Custom domain | 800 | 2 | 55% | 3.0 | 293 | Phase 2 (behind Pro) |
| Pro tier + billing | 1,500 | 3 | 50% | 5.0 | 450 | Phase 2 |

> **\*RICE Reach reconciled (closes metrics #10).** v1.0 used internally inconsistent reach figures (500–8,000) against a 50k–150k SOM. Reach is now a single consistent unit: **active sellers reached per quarter in the first post-launch year**, anchored to a realistic early base (~1,500 active sellers/qtr — well inside the 50k–150k 36-month SOM ceiling, not contradicting it). Scores re-derived; verdicts unchanged on the load-bearing items.
>
> **PM override, stated explicitly:** webhook, sweep, events, and email are all promoted into Must regardless of raw RICE, because their true impact is **money-integrity, the core retention cue, and metric-measurability** — a money product that silently misrecords payments or cannot measure its own North Star is not shippable. Confidence: High.

---

## 10. Roadmap — Now / Next / Later

**North Star: checkout conversion rate.** Supporting metrics across horizons: time-to-A1, W1→W4 paid-active retention, viral K (with attribution coverage), receipt-reach, <0.5% stuck-pending.

### NOW — MVP Launch
**Owner:** Yvonne (product/GTM) + 1–2 builders. **Window:** launch sprint + Week-1–4 fast-follow.
- Ship M1–M16 + S1/S3/S5. **Exit criteria (all must pass end-to-end before announce):** signup → create page (median <90s, measured via `events`) → connect Paystack Subaccount → chrome-free `/p/:slug` → live ₦100 Paystack payment → **settlement routes to the seller's bank, not Paypoint** → row flips `success`, `customers_served` correct, receipt renders **and is reachable by reference**, webhook confirms, seller gets the "you got paid" email. Plus all §11 compliance gates green.
- **Fast-follow (Wk1–4):** **edit-page flow** ("I priced it wrong" is the first complaint); payments search + "This month" card.
- **Success metric:** ≥40% checkout conversion (photo pages); median time-to-A1 <72h.

### NEXT — 6–12 months (validated growth). WIP = 1 epic at a time. ~20.5pw ≈ 5–6mo at ~2.5 net pw/wk.

| Order | Epic | Owner | Success metric (measurable) | Dependency |
|--:|---|---|---|---|
| 1 | **Trust-signals bundle** (verified badge, post-payment review/rating capture, contact-seller surface, Paystack prominence) | Product + Eng | photo-segment NSM **≥ B₀ + 5pp** at 30 days post-ship (B₀ = frozen 30-day post-launch NSM) | `customers_served`, `events` |
| 2 | **QR maturation** (downloadable, print-ready branded QR; `?src=qr`) | Eng | **≥15% of trailing-30-day active sellers** have a page with ≥1 view where `source='qr'` | MVP QR |
| 3 | **Pro tier + billing** (Paystack recurring; new `subscriptions` table; gates items below) | Founder + Eng | **≥5% of trailing-30-day active sellers** hold an active Pro subscription at 90 days post-launch | — |
| 4 | **Custom link & domain** (first Pro perk; CNAME + slug aliasing) | Eng | **≥40% of Pro sellers** configure a custom domain within 60 days | Pro |
| 5 | **Storefront / multi-product** (one seller → many pages) | Product + Eng | **≥20% of single-active-page sellers create a 2nd active page within 60 days** of storefront launch | Validate via Risk #8; Pro |
| 6 | **Second payment route (Flutterwave)** behind same initialize→verify pattern | Eng | Flutterwave adapter passes the Paystack initialize→verify CI suite in staging | Trigger: Paystack downtime/fee/term risk |

> "Active seller" is defined **once, everywhere:** *a seller with ≥1 successful non-test payment in the trailing 30 days.* (Closes completeness #10, metrics #10.)

### LATER — direction only (not specced here)
The 24-month "money OS" vision and the **CBN PSSP licence** (process directly, reduce Paystack dependency, still never hold funds). A Phase-2 fundraising/licensing program (9–18mo), explicitly *not* gating Now/Next.

---

## 11. Go-to-Market Brief

**Audience:** Primary = Nigerian IG/WhatsApp social sellers (fashion, beauty, food, coaches, event organisers, digital creators). Critical secondary = the cautious first-time buyer who must trust the checkout.

**Value prop:** *"Get paid like a real business — without building one. Turn any product into a payment link in about a minute, paid straight to your bank. We never hold your money."*

**Channels:**
- **The viral loop (primary, owned):** every checkout footer ("Powered by Paypoint", quieter than the Paystack line, never above Pay), every receipt ("Want a payment page like this? Create one free →" on the *buyer's* view only), the receipt PDF footer, the QR landing, and the **WhatsApp OG link-unfurl** (product image + "Pay securely · Paypoint"). All carry **`?ref={surface}&src={slug}` — seller/surface identifiers ONLY, never any buyer field** (CI/manual check asserts recruitment URLs contain no `payments` columns; the buyer "create your own" CTA sets no cookie/identifier on the buyer — closes consistency #11). Resolves to the recruiting seller's `user_id` → measurable K. Guardrails: Paystack security cue always outranks the growth cue; one brand mention per surface; no interstitials; OG-unfurl prefetches excluded from view counting via `ua_class`.
- Founder-led seed: concierge-onboard 10 real Lagos vendors (also Risk #3 validation).
- Peer referral among vendor clusters; milestone-triggered "tell another seller" at ₦1M / 100 customers.

**Launch checklist (all hard gates — closes consistency #9):**
- *Compliance:* **lawyer opinion letter on file that the MVP is not a regulated payment service** · **written SAQ-A eligibility confirmation from Paystack** · **Q4 controller/processor determination reflected in the published privacy policy** · **Supabase region / NDPA transfer basis decided** · privacy policy published · Supabase + Paystack DPAs executed.
- *Technical:* Paystack business verification live · live keys active · **per-seller Subaccount provisioning + split confirmed (settlement routes to seller's bank, verified on a test split)** · webhook live + signature-verified · reconciliation sweep live · `events` capture live · "you got paid" email sending · RLS CI tests green · in-app-browser device matrix passed · A0 self-test flow live · domain + OG tags configured.
- *Final:* **one real ₦100 live transaction end-to-end, after all compliance gates above are green** (settlement lands in the seller's bank, not Paypoint's).

**Success criteria (first 90 days):** ≥40% checkout conversion (photo pages, ≥20-view min-n); **≥60% land→pay completion AND <15% trust-stage abandon** (trust-stage = viewed ≥10s without pay_tap) in the pre-launch buyer-funnel test (gate, ≥50 real buyers); median time-to-A1 <72h; **≥7/10 concierge sellers have ≥1 success OR an active page with ≥5 views in days 8–14**; <0.5% stuck-pending; **K ≥0.15 by day 90 (attribution coverage ≥60%)**.

**Rollback:** Public routes are static-cheap; if checkout conversion or stuck-pending breach thresholds, (1) kill-switch disables new-page Pay while keeping existing receipts viewable, (2) revert to last-good edge-function deploy, (3) for a Paystack-side incident, communicate "payments paused" honestly on `/p/:slug` (never charge silently), (4) if a data-boundary regression is found, take public read offline ("temporarily unavailable") until the CI RLS test is green again.

---

## 12. Open Questions & Risks (consolidated)

| # | Question / Risk | Owner | Decision deadline |
|---|---|---|---|
| 1 | **Will strangers trust & complete the checkout?** (the entire business) — 50–100 real-buyer funnel test; pass = ≥60% land→pay, <15% trust-stage abandon | Product | Before public launch |
| 2 | **Redirect round-trip inside WhatsApp/IG in-app browsers** — device-lab matrix; pass = receipt-reach ≥98%, no UA segment <95% | Eng | Before public launch |
| 3 | **Subaccount split mechanics** (percentage vs flat, fee bearer) keep Paypoint out of the fund flow | Founder + Legal | Before enabling transaction fees |
| 4 | **Controller vs. processor for buyer PII** (who owes buyers notices) — reflected in privacy policy | Legal | Before launch |
| 5 | **SAQ-A eligibility confirmed with Paystack in writing** | Legal + Eng | Before launch (hard gate) |
| 6 | **Supabase region / cross-border transfer basis** | Eng + Legal | Before launch |
| 7 | **Webhook authoritatively confirms ≥99% of payments** (overrides callback-only) | Eng | Launch-blocking |
| 8 | **Do >50% of sellers need multi-product?** → if yes, pull storefront forward | Product | Concierge onboarding (Wk 1–4) |
| 9 | **Per-transaction fee band acceptable vs. free transfer** (Van Westendorp, 20+ sellers) | Product | Before enabling fees |
| 10 | **Current PSSP capital floor** (₦100M vs ₦250M; escrowed vs evidenced) — don't quote in deck until confirmed | Founder + Legal | Before fundraise on this number |
| 11 | **Lawyer opinion letter: MVP is not a regulated payment service** | Legal | Before launch (hard gate) + investor diligence |
| 12 | **Over-collecting buyer fields suppresses conversion; isolate CR-1's causal photo lift** (A/B Name-only vs full; builder-nudge holdout for the ≥10pp causal claim) | Product | First 60 days |
| 13 | **Confirm Paypoint is NOT the statutory financial record-keeper for buyer data** (sets 90-day retention vs longer) | Legal | Before launch (privacy policy) |

### Open questions where I disagree with a critic (decision kept, rationale recorded)

| Critic finding | My decision | Rationale |
|---|---|---|
| **Completeness #15 / metrics:** QR + WhatsApp/X share are not needed to falsify the core hypothesis; cut to protect the 24-hour core. | **Keep them in MVP as "Should," explicitly first-to-cut.** | They are near-zero effort (0.3–0.4pw) and they *are* the viral loop, which is the second hypothesis the MVP exists to test (every checkout recruits the next seller). I accept the critic's framing — they are growth bets, not falsification requirements — and have written that into §9. But cutting them pre-emptively would under-test the loop. They are cut only if the sprint slips. |
| **Metrics:** make `customers_served` a *derived count* rather than an incremented integer. | **Allow either, but require the unique-`paystack_reference` settle-once guard regardless.** | A derived count is cleanest, but on the locked Supabase build a guarded increment is equally idempotent and cheaper to render on the dashboard. The non-negotiable is the test-asserted invariant (re-verify changes nothing), which I've made a §2 metric and T7. Implementation choice left to Eng. |
| **Completeness #1:** on "Try again," reuse the unconsumed pending row. | **Create a new row per Paystack attempt instead.** | Row-reuse muddies idempotency keyed on `paystack_reference` (a reused row would carry multiple references over its life). One row per attempt keeps the unique constraint clean; funnel inflation is prevented by deduping the North Star on `anon_id`, not by minimizing rows. |

---

## Appendix

**Source documents**
- Build spec: `/Users/newmanaruna/Desktop/Paypoint-FE/Brand/MVP PROMPT/paypoint-mvp-build-v2.md`
- Mockups (`/Users/newmanaruna/Desktop/Paypoint-FE/Brand/SCREEN MOCKUPS/`): `paypoint_marketing_landing_mockup.html`, `paypoint_seller_dashboard_mockup.html`, `paypoint_create_builder_mockup.html`, `paypoint_pages_grid_mockup.html`, `paypoint_buyer_checkout_mockup.html`, `paypoint_payment_receipt_mockup.html` — **reference, not pixel-authoritative; the §6 corrections (avatar contrast, image placeholder, derived social proof, trust-line wording) override the mockups where they conflict with the locked design spec.**

**Market notes (verified anchors).** 39.6M MSMEs (SMEDAN/NBS Dec 2021); 56% sell *only* via social, ~75% touch social (GSMA 2023); Nigeria e-commerce GMV ~$9.35B (Mordor 2025). **Do not cite the $12.43B 2026 social-commerce figure — a publishing error incompatible with the same publisher's ~14% CAGR.** SOM to defend (founder bottom-up, Low confidence): ~50k–150k active sellers, ~$30–90M routed GMV over 36 months. RICE reach (~1,500 active sellers/qtr in year 1) is consistent with — and well inside — this SOM.

**Competitive notes.** Paystack Payment Pages/Storefront — cheapest verified fees (1.5% + ₦100, capped ₦2,000), both the rail and the biggest threat; respond with focus + UX velocity, not feature parity. Selar — 4% + ₦50, digital/creator-skewed. Bumpa (~₦5k/mo) / Catlog (~₦6.5k/mo) — suites over-built for a first checkout; compete on free-at-entry + a seamless single-page→storefront upgrade. Flutterwave Store — de-prioritised. **Bank transfer ("send account number + screenshot") — the true incumbent: free, habitual; beat it on trust, instant verified receipt, no reconciliation, no fake-alert fraud.**

**Reconciliations & critic resolutions made by the PM (with confidence).**
1. **Settlement via Paystack Subaccounts** — resolves the single-secret-key vs. seller-direct-settlement contradiction; the entire "never holds funds" posture now rests on a stated mechanism. *High.* (Consistency #2, Completeness #5.)
2. **Fee collected only via Paystack Split/Subaccounts**, Pro subscription as primary revenue until lawyer-confirmed; FAQ/§1 copy corrected. *High.* (Consistency #1.)
3. **`events` table + capture is a Must** — without it the North Star is theater; all metrics re-specified to a measurable source. *High.* (Metrics critique.)
4. **Money-integrity completeness:** failed/retry (B3), abandoned-row sweep, deactivate-mid-flow (B4), refund/reversal reconciliation, extended status enum, unique-reference settle-once, derived/guarded `customers_served`. *High.* (Completeness #1/#3/#6/#7, metrics idempotency.)
5. **Buyer-PII retention corrected to 90-day minimum**; Paypoint is not the statutory record-keeper. *High.* (Consistency #3.)
6. **Webhook + reconciliation sweep promoted to launch-blocking** (overrides build spec "skip for v1" and the stuck-pending metric/sweep contradiction). *High.* (Completeness, metrics #2.)
7. **Mockup corrected, flagged non-authoritative:** white-on-indigo avatar (AA), branded neutral state (CR-1), derived social proof. *High.* (Completeness #4, Consistency #5/#7.)
8. **Public copy aligned to measured numbers and honest claims:** "about a minute," "processed by Paystack," no "as safe as it is," no "engineered to convert" in buyer/press copy. *High.* (Consistency #6/#8/#10.)
9. **Un-connected pages are `setup_incomplete`, not shareable, not counted** — no dead-end Pay button. *High.* (Completeness #2.)
10. **Edit-page is a Wk1–4 fast-follow** (route/action disabled at launch), not a permanent non-goal — three-way contradiction resolved. *High.* (Completeness #12.)
11. **NGN-only non-goal added; slug denylist + anti-impersonation; synthetic placeholder email.** *High.* (Completeness #13/#14, Consistency #4.)
12. **"Active seller" and all NEXT metrics defined precisely; RICE reach reconciled to SOM; baseline B₀ frozen at 30 days.** *High.* (Metrics #10, cross-cutting #4.)
13. **Single-product MVP held** despite multi-SKU prevalence — gated by Risk #8. *Medium.* **2026 social-commerce positioning** retained over 2024 personal-finance. *High.* **$12.43B TAM still not cited.** *High.*