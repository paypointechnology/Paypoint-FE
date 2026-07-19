import Link from "next/link";

/**
 * Shared frame for the auth screens (login / signup / verify).
 * Two panels: an indigo brand panel on the left (hidden on mobile) with an
 * animated vertical "attention to bank alert" journey, and the form on the
 * right. Brand-only colours (no navy) per the brand guideline.
 */

const JOURNEY = [
  { icon: "👀", title: "Attention", sub: "Customer sees your link" },
  { icon: "📱", title: "Checkout", sub: "They tap, they pay" },
  { icon: "💳", title: "Payment", sub: "Secured in seconds" },
  { icon: "🏦", title: "Bank alert", sub: "Money in your account" },
];

export default function AuthShell({
  heading,
  subheading,
  children,
  altPrompt,
  altLinkText,
  altHref,
  brandHeading = "Turn attention into bank alerts.",
  brandSub = "Create a checkout, share your link, and get paid straight to your bank.",
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
  altPrompt: string;
  altLinkText: string;
  altHref: string;
  brandHeading?: string;
  brandSub?: string;
}) {
  return (
    <main className="grid min-h-[100dvh] w-full grid-cols-1 md:grid-cols-2">
      {/* ── Left: brand panel (indigo, hidden on mobile) ───────────────── */}
      <div className="relative hidden flex-col overflow-hidden bg-gradient-to-b from-[#6F68FF] via-[#5F58F4] to-[#4A43D6] px-12 py-12 md:flex lg:px-14">
        {/* Soft light blooms */}
        <div aria-hidden className="pointer-events-none absolute -left-[15%] -top-[15%] h-[55%] w-[55%] rounded-full bg-white/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[45%] w-[45%] rounded-full bg-white/10 blur-3xl" />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <img src="/assets/paypoint-icon.png" alt="Paypoint" className="h-8 w-8 rounded-lg" />
          <span className="text-[19px] font-bold tracking-[-0.03em] text-white">Paypoint</span>
        </Link>

        {/* Center content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center py-12">
          <h1 className="max-w-[380px] text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            {brandHeading}
          </h1>
          <p className="mt-3.5 max-w-[320px] text-[15px] leading-relaxed text-white/60">
            {brandSub}
          </p>

          {/* Vertical journey */}
          <div className="jv mt-12">
            <div className="jv-track">
              <div className="jv-fill" />
              <div className="jv-dot2" />
            </div>
            <div className="flex flex-col gap-[26px]">
              {JOURNEY.map((s, i) => (
                <div key={s.title} className="flex items-center gap-4">
                  <span className={`jv-ico d${i} relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg`}>
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white/85">{s.title}</div>
                    <div className="mt-0.5 text-xs text-white/40">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 mt-auto text-[11px] text-white/40">
          © 2026 Paypoint · not a bank, and we never hold your money.
        </p>
      </div>

      {/* ── Right: form panel ──────────────────────────────────────────── */}
      <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo (brand panel is hidden on mobile) */}
          <Link href="/" className="mb-8 flex items-center gap-2 md:hidden">
            <img src="/assets/paypoint-icon.png" alt="Paypoint" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-bold tracking-[-0.03em] text-[#14132B]">Paypoint</span>
          </Link>

          <h2 className="text-[26px] font-extrabold tracking-[-0.02em] text-[#14132B]">
            {heading}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6C6B7B]">{subheading}</p>

          <div className="mt-6">{children}</div>

          <p className="mt-7 text-center text-sm text-[#6C6B7B]">
            {altPrompt}{" "}
            <Link
              href={altHref}
              className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
            >
              {altLinkText}
            </Link>
          </p>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#9A99A8]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your information is encrypted and securely protected.
          </p>
        </div>
      </div>
    </main>
  );
}
