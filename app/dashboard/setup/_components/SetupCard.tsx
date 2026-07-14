import Link from "next/link";

/**
 * Centered card frame for a single setup step, rendered inside the dashboard
 * shell. Mirrors the onboarding card look without nesting a second full-page
 * layout. Includes a back link to the dashboard checklist.
 */
export default function SetupCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#6C6B7B] transition-colors hover:text-[#14132B]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to setup
      </Link>

      <div className="rounded-2xl border border-[#ECEBF3] bg-white p-6 shadow-[0_1px_3px_rgba(20,19,43,0.04)] sm:p-8">
        {children}
      </div>
    </div>
  );
}
