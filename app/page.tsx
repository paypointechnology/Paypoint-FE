import Effects from "./Effects";
import Faq from "./_components/Faq";
import SiteFooter from "./_components/SiteFooter";
import SiteHeader from "./_components/SiteHeader";

/** Five gold stars, reusable across hero + testimonials. */
function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-[#F5A623]" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Effects />

      {/* Floating Pill Navigation - links unchanged */}
      <SiteHeader />

      <main className="relative overflow-x-clip">

          {/* ============================ HERO ============================ */}
          <section className="relative overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-28">

              {/* Subtle indigo glow behind hero */}
              <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[760px] max-w-[120vw] h-[520px] bg-[#5F58F4]/15 rounded-full blur-[130px] opacity-50"></div>
                  <div className="absolute top-40 left-1/2 -translate-x-[70%] w-[360px] h-[360px] bg-[#5F58F4]/10 rounded-full blur-[110px] opacity-40"></div>
              </div>

              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
                  <h1 className="[animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate text-4xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-5xl md:text-6xl lg:text-7xl font-sans">
                      Sell anything. <br className="hidden sm:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F58F4] via-[#7A74F6] to-[#4A43D6]">Get paid instantly.</span>
                  </h1>

                  <p className="[animation:fadeSlideIn_0.8s_ease-out_0.35s_both] animate-on-scroll animate mt-6 max-w-xl text-lg leading-relaxed text-[#33323F] sm:text-xl font-sans">
                      The fastest way for creators and small businesses in Nigeria to accept payments online, without building a website.
                  </p>

                  <div className="[animation:fadeSlideIn_0.8s_ease-out_0.5s_both] animate-on-scroll animate mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                      {/* Primary CTA */}
                      <a href="/coming-soon" className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#5F58F4] px-8 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(95,88,244,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A43D6] hover:shadow-[0_14px_40px_-10px_rgba(95,88,244,0.7)] sm:w-auto font-sans">
                          <span>Start free</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                          </svg>
                      </a>

                      {/* Secondary CTA - Watch demo */}
                      <a href="#" className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[#ECEBF3] bg-white px-6 text-sm font-medium text-[#14132B] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-[#5F58F4] sm:w-auto font-sans">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                              <path fill="#5F58F4" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clipRule="evenodd" opacity=".5" />
                              <path fill="#5F58F4" d="m15.414 13.059l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059l4.72 2.787c.781.462.781 1.656 0 2.118" />
                          </svg>
                          <span>Watch 30-sec demo</span>
                      </a>
                  </div>

                  <div className="[animation:fadeSlideIn_0.8s_ease-out_0.65s_both] animate-on-scroll animate mt-10 flex flex-col items-center gap-3">
                      <Stars size={18} />
                      <p className="max-w-md text-sm font-medium text-[#6C6B7B] font-sans">
                          Trusted by creators, freelancers, and social sellers across Nigeria.
                      </p>
                  </div>
              </div>
          </section>

          {/* ====================== HOW IT WORKS (3 STEPS) ====================== */}
          <div id="how-it-works" className="scroll-mt-24 overflow-hidden border-t border-[#ECEBF3] bg-white">

              {/* ----- STEP 01 / 03 - CREATE ----- */}
              <section className="relative overflow-hidden py-20 lg:py-28">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[100vw] bg-[#5F58F4]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>
                  <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

                      {/* Copy */}
                      <div className="[animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate flex flex-col gap-6 lg:order-1">
                          <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-[#5F58F4] animate-pulse"></div>
                              <span className="font-mono text-xs tracking-widest text-[#5F58F4] font-sans">01 / 03 · CREATE</span>
                          </div>
                          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                              Build a payment page in under a minute.
                          </h2>
                          <p className="max-w-md text-base leading-relaxed text-[#33323F] font-sans">
                              Add a title, set your price, and upload a photo. That&rsquo;s it. Your page is live and ready to share, no website, no code, no design skills needed.
                          </p>
                          <ul className="mt-2 flex flex-col gap-5">
                              {[
                                  { lead: "Built for anything you sell.", body: "Products, services, event tickets, deposits, digital downloads, if you can price it, you can sell it on Paypoint." },
                                  { lead: "Looks professional out of the box.", body: "Every page is mobile-first, beautifully designed, and includes your business name, photo, and trust signals automatically." },
                                  { lead: "No technical setup required.", body: "Skip the hosting, the plugins, and the developers. If you can send a WhatsApp message, you can build a Paypoint page." },
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

                      {/* Mockup - buyer-facing payment page (checkout) */}
                      <div className="[animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate relative flex justify-center lg:order-2">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-[90vw] bg-[#5F58F4]/10 rounded-full blur-[90px] -z-10 pointer-events-none animate-pulse"></div>

                          {/* Phone Frame (checkout) */}
                          <div className="animate-[float_6s_ease-in-out_infinite] border-[8px] overflow-hidden z-20 flex flex-col bg-[#050505] w-[290px] sm:w-[320px] max-w-full h-[600px] sm:h-[640px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[48px] relative shadow-2xl shadow-[#5F58F4]/10">
                              <div className="absolute top-0 w-full h-7 z-50 flex justify-center pt-2 pointer-events-none">
                                  <div className="w-24 h-6 bg-black rounded-full relative flex items-center justify-end px-2 gap-1.5 shadow-sm border border-white/5">
                                      <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                                  </div>
                              </div>
                              <div className="w-full flex-1 bg-[#FAFAFE] flex flex-col relative overflow-hidden font-sans">
                                  {/* Header */}
                                  <div className="pt-12 pb-4 px-5 flex justify-between items-center relative z-20">
                                      <button className="w-8 h-8 rounded-full bg-white border border-[#ECEBF3] flex items-center justify-center text-[#33323F]">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                              <path fill="currentColor" d="M11.55 15.7L8.12 12.27a.77.77 0 0 1 0-1.06l3.43-3.44c.79-.79 2.2-.22 2.2.89v6.13c0 1.12-1.41 1.68-2.2.91" opacity=".5" />
                                              <path fill="currentColor" d="M8.5 12c0-.41.34-.75.75-.75h9.5a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75" />
                                          </svg>
                                      </button>
                                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#ECEBF3] shadow-sm">
                                          <span className="w-4 h-4 rounded-full bg-[#5F58F4] flex items-center justify-center text-[8px] font-bold text-white">A</span>
                                          <span className="text-xs font-medium text-[#14132B] font-sans">Adaeze Couture</span>
                                      </div>
                                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EEEDFE] px-2.5 py-1 text-[10px] font-semibold text-[#5F58F4]">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                          </svg>
                                          Secure
                                      </span>
                                  </div>

                                  {/* Product */}
                                  <div className="px-6 mt-2 text-center relative z-10">
                                      <p className="text-sm font-medium text-[#33323F] mb-1 font-sans">Aso Oke Dress</p>
                                      <div className="inline-block relative">
                                          <h3 className="text-4xl text-[#14132B] tracking-tighter mb-1 font-sans font-semibold">₦35,000</h3>
                                      </div>
                                      <div className="flex justify-center items-center gap-3 text-[#33323F] mt-1">
                                          <span className="flex items-center gap-1 text-[11px] font-medium font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                  <circle cx="12" cy="10" r="3" />
                                              </svg>
                                              Nationwide · 3 days
                                          </span>
                                          <span className="flex items-center gap-1 text-[11px] font-medium text-[#5F58F4] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                              </svg>
                                              24 paid
                                          </span>
                                      </div>
                                  </div>

                                  {/* Product Image */}
                                  <div className="h-44 w-full relative mt-5 mb-5 px-6">
                                      <div className="w-full h-full rounded-3xl overflow-hidden relative bg-[#EEEDFE] border border-[#ECEBF3] flex items-center justify-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 opacity-80">
                                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                              <circle cx="9" cy="9" r="2" />
                                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                          </svg>
                                      </div>
                                  </div>

                                  {/* Pay Button */}
                                  <div className="px-5 mb-5">
                                      <button className="w-full flex items-center justify-center gap-2 bg-[#5F58F4] text-white rounded-2xl py-4 hover:bg-[#4A43D6] transition-all shadow-lg shadow-[#5F58F4]/30 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                          </svg>
                                          <span className="text-sm font-bold font-sans">Pay ₦35,000</span>
                                      </button>
                                  </div>

                                  {/* Trust footer */}
                                  <div className="flex-1 bg-white rounded-t-[24px] p-6 border-t border-[#ECEBF3] shadow-[0_-8px_24px_-12px_rgba(20,19,43,0.08)]">
                                      <div className="w-10 h-1 bg-[#ECEBF3] rounded-full mx-auto mb-5"></div>
                                      <div className="flex items-center justify-center gap-3">
                                          <span className="flex items-center gap-1 text-[10px] font-medium text-[#33323F] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                              </svg>
                                              Secure payment
                                          </span>
                                          <span className="w-1 h-1 rounded-full bg-[#ECEBF3]"></span>
                                          <span className="flex items-center gap-1 text-[10px] font-medium text-[#33323F] font-sans">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                                                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                              </svg>
                                              Instant receipt
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Caption */}
                          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-[#9A99A8] font-sans">
                              Secure payment · Instant receipt
                          </p>
                      </div>
                  </div>
              </section>

              {/* ----- STEP 02 / 03 - SHARE ----- */}
              <section className="relative overflow-hidden border-t border-[#ECEBF3] bg-[#FAFAFE] py-20 lg:py-28">
                  <div className="absolute top-1/2 right-0 w-[500px] h-[500px] max-w-[100vw] bg-[#5F58F4]/[0.06] rounded-full blur-[120px] pointer-events-none translate-x-1/3"></div>
                  <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

                      {/* Mockup - WhatsApp-style chat (left on desktop) */}
                      <div className="[animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate relative flex justify-center lg:order-1">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-[90vw] bg-[#5F58F4]/10 rounded-full blur-[90px] -z-10 pointer-events-none"></div>

                          {/* Phone Frame (chat) */}
                          <div className="animate-[float_6s_ease-in-out_infinite] border-[8px] overflow-hidden z-20 flex flex-col bg-[#050505] w-[290px] sm:w-[320px] max-w-full h-[600px] sm:h-[640px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[48px] relative shadow-2xl shadow-[#5F58F4]/10">
                              <div className="absolute top-0 w-full h-7 z-50 flex justify-center pt-2 pointer-events-none">
                                  <div className="w-24 h-6 bg-black rounded-full relative flex items-center justify-end px-2 gap-1.5 shadow-sm border border-white/5">
                                      <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                                  </div>
                              </div>

                              <div className="w-full flex-1 bg-[#ECE5DD] flex flex-col relative overflow-hidden font-sans">
                                  {/* Chat header */}
                                  <div className="pt-11 pb-3 px-4 flex items-center gap-3 bg-[#075E54] relative z-20">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-white/90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M15 18l-6-6 6-6" />
                                      </svg>
                                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">C</div>
                                      <div className="flex-1 min-w-0">
                                          <p className="text-sm font-semibold text-white truncate">Chidinma</p>
                                          <p className="text-[10px] text-white/70">online</p>
                                      </div>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-white/90" fill="currentColor">
                                          <path d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                                      </svg>
                                  </div>

                                  {/* Chat body */}
                                  <div className="flex-1 px-4 py-5 flex flex-col gap-3 overflow-hidden">
                                      {/* Incoming bubble */}
                                      <div className="self-start max-w-[80%] bg-white rounded-2xl rounded-tl-md px-3.5 py-2.5 shadow-sm">
                                          <p className="text-[13px] text-[#14132B] leading-snug">Hi! Do you still have the Aso Oke dress? 😍</p>
                                          <span className="block text-right text-[9px] text-[#9A99A8] mt-1">10:24</span>
                                      </div>

                                      {/* Outgoing bubble + link preview card */}
                                      <div className="self-end max-w-[85%] bg-[#DCF8C6] rounded-2xl rounded-tr-md p-1.5 shadow-sm">
                                          {/* Link preview card */}
                                          <div className="rounded-xl overflow-hidden bg-white border border-black/5">
                                              <div className="h-24 w-full bg-[#EEEDFE] flex items-center justify-center border-b border-[#ECEBF3]">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                      <circle cx="9" cy="9" r="2" />
                                                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                                  </svg>
                                              </div>
                                              <div className="px-3 py-2.5">
                                                  <p className="text-[11px] font-semibold text-[#14132B] leading-tight">Aso Oke Dress</p>
                                                  <div className="mt-1 flex items-center justify-between">
                                                      <span className="text-[13px] font-bold text-[#5F58F4]">₦35,000</span>
                                                      <span className="text-[9px] text-[#9A99A8]">paypoint.link</span>
                                                  </div>
                                              </div>
                                          </div>
                                          <p className="px-1.5 pt-1.5 pb-0.5 text-[12px] text-[#14132B] break-all">paypoint.link/aso-oke-dress</p>
                                          <span className="block text-right text-[9px] text-[#5a8a4a] pr-1.5 pb-0.5">10:25 ✓✓</span>
                                      </div>

                                      {/* Incoming reply */}
                                      <div className="self-start max-w-[80%] bg-white rounded-2xl rounded-tl-md px-3.5 py-2.5 shadow-sm">
                                          <p className="text-[13px] text-[#14132B] leading-snug">Just paid! 🎉</p>
                                          <span className="block text-right text-[9px] text-[#9A99A8] mt-1">10:26</span>
                                      </div>

                                      {/* Payment notification toast */}
                                      <div className="self-center mt-1 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 shadow-sm border border-black/5">
                                          <span className="w-5 h-5 rounded-full bg-[#E7F8EF] flex items-center justify-center text-[#0B7A4B]">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M20 6 9 17l-5-5" />
                                              </svg>
                                          </span>
                                          <span className="text-[10px] font-semibold text-[#14132B]">You got paid ₦35,000</span>
                                      </div>
                                  </div>

                                  {/* Input bar */}
                                  <div className="px-3 py-3 bg-[#ECE5DD] flex items-center gap-2">
                                      <div className="flex-1 h-9 rounded-full bg-white flex items-center px-4 text-[11px] text-[#9A99A8]">Type a message</div>
                                      <div className="w-9 h-9 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                                          </svg>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-[#9A99A8] font-sans">
                              Drop your link · Get paid in the chat
                          </p>
                      </div>

                      {/* Copy (right on desktop) */}
                      <div className="[animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate flex flex-col gap-6 lg:order-2">
                          <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-[#5F58F4] animate-pulse"></div>
                              <span className="font-mono text-xs tracking-widest text-[#5F58F4] font-sans">02 / 03 · SHARE</span>
                          </div>
                          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                              Drop your link anywhere your customers already are.
                          </h2>
                          <p className="max-w-md text-base leading-relaxed text-[#33323F] font-sans">
                              Your payment page works on every device, every platform. Share it in a DM, pin it to your bio, or send it to a group chat. Customers tap, pay, and you&rsquo;re done.
                          </p>
                          <ul className="mt-2 flex flex-col gap-5">
                              {[
                                  { lead: "Made for WhatsApp and Instagram.", body: "Most Nigerian sellers close deals in DMs. Paypoint fits right into that flow, no redirects, no confusion. Just send the link and get paid." },
                                  { lead: "Works everywhere else too.", body: "TikTok, Instagram, Email, SMS, even printed QR codes. Anywhere you can paste a link, you can collect payments." },
                                  { lead: "No app download needed for buyers.", body: "Your customers don't need to install anything or create an account. They just open the link and pay, instantly." },
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

              {/* ----- STEP 03 / 03 - GET PAID ----- */}
              <section className="relative overflow-hidden border-t border-[#ECEBF3] bg-white py-20 lg:py-28">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[100vw] bg-[#5F58F4]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>
                  <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

                      {/* Copy */}
                      <div className="[animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate flex flex-col gap-6 lg:order-1">
                          <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-[#5F58F4] animate-pulse"></div>
                              <span className="font-mono text-xs tracking-widest text-[#5F58F4] font-sans">03 / 03 · GET PAID</span>
                          </div>
                          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                              Money hits your bank account directly.
                          </h2>
                          <p className="max-w-md text-base leading-relaxed text-[#33323F] font-sans">
                              Every payment settles straight into your bank account. No holding period, no wallet you need to withdraw from, no surprises. Your money is your money.
                          </p>
                          <ul className="mt-2 flex flex-col gap-5">
                              {[
                                  { lead: "Instant receipts for you and your customer.", body: "Both of you get a detailed receipt with a reference number the moment payment is confirmed. No more “did you send it?” back-and-forth." },
                                  { lead: "Track every payment in real time.", body: "See who paid, what they paid for, when it came in, and whether it's pending or confirmed, all from your dashboard." },
                                  { lead: "We never hold your money.", body: "Paypoint is not a wallet. Funds settle directly to the bank account you connect. You stay in control of every naira." },
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

                      {/* Mockup - seller dashboard (moved from hero) */}
                      <div className="[animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate relative flex justify-center lg:order-2">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-[90vw] bg-[#5F58F4]/10 rounded-full blur-[90px] -z-10 pointer-events-none animate-pulse"></div>

                          {/* Phone Frame (dashboard) */}
                          <div className="border-[8px] overflow-hidden z-20 flex flex-col bg-[#0A0A0A] w-[300px] sm:w-[320px] max-w-full h-[600px] sm:h-[640px] border-[#1A1A1A] ring-white/10 ring-1 rounded-[48px] relative shadow-2xl">

                              {/* Dynamic Island */}
                              <div className="absolute top-0 w-full h-8 z-50 flex justify-center pt-2.5 pointer-events-none">
                                  <div className="w-28 h-7 bg-black rounded-full relative flex items-center justify-end px-3 gap-2 z-50">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] border border-[#333]"></div>
                                  </div>
                              </div>

                              {/* Screen Content (Scrollable) */}
                              <div className="w-full flex-1 bg-[#FAFAFE] flex flex-col relative overflow-y-auto no-scrollbar font-sans pb-20">

                                  {/* App Header */}
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
                                          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                                      </button>
                                  </div>

                                  {/* Body */}
                                  <div className="px-5 pt-6 space-y-6">

                                      {/* Total Collected card */}
                                      <div className="overflow-hidden bg-[#5F58F4] w-full bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/88535185-ff8d-4faa-b0f0-816876a8ba7a_800w.webp)] bg-cover bg-center rounded-[32px] pt-6 pr-6 pb-6 pl-6 relative shadow-[0_10px_40px_-10px_rgba(95,88,244,0.3)]">
                                          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
                                          <div className="-left-10 bg-blue-500/20 w-32 h-32 rounded-full absolute bottom-0 blur-2xl"></div>
                                          <div className="relative z-20 flex justify-between items-start">
                                              <div>
                                                  <div className="inline-flex bg-slate-50/10 rounded-full mb-2 px-2.5 py-1 backdrop-blur-sm gap-x-1.5 items-center">
                                                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="text-slate-50">
                                                          <path fill="currentColor" d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082" opacity=".5" />
                                                          <path fill="currentColor" d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z" />
                                                      </svg>
                                                      <span className="text-[10px] uppercase font-bold text-slate-50 tracking-wide">Total collected</span>
                                                  </div>
                                                  <h2 className="text-4xl font-bold text-slate-50 tracking-tighter">₦320,000</h2>
                                              </div>
                                              <div className="flex text-black bg-slate-950/20 w-10 h-10 rounded-full backdrop-blur-md items-center justify-center">
                                                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="text-slate-50">
                                                      <path fill="currentColor" d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12" opacity=".5" />
                                                      <path fill="currentColor" d="M14.5 10.75a.75.75 0 0 1 0-1.5H17a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-2.013 2.013a1.75 1.75 0 0 1-2.474 0l-1.586-1.586a.25.25 0 0 0-.354 0L7.53 14.53a.75.75 0 0 1-1.06-1.06l2.293-2.293a1.75 1.75 0 0 1 2.474 0l1.586 1.586a.25.25 0 0 0 .354 0l2.012-2.013z" />
                                                  </svg>
                                              </div>
                                          </div>
                                          <div className="relative z-20 mt-6">
                                              <svg className="w-[228px] h-[48px] text-slate-50" viewBox="0 0 100 30" preserveAspectRatio="none">
                                                  <path d="M0,25 C10,25 10,10 20,15 C30,20 30,5 40,10 C50,15 50,25 60,20 C70,15 70,5 80,10 C90,15 90,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                                              </svg>
                                              <div className="flex justify-between items-center mt-2">
                                                  <p className="text-[11px] font-bold text-slate-50/70">42 payments this month</p>
                                              </div>
                                          </div>
                                      </div>

                                      {/* Recent Activity */}
                                      <div>
                                          <div className="flex items-center justify-between mb-3 px-1">
                                              <h3 className="text-xs font-semibold text-[#9A99A8] uppercase tracking-wider">Recent Activity</h3>
                                              <button className="text-[10px] text-[#5F58F4] font-bold">View All</button>
                                          </div>
                                          <div className="flex flex-col gap-3">
                                              {/* Item 1 */}
                                              <div className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] shadow-sm">
                                                  <div className="flex items-center gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                                              <path fill="currentColor" d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143s2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079s-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079z" opacity=".5" />
                                                              <circle cx="15" cy="9.75" r="1" fill="currentColor" />
                                                              <circle cx="9" cy="9.75" r="1" fill="currentColor" />
                                                              <path fill="currentColor" d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431q.565 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002q.504-.003 1.069-.002h.431z" />
                                                          </svg>
                                                      </div>
                                                      <div>
                                                          <p className="text-xs font-bold text-[#14132B]">Chidinma Okeke</p>
                                                          <p className="text-[10px] text-[#9A99A8]">Aso Oke Dress</p>
                                                      </div>
                                                  </div>
                                                  <div className="flex flex-col items-end gap-1">
                                                      <p className="text-xs font-bold text-[#14132B]">₦35,000</p>
                                                      <span className="text-[9px] font-bold text-[#0B7A4B] bg-[#E7F8EF] px-1.5 py-0.5 rounded">Paid</span>
                                                  </div>
                                              </div>
                                              {/* Item 2 */}
                                              <div className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] shadow-sm">
                                                  <div className="flex items-center gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                                              <path fill="currentColor" d="M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z" opacity=".5" />
                                                              <path fill="currentColor" d="M7.25 8a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75" />
                                                          </svg>
                                                      </div>
                                                      <div>
                                                          <p className="text-xs font-bold text-[#14132B]">Tunde A.</p>
                                                          <p className="text-[10px] text-[#9A99A8]">CV Writing</p>
                                                      </div>
                                                  </div>
                                                  <div className="flex flex-col items-end gap-1">
                                                      <p className="text-xs font-bold text-[#14132B]">₦25,000</p>
                                                      <span className="text-[9px] font-bold text-[#0B7A4B] bg-[#E7F8EF] px-1.5 py-0.5 rounded">Paid</span>
                                                  </div>
                                              </div>
                                              {/* Item 3 */}
                                              <div className="flex items-center justify-between p-3 bg-white border border-[#ECEBF3] rounded-[20px] shadow-sm">
                                                  <div className="flex items-center gap-3">
                                                      <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#5F58F4]">
                                                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                                              <path fill="currentColor" d="M4.035 11.573c.462-2.309.693-3.463 1.522-4.143s2.007-.68 4.362-.68h4.162c2.355 0 3.532 0 4.361.68c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079s-2.594 1.098-5.98 1.098H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079z" opacity=".5" />
                                                              <circle cx="15" cy="9.75" r="1" fill="currentColor" />
                                                              <circle cx="9" cy="9.75" r="1" fill="currentColor" />
                                                              <path fill="currentColor" d="M9.75 5.75a2.25 2.25 0 0 1 4.5 0v1h.431q.565 0 1.069.002V5.75a3.75 3.75 0 1 0-7.5 0v1.002q.504-.003 1.069-.002h.431z" />
                                                          </svg>
                                                      </div>
                                                      <div>
                                                          <p className="text-xs font-bold text-[#14132B]">Ngozi E.</p>
                                                          <p className="text-[10px] text-[#9A99A8]">Bridal Gele</p>
                                                      </div>
                                                  </div>
                                                  <div className="flex flex-col items-end gap-1">
                                                      <p className="text-xs font-bold text-[#14132B]">₦18,000</p>
                                                      <span className="text-[9px] font-bold text-[#9A5A00] bg-[#FEF0DC] px-1.5 py-0.5 rounded">Pending</span>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="h-12"></div>
                                  </div>
                              </div>

                              {/* Bottom Navigation (Glass) */}
                              <div className="bg-white/90 backdrop-blur-xl border-t border-[#ECEBF3] z-50 flex w-full pt-4 pr-6 pb-8 pl-6 absolute bottom-0 left-0 items-center justify-between">
                                  <button className="flex flex-col items-center gap-1 text-[#5F58F4]">
                                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                          <path fill="currentColor" d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z" opacity=".5" />
                                          <path fill="currentColor" d="M9.447 15.398a.75.75 0 0 0-.894 1.205A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.147a.75.75 0 0 0-.894-1.206A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.852" />
                                      </svg>
                                  </button>
                                  <button className="flex flex-col items-center gap-1 text-[#9A99A8]">
                                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                          <path fill="currentColor" d="M3.293 9.293C3 9.586 3 10.057 3 11v6c0 .943 0 1.414.293 1.707S4.057 19 5 19s1.414 0 1.707-.293S7 17.943 7 17v-6c0-.943 0-1.414-.293-1.707S5.943 9 5 9s-1.414 0-1.707.293" />
                                          <path fill="currentColor" d="M17.293 2.293C17 2.586 17 3.057 17 4v13c0 .943 0 1.414.293 1.707S18.057 19 19 19s1.414 0 1.707-.293S21 17.943 21 17V4c0-.943 0-1.414-.293-1.707S19.943 2 19 2s-1.414 0-1.707.293" opacity=".4" />
                                          <path fill="currentColor" d="M10 7c0-.943 0-1.414.293-1.707S11.057 5 12 5s1.414 0 1.707.293S14 6.057 14 7v10c0 .943 0 1.414-.293 1.707S12.943 19 12 19s-1.414 0-1.707-.293S10 17.943 10 17z" opacity=".7" />
                                          <path fill="currentColor" d="M3 21.25a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5z" />
                                      </svg>
                                  </button>
                                  <div className="-mt-8 flex bg-center text-black bg-[#5F58F4] w-12 h-12 bg-cover rounded-full items-center justify-center shadow-[0_8px_20px_-6px_rgba(95,88,244,0.6)]">
                                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24" className="text-slate-50">
                                          <path fill="currentColor" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" opacity=".5" />
                                          <path fill="currentColor" d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z" />
                                      </svg>
                                  </div>
                                  <button className="flex flex-col items-center gap-1 text-[#9A99A8]">
                                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                          <path fill="currentColor" d="M10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12c0-.442-.002-1.608-.004-2H2c-.002.392 0 1.558 0 2c0 3.771 0 5.657 1.171 6.828S6.23 20 10 20" opacity=".5" />
                                          <path fill="currentColor" d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4M12.5 15.25a.75.75 0 0 0 0 1.5H14a.75.75 0 0 0 0-1.5zm-6.5 0a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z" />
                                      </svg>
                                  </button>
                                  <button className="flex flex-col items-center gap-1 text-[#9A99A8]">
                                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24">
                                          <path fill="currentColor" fillRule="evenodd" d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083" clipRule="evenodd" opacity=".5" />
                                          <path fill="currentColor" d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3" />
                                      </svg>
                                  </button>
                              </div>

                              {/* Home Indicator */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-[#14132B]/20 rounded-full z-[60] pointer-events-none"></div>
                          </div>

                          <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-[#9A99A8] font-sans">
                              Your dashboard · Every payment, in real time
                          </p>
                      </div>
                  </div>
              </section>

              {/* ----- Closing block ----- */}
              <section className="relative overflow-hidden border-t border-[#ECEBF3] bg-[#FAFAFE] py-20 lg:py-24">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-[100vw] h-[300px] bg-[#5F58F4]/10 rounded-full blur-[110px] -translate-y-1/3 pointer-events-none"></div>
                  <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 text-center [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                      <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                          That&rsquo;s it. Three steps to getting paid.
                      </h2>
                      <a href="/coming-soon" className="group mt-8 inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#5F58F4] px-8 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(95,88,244,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A43D6] font-sans">
                          <span>Create your free page</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                          </svg>
                      </a>
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-[#33323F] font-sans">
                          <span className="inline-flex items-center gap-1.5">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                              No card required
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5F58F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                              Set up in under 60 seconds
                          </span>
                      </div>
                  </div>
              </section>
          </div>

          {/* ============================ TESTIMONIALS ============================ */}
          <section className="relative overflow-hidden border-t border-[#ECEBF3] bg-white py-20 lg:py-28">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-[100vw] h-[500px] bg-[#5F58F4]/[0.07] rounded-full blur-[120px] pointer-events-none"></div>
              <div className="relative z-10 mx-auto max-w-6xl px-6">
                  <div className="mx-auto mb-14 max-w-2xl text-center [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                      <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                          Don&rsquo;t take our word for it.
                      </h2>
                      <p className="mt-4 text-base text-[#6C6B7B] font-sans">
                          Hear from sellers who use Paypoint every day.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      {[
                          { quote: "I used to send my account number to every customer and then chase them to confirm payment. Now I just send my Paypoint link. They pay, I get a notification, done. I wish I found this earlier.", name: "Chidinma O.", role: "Fashion Designer" },
                          { quote: "I sell consulting services on social media. Before Paypoint, I'd lose half my customers between the DM and the bank transfer. Now they just click and pay. My conversions doubled.", name: "Tunde A.", role: "LinkedIn Ghostwriting Consultant" },
                          { quote: "I was scared to try another payment platform because I've been burned before. But Paypoint sends money straight to my bank, no delays. I trust it completely now.", name: "Ngozi E.", role: "Bridal Stylist" },
                      ].map((t, i) => (
                          <div key={t.name} className="flex flex-col gap-5 rounded-[24px] border border-[#ECEBF3] bg-white p-7 shadow-[0_14px_36px_-24px_rgba(20,19,43,0.18)] [animation:fadeSlideIn_0.8s_ease-out_both] animate-on-scroll animate" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                              <Stars size={16} />
                              <p className="flex-1 text-[15px] leading-relaxed text-[#33323F] font-sans">&ldquo;{t.quote}&rdquo;</p>
                              <div className="flex items-center gap-3 border-t border-[#ECEBF3] pt-4">
                                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5F58F4] text-sm font-bold text-white">{t.name.charAt(0)}</span>
                                  <div>
                                      <p className="text-sm font-semibold text-[#14132B] font-sans">{t.name}</p>
                                      <p className="text-xs text-[#9A99A8] font-sans">{t.role}</p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="mt-14 flex flex-col items-center gap-6 text-center [animation:fadeSlideIn_0.8s_ease-out_0.4s_both] animate-on-scroll animate">
                      <p className="text-lg font-semibold text-[#14132B] font-sans">
                          Thousands of sellers are already getting paid.
                      </p>
                      <a href="/coming-soon" className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#5F58F4] px-8 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_10px_30px_-10px_rgba(95,88,244,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A43D6] font-sans">
                          <span>Join them, it&rsquo;s free</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                          </svg>
                      </a>
                  </div>
              </div>
          </section>

          {/* ============================ FAQ ============================ */}
          <section id="features" className="relative scroll-mt-24 overflow-hidden border-t border-[#ECEBF3] bg-[#FAFAFE] py-20 lg:py-28">
              <div className="absolute top-0 right-0 w-[600px] max-w-[100vw] h-[600px] bg-[#5F58F4]/[0.06] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
              <div className="relative z-10 mx-auto max-w-3xl px-6">
                  <div className="mb-12 text-center [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                      <h2 className="text-3xl font-semibold leading-[1.05] tracking-tighter text-[#14132B] sm:text-4xl lg:text-5xl font-sans">
                          Questions? We&rsquo;ve got answers.
                      </h2>
                  </div>
                  <div className="[animation:fadeSlideIn_0.8s_ease-out_0.35s_both] animate-on-scroll animate">
                      <Faq />
                  </div>
              </div>
          </section>

          {/* ============================ FINAL CTA (indigo band) ============================ */}
          <section className="relative overflow-hidden bg-white py-20 lg:py-28">
              <div className="mx-auto max-w-5xl px-6 [animation:fadeSlideIn_0.8s_ease-out_0.2s_both] animate-on-scroll animate">
                  <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#6F68FF] to-[#5F58F4] px-8 py-16 text-center shadow-[0_30px_80px_-30px_rgba(95,88,244,0.5)] lg:px-20 lg:py-24">
                      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 10px)' }}></div>

                      <div className="relative z-10">
                          <h2 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tighter text-white lg:text-6xl font-sans">
                              Ready to get paid?
                          </h2>
                          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-white/90 lg:text-xl font-sans">
                              Create your first payment page in minutes. Share the link. Start collecting payments today.
                          </p>
                          <a href="/coming-soon" className="group inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-[#5F58F4] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] font-sans">
                              <span>Start free, no card needed</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                              </svg>
                          </a>
                      </div>
                  </div>
              </div>
          </section>

          {/* ============================ FOOTER ============================ */}
          <SiteFooter />
      </main>
    </>
  );
}
