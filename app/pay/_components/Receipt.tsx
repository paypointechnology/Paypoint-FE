"use client";

import { SAMPLE } from "../../p/_components/sampleCheckout";

/**
 * Official payment receipt — /pay/receipt/[reference].
 * Designed to screenshot, forward, and print. Frontend prototype: everything
 * except the reference comes from the fixed sample data. Brand-only colours,
 * no processor names, no navy.
 */

// Prototype buyer contact (sample only).
const BUYER = {
  email: "chidinma@email.com",
  phone: "0801 234 5678",
  delivery: "12 Admiralty Way, Lekki, Lagos",
};

export default function Receipt({ reference }: { reference: string }) {
  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }
  async function copyLink() {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/pay/receipt/${reference}`;
    try {
      await navigator.clipboard?.writeText(url);
    } catch {
      /* clipboard blocked — no-op */
    }
  }
  async function share() {
    if (typeof navigator === "undefined") return;
    const url = `${window.location.origin}/pay/receipt/${reference}`;
    try {
      if (navigator.share) await navigator.share({ title: "Paypoint receipt", url });
      else await navigator.clipboard?.writeText(url);
    } catch {
      /* dismissed — no-op */
    }
  }

  return (
    <div className="w-full max-w-[440px] overflow-hidden rounded-[24px] border border-[#ECEBF3] bg-[#F4F4F8] shadow-[0_20px_60px_-30px_rgba(95,88,244,0.35)]">
      {/* Header (brand indigo) */}
      <div className="bg-[#5F58F4] px-6 py-5">
        <p className="text-[16px] font-extrabold tracking-[0.06em] text-white">PAYPOINT</p>
        <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">Official payment receipt</p>
      </div>

      {/* Status + amount */}
      <div className="border-b border-[#ECEBF3] bg-white px-6 py-6 text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#12B76A]/25 bg-[#E7F8EF] px-5 py-1.5 text-[13px] font-extrabold tracking-[0.04em] text-[#0B7A4B]">
          ✓ PAID
        </span>
        <p className="text-xs font-medium text-[#6C6B7B]">Amount paid</p>
        <p className="text-[40px] font-extrabold leading-tight tracking-[-0.04em] text-[#14132B]">
          {SAMPLE.priceLabel}
        </p>
      </div>

      {/* Transaction */}
      <Section label="Transaction">
        <Row label="Reference" value={reference} mono />
        <Row label="Date" value={SAMPLE.dateLabel} />
        <Row label="Payment method" value="Debit card" />
        <Row label="Status" value="✓ Successful" ok />
      </Section>

      {/* Parties */}
      <Section label="Parties">
        <Row label="Merchant" value={SAMPLE.business} />
        <Row label="Customer" value={SAMPLE.buyerName} />
        <Row label="Email" value={BUYER.email} />
        <Row label="Phone" value={BUYER.phone} />
        <Row label="Delivery" value={BUYER.delivery} />
      </Section>

      {/* Items */}
      <div className="mt-2 border-y border-[#ECEBF3] bg-white">
        <span className="block px-[18px] pb-1.5 pt-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#9A99A8]">
          Items purchased
        </span>
        <div className="flex justify-between border-b border-[#ECEBF3] bg-[#FAFAFE] px-[18px] py-2">
          <span className="flex-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#9A99A8]">Item</span>
          <span className="w-10 text-center text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#9A99A8]">Qty</span>
          <span className="w-20 text-right text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#9A99A8]">Price</span>
        </div>
        <div className="flex items-center justify-between px-[18px] py-3">
          <span className="flex-1 text-[13px] font-semibold text-[#14132B]">{SAMPLE.title}</span>
          <span className="w-10 text-center text-[12px] text-[#6C6B7B]">1</span>
          <span className="w-20 text-right text-[13px] font-bold text-[#14132B]">{SAMPLE.priceLabel}</span>
        </div>
      </div>

      {/* Totals */}
      <div className="mt-2 border-y border-[#ECEBF3] bg-white">
        <div className="flex justify-between border-b border-[#ECEBF3] px-[18px] py-2.5">
          <span className="text-[13px] text-[#6C6B7B]">Subtotal</span>
          <span className="text-[13px] font-semibold text-[#14132B]">{SAMPLE.priceLabel}</span>
        </div>
        <div className="flex justify-between border-b border-[#ECEBF3] px-[18px] py-2.5">
          <span className="text-[13px] text-[#6C6B7B]">Delivery</span>
          <span className="text-[13px] font-semibold text-[#0B7A4B]">Free</span>
        </div>
        <div className="flex justify-between bg-[#FAFAFE] px-[18px] py-3">
          <span className="text-[15px] font-extrabold text-[#14132B]">Total paid</span>
          <span className="text-[17px] font-extrabold text-[#14132B]">{SAMPLE.priceLabel}</span>
        </div>
      </div>

      {/* Security */}
      <div className="mt-2 border-y border-[#ECEBF3] bg-white px-[18px] py-5 text-center">
        <div className="mb-2 text-2xl">🔒</div>
        <p className="text-xs font-bold text-[#6C6B7B]">Official Paypoint receipt</p>
        <p className="my-1.5 inline-block rounded-lg bg-[#F5F4FF] px-3 py-1.5 font-mono text-[13px] font-extrabold tracking-[0.06em] text-[#5F58F4]">
          {reference}
        </p>
        <p className="text-[11px] leading-relaxed text-[#9A99A8]">
          Every Paypoint receipt carries a unique transaction reference that
          buyers and sellers can use to verify payment. Funds are transferred
          directly to the seller&rsquo;s verified bank account.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-2 border-y border-[#ECEBF3] bg-white">
        <ActionBtn icon="⬇" bg="#FEECEB" onClick={handlePrint}>Download PDF</ActionBtn>
        <ActionBtn icon="🖨" bg="#FAFAFE" onClick={handlePrint}>Print receipt</ActionBtn>
        <ActionBtn icon="🔗" bg="#F5F4FF" onClick={copyLink}>Copy receipt link</ActionBtn>
        <ActionBtn icon="💬" bg="#E7F8EF" onClick={share} last>Share receipt</ActionBtn>
      </div>

      {/* Footer */}
      <div className="px-[18px] py-6 text-center">
        <p className="text-[14px] font-extrabold tracking-[-0.02em] text-[#5F58F4]">Paypoint.</p>
        <p className="mt-1 text-[11px] leading-relaxed text-[#9A99A8]">
          Need help with your order? Contact the seller directly.
          <br />
          <span className="font-mono text-[11px] font-bold text-[#5F58F4]">
            paypoint.co/pay/receipt/{reference}
          </span>
        </p>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-2 border-y border-[#ECEBF3] bg-white">
      <span className="block px-[18px] pb-1.5 pt-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#9A99A8]">
        {label}
      </span>
      {children}
    </div>
  );
}

function Row({ label, value, mono, ok }: { label: string; value: string; mono?: boolean; ok?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#ECEBF3] px-[18px] py-2.5 last:border-b-0">
      <span className="shrink-0 text-[13px] text-[#6C6B7B]">{label}</span>
      <span
        className={`text-right text-[13px] font-bold ${
          mono ? "font-mono tracking-[0.04em] text-[#5F58F4]" : ok ? "text-[#0B7A4B]" : "text-[#14132B]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ActionBtn({
  icon,
  bg,
  children,
  onClick,
  last,
}: {
  icon: string;
  bg: string;
  children: React.ReactNode;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-[18px] py-3.5 text-left text-sm font-semibold text-[#33323F] transition-colors hover:bg-[#FAFAFE] ${last ? "" : "border-b border-[#ECEBF3]"}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] text-[15px]" style={{ background: bg }}>
        {icon}
      </span>
      {children}
    </button>
  );
}
