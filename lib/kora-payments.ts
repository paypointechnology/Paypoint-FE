import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { koraConfigured } from "@/lib/kora";

/**
 * Kora payments client: charge initialization (redirect checkout), bank
 * account resolution, disbursements (payouts), and webhook signature checks.
 *
 * Money model (compliance-reviewed): buyer pays via Kora's hosted checkout;
 * on charge.success we immediately disburse (amount - fee) to the seller's
 * verified bank. Amounts in our DB are kobo; Kora's payment APIs take naira.
 *
 * DEV FALLBACK: without a real KORA_SECRET_KEY every call simulates success
 * (flagged `dev`) so the full checkout -> webhook -> payout pipeline is
 * testable before Kora approval lands.
 */

const KORA_BASE = "https://api.korapay.com/merchant/api/v1";

function nairaFromKoboAmount(amountKobo: number): number {
  return Math.round(amountKobo) / 100;
}

async function koraFetch(
  path: string,
  init?: { method?: "GET" | "POST"; body?: Record<string, unknown> },
): Promise<{ ok: boolean; message?: string; data?: unknown; raw?: unknown }> {
  try {
    const res = await fetch(`${KORA_BASE}${path}`, {
      method: init?.method ?? "GET",
      headers: {
        Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: init?.body ? JSON.stringify(init.body) : undefined,
      cache: "no-store",
    });
    const json = (await res.json().catch(() => null)) as
      | { status?: boolean; message?: string; data?: unknown }
      | null;
    if (!res.ok || !json?.status) {
      return { ok: false, message: json?.message || `Request failed (${res.status})`, raw: json };
    }
    return { ok: true, data: json.data, raw: json };
  } catch {
    return { ok: false, message: "Could not reach the payment service." };
  }
}

// ── Banks & account resolution (Kora Identity, basic tier) ───────────────────

export type Bank = { name: string; code: string };

/** Static list for the dev fallback (basic-tier NIP codes). */
const DEV_BANKS: Bank[] = [
  { name: "Access Bank", code: "044" },
  { name: "Ecobank", code: "050" },
  { name: "Fidelity Bank", code: "070" },
  { name: "First Bank of Nigeria", code: "011" },
  { name: "First City Monument Bank", code: "214" },
  { name: "Guaranty Trust Bank", code: "058" },
  { name: "Kuda Microfinance Bank", code: "50211" },
  { name: "Moniepoint MFB", code: "50515" },
  { name: "OPay", code: "999992" },
  { name: "PalmPay", code: "999991" },
  { name: "Polaris Bank", code: "076" },
  { name: "Providus Bank", code: "101" },
  { name: "Stanbic IBTC Bank", code: "221" },
  { name: "Sterling Bank", code: "232" },
  { name: "Union Bank", code: "032" },
  { name: "United Bank for Africa", code: "033" },
  { name: "Wema Bank", code: "035" },
  { name: "Zenith Bank", code: "057" },
];

export async function listBanks(): Promise<{ ok: boolean; dev?: boolean; banks: Bank[]; error?: string }> {
  if (!koraConfigured()) {
    return { ok: true, dev: true, banks: DEV_BANKS };
  }
  const res = await koraFetch("/identities/ng/banks?type=basic");
  if (!res.ok) return { ok: false, banks: [], error: res.message };
  return { ok: true, banks: (res.data as Bank[]) ?? [] };
}

export type ResolveResult = {
  ok: boolean;
  dev?: boolean;
  error?: string;
  accountName?: string;
  bankName?: string;
  raw?: unknown;
};

/** Resolve a 10-digit NUBAN to the account holder's name (basic lookup). */
export async function resolveBankAccount(bankCode: string, accountNumber: string): Promise<ResolveResult> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] bank resolve ${bankCode}/${accountNumber} — simulated`);
    const bank = DEV_BANKS.find((b) => b.code === bankCode);
    return { ok: true, dev: true, accountName: "TEST ACCOUNT HOLDER", bankName: bank?.name };
  }
  const res = await koraFetch("/identities/ng/bank-account-basic", {
    method: "POST",
    body: { id: accountNumber, bank_code: bankCode, verification_consent: true },
  });
  if (!res.ok) return { ok: false, error: res.message, raw: res.raw };
  const d = res.data as {
    account_details?: { name?: string };
    bank_details?: { name?: string };
  } | null;
  const accountName = d?.account_details?.name;
  if (!accountName) return { ok: false, error: "Could not confirm that account. Check the details.", raw: res.raw };
  return { ok: true, accountName, bankName: d?.bank_details?.name, raw: res.raw };
}

// ── Charges (pay-in) ─────────────────────────────────────────────────────────

export type ChargeInit = {
  ok: boolean;
  dev?: boolean;
  error?: string;
  checkoutUrl?: string;
};

/**
 * Server-issued token for the dev-mode checkout URL. devCompletePayment only
 * settles when it verifies, so the simulated checkout can't be replayed by
 * anyone who merely knows (or guesses) a payment reference.
 */
export function devCheckoutToken(reference: string): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "paypoint-dev";
  return createHmac("sha256", key).update(`dev-checkout:${reference}`).digest("hex").slice(0, 24);
}

export async function initializeCharge(input: {
  amountKobo: number;
  reference: string;
  customerName: string;
  customerEmail: string;
  narration: string;
  redirectUrl: string;
  notificationUrl: string;
}): Promise<ChargeInit> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] charge init ${input.reference} — simulated checkout`);
    return {
      ok: true,
      dev: true,
      checkoutUrl: `/pay/redirect?ref=${encodeURIComponent(input.reference)}&dev=1&t=${devCheckoutToken(input.reference)}`,
    };
  }
  const res = await koraFetch("/charges/initialize", {
    method: "POST",
    body: {
      amount: nairaFromKoboAmount(input.amountKobo),
      currency: "NGN",
      reference: input.reference,
      narration: input.narration,
      redirect_url: input.redirectUrl,
      notification_url: input.notificationUrl,
      customer: { name: input.customerName, email: input.customerEmail },
    },
  });
  if (!res.ok) return { ok: false, error: res.message };
  const d = res.data as { checkout_url?: string } | null;
  if (!d?.checkout_url) return { ok: false, error: "Payment could not be started. Please try again." };
  return { ok: true, checkoutUrl: d.checkout_url };
}

/** Query a charge's status by reference — the reconciliation source of truth. */
export async function queryCharge(reference: string): Promise<{
  ok: boolean;
  status?: string; // e.g. success | failed | processing | expired | abandoned
  amountNaira?: number;
  currency?: string;
  error?: string;
}> {
  if (!koraConfigured()) return { ok: false, error: "dev" };
  const res = await koraFetch(`/charges/${encodeURIComponent(reference)}`);
  if (!res.ok) return { ok: false, error: res.message };
  const d = res.data as { status?: string; amount?: number | string; currency?: string } | null;
  const amount = d?.amount != null ? Number(d.amount) : NaN;
  return {
    ok: true,
    status: d?.status,
    amountNaira: Number.isFinite(amount) ? amount : undefined,
    currency: d?.currency,
  };
}

// ── Disbursements (payout leg) ───────────────────────────────────────────────

export type DisburseResult = {
  ok: boolean;
  dev?: boolean;
  error?: string;
  /** Provider-side payout status, e.g. processing | success | failed. */
  status?: string;
  /** True when the reference was already used — treat as in flight, query it. */
  duplicate?: boolean;
  raw?: unknown;
};

export async function disburse(input: {
  reference: string;
  amountKobo: number;
  bankCode: string;
  accountNumber: string;
  customerName: string;
  customerEmail: string;
  narration: string;
}): Promise<DisburseResult> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] disburse ${input.reference} — simulated success`);
    return { ok: true, dev: true, status: "success" };
  }
  const res = await koraFetch("/transactions/disburse", {
    method: "POST",
    body: {
      reference: input.reference,
      destination: {
        type: "bank_account",
        amount: nairaFromKoboAmount(input.amountKobo),
        currency: "NGN",
        narration: input.narration,
        bank_account: { bank: input.bankCode, account: input.accountNumber },
        customer: { name: input.customerName, email: input.customerEmail },
      },
    },
  });
  if (!res.ok) {
    const duplicate = /reference/i.test(res.message ?? "") && /exist|used|duplicate/i.test(res.message ?? "");
    return { ok: false, error: res.message, duplicate, raw: res.raw };
  }
  const d = res.data as { status?: string } | null;
  return { ok: true, status: d?.status ?? "processing", raw: res.raw };
}

export async function queryDisburse(reference: string): Promise<{
  ok: boolean;
  status?: string;
  error?: string;
}> {
  // Dev contract matches queryCharge: with no key there is no provider to ask,
  // so report unqueryable rather than faking success (a fake success would let
  // the recon sweep mark unpaid payouts as paid).
  if (!koraConfigured()) return { ok: false, error: "dev" };
  const res = await koraFetch(`/transactions/disburse?reference=${encodeURIComponent(reference)}`);
  if (!res.ok) return { ok: false, error: res.message };
  const d = res.data as { status?: string } | null;
  return { ok: true, status: d?.status };
}

// ── Webhook signature ────────────────────────────────────────────────────────

/**
 * Kora signs webhooks with `x-korapay-signature`: HMAC-SHA256 of ONLY the
 * JSON-stringified `data` object, keyed with the secret key.
 */
export function verifyWebhookSignature(dataJson: string, signature: string | null): boolean {
  const key = process.env.KORA_SECRET_KEY;
  if (!key || !signature) return false;
  const expected = createHmac("sha256", key).update(dataJson).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
