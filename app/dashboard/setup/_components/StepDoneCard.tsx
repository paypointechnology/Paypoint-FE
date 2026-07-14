import Link from "next/link";
import StepHeader from "../../../onboarding/_components/StepHeader";

/**
 * Shown when a setup step is already complete. Confirms the state and offers a
 * way back to the checklist. Keeps steps resumable/idempotent.
 */
export default function StepDoneCard({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  return (
    <div>
      <StepHeader heading={heading} subtitle={subtitle} />

      <div className="flex items-center gap-3 rounded-[10px] border border-[#D4F3E2] bg-[#E7F8EF] px-4 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B7A4B] text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-sm font-semibold text-[#14132B]">This step is complete.</p>
      </div>

      <Link
        href="/dashboard"
        className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-[#5F58F4] text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
      >
        Back to setup
      </Link>
    </div>
  );
}
