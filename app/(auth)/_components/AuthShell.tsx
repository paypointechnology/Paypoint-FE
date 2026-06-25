import Link from "next/link";

/**
 * Shared frame for the auth screens (login / signup).
 * Centered, light, clean card on a soft canvas — responsive on all sizes.
 */
export default function AuthShell({
  heading,
  subheading,
  children,
  altPrompt,
  altLinkText,
  altHref,
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
  altPrompt: string;
  altLinkText: string;
  altHref: string;
}) {
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5 py-10 sm:py-14">
      {/* subtle brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(95,88,244,0.10),transparent_70%)]"
      />

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <Link href="/" className="mb-7 flex justify-center">
          <img
            src="/assets/paypoint-wordmark-indigo.png"
            alt="Paypoint"
            className="h-7 w-auto"
          />
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-[#ECEBF3] bg-white p-6 shadow-[0_1px_3px_rgba(20,19,43,0.04)] sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-[#14132B]">
              {heading}
            </h1>
            <p className="mt-1.5 text-sm text-[#6C6B7B]">{subheading}</p>
          </div>
          {children}
        </div>

        {/* Alt link */}
        <p className="mt-6 text-center text-sm text-[#6C6B7B]">
          {altPrompt}{" "}
          <Link
            href={altHref}
            className="font-semibold text-[#5F58F4] transition-colors hover:text-[#4A43D6]"
          >
            {altLinkText}
          </Link>
        </p>

        {/* Trust microcopy */}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#9A99A8]">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure checkout. We never hold your money.
        </p>
      </div>
    </main>
  );
}
