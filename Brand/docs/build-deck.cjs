/* Builds a branded Paypoint pitch-deck HTML (one slide per landscape page). */
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'Logo Assets');
const b64 = (p) => 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
const ICON_INDIGO = b64(path.join(ASSETS, 'Iconmark', 'PNG', 'Electric Blue.png'));
const WORD_INDIGO = b64(path.join(ASSETS, 'Wordmark', 'PNG', 'Electric Blue.png'));
const WORD_MINT = b64(path.join(ASSETS, 'Wordmark', 'PNG', 'Mint Green.png'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- embed Inter (local TTFs) ----------------------------------------------
const FONTS = path.join(__dirname, '..', 'Fonts-Inter', 'static');
const fontB64 = (f) => 'data:font/ttf;base64,' + fs.readFileSync(path.join(FONTS, f)).toString('base64');
const FACE = (file, weight) => `@font-face{font-family:'Inter';font-style:normal;font-weight:${weight};font-display:swap;src:url(${fontB64(file)}) format('truetype');}`;
const FONT_FACES = [
  FACE('Inter_24pt-Regular.ttf', 400),
  FACE('Inter_24pt-Medium.ttf', 500),
  FACE('Inter_24pt-SemiBold.ttf', 600),
  FACE('Inter_24pt-Bold.ttf', 700),
].join('\n');

// ---- slide builders ---------------------------------------------------------
let SLIDES = [];
const total = () => 16;
function add(html) { SLIDES.push(html); }

function eyebrow(n, label) {
  return `<div class="eyebrow"><span class="kicker">${esc(label)}</span></div>`;
}
function chrome(n) {
  return `<div class="chrome"><img class="mark" src="${ICON_INDIGO}" alt=""/>
    <span class="cnum">${n} / ${total()}</span></div>`;
}
function contentSlide(n, label, title, bodyHtml, opts = {}) {
  return `<section class="slide ${opts.cls || ''}">
    ${eyebrow(n, label)}
    <h1 class="title">${title}</h1>
    <div class="body">${bodyHtml}</div>
    ${chrome(n)}
  </section>`;
}

// bullet list
const ul = (items) => `<ul class="bullets">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
const lead = (t) => `<p class="lead">${t}</p>`;
const source = (t) => `<p class="source">${esc(t)}</p>`;

// 1 — COVER
add(`<section class="slide cover">
  <div class="cover-inner">
    <img class="cover-word" src="${WORD_MINT}" alt="Paypoint"/>
    <h1 class="cover-h">Turn any product or service into a professional checkout in seconds.</h1>
    <p class="cover-sub">Commerce infrastructure for Africa's social sellers.</p>
    <div class="cover-meta">
      <span>Pre-Seed</span><i></i><span>2026</span><i></i><span>Confidential</span>
    </div>
    <p class="cover-founder">Founder: Yvonne &nbsp;•&nbsp; Lagos, Nigeria</p>
  </div>
  <div class="cover-glow"></div>
</section>`);

// 2 — PROBLEM
add(contentSlide(2, 'The Problem', 'Selling online is still too hard',
  lead(`Across Africa, a new generation of entrepreneurs build real businesses inside Instagram, TikTok, Facebook and WhatsApp — but the tools they use to get paid were built for <b>websites, not chats</b>.`) +
  ul([
    `To sell today, a merchant stitches together a website, a payment setup, manual invoices, manual order tracking and manual payment confirmations.`,
    `The result: <b>friction, lost trust, abandoned sales</b>, and a checkout that doesn't look professional.`,
    `Small businesses are roughly <b>90% of all businesses in Africa</b>, yet most payment tools assume a website.`,
  ]) +
  source(`Source: World Bank / Mastercard (Sub-Saharan Africa ~44M MSMEs); Nigerian Communications Commission (40M+ Nigerians used social media for commerce in 2023).`)
));

// 3 — WHY NOW
add(contentSlide(3, 'Why Now', 'Social commerce is exploding.<br/>The payment layer hasn\'t caught up.',
  `<div class="stat-row">
     <div class="stat"><div class="stat-n">$2.04B→$3.96B</div><div class="stat-l">Nigeria social commerce, 2025→2030 (~24%/yr)</div></div>
     <div class="stat"><div class="stat-n">$9.43B</div><div class="stat-l">Africa social commerce by 2030 (16.2% CAGR)</div></div>
     <div class="stat"><div class="stat-n">40%+</div><div class="stat-l">of internet users in NG/KE/ZA already buy via social</div></div>
     <div class="stat"><div class="stat-n">60%+</div><div class="stat-l">of African e-commerce is mobile — checkout must be mobile-first</div></div>
   </div>` +
  lead(`The buying journey moved to social. The way sellers get paid did not move with it.`) +
  source(`Source: Research & Markets Social Commerce Databooks (2025); Sagaci Research (2024); Africa E-Commerce Market reports (2025–26).`)
));

// 4 — SOLUTION
add(contentSlide(4, 'The Solution', 'Meet Paypoint',
  lead(`Paypoint lets anyone create a professional checkout experience in <b>under 30 seconds</b>. No website. No code. No complicated setup.`) +
  `<div class="three">
     <div class="card"><div class="card-k">Create</div><p>A product, service, event, class, consultation or digital product.</p></div>
     <div class="card"><div class="card-k">Generate</div><p>A checkout page, a shareable payment link and a receipt.</p></div>
     <div class="card"><div class="card-k">Share</div><p>Anywhere your customers already are — and get paid.</p></div>
   </div>` +
  `<p class="pill-note">Money settles directly to the seller's bank account. <b>Paypoint never holds the seller's funds.</b></p>`
));

// 5 — PRODUCT
add(contentSlide(5, 'Product', `From "send me your account number" to a checkout a stranger trusts`,
  `<div class="steps">
     <div class="step"><span class="step-n">1</span><div><b>Create</b><p>Add what you sell, a price and a photo.</p></div></div>
     <div class="step"><span class="step-n">2</span><div><b>Share</b><p>One link — to a bio, a chat, a post or a QR code.</p></div></div>
     <div class="step"><span class="step-n">3</span><div><b>Pay</b><p>The buyer pays on a clean, branded, secure page.</p></div></div>
     <div class="step"><span class="step-n">4</span><div><b>Receipt</b><p>An instant receipt and record for buyer and seller.</p></div></div>
   </div>`
));

// 6 — MARKET SIZE
add(contentSlide(6, 'Market Size', 'A large, fast-growing flow of payments with no checkout layer',
  lead(`Paypoint's revenue scales with the payment volume it processes: <b>Revenue = GMV × take rate</b>. The market is sized the same way.`) +
  `<div class="tam">
     <div class="tam-ring tam-1"><span class="tam-k">TAM</span><span class="tam-v">$2.04B → $3.96B</span><span class="tam-d">Nigeria social-commerce GMV (2025→2030)</span></div>
     <div class="tam-ring tam-2"><span class="tam-k">SAM</span><span class="tam-v">Social-first sellers</span><span class="tam-d">GMV from sellers needing a hosted, trusted checkout</span></div>
     <div class="tam-ring tam-3"><span class="tam-k">SOM</span><span class="tam-v">Active sellers × GMV × take rate</span><span class="tam-d">over the next 3 years</span></div>
   </div>` +
  `<p class="pill-note">Continental upside: Africa social-commerce GMV on track for <b>~$9.43B by 2030</b>.</p>`
));

// 7 — BUSINESS MODEL
add(contentSlide(7, 'Business Model', 'We earn when sellers get paid — and we\'re building to own the rail',
  `<div class="phase-grid">
     <div class="phase"><div class="phase-k">Phase 1 · Today</div>
       <p><b>Transaction fee</b> — a small fee on every successful payment. Revenue from the first sale, no acquisition cost to start earning.</p>
       <p><b>Pro subscription</b> — a monthly plan for power sellers (custom domain, unlimited pages, branding, analytics, priority support). Predictable recurring revenue.</p></div>
     <div class="phase phase-hi"><div class="phase-k">Phase 2 · CBN PSSP license</div>
       <p>Paypoint secures its own <b>Payment Solution Service Provider</b> license and processes payments directly — capturing the full processing margin and removing dependence on third parties.</p>
       <p>Still <b>never holds customer funds</b>; settlement goes to the seller's bank — lighter to regulate than a bank or wallet.</p></div>
     <div class="phase"><div class="phase-k">Future</div>
       <p>Once the payment flow runs through Paypoint, layer <b>payouts and working-capital advances</b> — growing revenue per seller well beyond the transaction.</p></div>
   </div>`
));

// 8 — WHY WE WIN
add(contentSlide(8, 'Why We Win', 'Built social-first, and built to own the stack',
  `<div class="two-col">${ul([
    `<b>Social-commerce first</b> — designed for sellers in chats and feeds, not a website tool retrofitted for them.`,
    `<b>Radical simplicity</b> — publish a checkout in 30 seconds, no code.`,
    `<b>Trust by design</b> — brand, price, delivery, proof of past sales and an instant receipt on every page.`,
    `<b>Own the infrastructure</b> — rail-independent today; vertically integrated tomorrow.`,
    `<b>No custody risk</b> — we never custody funds, so we scale faster and face fewer hurdles than fund-holding fintechs.`,
    `<b>Distribution built in</b> — every checkout is branded and turns buyers into the next sellers.`,
  ])}</div>`
));

// 9 — COMPETITIVE
add(contentSlide(9, 'Competitive Landscape', 'We don\'t replace the rails. We\'re the layer sellers actually use.',
  `<table class="cmp">
     <tr><th>Approach</th><th>What it offers</th></tr>
     <tr class="cmp-hi"><td><b>Paypoint</b></td><td>30-second setup, professional branded checkout, no website needed, built for micro &amp; social sellers, share-native.</td></tr>
     <tr><td>Payment gateways</td><td>Powerful, but built for businesses that can integrate and manage them.</td></tr>
     <tr><td>Online store builders</td><td>Capable, but heavy and slow to set up for a single product or service.</td></tr>
     <tr><td>Manual / bank transfer</td><td>Free, but untrusted, unstructured and unprofessional.</td></tr>
   </table>` +
  `<p class="pill-note">Paypoint is the simplest trusted checkout for the social seller — and is acquiring its own processing license to own the full experience.</p>`
));

// 10 — GTM
add(contentSlide(10, 'Go to Market', 'Reach sellers where they already sell',
  ul([
    `<b>Phase 1: Nigeria</b> — Instagram &amp; WhatsApp sellers, coaches, consultants, event organisers and digital creators.`,
    `<b>Viral loop</b> — every shared checkout is branded, so buyers discover Paypoint and become sellers. Near-zero acquisition cost.`,
    `<b>Creator ambassadors</b> — partner with fashion, beauty, food and coaching creators who command seller audiences.`,
    `<b>Community onboarding</b> — through trade groups, market associations and creator programs; seller-by-seller, then in cohorts.`,
    `<b>Referral program</b> — reward sellers who bring sellers.`,
    `<b>The wedge</b> — be the default checkout for one vertical, then expand outward.`,
  ])
));

// 11 — TRACTION
add(contentSlide(11, 'Traction', 'Early signal, real momentum',
  `<div class="kpi-row">
     <div class="kpi"><div class="kpi-n">[ # ]</div><div class="kpi-l">Active sellers onboarded</div></div>
     <div class="kpi"><div class="kpi-n">₦ [ &nbsp; ]</div><div class="kpi-l">Payment volume (GMV)</div></div>
     <div class="kpi"><div class="kpi-n">[ # ]</div><div class="kpi-l">Payments completed</div></div>
     <div class="kpi"><div class="kpi-n">[ % ]</div><div class="kpi-l">Month-over-month growth</div></div>
   </div>` +
  `<p class="pill-note">Proof points: a standout seller quote, a weekly-volume chart, or a logo wall of early adopters.</p>` +
  source(`Note: replace every figure with live numbers before sending. If pre-launch, reframe as waitlist / pilot sellers / letters of intent.`)
));

// 12 — FINANCIALS
add(contentSlide(12, 'Financial Projections', 'The model: GMV × take rate, plus Pro subscriptions',
  `<table class="fin">
     <tr><th>Year</th><th>Active sellers</th><th>GMV</th><th>Revenue</th></tr>
     <tr><td>Year 1</td><td>1,000</td><td>~₦6.0B (~$4.3M)</td><td>~₦72M (~$51K)</td></tr>
     <tr><td>Year 2</td><td>10,000</td><td>~₦60B (~$43M)</td><td>~₦720M (~$514K)</td></tr>
     <tr class="cmp-hi"><td>Year 3</td><td>50,000</td><td>~₦300B (~$214M)</td><td>~₦3.6B (~$2.57M)</td></tr>
   </table>` +
  `<p class="assump">Assumptions (directional): avg order ₦25,000; ~20 transactions/active seller/month (~₦500k GMV); 1.0% take rate; 10% of actives on Pro at ₦10,000/mo. After the PSSP license, processing margin is captured directly, lifting contribution margin further.</p>` +
  source(`Source: Author's model. FX ~₦1,400/USD (June 2026, fluctuates). Adjust take rate and pricing once finalised.`)
));

// 13 — ROADMAP
add(contentSlide(13, 'Future Roadmap', 'From checkout to the seller\'s financial home',
  `<div class="road">
     <div class="road-step"><div class="road-k">Now · 0–6 mo</div><p><b>Checkout MVP.</b> Payment pages, shareable links, receipts, payments dashboard. One vertical, Nigeria.</p></div>
     <div class="road-step"><div class="road-k">Next · 6–12 mo</div><p><b>The seller storefront.</b> Multi-product pages, custom link &amp; domain, QR, trust signals, a second payment route for resilience.</p></div>
     <div class="road-step"><div class="road-k">Then · 12–24 mo</div><p><b>Recurring &amp; intelligence.</b> Subscriptions, invoicing, light CRM, analytics, Pro scaling. Secure the CBN PSSP license.</p></div>
     <div class="road-step"><div class="road-k">Vision · 24 mo+</div><p><b>The seller's money OS.</b> Own processing at scale, multi-currency, new African markets, payouts &amp; working-capital advances.</p></div>
   </div>`
));

// 14 — VISION
add(contentSlide(14, 'Product & Community Vision', 'Trust is the product; community is how it spreads',
  `<div class="two-col vis">
     <div><div class="vis-k">Product vision</div><p>Every African who can sell something should get paid like a professional business: in under a minute, no website, no code, no technical skill — on a checkout a stranger trusts instantly. Paypoint grows from the page that collects the money into the operating system that runs the seller's commerce: their storefront, records, customers, and eventually access to capital.</p></div>
     <div><div class="vis-k">Community vision</div><p>Paypoint grows like a movement of sellers who teach each other, not like ordinary software. Every checkout recruits the next seller. Seller circles, creator ambassadors and trade-group cohorts drive onboarding. Over time, "I sell on Paypoint" becomes a mark of a legitimate, trusted seller.</p></div>
   </div>`
));

// 15 — THE ASK
add(contentSlide(15, 'The Ask', 'Raising $350,000 Pre-Seed',
  `<p class="pill-note big">Headline strategic use: <b>secure our own CBN payment processing license (PSSP)</b> and own our infrastructure.</p>` +
  `<div class="two-col">${ul([
    `<b>Regulatory &amp; licensing</b> — ~₦100M (~$70K) minimum regulatory capital held by the company, plus ~₦1.1M (~$800) CBN fees, plus legal &amp; compliance.`,
    `<b>Product &amp; engineering</b> — ship the full platform, payments reliability and the Pro tier.`,
    `<b>Go-to-market</b> — seller acquisition, creator partnerships and the viral loop.`,
    `<b>Team &amp; operations</b> — first key hires, compliance, support and buffer.`,
  ])}</div>` +
  `<p class="source">Runway 18–24 months. Note: the ₦100M PSSP requirement is regulatory capital the company must HOLD (historically deposited with the CBN, returned with interest after approval), not a spent fee. One 2025 advisory cites ₦250M — confirm the current figure with a fintech lawyer.</p>`
));

// 16 — CLOSING
add(`<section class="slide cover closing">
  <div class="cover-inner">
    <img class="cover-word" src="${WORD_MINT}" alt="Paypoint"/>
    <h1 class="cover-h">Every seller deserves a checkout strangers instantly trust.</h1>
    <p class="cover-sub">We're building the commerce infrastructure layer for Africa's social sellers — and we're building to own it.</p>
    <p class="cover-founder">Yvonne &nbsp;•&nbsp; [ email ] &nbsp;•&nbsp; [ phone ] &nbsp;•&nbsp; paypoint.co</p>
  </div>
  <div class="cover-glow"></div>
</section>`);

// ---- page shell -------------------------------------------------------------
const CSS = `
@page { size: 1280px 720px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root{
  --brand:#5F58F4; --brand-hover:#4A43D6; --tint:#EEEDFE; --tint-soft:#F5F4FF;
  --ink:#14132B; --text:#33323F; --muted:#6C6B7B; --subtle:#9A99A8;
  --bg:#FFFFFF; --bg-soft:#FAFAFE; --border:#ECEBF3; --border-strong:#E3E2EE;
}
html,body{ font-family:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif; color:var(--text); -webkit-font-smoothing:antialiased; }
.slide{ position:relative; width:1280px; height:720px; background:var(--bg); padding:64px 76px; overflow:hidden; page-break-after:always; display:flex; flex-direction:column; }
.slide:last-child{ page-break-after:auto; }

/* chrome */
.eyebrow{ margin-bottom:18px; }
.kicker{ display:inline-block; font-size:13px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--brand); background:var(--tint); padding:7px 14px; border-radius:999px; }
.title{ font-size:46px; line-height:1.1; font-weight:700; letter-spacing:-.02em; color:var(--ink); max-width:1000px; }
.body{ margin-top:30px; flex:1; }
.chrome{ position:absolute; left:76px; right:76px; bottom:30px; display:flex; align-items:center; justify-content:space-between; }
.chrome .mark{ height:24px; opacity:.9; }
.chrome .cnum{ font-size:12px; font-weight:600; color:var(--subtle); letter-spacing:.04em; }

.lead{ font-size:21px; line-height:1.55; color:var(--text); max-width:980px; margin-bottom:22px; }
.lead b, .bullets b, .card p b, .phase p b, .road-step p b, .vis p b{ color:var(--ink); font-weight:700; }
.bullets{ list-style:none; }
.bullets li{ font-size:18px; line-height:1.5; color:var(--text); padding-left:26px; position:relative; margin-bottom:15px; }
.bullets li::before{ content:""; position:absolute; left:0; top:9px; width:9px; height:9px; border-radius:50%; background:var(--brand); }
.two-col .bullets{ columns:2; column-gap:48px; }
.two-col .bullets li{ break-inside:avoid; }
.source{ font-size:12.5px; color:var(--subtle); line-height:1.5; margin-top:18px; max-width:1000px; }
.pill-note{ font-size:17px; color:var(--text); background:var(--tint-soft); border:1px solid var(--border); border-left:4px solid var(--brand); padding:16px 20px; border-radius:12px; margin-top:22px; line-height:1.5; }
.pill-note.big{ font-size:19px; }

/* cover */
.cover{ background:var(--brand); color:#fff; justify-content:center; padding:0 96px; }
.cover-inner{ position:relative; z-index:2; max-width:920px; }
.cover-word{ height:62px; margin-bottom:40px; }
.cover-h{ font-size:50px; line-height:1.1; font-weight:700; letter-spacing:-.02em; color:#fff; }
.cover-sub{ font-size:22px; color:#E7E6FF; margin-top:22px; font-weight:500; }
.cover-meta{ display:flex; align-items:center; gap:14px; margin-top:40px; font-size:14px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:#CFCDFF; }
.cover-meta i{ width:4px; height:4px; border-radius:50%; background:#9C97FF; display:inline-block; }
.cover-founder{ margin-top:18px; font-size:15px; color:#D9D7FF; }
.cover-glow{ position:absolute; width:900px; height:900px; right:-280px; top:-340px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 62%); z-index:1; }
.closing .cover-glow{ right:auto; left:-300px; top:auto; bottom:-360px; }

/* three cards */
.three{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin:8px 0 4px; }
.card{ background:var(--bg-soft); border:1px solid var(--border); border-radius:16px; padding:24px; }
.card-k{ font-size:17px; font-weight:700; color:var(--brand); margin-bottom:10px; }
.card p{ font-size:15.5px; line-height:1.5; color:var(--text); }

/* stats */
.stat-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:8px; }
.stat{ background:var(--bg-soft); border:1px solid var(--border); border-radius:16px; padding:22px; }
.stat-n{ font-size:26px; font-weight:700; color:var(--ink); letter-spacing:-.01em; }
.stat-l{ font-size:13.5px; line-height:1.45; color:var(--muted); margin-top:8px; }

/* steps */
.steps{ display:grid; grid-template-columns:repeat(2,1fr); gap:18px 40px; margin-top:8px; }
.step{ display:flex; gap:18px; align-items:flex-start; background:var(--bg-soft); border:1px solid var(--border); border-radius:16px; padding:22px 24px; }
.step-n{ flex-shrink:0; width:38px; height:38px; border-radius:50%; background:var(--brand); color:#fff; font-weight:700; font-size:18px; display:flex; align-items:center; justify-content:center; }
.step b{ font-size:18px; color:var(--ink); }
.step p{ font-size:15px; color:var(--muted); margin-top:4px; line-height:1.45; }

/* TAM rings */
.tam{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:4px 0; }
.tam-ring{ border-radius:16px; padding:24px; color:#fff; }
.tam-1{ background:var(--brand); } .tam-2{ background:#7A74F6; } .tam-3{ background:#A6A2FA; }
.tam-k{ display:block; font-size:13px; font-weight:700; letter-spacing:.14em; opacity:.85; }
.tam-v{ display:block; font-size:24px; font-weight:700; margin-top:8px; letter-spacing:-.01em; }
.tam-d{ display:block; font-size:13.5px; margin-top:8px; line-height:1.45; opacity:.92; }

/* phases */
.phase-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
.phase{ background:var(--bg-soft); border:1px solid var(--border); border-radius:16px; padding:22px; }
.phase-hi{ background:var(--tint); border-color:#D8D5FB; }
.phase-k{ font-size:15px; font-weight:700; color:var(--brand); margin-bottom:12px; }
.phase p{ font-size:14.5px; line-height:1.5; color:var(--text); margin-bottom:12px; }
.phase p:last-child{ margin-bottom:0; }

/* tables */
.cmp, .fin{ width:100%; border-collapse:separate; border-spacing:0; border:1px solid var(--border); border-radius:14px; overflow:hidden; }
.cmp th, .fin th{ background:var(--bg-soft); color:var(--subtle); font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.06em; text-align:left; padding:14px 20px; }
.cmp td, .fin td{ font-size:16px; color:var(--text); padding:16px 20px; border-top:1px solid var(--border); line-height:1.45; }
.cmp td:first-child{ width:230px; color:var(--ink); font-weight:600; }
.cmp-hi td{ background:var(--tint-soft); }
.cmp-hi td:first-child, .fin .cmp-hi td{ color:var(--brand); }
.fin td{ font-variant-numeric:tabular-nums; }
.fin td:first-child{ font-weight:600; color:var(--ink); }
.assump{ font-size:13.5px; color:var(--muted); line-height:1.5; margin-top:18px; background:var(--bg-soft); border:1px solid var(--border); border-radius:12px; padding:16px 18px; }

/* kpis */
.kpi-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.kpi{ background:var(--bg-soft); border:1px solid var(--border); border-radius:16px; padding:26px 22px; text-align:center; }
.kpi-n{ font-size:30px; font-weight:700; color:var(--brand); }
.kpi-l{ font-size:14px; color:var(--muted); margin-top:10px; line-height:1.4; }

/* roadmap */
.road{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.road-step{ background:var(--bg-soft); border:1px solid var(--border); border-radius:16px; padding:22px; border-top:4px solid var(--brand); }
.road-k{ font-size:14px; font-weight:700; color:var(--brand); margin-bottom:12px; letter-spacing:.02em; }
.road-step p{ font-size:14.5px; line-height:1.5; color:var(--text); }

/* vision */
.vis{ display:grid; grid-template-columns:1fr 1fr; gap:40px; }
.vis-k{ font-size:18px; font-weight:700; color:var(--brand); margin-bottom:14px; }
.vis p{ font-size:16px; line-height:1.6; color:var(--text); }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<title>Paypoint — Pitch Deck</title>
<style>${FONT_FACES}</style>
<style>${CSS}</style></head>
<body>${SLIDES.join('\n')}</body></html>`;

fs.writeFileSync(path.join(__dirname, 'Paypoint-Pitch-Deck.html'), html);
console.log('Wrote Paypoint-Pitch-Deck.html (' + SLIDES.length + ' slides)');
