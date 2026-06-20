"use client";

/**
 * Circular logo dropzone (frontend-only placeholder).
 * Clicking is a no-op for now — wiring to real upload comes later.
 */
export default function LogoUpload() {
  return (
    <div className="mb-5 flex flex-col items-center gap-2">
      <button
        type="button"
        aria-label="Add logo"
        className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-dashed border-[#E3E2EE] bg-[#FAFAFE] text-[#9A99A8] transition-colors hover:border-[#5F58F4] hover:bg-[#EEEDFE] hover:text-[#5F58F4]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#5F58F4] text-white shadow-sm transition-colors group-hover:bg-[#4A43D6]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <span className="text-xs font-medium text-[#6C6B7B]">Add logo</span>
    </div>
  );
}
