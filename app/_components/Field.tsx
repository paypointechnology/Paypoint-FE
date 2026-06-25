"use client";

import { useState } from "react";

/**
 * Shared labeled input.
 * Optional right-aligned slot (e.g. "Forgot password?"), password show/hide,
 * and optional helper text below. Used by the auth screens and onboarding.
 */
export default function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  value,
  onChange,
  rightSlot,
  helper,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightSlot?: React.ReactNode;
  helper?: string;
  optional?: boolean;
}) {
  const isPassword = type === "password";
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={name} className="text-xs font-semibold text-[#6C6B7B]">
          {label}
          {optional && (
            <span className="ml-1.5 font-normal text-[#9A99A8]">Optional</span>
          )}
        </label>
        {rightSlot}
      </div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          value={value}
          onChange={onChange}
          className="h-11 w-full rounded-[10px] border border-[#E3E2EE] bg-white px-3.5 pr-10 text-sm text-[#14132B] outline-none transition placeholder:text-[#9A99A8] focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A99A8] transition-colors hover:text-[#6C6B7B]"
          >
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {helper && <p className="mt-1.5 text-xs text-[#9A99A8]">{helper}</p>}
    </div>
  );
}
