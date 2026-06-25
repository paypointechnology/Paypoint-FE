"use client";

import { useRef, type KeyboardEvent, type ClipboardEvent } from "react";

/** 6-box one-time-code input with auto-advance, backspace, and paste support. */
export default function OtpInput({
  value,
  onChange,
  length = 6,
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const setAt = (i: number, char: string) => {
    const chars = value.split("");
    chars[i] = char;
    return chars.join("").replace(/\s/g, "").slice(0, length);
  };

  const handleChange = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, "");
    if (!d) return;
    onChange(setAt(i, d[d.length - 1]));
    if (i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (value[i]) {
        onChange(setAt(i, ""));
      } else if (i > 0) {
        refs.current[i - 1]?.focus();
        onChange(value.slice(0, i - 1) + value.slice(i));
      }
    }
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const d = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!d) return;
    onChange(d);
    refs.current[Math.min(d.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-1.5 sm:gap-2.5" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className="h-12 w-10 rounded-xl border border-[#E3E2EE] bg-white text-center text-lg font-semibold text-[#14132B] outline-none transition focus:border-[#5F58F4] focus:ring-2 focus:ring-[#EEEDFE] sm:h-14 sm:w-12"
        />
      ))}
    </div>
  );
}
