import Effects from "./Effects";
import Faq from "./_components/Faq";
import SiteFooter from "./_components/SiteFooter";
import SiteHeader from "./_components/SiteHeader";

/** Small trust check used in the hero + closing rows. */
function TrustCheck({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6C6B7B] font-sans">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#12B76A] text-white">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {children}
    </span>
  );
}

/** The animated attention → growth journey bar (pure CSS, see globals.css). */
function JourneyBar() {
  const nodes = [
    { icon: "👀", label: "Attention" },
    { icon: "👆", label: "Click" },
    { icon: "💳", label: "Payment" },
    { icon: "🏦", label: "Bank alert" },
    { icon: "📈", label: "Growth" },
  ];
  return (
    <section className="overflow-hidden border-y border-[#ECEBF3] bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-9 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A99A8] font-sans">
          The journey from attention to revenue
        </p>
        <div className="jb-track">
          <div className="jb-line-bg">
            <div className="jb-line-fill" />
            <div className="jb-dot" />
          </div>
          <div className="jb-nodes">
            {nodes.map((n, i) => (
              <div key={n.label} className={`jb-node jb-n${i + 1}`}>
                <div className="jb-node-icon">{n.icon}</div>
                <div className="jb-node-pip" />
                <div className="jb-node-lbl">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Effects />
      <SiteHeader />

      <main className="relative overflow-x-clip">
        {/* ============================ HERO ============================ */}
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[760px] max-w-[120vw] h-[520px] bg-[#5F58F4]/15 rounded-full blur-[130px] opacity-50"></div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1fr_400px] lg:gap-16">
            {/* Copy */}
            <div className="[animation:fadeSlideIn_0.8s_ease-out_0.15s_both] animate-on-scroll animate">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#5F58F4]/20 bg-[#EEEDFE] px-4 py-2 text-[13px] font-bold text-[#5F58F4] font-sans">
                Turn social media attention into bank alerts.
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.04] tracking-tighter text-[#14132B] sm:text-5xl lg:text-6xl font-sans">
                Stop losing sales <br className="hidden sm:block" />
                in your <span className="text-[#5F58F4]">DMs.</span>
              </h1>
              <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-[#6C6B7B] font-sans">
                Create a checkout for any product or service. Share one link
                anywhere you sell. Customers pay in seconds, and money lands
                straight in your bank.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="/early-access"
                  className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#5F58F4] px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(95,88,244,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A43D6] font-sans"
                >
                  <span>Create your free checkout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full border border-[#E3E2EE] bg-white px-6 text-sm font-medium text-[#14132B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5F58F4] hover:text-[#5F58F4] font-sans"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                <TrustCheck>No website required</TrustCheck>
                <TrustCheck>Set up in under 60 seconds</TrustCheck>
                <TrustCheck>Money goes directly to your bank</TrustCheck>
              </div>
            </div>

            {/* Visual: customer journey */}
            <div className="[animation:fadeSlideIn_0.8s_ease-out_0.35s_both] animate-on-scroll animate relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-[90vw] bg-[#5F58F4]/10 rounded-full blur-[90px] -z-10 pointer-events-none"></div>
              <CustomerJourney />
            </div>
          </div>
        </section>

        {/* ===================== JOURNEY BAR (animation) ===================== */}
        <JourneyBar />

        {/* ============================ THE PROBLEM ============================ */}
        <section id="problem" className="scroll-mt-24 overflow-hidden bg-[#F5F4FF] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
              The problem
            </span>
            <h2 className="mt-3 max-w-[620px] text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
              Selling online shouldn&rsquo;t feel this hard.
            </h2>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[#6C6B7B] font-sans">
              Every day, thousands of businesses lose customers before they ever
              get paid. Not because people don&rsquo;t want to buy, but because
              buying takes too many steps.
            </p>

            <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Before: chat phone */}
              <div className="[animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate flex flex-col items-center gap-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ECEBF3] bg-white px-4 py-1.5 text-xs font-semibold text-[#6C6B7B] font-sans">
                  <span className="text-[#E5484D]">✕</span> The typical conversation
                </span>
                <WhatsAppPhone />
              </div>

              {/* After: Paypoint steps */}
              <div className="[animation:fadeSlideIn_0.8s_ease-out_0.35s_both] animate-on-scroll animate">
                <span className="inline-block rounded-full bg-[#EEEDFE] px-4 py-1.5 text-xs font-semibold text-[#5F58F4] font-sans">
                  With Paypoint
                </span>
                <div className="mt-5 flex flex-col">
                  {[
                    { t: "Customer sees your link", s: "In your bio, status, or post" },
                    { t: "Taps and sees your checkout", s: "A professional page with photo and price" },
                    { t: "Pays securely in 30 seconds", s: "No account number, no back-and-forth" },
                  ].map((step, i) => (
                    <div key={step.t} className="flex items-start gap-4 border-b border-[#ECEBF3] py-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#5F58F4] bg-[#EEEDFE] text-sm font-bold text-[#5F58F4]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold text-[#14132B] font-sans">{step.t}</p>
                        <p className="mt-0.5 text-[13px] text-[#6C6B7B] font-sans">{step.s}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#12B76A] bg-[#E7F8EF] text-[#0B7A4B]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-[#0B7A4B] font-sans">Money hits your bank</p>
                      <p className="mt-0.5 text-[13px] text-[#6C6B7B] font-sans">Directly. No app wallet. No waiting.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-12 text-center text-base leading-relaxed text-[#6C6B7B] font-sans">
              Every extra conversation creates another chance to lose a sale.
              <br className="hidden sm:block" />
              <span className="font-semibold text-[#14132B]">
                Paypoint removes the friction between interest and payment.
              </span>
            </p>
          </div>
        </section>

        {/* ============================ THE SOLUTION ============================ */}
        <section className="overflow-hidden bg-[#FAFAFE] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
              The solution
            </span>
            <h2 className="mt-3 max-w-[560px] text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
              One checkout. Every product. Every sale.
            </h2>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[#6C6B7B] font-sans">
              Whether you sell fashion, food, consulting, tickets, classes,
              beauty services, digital downloads, or handmade products, every
              offer deserves its own checkout.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { icon: "🛍️", title: "Products", tags: ["Fashion & clothing", "Food & groceries", "Electronics", "Jewellery & accessories"] },
                { icon: "✂️", title: "Services", tags: ["Photography & videography", "Consulting & coaching", "Freelance work", "Beauty & hair"] },
                { icon: "🎟️", title: "Events", tags: ["Tickets & admissions", "Bookings & reservations", "Deposits", "Class registrations"] },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="[animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate rounded-2xl border border-[#ECEBF3] bg-white p-6 transition-colors hover:border-[#5F58F4]"
                  style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                >
                  <div className="text-3xl">{c.icon}</div>
                  <h3 className="mt-4 text-[17px] font-bold text-[#14132B] font-sans">{c.title}</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {c.tags.map((t) => (
                      <li key={t} className="flex items-center gap-2.5 text-sm text-[#6C6B7B] font-sans">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full border-[1.5px] border-[#5F58F4] bg-[#EEEDFE]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="mb-5 text-[15px] text-[#6C6B7B] font-sans">
                Create it once. Share it anywhere. Get paid.
              </p>
              <a
                href="/early-access"
                className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#5F58F4] px-8 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(95,88,244,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A43D6] font-sans"
              >
                <span>Create your first checkout</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================ HOW IT WORKS ============================ */}
        <section id="how-it-works" className="scroll-mt-24 overflow-hidden bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
                From interest to bank alert
              </span>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
                How Paypoint works
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-[#6C6B7B] font-sans">
                Three steps. Under a minute. You&rsquo;re collecting payments.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                { n: "Step 1", icon: "🎨", title: "Create", body: "Create a checkout in under a minute. Upload a photo. Set your price. Add a title. Done. No website, no developer, no technical skills needed." },
                { n: "Step 2", icon: "🔗", title: "Share", body: "Paste your checkout link in your Instagram bio, WhatsApp status, TikTok profile, a DM, a tweet, anywhere your customers already are." },
                { n: "Step 3", icon: "💳", title: "Get paid", body: "Your customer pays securely. The money goes directly to your connected bank account. No wallet. No withdrawal request. No waiting." },
              ].map((s, i) => (
                <div
                  key={s.title}
                  className="[animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate rounded-2xl border border-[#ECEBF3] bg-[#FAFAFE] p-7"
                  style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                >
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#5F58F4] font-sans">
                    {s.n}
                    <span className="h-px flex-1 bg-[#EEEDFE]" />
                  </div>
                  <div className="mt-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#EEEDFE] p-3 text-2xl">
                    {s.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-[#14132B] font-sans">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#6C6B7B] font-sans">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ WHO IT'S FOR ============================ */}
        <section id="who-its-for" className="scroll-mt-24 overflow-hidden bg-[#F5F4FF] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
              Built for the way Africa sells
            </span>
            <h2 className="mt-3 max-w-[520px] text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
              Made for your business. Whatever you sell.
            </h2>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[#6C6B7B] font-sans">
              Paypoint doesn&rsquo;t replace the platforms you already sell on.
              It makes collecting payment on them effortless.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: "📸", title: "Instagram sellers", desc: "Turn profile visitors and DM conversations into completed payments, without a single back-and-forth." },
                { icon: "💬", title: "WhatsApp businesses", desc: "Stop sending account numbers. Send one checkout link instead. Customers pay in under 30 seconds." },
                { icon: "🎨", title: "Creators", desc: "Sell digital products, consultations, courses, and memberships without building a website." },
                { icon: "💼", title: "Freelancers", desc: "Invoice less. Get paid faster. Share your checkout link and let the money find you." },
                { icon: "🍲", title: "Food & restaurants", desc: "Collect deposits before delivery. Take pre-orders. Manage large orders without the payment chaos." },
                { icon: "🎪", title: "Event planners", desc: "Accept booking payments in minutes. Create a checkout for every event and share it instantly." },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="[animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate rounded-2xl border border-[#ECEBF3] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#5F58F4]"
                  style={{ animationDelay: `${0.1 + (i % 3) * 0.08}s` }}
                >
                  <div className="text-2xl">{c.icon}</div>
                  <h3 className="mt-3 text-[15px] font-bold text-[#14132B] font-sans">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#6C6B7B] font-sans">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ WHY PAYPOINT ============================ */}
        <section id="why-paypoint" className="scroll-mt-24 overflow-hidden bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
              Why businesses choose Paypoint
            </span>
            <h2 className="mt-3 max-w-[520px] text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
              Everything you need. Nothing you don&rsquo;t.
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { icon: "🏦", title: "Get paid directly", desc: "Money goes straight to your bank. Never ours. Paypoint is not a bank and never holds your funds. Every payment settles directly to the account you connect.", brand: true },
                { icon: "⚡", title: "Sell faster", desc: "The shorter the buying journey, the more customers complete payment. Paypoint removes every unnecessary step between interest and money in your account.", brand: false },
                { icon: "✨", title: "Build trust", desc: "Professional checkout pages, instant receipts, and a recognisable payment experience. Your buyers pay with confidence, and come back.", brand: false },
                { icon: "📊", title: "Track everything", desc: "Know who paid. When. For what. In one dashboard. See your collection rate, pending payments, and business performance, updated in real time.", brand: false },
              ].map((c) => (
                <div
                  key={c.title}
                  className={`[animation:fadeSlideIn_0.8s_ease-out_0.15s_both] animate-on-scroll animate rounded-2xl border p-7 ${
                    c.brand ? "border-[#5F58F4] bg-[#5F58F4]" : "border-[#ECEBF3] bg-[#FAFAFE]"
                  }`}
                >
                  <div className="text-3xl">{c.icon}</div>
                  <h3 className={`mt-4 text-xl font-bold tracking-tight font-sans ${c.brand ? "text-white" : "text-[#14132B]"}`}>
                    {c.title}
                  </h3>
                  <p className={`mt-2.5 text-sm leading-relaxed font-sans ${c.brand ? "text-white/75" : "text-[#6C6B7B]"}`}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== DASHBOARD SHOWCASE (real-time) ==================== */}
        <section className="relative overflow-hidden border-t border-[#ECEBF3] bg-[#FAFAFE] py-20 lg:py-28">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] max-w-[100vw] bg-[#5F58F4]/[0.06] rounded-full blur-[120px] pointer-events-none translate-x-1/3"></div>
          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div className="[animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate relative flex justify-center lg:order-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-[90vw] bg-[#5F58F4]/10 rounded-full blur-[90px] -z-10 pointer-events-none animate-pulse"></div>
              <DashboardPhone />
            </div>

            <div className="[animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate flex flex-col gap-6 lg:order-1">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#5F58F4] animate-pulse"></div>
                <span className="font-mono text-xs tracking-widest text-[#5F58F4] font-sans">YOUR DASHBOARD</span>
              </div>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
                Every payment, in real time.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#6C6B7B] font-sans">
                Know exactly who paid, what they paid for, and when it landed.
                Your dashboard turns every sale into clear, trackable data.
              </p>
              <ul className="mt-2 flex flex-col gap-5">
                {[
                  { lead: "Instant receipts, every time.", body: "Both you and your customer get a detailed receipt with a reference number the moment payment is confirmed." },
                  { lead: "See your money as it moves.", body: "Total collected, payments this month, and active pages, all updated live as customers pay." },
                  { lead: "You stay in control.", body: "Paypoint is not a wallet. Funds settle directly to the bank account you connect. Your money is your money." },
                ].map((p) => (
                  <li key={p.lead} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#5F58F4]"></span>
                    <p className="text-sm leading-relaxed text-[#33323F] font-sans">
                      <span className="font-semibold text-[#14132B]">{p.lead}</span>{" "}{p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================ BUYER TRUST ============================ */}
        <section className="overflow-hidden bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
              Why customers trust paying with Paypoint
            </span>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
              Your buyers pay with confidence.
            </h2>
            <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[#6C6B7B] font-sans">
              Buyer trust is how you get more sales. Every Paypoint checkout is
              built to answer the question every buyer asks before they pay.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: "🔒", title: "Secure payments", desc: "Bank-grade encryption on every payment. Card details are never exposed to the seller." },
                { icon: "🏦", title: "Money goes to the seller", desc: "Payment goes directly to the seller's connected bank account. Not to an intermediary. Not to a wallet. Straight to the bank." },
                { icon: "🧾", title: "Instant confirmation", desc: "Every buyer gets an instant payment receipt the moment their payment goes through. Shareable proof of purchase, every time." },
                { icon: "📱", title: "Works on any phone", desc: "Optimised for mobile. Works perfectly inside Instagram, WhatsApp, and TikTok in-app browsers. No download needed." },
                { icon: "🤝", title: "Know who you're paying", desc: "Every checkout shows the seller's name, logo, and the exact product. Buyers always know who they're paying and what they're getting." },
                { icon: "💬", title: "Contact the seller", desc: "One-tap WhatsApp and Instagram links on every checkout let buyers reach the seller before they pay. Questions, answered instantly." },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="[animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate rounded-2xl border border-[#ECEBF3] bg-[#FAFAFE] p-6 transition-all hover:-translate-y-1 hover:border-[#5F58F4] hover:bg-white"
                  style={{ animationDelay: `${0.1 + (i % 3) * 0.08}s` }}
                >
                  <div className="text-2xl">{c.icon}</div>
                  <h3 className="mt-3 text-[15px] font-bold text-[#14132B] font-sans">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#6C6B7B] font-sans">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ METRICS (pre-launch) ============================ */}
        <section className="overflow-hidden bg-[#FAFAFE] py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-[44px] font-sans">
              Growing with Nigerian businesses
            </h2>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#EEEDFE] bg-[#EEEDFE] px-5 py-2 text-[13px] font-bold text-[#5F58F4] font-sans">
              🚀 Launching soon, numbers are on the way
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { val: "10,000+", lbl: "Checkouts created" },
                { val: "₦500M+", lbl: "Processed" },
                { val: "25,000+", lbl: "Payments made" },
                { val: "99.9%", lbl: "Uptime" },
              ].map((m) => (
                <div key={m.lbl} className="relative overflow-hidden rounded-2xl border border-[#ECEBF3] bg-white p-7">
                  <div className="select-none blur-[6px]">
                    <div className="text-3xl font-bold tracking-tighter text-[#14132B] font-sans">{m.val}</div>
                    <div className="mt-1 text-[13px] font-medium text-[#6C6B7B] font-sans">{m.lbl}</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAFE]/70">
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#5F58F4] font-sans">
                      Coming soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ FAQ ============================ */}
        <section className="relative overflow-hidden border-t border-[#ECEBF3] bg-white py-20 lg:py-28">
          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5F58F4] font-sans">
                Questions &amp; answers
              </span>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                Everything you need to know.
              </h2>
            </div>
            <div className="[animation:fadeSlideIn_0.8s_ease-out_0.35s_both] animate-on-scroll animate">
              <Faq />
            </div>
          </div>
        </section>

        {/* ============================ FINAL CTA ============================ */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-6 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#6F68FF] to-[#5F58F4] px-8 py-16 text-center shadow-[0_30px_80px_-30px_rgba(95,88,244,0.5)] lg:px-20 lg:py-24">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#4A43D6]/30 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                {/* mini journey bar */}
                <div className="jb-mini mx-auto mb-8 max-w-[340px]">
                  <span className="jb-mini-node">👀</span>
                  <div className="jb-mini-line" />
                  <span className="jb-mini-node">👆</span>
                  <div className="jb-mini-line" />
                  <span className="jb-mini-node">💳</span>
                  <div className="jb-mini-line" />
                  <span className="jb-mini-node">🏦</span>
                  <div className="jb-mini-line" />
                  <span className="jb-mini-node">📈</span>
                </div>

                <h2 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-white lg:text-6xl font-sans">
                  Your next customer is ready to buy.
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-white/90 font-sans">
                  Don&rsquo;t lose another sale in your DMs. Create your checkout,
                  share one link, and start getting paid today.
                </p>
                <a
                  href="/early-access"
                  className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-[#5F58F4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] font-sans"
                >
                  <span>Create your free checkout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

/* ============================================================================
   PHONE MOCKUPS — reused across the page (updated content).
   ============================================================================ */

/** Dotted connector between customer-journey steps. */
function JourneyConnector() {
  return (
    <div className="flex flex-col items-center gap-1 py-1.5" aria-hidden>
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3E2EE]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3E2EE]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3E2EE]" />
    </div>
  );
}

/** Hero visual: the customer journey — from seeing your link to the bank alert. */
function CustomerJourney() {
  return (
    <div className="animate-[float_6s_ease-in-out_infinite] w-full max-w-[400px] rounded-[20px] border border-[#E3E2EE] bg-white p-6 shadow-2xl shadow-[#5F58F4]/10 font-sans">
      <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A99A8]">
        The customer journey
      </p>

      {/* Step 1 — sees your link */}
      <div className="flex items-center gap-3.5 rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] px-3.5 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E7F8EF] text-lg">📸</span>
        <div>
          <p className="text-[13px] font-bold text-[#14132B]">Sees your link</p>
          <p className="mt-px text-xs text-[#6C6B7B]">Instagram bio, WhatsApp status, TikTok</p>
        </div>
      </div>

      <JourneyConnector />

      {/* Step 2 — taps the checkout */}
      <div className="flex items-center gap-3.5 rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] px-3.5 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEEDFE] text-lg">🔗</span>
        <div>
          <p className="text-[13px] font-bold text-[#14132B]">Taps your checkout</p>
          <p className="mt-px text-xs text-[#6C6B7B]">paypoint.co/p/your-product</p>
        </div>
      </div>

      <JourneyConnector />

      {/* Step 3 — pays on the checkout */}
      <div className="rounded-xl border border-[#ECEBF3] bg-white p-3.5 shadow-[0_8px_24px_-16px_rgba(20,19,43,0.25)]">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#14132B]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5F58F4] text-[8px] font-bold text-white">A</span>
            Adaeze Couture
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#6C6B7B]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure
          </span>
        </div>
        <p className="text-[11px] text-[#6C6B7B]">Aso Oke Dress</p>
        <p className="text-xl font-bold tracking-tight text-[#14132B]">₦35,000</p>
        <div className="mt-2 rounded-lg bg-[#5F58F4] py-2 text-center text-xs font-bold text-white">
          Pay ₦35,000
        </div>
        <p className="mt-1.5 text-center text-[10px] text-[#9A99A8]">Secure payment · Instant receipt</p>
      </div>

      <JourneyConnector />

      {/* Step 4 — the bank alert */}
      <div className="flex items-start gap-2.5 rounded-xl bg-[#5F58F4] px-3.5 py-3 shadow-[0_10px_30px_-12px_rgba(95,88,244,0.6)]">
        <span className="text-lg" aria-hidden>🔔</span>
        <div>
          <p className="text-[11px] font-bold text-white/70">GTBank · Credit Alert</p>
          <p className="mt-0.5 text-base font-bold tracking-tight text-white">₦35,000.00 received</p>
          <p className="mt-0.5 text-[10px] text-white/60">From CHIDINMA OKEKE — Aso Oke Dress</p>
        </div>
      </div>
    </div>
  );
}

/** The typical WhatsApp back-and-forth before Paypoint: the friction, in brand colors. */
function WhatsAppPhone() {
  return (
    <div className="animate-[float_6s_ease-in-out_infinite] border-[8px] overflow-hidden z-20 flex flex-col bg-[#050505] w-[290px] sm:w-[320px] max-w-full h-[600px] sm:h-[640px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[48px] relative shadow-2xl shadow-[#5F58F4]/10">
      <div className="absolute top-0 w-full h-7 z-50 flex justify-center pt-2 pointer-events-none">
        <div className="w-24 h-6 bg-black rounded-full relative flex items-center justify-end px-2 gap-1.5 shadow-sm border border-white/5">
          <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
        </div>
      </div>
      <div className="w-full flex-1 bg-[#ECE5DD] flex flex-col relative overflow-hidden font-sans">
        {/* Header — the seller you're messaging */}
        <div className="pt-11 pb-3 px-4 flex items-center gap-3 bg-[#0A8F57] relative z-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-white/90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center text-sm font-bold text-white">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Adaeze Couture</p>
            <p className="text-[10px] text-white/75">online</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-white/90" fill="currentColor">
            <path d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
          </svg>
        </div>

        {/* The endless back-and-forth */}
        <div className="flex-1 px-4 py-5 flex flex-col gap-2.5 overflow-hidden">
          <div className="self-end max-w-[80%] bg-[#DCF8C6] rounded-2xl rounded-tr-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">Hi, is the Aso Oke available?</p>
            <span className="block text-right text-[9px] text-[#6C6B7B] mt-1">2:04 PM <span className="text-[#4FA9F5]">✓✓</span></span>
          </div>

          <div className="self-start max-w-[80%] bg-white rounded-2xl rounded-tl-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">Yes it is! 😊</p>
            <span className="block text-right text-[9px] text-[#9A99A8] mt-1">2:06 PM</span>
          </div>

          <div className="self-end max-w-[80%] bg-[#DCF8C6] rounded-2xl rounded-tr-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">How much?</p>
            <span className="block text-right text-[9px] text-[#6C6B7B] mt-1">2:06 PM <span className="text-[#4FA9F5]">✓✓</span></span>
          </div>

          <div className="self-start max-w-[80%] bg-white rounded-2xl rounded-tl-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">₦35,000 🙏</p>
            <span className="block text-right text-[9px] text-[#9A99A8] mt-1">2:08 PM</span>
          </div>

          <div className="self-end max-w-[80%] bg-[#DCF8C6] rounded-2xl rounded-tr-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">Ok. What&rsquo;s your account number?</p>
            <span className="block text-right text-[9px] text-[#6C6B7B] mt-1">2:09 PM <span className="text-[#4FA9F5]">✓✓</span></span>
          </div>

          <div className="self-start max-w-[80%] bg-white rounded-2xl rounded-tl-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">
              GTBank<br />
              <span className="font-semibold">0123456789</span><br />
              Adaeze Couture
            </p>
            <span className="block text-right text-[9px] text-[#9A99A8] mt-1">2:11 PM</span>
          </div>

          <div className="self-end max-w-[80%] bg-[#DCF8C6] rounded-2xl rounded-tr-md px-3.5 py-2 shadow-sm">
            <p className="text-[13px] text-[#14132B] leading-snug">Got it, sending now 🙏</p>
            <span className="block text-right text-[9px] text-[#6C6B7B] mt-1">2:12 PM <span className="text-[#4FA9F5]">✓✓</span></span>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-3 py-3 bg-[#ECE5DD] flex items-center gap-2">
          <div className="flex-1 h-9 rounded-full bg-white flex items-center px-4 text-[11px] text-[#9A99A8]">Type a message</div>
          <div className="w-9 h-9 rounded-full bg-[#0A8F57] flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Seller dashboard mockup. */
function DashboardPhone() {
  return (
    <div className="border-[8px] overflow-hidden z-20 flex flex-col bg-[#0A0A0A] w-[300px] sm:w-[320px] max-w-full h-[600px] sm:h-[640px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[48px] relative shadow-2xl">
      <div className="absolute top-0 w-full h-8 z-50 flex justify-center pt-2.5 pointer-events-none">
        <div className="w-28 h-7 bg-black rounded-full relative flex items-center justify-end px-3 gap-2 z-50">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
        </div>
      </div>

      <div className="w-full flex-1 bg-[#FAFAFE] flex flex-col relative overflow-y-auto no-scrollbar font-sans pb-20">
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md pt-14 pb-4 px-5 border-b border-[#ECEBF3] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#EEEDFE] w-10 h-10 rounded-full px-0.5 py-0.5">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/63742d70-5f5b-4f91-bcd7-d6e4040161a3_320w.webp" alt="User" className="bg-white w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <p className="text-[10px] text-[#9A99A8] uppercase tracking-wider font-semibold">Welcome back</p>
              <p className="text-sm font-bold text-[#14132B]">Adaeze</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#FAFAFE] border border-[#ECEBF3] flex items-center justify-center text-[#33323F] relative">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7" opacity=".5" />
              <path fill="currentColor" d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0" />
            </svg>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#B42318] rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="px-5 pt-6 space-y-6">
          <div className="overflow-hidden bg-[#5F58F4] w-full bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/88535185-ff8d-4faa-b0f0-816876a8ba7a_800w.webp)] bg-cover bg-center rounded-[32px] pt-6 pr-6 pb-6 pl-6 relative shadow-[0_10px_40px_-10px_rgba(95,88,244,0.3)]">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
            <div className="-left-10 bg-[#5F58F4]/20 w-32 h-32 rounded-full absolute bottom-0 blur-2xl"></div>
            <div className="relative z-20 flex justify-between items-start">
              <div>
                <div className="inline-flex bg-white/10 rounded-full mb-2 px-2.5 py-1 backdrop-blur-sm gap-x-1.5 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="text-white">
                    <path fill="currentColor" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082" opacity=".5" />
                    <path fill="currentColor" d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z" />
                  </svg>
                  <span className="text-[10px] uppercase font-bold text-white tracking-wide">Total collected</span>
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tighter">₦320,000</h2>
              </div>
              <div className="flex text-white bg-white/20 w-10 h-10 rounded-full backdrop-blur-md items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="text-white">
                  <path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5" />
                  <path fill="currentColor" d="M14.5 10.75a.75.75 0 0 1 0-1.5H17a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-2.013 2.013a1.75 1.75 0 0 1-2.474 0l-1.586-1.586a.25.25 0 0 0-.354 0L7.53 14.53a.75.75 0 0 1-1.06-1.06l2.293-2.293a1.75 1.75 0 0 1 2.474 0l1.586 1.586a.25.25 0 0 0 .354 0l2.012-2.013z" />
                </svg>
              </div>
            </div>
            <div className="relative z-20 mt-6">
              <svg className="w-[228px] h-[48px] text-white" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,25 C10,25 10,10 20,15 C30,20 30,5 40,10 C50,15 50,25 60,20 C70,15 70,5 80,10 C90,15 90,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
              </svg>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[11px] font-bold text-white/70">42 payments this month</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-semibold text-[#9A99A8] uppercase tracking-wider">Recent Activity</h3>
              <button className="text-[10px] text-[#5F58F4] font-bold">View All</button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { n: "Chidinma Okeke", item: "Aso Oke Dress", amt: "₦35,000", status: "Paid", ok: true },
                { n: "Tunde A.", item: "CV Writing", amt: "₦25,000", status: "Paid", ok: true },
                { n: "Ngozi E.", item: "Bridal Gele", amt: "₦18,000", status: "Pending", ok: false },
              ].map((r) => (
                <div key={r.n} className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-sm font-bold text-[#5F58F4]">
                      {r.n.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#14132B]">{r.n}</p>
                      <p className="text-[10px] text-[#9A99A8]">{r.item}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-xs font-bold text-[#14132B]">{r.amt}</p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${r.ok ? "text-[#0B7A4B] bg-[#E7F8EF]" : "text-[#9A5A00] bg-[#FEF0DC]"}`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-12"></div>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-[#9A99A8]/40 rounded-full z-[60] pointer-events-none"></div>
    </div>
  );
}
