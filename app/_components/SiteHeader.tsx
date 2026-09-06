"use client";

/** Shared marketing header (floating pill nav). Nav links anchor to sections on
 *  the single-page landing. */
export default function SiteHeader() {
  const link =
    "text-xs font-medium text-[#33323F] transition-colors hover:text-[#5F58F4] font-sans";

  return (
    <nav
      className="fixed [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll md:left-0 md:right-0 md:mx-auto z-50 bg-white/72 max-w-4xl rounded-full mr-auto ml-auto top-6 right-4 left-4 shadow-[0_8px_30px_-12px_rgba(20,19,43,0.12)] backdrop-blur-xl animate"
      style={{
        ["--border-gradient" as never]: "linear-gradient(180deg, #ECEBF3, #ECEBF3, #ECEBF3)",
        ["--border-radius-before" as never]: "9999px",
      }}
    >
      <div className="flex h-14 pr-4 pl-4 items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/assets/paypoint-icon.png" alt="Paypoint" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-semibold tracking-tight text-[#14132B] font-sans">Paypoint</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#why-paypoint" className={link}>Why Paypoint</a>
          <a href="/#how-it-works" className={link}>Features</a>
          <a href="/#who-its-for" className={link}>Who it&rsquo;s for</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden md:inline-block text-xs font-medium text-[#33323F] px-3.5 py-2 rounded-full transition-all duration-200 hover:text-[#5F58F4] hover:bg-[#EEEDFE] hover:-translate-y-0.5 font-sans"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="group inline-flex overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(95,88,244,0.35)] rounded-full pt-[1px] pr-[1px] pb-[1px] pl-[1px] relative items-center justify-center"
          >
            {/* Spinning Border Beam (Visible on Hover) */}
            <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ffffff_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            {/* Default Static Border */}
            <span className="absolute inset-0 rounded-full bg-[#5F58F4] transition-opacity duration-300 group-hover:opacity-0"></span>
            {/* Button Surface & Content */}
            <span className="flex items-center justify-center gap-1.5 sm:gap-2 uppercase transition-colors duration-300 group-hover:text-white text-[11px] sm:text-xs font-medium text-white tracking-wider sm:tracking-widest bg-gradient-to-b from-[#6F68FF] to-[#5F58F4] w-full h-full rounded-full py-2.5 px-4 sm:px-6 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] whitespace-nowrap">
              <span className="z-10 relative">Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
