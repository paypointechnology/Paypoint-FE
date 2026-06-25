import Link from "next/link";
import ProgressSteps from "./ProgressSteps";

/**
 * Shared frame for the onboarding wizard.
 * Mirrors AuthShell (light, clean, centered card on a soft canvas) but a
 * touch wider and topped with a 4-step progress indicator.
 */
export default function OnboardingShell({
  current,
  children,
}: {
  current: number;
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5 py-10 sm:py-14">
      {/* subtle brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(95,88,244,0.10),transparent_70%)]"
      />

      <div className="relative w-full max-w-[480px]">
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
          <ProgressSteps current={current} />
          {children}
        </div>

        {/* Trust microcopy */}
        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#9A99A8]">
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
