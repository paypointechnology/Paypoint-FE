"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { pageLink, type SellerPage } from "./pagesData";

/**
 * A single payment-page card for the Pages grid.
 * - Branded thumb (real photo OR Paypoint wordmark on #F5F4FF — never a grey box).
 * - Active/Inactive status chip overlay + a local toggle switch.
 * - Actions: Copy link (→ "Copied!"), QR (popover with QRCodeSVG), Share
 *   (Web Share API with clipboard fallback). No Edit affordance, by design.
 */
export default function PageCard({ page }: { page: SellerPage }) {
  const [active, setActive] = useState(page.active);
  const [imgOk, setImgOk] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const qrWrapRef = useRef<HTMLDivElement>(null);

  const link = pageLink(page.slug);
  const showPhoto = Boolean(page.image) && imgOk;

  // Close the QR popover on outside-click or Escape.
  useEffect(() => {
    if (!qrOpen) return;
    function onClick(e: MouseEvent) {
      if (qrWrapRef.current && !qrWrapRef.current.contains(e.target as Node)) {
        setQrOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setQrOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [qrOpen]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* clipboard unavailable — still flash the confirmation */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function share() {
    const payload = {
      title: page.title,
      text: `Pay for ${page.title} on Paypoint`,
      url: link,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        /* user dismissed or share failed — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* ignore */
    }
    setShared(true);
    window.setTimeout(() => setShared(false), 1600);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#ECEBF3] bg-white shadow-[0_1px_3px_rgba(20,19,43,0.04)] transition-shadow hover:shadow-[0_4px_18px_rgba(20,19,43,0.07)]">
      {/* Thumb */}
      <div className="relative">
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={page.image}
            alt={page.title}
            onError={() => setImgOk(false)}
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#F5F4FF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/paypoint-wordmark-indigo.png"
              alt="Paypoint"
              className="h-6 w-auto opacity-80"
            />
          </div>
        )}

        {/* Status chip overlay */}
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur ${
            active
              ? "bg-[#E7F8EF]/95 text-[#0B7A4B]"
              : "bg-[#F1F0F7]/95 text-[#6C6B7B]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold tracking-[-0.01em] text-[#14132B]">
              {page.title}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[#9A99A8]">
              {page.type}
            </p>
          </div>

          {/* Active toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={active}
            aria-label={active ? "Set page inactive" : "Set page active"}
            onClick={() => setActive((a) => !a)}
            className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              active ? "bg-[#5F58F4]" : "bg-[#E3E2EE]"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                active ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-lg font-bold tracking-[-0.01em] text-[#14132B]">
            {page.priceLabel}
          </p>
          <p className="inline-flex items-center gap-1.5 text-sm text-[#6C6B7B]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#F5A623" aria-hidden>
              <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
            </svg>
            {page.paidCount} paid
          </p>
        </div>

        {/* Actions */}
        <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-[#ECEBF3] pt-3">
          {/* Copy link */}
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-[#33323F] transition-colors hover:bg-[#F5F4FF] hover:text-[#5F58F4]"
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B7A4B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-[#0B7A4B]">Copied!</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="9" y="9" width="11" height="11" rx="2.5" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                </svg>
                Copy link
              </>
            )}
          </button>

          {/* QR */}
          <button
            type="button"
            onClick={() => setQrOpen((o) => !o)}
            aria-expanded={qrOpen}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-[#33323F] transition-colors hover:bg-[#F5F4FF] hover:text-[#5F58F4]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3M21 14v7M14 21h3" />
            </svg>
            QR
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={share}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold text-[#33323F] transition-colors hover:bg-[#F5F4FF] hover:text-[#5F58F4]"
          >
            {shared ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B7A4B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-[#0B7A4B]">Copied!</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
                </svg>
                Share
              </>
            )}
          </button>

          {/* QR popover */}
          {qrOpen && (
            <div
              ref={qrWrapRef}
              role="dialog"
              aria-label={`QR code for ${page.title}`}
              className="absolute bottom-12 left-1/2 z-30 w-60 -translate-x-1/2 rounded-2xl border border-[#ECEBF3] bg-white p-4 text-center shadow-[0_8px_30px_rgba(20,19,43,0.14)]"
            >
              <div className="flex justify-center rounded-xl bg-white p-2">
                <QRCodeSVG
                  value={link}
                  size={132}
                  fgColor="#14132B"
                  bgColor="#FFFFFF"
                  level="M"
                />
              </div>
              <p className="mt-3 break-all text-xs font-medium text-[#6C6B7B]">
                {link.replace("https://", "")}
              </p>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg bg-[#F5F4FF] text-xs font-semibold text-[#5F58F4] transition-colors hover:bg-[#EEEDFE]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
