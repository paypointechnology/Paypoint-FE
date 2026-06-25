/** Top progress indicator for the onboarding wizard: 4 labelled steps. */
const STEPS = ["Business", "Verify", "Get paid", "Done"];

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function ProgressSteps({ current }: { current: number }) {
  return (
    <ol className="mb-6 flex items-center justify-center gap-1.5 sm:gap-2">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isDone
                    ? "bg-[#E7F8EF] text-[#12B76A]"
                    : isActive
                      ? "bg-[#5F58F4] text-white"
                      : "bg-[#EEEDFE] text-[#9A99A8]",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {isDone ? <Check /> : step}
              </span>
              <span
                className={[
                  "text-[11px] font-medium leading-none",
                  isActive ? "text-[#14132B]" : isDone ? "text-[#12B76A]" : "text-[#9A99A8]",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {step < STEPS.length && (
              <span
                aria-hidden
                className={[
                  "mb-5 h-px w-6 sm:w-10 transition-colors",
                  isDone ? "bg-[#12B76A]" : "bg-[#ECEBF3]",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
