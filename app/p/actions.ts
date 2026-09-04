"use server";

import { randomBytes } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { devCheckoutToken, initializeCharge } from "@/lib/kora-payments";
import { koraConfigured } from "@/lib/kora";
import { computeFeeKobo } from "@/lib/fees";
import { recordChargeSuccess } from "@/lib/payment-flow";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Buyer-side checkout actions. These run for ANONYMOUS visitors, so they use
 * the admin client behind strict, slug-scoped reads and never expose seller
 * secrets. The price always comes from the page row — never from the client.
 */

export type StartCheckoutResult = {
  ok: boolean;
  error?: string;
  checkoutUrl?: string;
};

export async function startCheckout(input: {
  slug: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}): Promise<StartCheckoutResult> {
  const name = input.name?.trim();
  if (!name) return { ok: false, error: "Please enter your full name." };

  const admin = createAdminClient();

  const { data: page } = await admin
    .from("pages")
    .select("id, user_id, title, price_kobo")
    .eq("slug", input.slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!page || !page.price_kobo || page.price_kobo <= 0) {
    return { ok: false, error: "This checkout isn't available anymore." };
  }

  const { data: seller } = await admin
    .from("profiles")
    .select("bank_code, account_number, business_name")
    .eq("id", page.user_id)
    .maybeSingle();
  if (!seller?.bank_code || !seller?.account_number) {
    return { ok: false, error: "This seller can't accept payments yet. Please contact them directly." };
  }

  const reference = `pp_${randomBytes(10).toString("hex")}`;
  const feeKobo = computeFeeKobo(page.price_kobo);

  const { error: insErr } = await admin.from("payments").insert({
    page_id: page.id,
    user_id: page.user_id,
    customer_name: name,
    customer_email: input.email?.trim() || null,
    customer_phone: input.phone?.trim() || null,
    customer_address: input.address?.trim() || null,
    amount_kobo: page.price_kobo,
    fee_kobo: feeKobo,
    status: "pending",
    reference,
    is_test: !koraConfigured(),
  });
  if (insErr) return { ok: false, error: "Could not start your payment. Please try again." };

  const site = getSiteUrl();
  const charge = await initializeCharge({
    amountKobo: page.price_kobo,
    reference,
    customerName: name,
    // Kora requires an email; fall back to a routable per-payment alias.
    customerEmail: input.email?.trim() || `guest+${reference}@paypoint.co`,
    narration: `${page.title ?? "Payment"} · ${seller.business_name ?? "Paypoint seller"}`,
    redirectUrl: `${site}/pay/callback`,
    notificationUrl: `${site}/api/webhooks/kora`,
  });

  if (!charge.ok || !charge.checkoutUrl) {
    await admin.from("payments").update({ status: "failed" }).eq("reference", reference);
    return { ok: false, error: charge.error ?? "Could not start your payment. Please try again." };
  }

  return { ok: true, checkoutUrl: charge.checkoutUrl };
}

export type PaymentResult = {
  ok: boolean;
  status?: string;
  reference?: string;
  amountKobo?: number;
  business?: string;
  title?: string;
  paidAt?: string | null;
};

/**
 * Buyer-facing payment lookup for the callback/receipt screens. References
 * are unguessable (crypto-random), and only checkout-safe fields leave here.
 */
export async function getPaymentResult(reference: string): Promise<PaymentResult> {
  if (!reference || reference.length < 8) return { ok: false };
  const admin = createAdminClient();

  const { data: payment } = await admin
    .from("payments")
    .select("status, reference, amount_kobo, paid_at, page_id, user_id")
    .eq("reference", reference)
    .maybeSingle();
  if (!payment) return { ok: false };

  const [{ data: page }, { data: seller }] = await Promise.all([
    payment.page_id
      ? admin.from("pages").select("title").eq("id", payment.page_id).maybeSingle()
      : Promise.resolve({ data: null }),
    admin.from("profiles").select("business_name").eq("id", payment.user_id).maybeSingle(),
  ]);

  return {
    ok: true,
    status: payment.status,
    reference: payment.reference,
    amountKobo: payment.amount_kobo,
    business: seller?.business_name ?? undefined,
    title: page?.title ?? undefined,
    paidAt: payment.paid_at,
  };
}

/**
 * DEV FALLBACK ONLY: with no real KORA_SECRET_KEY, the simulated checkout
 * calls this to run the exact success path (settle-once, counter, email,
 * payout leg) so the full pipeline is exercised end to end.
 *
 * Guarded three ways — this is a public server action:
 *   1. inert whenever a real key is configured;
 *   2. requires the server-issued token embedded in the simulated checkout
 *      URL (HMAC of the reference), so a bare reference can't be replayed;
 *   3. only settles rows recorded as is_test at charge time.
 */
export async function devCompletePayment(input: {
  reference: string;
  token: string;
}): Promise<{ ok: boolean }> {
  if (koraConfigured()) return { ok: false };
  if (!input.token || input.token !== devCheckoutToken(input.reference)) return { ok: false };

  const admin = createAdminClient();
  const { data: payment } = await admin
    .from("payments")
    .select("is_test")
    .eq("reference", input.reference)
    .maybeSingle();
  if (!payment?.is_test) return { ok: false };

  const res = await recordChargeSuccess(input.reference);
  return { ok: res.ok };
}
