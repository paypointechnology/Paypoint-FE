/**
 * Inline error alert for setup/onboarding steps — a proper notice box rather
 * than a thin red line, so the "what to do" copy is impossible to miss.
 */
export default function ErrorNotice({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-2.5 rounded-[10px] border border-[#F3C6C2] bg-[#FEECEB] px-3.5 py-3"
    >
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B42318] text-white">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
          <path d="M12 7v6" />
          <circle cx="12" cy="17" r="0.5" fill="currentColor" />
        </svg>
      </span>
      <p className="text-[13px] font-medium leading-relaxed text-[#B42318]">{children}</p>
    </div>
  );
}
