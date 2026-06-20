import Link from "next/link";

/** Step 3 — success state with CTAs into the (not-yet-built) dashboard. */
export default function StepDone() {
  return (
    <div className="text-center">
      <div className="mb-5 flex justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F8EF] text-[#12B76A]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      </div>

      <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-[#14132B]">
        You&rsquo;re all set!
      </h1>
      <p className="mx-auto mt-1.5 max-w-[340px] text-sm leading-relaxed text-[#6C6B7B]">
        Your Paypoint account is ready. Create your first payment page and share
        your link to get paid.
      </p>

      <Link
        href="/dashboard/create"
        className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
      >
        Create my first page
      </Link>

      <Link
        href="/dashboard"
        className="mt-3 flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium text-[#6C6B7B] transition-colors hover:text-[#14132B]"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
