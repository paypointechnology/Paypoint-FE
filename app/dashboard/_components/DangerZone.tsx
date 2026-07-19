"use client";

import { useState } from "react";

/**
 * Danger zone — archive, data export, and account deletion. These are
 * sensitive account operations; the destructive one requires explicit
 * confirmation. The underlying flows are not built yet, so each records the
 * request (toast) rather than mutating data.
 */
export default function DangerZone({ businessName }: { businessName: string }) {
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }

  const items = [
    { icon: "📦", name: "Archive business", desc: "Pause your account temporarily", onClick: () => flash("Account archived. You can reactivate any time.") },
    { icon: "⬇️", name: "Download my data", desc: "Export payments, checkouts and profile", onClick: () => flash("Preparing your data export. We'll email it to you.") },
    { icon: "🗑️", name: "Delete account", desc: "Permanently close your account", danger: true, onClick: () => setConfirm(true) },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[#F3C6C2] bg-[#FEECEB]">
        <p className="px-5 pb-1.5 pt-4 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#B42318]">Danger zone</p>
        {items.map((it, i) => (
          <button
            key={it.name}
            type="button"
            onClick={it.onClick}
            className={`flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-[#FEE0DE] ${i < items.length - 1 ? "border-b border-[#F3C6C2]" : ""}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEE0DE] text-sm">{it.icon}</span>
            <span className="flex-1">
              <span className={`block text-sm font-bold ${it.danger ? "text-[#B42318]" : "text-[#33323F]"}`}>{it.name}</span>
              <span className="block text-[11px] text-[#B42318]/70">{it.desc}</span>
            </span>
          </button>
        ))}
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#27272B]/45 sm:items-center sm:p-4" onClick={() => setConfirm(false)}>
          <div className="w-full max-w-md rounded-t-[22px] bg-white p-5 pb-8 sm:rounded-[22px]" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-[#E3E2EE] sm:hidden" />
            <p className="text-base font-extrabold text-[#14132B]">Delete &ldquo;{businessName || "your account"}&rdquo;?</p>
            <div className="mt-3 rounded-xl border border-[#F3C6C2] bg-[#FEECEB] px-4 py-3">
              <p className="text-[13px] leading-relaxed text-[#B42318]">
                Deleting your account is permanent and cannot be undone. All your
                checkouts, payment history and business data will be removed.
              </p>
            </div>
            <div className="mt-4 flex gap-2.5">
              <button type="button" onClick={() => setConfirm(false)} className="flex-1 rounded-xl border border-[#E3E2EE] bg-[#FAFAFE] py-3 text-sm font-bold text-[#33323F]">Keep account</button>
              <button type="button" onClick={() => { setConfirm(false); flash("Request submitted. Check your email for next steps."); }} className="flex-1 rounded-xl bg-[#B42318] py-3 text-sm font-bold text-white">Delete account</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#14132B] px-4 py-2 text-xs font-semibold text-white shadow-lg md:bottom-8">
          {toast}
        </div>
      )}
    </>
  );
}
