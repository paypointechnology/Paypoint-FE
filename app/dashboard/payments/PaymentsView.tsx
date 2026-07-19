"use client";

import { useMemo, useState } from "react";
import type { PaymentRow } from "@/lib/data";

type Filter = "all" | "paid" | "pending" | "failed";

const FILTER_MATCH: Record<Filter, (r: PaymentRow) => boolean> = {
  all: () => true,
  paid: (r) => r.statusRaw === "success",
  pending: (r) => r.statusRaw === "pending",
  failed: (r) => ["failed", "refunded", "reversed", "abandoned"].includes(r.statusRaw),
};

const naira = (kobo: number) => `₦${Math.round(kobo / 100).toLocaleString("en-NG")}`;

export default function PaymentsView({ payments }: { payments: PaymentRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [receipt, setReceipt] = useState<PaymentRow | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }
  async function copyRef(ref: string) {
    try {
      await navigator.clipboard.writeText(ref);
    } catch {
      /* ignore */
    }
    flash(`Reference copied: ${ref}`);
  }

  // Filter + search, then group by dateGroup preserving order.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = payments.filter(
      (r) =>
        FILTER_MATCH[filter](r) &&
        (!q ||
          r.customer.toLowerCase().includes(q) ||
          r.item.toLowerCase().includes(q) ||
          r.reference.toLowerCase().includes(q)),
    );
    const out: { label: string; total: number; rows: PaymentRow[] }[] = [];
    for (const r of list) {
      let g = out.find((x) => x.label === r.dateGroup);
      if (!g) { g = { label: r.dateGroup || "Earlier", total: 0, rows: [] }; out.push(g); }
      g.rows.push(r);
      if (r.statusRaw === "success") g.total += r.amountKobo;
    }
    return out;
  }, [payments, filter, query]);

  const empty = groups.length === 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Trust banner */}
      <div className="flex items-center gap-2.5 rounded-xl border border-[#D4F3E2] bg-[#E7F8EF] px-4 py-2.5">
        <span className="text-sm">🏦</span>
        <p className="text-xs font-semibold leading-snug text-[#0B7A4B]">
          All successful payments are sent directly to your connected bank account.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 rounded-xl border border-[#E3E2EE] bg-white px-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A99A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by customer, reference or checkout…"
            className="h-11 flex-1 bg-transparent text-sm text-[#14132B] outline-none placeholder:text-[#9A99A8]"
          />
        </div>
        <div className="flex rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] p-1">
          {(["all", "paid", "pending", "failed"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-bold capitalize transition ${filter === f ? "bg-white text-[#14132B] shadow-sm" : "text-[#6C6B7B]"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Groups */}
      {empty ? (
        <div className="rounded-2xl border border-dashed border-[#ECEBF3] bg-white px-6 py-14 text-center">
          <div className="text-3xl">💳</div>
          <p className="mt-2 text-sm font-bold text-[#14132B]">
            {query || filter !== "all" ? "No payments match this view." : "Your first payment will appear here."}
          </p>
          <p className="mt-1 text-sm text-[#6C6B7B]">
            {query || filter !== "all" ? "Try a different search or filter." : "Once customers pay through your checkout, every payment shows up here."}
          </p>
        </div>
      ) : (
        groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A99A8]">
              {g.label}
              {g.total > 0 && <span className="text-[#6C6B7B]"> · {naira(g.total)}</span>}
            </p>
            {g.rows.map((r) => (
              <PaymentCard key={r.reference} r={r} onReceipt={() => setReceipt(r)} onCopy={() => copyRef(r.reference)} />
            ))}
          </div>
        ))
      )}

      {/* Receipt overlay */}
      {receipt && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#27272B]/45 sm:items-center sm:p-4" onClick={() => setReceipt(null)}>
          <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[22px] bg-white sm:rounded-[22px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[#ECEBF3] px-5 py-3.5">
              <button type="button" onClick={() => setReceipt(null)} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ECEBF3] bg-[#FAFAFE] text-[#33323F]">←</button>
              <p className="text-[15px] font-bold text-[#14132B]">Payment receipt</p>
            </div>
            <div className="p-5">
              <div className={`rounded-2xl p-5 text-center ${receipt.statusRaw === "success" ? "bg-[#E7F8EF]" : receipt.statusRaw === "pending" ? "bg-[#FEF0DC]" : "bg-[#FEECEB]"}`}>
                <div className="text-2xl">{receipt.statusRaw === "success" ? "✅" : receipt.statusRaw === "pending" ? "⏳" : "✕"}</div>
                <p className={`mt-1 text-sm font-extrabold ${receipt.statusRaw === "success" ? "text-[#0B7A4B]" : receipt.statusRaw === "pending" ? "text-[#9A5A00]" : "text-[#B42318]"}`}>
                  {receipt.statusRaw === "success" ? "Payment successful" : receipt.statusRaw === "pending" ? "Payment pending" : "Payment not completed"}
                </p>
                <p className="mt-1 text-[28px] font-extrabold tracking-[-0.03em] text-[#14132B]">{receipt.amountLabel}</p>
              </div>

              <ReceiptSection label="Customer">
                <ReceiptRow k="Name" v={receipt.customer} />
                {receipt.email && <ReceiptRow k="Email" v={receipt.email} />}
                {receipt.phone && <ReceiptRow k="Phone" v={receipt.phone} />}
              </ReceiptSection>
              <ReceiptSection label="Payment details">
                <ReceiptRow k="Checkout" v={receipt.item} />
                <ReceiptRow k="Amount" v={receipt.amountLabel} />
                <ReceiptRow k="Status" v={receipt.statusRaw === "success" ? "✓ Successful" : receipt.status} ok={receipt.statusRaw === "success"} />
                {receipt.dateLabel && <ReceiptRow k="Date" v={receipt.dateLabel} />}
                <ReceiptRow k="Reference" v={receipt.reference} mono />
              </ReceiptSection>

              <div className="mt-4 flex flex-col gap-2.5">
                <button type="button" onClick={() => copyRef(receipt.reference)} className="rounded-xl border border-[#E3E2EE] bg-[#FAFAFE] py-3 text-sm font-bold text-[#33323F]">🔗 Copy reference</button>
              </div>
              <div className="mt-4 rounded-xl border border-[#EEEDFE] bg-[#F5F4FF] px-4 py-3 text-center text-[11px] font-semibold text-[#5F58F4]">
                Funds settle directly to your bank account. Paypoint never holds your money.
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#14132B] px-4 py-2 text-xs font-semibold text-white shadow-lg md:bottom-8">
          {toast}
        </div>
      )}
    </div>
  );
}

function PaymentCard({ r, onReceipt, onCopy }: { r: PaymentRow; onReceipt: () => void; onCopy: () => void }) {
  const initials = r.customer.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const isSuccess = r.statusRaw === "success";
  const isPending = r.statusRaw === "pending";
  const isFailed = !isSuccess && !isPending;
  const avatar = isSuccess ? "bg-[#EEEDFE] text-[#5F58F4]" : isPending ? "bg-[#FEF0DC] text-[#9A5A00]" : "bg-[#FEECEB] text-[#B42318]";
  const pill = isSuccess ? "bg-[#E7F8EF] text-[#0B7A4B]" : isPending ? "bg-[#FEF0DC] text-[#9A5A00]" : "bg-[#FEECEB] text-[#B42318]";
  const pillLabel = isSuccess ? "🟢 Successful" : isPending ? "🟡 Pending" : "🔴 Failed";

  return (
    <div className="rounded-2xl border border-[#ECEBF3] bg-white p-3.5">
      <div className="flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${avatar}`}>{initials || "?"}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#14132B]">{r.customer}</p>
          <p className="truncate text-xs text-[#6C6B7B]">{r.item}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className={`text-sm font-extrabold ${isFailed ? "text-[#9A99A8]" : "text-[#14132B]"}`}>{r.amountLabel}</p>
          <p className="text-[11px] text-[#9A99A8]">{r.time}</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold tracking-wide text-[#9A99A8]">{r.reference}</span>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${pill}`}>{pillLabel}</span>
      </div>

      {isFailed && (
        <div className="mt-2.5 rounded-lg border border-[#F3C6C2] bg-[#FEECEB] px-3 py-2.5">
          <p className="text-[12px] font-bold text-[#B42318]">Payment could not be completed.</p>
          <p className="mt-0.5 text-[12px] text-[#B42318]">· No money left {r.customer.split(" ")[0]}&rsquo;s account.</p>
        </div>
      )}

      <div className="mt-3 flex items-center gap-1.5 border-t border-[#ECEBF3] pt-3">
        {isSuccess ? (
          <button type="button" onClick={onReceipt} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#EEEDFE] px-2 py-2 text-xs font-bold text-[#5F58F4] transition hover:bg-[#5F58F4] hover:text-white">🧾 View receipt</button>
        ) : (
          <button type="button" onClick={onReceipt} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ECEBF3] bg-[#FAFAFE] px-2 py-2 text-xs font-bold text-[#33323F] transition hover:border-[#5F58F4] hover:text-[#5F58F4]">🔍 View details</button>
        )}
        <button type="button" onClick={onCopy} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ECEBF3] bg-[#FAFAFE] px-2 py-2 text-xs font-bold text-[#33323F] transition hover:border-[#5F58F4] hover:text-[#5F58F4]">🔗 Copy ref</button>
      </div>
    </div>
  );
}

function ReceiptSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A99A8]">{label}</p>
      <div className="overflow-hidden rounded-xl border border-[#ECEBF3] bg-[#FAFAFE]">{children}</div>
    </div>
  );
}

function ReceiptRow({ k, v, mono, ok }: { k: string; v: string; mono?: boolean; ok?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#ECEBF3] px-4 py-2.5 last:border-b-0">
      <span className="shrink-0 text-[12px] text-[#6C6B7B]">{k}</span>
      <span className={`text-right text-[13px] font-bold ${mono ? "font-mono text-[#5F58F4]" : ok ? "text-[#0B7A4B]" : "text-[#14132B]"}`}>{v}</span>
    </div>
  );
}
