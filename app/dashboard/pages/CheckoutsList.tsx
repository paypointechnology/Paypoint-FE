"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { pageLink, type SellerPage } from "../_components/pagesData";
import { setPageActive, deletePage } from "./actions";

type Filter = "all" | "active" | "archived";
type Sort = "newest" | "oldest" | "revenue" | "payments";
type Sheet =
  | { kind: "share" | "more" | "delete"; page: SellerPage }
  | { kind: "sort" }
  | null;

const SORT_LABEL: Record<Sort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  revenue: "Highest revenue",
  payments: "Most payments",
};

export default function CheckoutsList({ pages: initial }: { pages: SellerPage[] }) {
  const [pages, setPages] = useState(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }

  // Perf strip (live as pages change).
  const totalRevenueKobo = pages.reduce((s, p) => s + p.revenueKobo, 0);
  const activeCount = pages.filter((p) => p.active).length;
  const best = pages.reduce<SellerPage | null>((b, p) => (!b || p.revenueKobo > b.revenueKobo ? p : b), null);

  const view = useMemo(() => {
    let list = pages;
    if (filter === "active") list = list.filter((p) => p.active);
    if (filter === "archived") list = list.filter((p) => !p.active);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "newest") return b.createdAtMs - a.createdAtMs;
      if (sort === "oldest") return a.createdAtMs - b.createdAtMs;
      if (sort === "revenue") return b.revenueKobo - a.revenueKobo;
      return b.paidCount - a.paidCount;
    });
    return sorted;
  }, [pages, filter, query, sort]);

  async function copy(p: SellerPage) {
    try {
      await navigator.clipboard.writeText(pageLink(p.slug));
    } catch {
      /* clipboard blocked */
    }
    flash("Link copied to clipboard");
  }

  function toggle(p: SellerPage) {
    const next = !p.active;
    setPages((cur) => cur.map((x) => (x.slug === p.slug ? { ...x, active: next } : x)));
    flash(next ? "Checkout activated and live." : "Checkout paused. Buyers can no longer access it.");
    startTransition(() => {
      setPageActive(p.slug, next);
    });
  }

  function remove(p: SellerPage) {
    setPages((cur) => cur.filter((x) => x.slug !== p.slug));
    setSheet(null);
    flash("Checkout deleted.");
    startTransition(() => {
      deletePage(p.slug);
    });
  }

  const money = (kobo: number) => `₦${Math.round(kobo / 100).toLocaleString("en-NG")}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Perf strip */}
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#ECEBF3] bg-white sm:grid-cols-4">
        {[
          { v: String(pages.length), l: "Total" },
          { v: String(activeCount), l: "Active", accent: true },
          { v: money(totalRevenueKobo), l: "Revenue" },
          { v: best && best.revenueKobo > 0 ? best.title : "None yet", l: "Best seller", small: true },
        ].map((s, i) => (
          <div key={s.l} className={`px-4 py-3 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} border-[#ECEBF3]`}>
            <p className={`truncate font-extrabold tracking-[-0.01em] ${s.small ? "text-[11px] text-[#9A5A00]" : "text-[15px]"} ${s.accent ? "text-[#5F58F4]" : "text-[#14132B]"}`}>{s.v}</p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-[#9A99A8]">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 rounded-xl border border-[#E3E2EE] bg-white px-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A99A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your checkouts…"
            className="h-11 flex-1 bg-transparent text-sm text-[#14132B] outline-none placeholder:text-[#9A99A8]"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-1 rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] p-1">
            {(["all", "active", "archived"] as Filter[]).map((f) => (
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
          <button
            type="button"
            onClick={() => setSheet({ kind: "sort" })}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#E3E2EE] bg-white px-3 text-xs font-bold text-[#6C6B7B] transition hover:border-[#5F58F4] hover:text-[#5F58F4]"
          >
            ↕ Sort
          </button>
        </div>
      </div>

      {/* Cards */}
      {view.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#ECEBF3] bg-white px-6 py-14 text-center">
          <div className="text-3xl">🔍</div>
          <p className="mt-2 text-sm font-bold text-[#14132B]">
            {query ? "No checkout matches that search." : "No checkouts here yet."}
          </p>
          <p className="mt-1 text-sm text-[#6C6B7B]">{query ? "Try a different name." : "Create one to start selling."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {view.map((p) => (
            <article key={p.slug} className={`overflow-hidden rounded-2xl border border-[#ECEBF3] bg-white ${p.active ? "" : "opacity-70"}`}>
              {/* Image */}
              <div className="relative">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} className="h-24 w-full object-cover" />
                ) : (
                  <div className="flex h-20 w-full items-center justify-center bg-[#F5F4FF]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/paypoint-wordmark-indigo.png" alt="Paypoint" className="h-5 w-auto opacity-80" />
                  </div>
                )}
                <span className={`absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur ${p.active ? "bg-[#E7F8EF]/95 text-[#0B7A4B]" : "bg-[#F1F0F7]/95 text-[#6C6B7B]"}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {p.active ? "Active" : "Archived"}
                </span>
                {best && best.slug === p.slug && best.revenueKobo > 0 && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#FEF0DC]/95 px-2 py-0.5 text-[9px] font-extrabold text-[#9A5A00] backdrop-blur">⭐ Best seller</span>
                )}
              </div>

              {/* Body */}
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="truncate text-sm font-extrabold text-[#14132B]">{p.title}</h3>
                  <span className="shrink-0 text-sm font-extrabold text-[#14132B]">{p.priceLabel}</span>
                </div>

                {/* Stats */}
                <div className="mt-2.5 grid grid-cols-3 overflow-hidden rounded-xl border border-[#ECEBF3] bg-[#FAFAFE]">
                  {[
                    { v: String(p.paidCount), l: "Payments" },
                    { v: p.revenueLabel, l: "Revenue" },
                    { v: p.createdAgo, l: "Created" },
                  ].map((s, i) => (
                    <div key={s.l} className={`px-1 py-2 text-center ${i < 2 ? "border-r border-[#ECEBF3]" : ""}`}>
                      <p className="truncate text-[12px] font-extrabold text-[#14132B]">{s.v}</p>
                      <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-[#9A99A8]">{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center gap-1.5 border-t border-[#ECEBF3] pt-3">
                  <button type="button" onClick={() => copy(p)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#EEEDFE] px-2 py-2 text-xs font-bold text-[#5F58F4] transition hover:bg-[#5F58F4] hover:text-white">
                    🔗 Copy link
                  </button>
                  <a href={pageLink(p.slug)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ECEBF3] bg-[#FAFAFE] px-2 py-2 text-xs font-bold text-[#33323F] transition hover:border-[#5F58F4] hover:text-[#5F58F4]">
                    👁 View
                  </a>
                  <button type="button" onClick={() => setSheet({ kind: "share", page: p })} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#ECEBF3] bg-[#FAFAFE] px-2 py-2 text-xs font-bold text-[#33323F] transition hover:border-[#5F58F4] hover:text-[#5F58F4]">
                    📤 Share
                  </button>
                  <button type="button" onClick={() => setSheet({ kind: "more", page: p })} aria-label="More" className="inline-flex items-center justify-center rounded-lg border border-[#ECEBF3] bg-[#FAFAFE] px-2.5 py-2 text-sm text-[#6C6B7B] transition hover:border-[#5F58F4] hover:text-[#5F58F4]">⋯</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── Sheets ── */}
      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#27272B]/45 p-0 sm:items-center sm:p-4" onClick={() => setSheet(null)}>
          <div className="w-full max-w-md rounded-t-[22px] bg-white p-5 pb-8 sm:rounded-[22px]" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-[#E3E2EE] sm:hidden" />

            {sheet.kind === "sort" && (
              <>
                <p className="mb-1 text-base font-extrabold text-[#14132B]">Sort checkouts</p>
                <p className="mb-4 text-sm text-[#6C6B7B]">Choose how to order your list</p>
                {(Object.keys(SORT_LABEL) as Sort[]).map((s) => (
                  <button key={s} type="button" onClick={() => { setSort(s); setSheet(null); }} className={`flex w-full items-center justify-between border-b border-[#ECEBF3] py-3 text-left text-[15px] font-semibold last:border-b-0 ${sort === s ? "text-[#5F58F4]" : "text-[#33323F]"}`}>
                    {SORT_LABEL[s]}
                    {sort === s && <span className="text-[#5F58F4]">✓</span>}
                  </button>
                ))}
              </>
            )}

            {sheet.kind === "share" && (
              <>
                <p className="mb-1 text-base font-extrabold text-[#14132B]">Share your checkout</p>
                <p className="mb-4 break-all text-sm text-[#6C6B7B]">{pageLink(sheet.page.slug).replace(/^https?:\/\//, "")}</p>
                <div className="flex flex-col gap-2.5">
                  <button type="button" onClick={() => { copy(sheet.page); setSheet(null); }} className="rounded-xl bg-[#EEEDFE] px-4 py-3 text-left text-[15px] font-bold text-[#5F58F4]">🔗 Copy checkout link</button>
                  <a href={`https://wa.me/?text=${encodeURIComponent(pageLink(sheet.page.slug))}`} target="_blank" rel="noopener noreferrer" onClick={() => setSheet(null)} className="rounded-xl bg-[#E7F8EF] px-4 py-3 text-left text-[15px] font-bold text-[#0B7A4B]">💬 Share to WhatsApp</a>
                  <a href={pageLink(sheet.page.slug)} target="_blank" rel="noopener noreferrer" onClick={() => setSheet(null)} className="rounded-xl border border-[#ECEBF3] bg-[#FAFAFE] px-4 py-3 text-left text-[15px] font-bold text-[#33323F]">👁 Open checkout</a>
                </div>
              </>
            )}

            {sheet.kind === "more" && (
              <>
                <p className="mb-1 text-base font-extrabold text-[#14132B]">{sheet.page.title}</p>
                <p className="mb-4 text-sm text-[#6C6B7B]">Choose an action</p>
                <button type="button" onClick={() => { toggle(sheet.page); setSheet(null); }} className="flex w-full items-center gap-3 border-b border-[#ECEBF3] py-3 text-left text-[15px] font-semibold text-[#33323F]">
                  <span className="text-lg">{sheet.page.active ? "📦" : "▶"}</span> {sheet.page.active ? "Archive checkout" : "Activate checkout"}
                </button>
                <button type="button" onClick={() => { copy(sheet.page); setSheet(null); }} className="flex w-full items-center gap-3 border-b border-[#ECEBF3] py-3 text-left text-[15px] font-semibold text-[#33323F]">
                  <span className="text-lg">🔗</span> Copy link
                </button>
                <button type="button" onClick={() => setSheet({ kind: "delete", page: sheet.page })} className="flex w-full items-center gap-3 py-3 text-left text-[15px] font-semibold text-[#B42318]">
                  <span className="text-lg">🗑️</span> Delete checkout
                </button>
              </>
            )}

            {sheet.kind === "delete" && (
              <>
                <p className="mb-1 text-base font-extrabold text-[#14132B]">Delete &ldquo;{sheet.page.title}&rdquo;?</p>
                <div className="mb-3 rounded-xl border border-[#F3C6C2] bg-[#FEECEB] px-4 py-3">
                  <p className="text-[13px] font-bold text-[#B42318]">This action cannot be undone.</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-[#B42318]">Its payment link stops working. Existing payment records stay in your Payments history.</p>
                </div>
                <div className="flex gap-2.5">
                  <button type="button" onClick={() => setSheet(null)} className="flex-1 rounded-xl border border-[#E3E2EE] bg-[#FAFAFE] py-3 text-sm font-bold text-[#33323F]">Cancel</button>
                  <button type="button" onClick={() => remove(sheet.page)} className="flex-1 rounded-xl bg-[#B42318] py-3 text-sm font-bold text-white">Delete checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#14132B] px-4 py-2 text-xs font-semibold text-white shadow-lg md:bottom-8">
          {toast}
        </div>
      )}
    </div>
  );
}
