import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { disburse, queryDisburse } from "@/lib/kora-payments";
import { sendEmail } from "@/lib/email/brevo";
import { baseEmail } from "@/lib/email/templates";
import { nairaFromKobo } from "@/app/_lib/format";

/**
 * The money-movement core, shared by the webhook, the reconciliation sweep,
 * and the dev-mode checkout. Two rules hold everywhere:
 *   1. A payment settles ONCE (guarded by payment status + unique reference).
 *   2. A payment has exactly ONE payout (unique payment_id), retried until it
 *      lands — the balance only ever auto-drains to sellers.
 */

const MAX_PAYOUT_ATTEMPTS = 5;

type PaymentRow = {
  id: string;
  user_id: string;
  page_id: string | null;
  reference: string;
  amount_kobo: number;
  fee_kobo: number | null;
  status: string;
  customer_name: string | null;
};

/** What the provider says was actually paid, for validation before settling. */
export type PaidInfo = { amountNaira?: number; currency?: string };

/**
 * Idempotently mark a charge successful, bump the page counter, notify the
 * seller, and run the payout leg. Safe to call repeatedly (webhook retries,
 * reconciliation, dev flow).
 *
 * When `paid` is provided (webhook / recon), the payment settles ONLY if the
 * paid amount covers the expected amount in NGN — Kora documents bank-transfer
 * underpayments, and settling one would pay out money we never received.
 */
export async function recordChargeSuccess(
  reference: string,
  paid?: PaidInfo,
): Promise<{ ok: boolean; error?: string }> {
  const admin = createAdminClient();

  const { data: payment } = await admin
    .from("payments")
    .select("id, user_id, page_id, reference, amount_kobo, fee_kobo, status, customer_name")
    .eq("reference", reference)
    .maybeSingle<PaymentRow>();
  if (!payment) return { ok: false, error: `Unknown payment reference ${reference}` };

  if (paid) {
    if (paid.currency && paid.currency !== "NGN") {
      console.error(`[settle] ${reference}: unexpected currency ${paid.currency} — not settling.`);
      return { ok: false, error: `Unexpected currency ${paid.currency}` };
    }
    if (typeof paid.amountNaira === "number" && Number.isFinite(paid.amountNaira)) {
      const expectedNaira = payment.amount_kobo / 100;
      // Tolerate sub-kobo float noise; anything short is an underpayment.
      if (paid.amountNaira + 0.005 < expectedNaira) {
        console.error(
          `[settle] ${reference}: underpaid — got ₦${paid.amountNaira}, expected ₦${expectedNaira}. Left pending for manual handling.`,
        );
        return { ok: false, error: "Underpayment — payment left pending." };
      }
      if (paid.amountNaira > expectedNaira + 0.005) {
        // Overpayment: settle the expected amount; the excess stays in the
        // balance and is flagged for manual refund per the money-flows policy.
        console.error(
          `[settle] ${reference}: overpaid — got ₦${paid.amountNaira}, expected ₦${expectedNaira}. Settling expected amount; excess needs manual refund.`,
        );
      }
    }
  }

  // Settle-once: only the pending -> success transition triggers side effects.
  if (payment.status !== "success") {
    const { data: updated } = await admin
      .from("payments")
      .update({ status: "success", paid_at: new Date().toISOString() })
      .eq("id", payment.id)
      .neq("status", "success")
      .select("id");

    if (updated && updated.length > 0) {
      if (payment.page_id) {
        await admin.rpc("increment_customers_served", { p_page_id: payment.page_id });
      }
      await notifySellerPaid(payment);
    }
  }

  return ensurePayout(payment.id);
}

/** Mark a non-successful terminal state reported by the provider. */
export async function recordChargeFailure(
  reference: string,
  providerStatus: string,
): Promise<void> {
  const admin = createAdminClient();
  const status = providerStatus === "expired" || providerStatus === "abandoned" ? "abandoned" : "failed";
  await admin
    .from("payments")
    .update({ status })
    .eq("reference", reference)
    .eq("status", "pending");
}

/**
 * The payout leg: create-or-load the single payout row for a payment, then
 * push it toward success. Reference reuse makes provider-side retries safe.
 */
export async function ensurePayout(paymentId: string): Promise<{ ok: boolean; error?: string }> {
  const admin = createAdminClient();

  const { data: payment } = await admin
    .from("payments")
    .select("id, user_id, reference, amount_kobo, fee_kobo, status")
    .eq("id", paymentId)
    .maybeSingle<PaymentRow>();
  if (!payment || payment.status !== "success") {
    return { ok: false, error: "Payout requires a successful payment." };
  }

  const feeKobo = payment.fee_kobo ?? 0;
  const sellerKobo = payment.amount_kobo - feeKobo;

  // One payout per payment: insert is a no-op if the row already exists.
  await admin.from("payouts").upsert(
    {
      payment_id: payment.id,
      user_id: payment.user_id,
      amount_kobo: sellerKobo,
      fee_kobo: feeKobo,
      reference: `po_${payment.reference}`,
    },
    { onConflict: "payment_id", ignoreDuplicates: true },
  );

  const { data: payout } = await admin
    .from("payouts")
    .select("id, reference, status, attempts, amount_kobo")
    .eq("payment_id", payment.id)
    .maybeSingle();
  if (!payout) return { ok: false, error: "Could not create the payout record." };
  if (payout.status === "success") return { ok: true };
  if (payout.status === "processing") {
    // In flight at the provider — ask, don't re-send.
    const q = await queryDisburse(payout.reference);
    if (q.ok && q.status) {
      await admin
        .from("payouts")
        .update({ status: normalizePayoutStatus(q.status) })
        .eq("id", payout.id);
    }
    return { ok: true };
  }
  if (payout.attempts >= MAX_PAYOUT_ATTEMPTS) {
    return { ok: false, error: `Payout ${payout.reference} exhausted retries — needs manual attention.` };
  }

  const { data: profile } = await admin
    .from("profiles")
    .select("bank_code, account_number, account_name, business_name")
    .eq("id", payment.user_id)
    .maybeSingle();
  if (!profile?.bank_code || !profile?.account_number) {
    await admin
      .from("payouts")
      .update({ last_error: "Seller has no verified settlement account." })
      .eq("id", payout.id);
    return { ok: false, error: "Seller has no verified settlement account." };
  }

  const result = await disburse({
    reference: payout.reference,
    amountKobo: payout.amount_kobo,
    bankCode: profile.bank_code,
    accountNumber: profile.account_number,
    customerName: profile.account_name ?? profile.business_name ?? "Paypoint seller",
    customerEmail: "payouts@paypoint.co",
    narration: `Paypoint settlement ${payment.reference}`,
  });

  if (!result.ok && result.duplicate) {
    // Reference already at the provider from an earlier attempt — query it.
    const q = await queryDisburse(payout.reference);
    const providerStatus = q.ok && q.status ? normalizePayoutStatus(q.status) : "processing";

    if (providerStatus === "failed") {
      // That reference is burned: count the attempt and rotate the reference
      // so the next sweep sends a FRESH disburse instead of dead-ending on
      // "duplicate" forever. Attempts still cap at MAX_PAYOUT_ATTEMPTS, after
      // which the sweep surfaces it as stuck.
      await admin
        .from("payouts")
        .update({
          status: "failed",
          attempts: payout.attempts + 1,
          reference: `po_${payment.reference}_r${payout.attempts + 1}`,
          last_error: q.error ?? "Provider reported the transfer failed.",
          provider_response: (result.raw as object) ?? null,
        })
        .eq("id", payout.id);
      return { ok: false, error: `Payout ${payout.reference} failed at the provider — will retry.` };
    }

    await admin
      .from("payouts")
      .update({
        status: providerStatus,
        provider_response: (result.raw as object) ?? null,
      })
      .eq("id", payout.id);
    return { ok: true };
  }

  await admin
    .from("payouts")
    .update({
      status: result.ok ? normalizePayoutStatus(result.status ?? "processing") : "failed",
      attempts: payout.attempts + 1,
      last_error: result.ok ? null : result.error ?? "Disburse failed",
      provider_response: (result.raw as object) ?? null,
    })
    .eq("id", payout.id);

  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

/** Map a provider transfer status onto our payout enum. */
export function normalizePayoutStatus(providerStatus: string): "processing" | "success" | "failed" {
  if (providerStatus === "success") return "success";
  if (providerStatus === "failed") return "failed";
  return "processing";
}

/** "You got paid" — the seller's favourite email. Failure never blocks money. */
async function notifySellerPaid(payment: PaymentRow): Promise<void> {
  try {
    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("first_name, business_name")
      .eq("id", payment.user_id)
      .maybeSingle();
    const { data: authUser } = await admin.auth.admin.getUserById(payment.user_id);
    const email = authUser?.user?.email;
    if (!email) return;

    const amount = nairaFromKobo(payment.amount_kobo);
    const buyer = payment.customer_name || "A customer";
    await sendEmail({
      to: email,
      subject: `You got paid ${amount} 🎉`,
      html: baseEmail({
        preheader: `${buyer} just paid you ${amount}.`,
        heading: `You got paid ${amount}`,
        bodyHtml: `<p><strong>${buyer}</strong> just completed a payment${
          profile?.business_name ? ` to <strong>${profile.business_name}</strong>` : ""
        }.</p><p>The money is on its way to your bank account automatically. Reference: <strong>${payment.reference}</strong>.</p>`,
        cta: {
          label: "View in your dashboard",
          href: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/dashboard/payments`,
        },
      }),
    });
  } catch {
    // Notification is best-effort by design.
  }
}
