import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { koraConfigured } from "@/lib/kora";
import { queryCharge, queryDisburse } from "@/lib/kora-payments";
import {
  recordChargeSuccess,
  recordChargeFailure,
  ensurePayout,
  normalizePayoutStatus,
} from "@/lib/payment-flow";

export const dynamic = "force-dynamic";

/**
 * Reconciliation sweep — the launch-blocking safety net behind the webhook.
 * Run on a schedule (Vercel cron / external cron) with:
 *   Authorization: Bearer <CRON_SECRET>
 *
 * Leg 1 (charges): payments stuck `pending` beyond a grace window are queried
 * at the provider — tab-close buyers get settled, dead sessions get closed
 * out as abandoned/failed.
 * Leg 2 (payouts): pending/failed payouts are retried (bounded attempts);
 * `processing` payouts are re-queried. Stuck seller money is OUR incident:
 * anything unresolved is surfaced in the response for alerting.
 */

const PENDING_GRACE_MIN = 15;
const ABANDON_AFTER_HOURS = 24;
const BATCH = 50;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const admin = createAdminClient();
  const summary = {
    chargesChecked: 0,
    chargesSettled: 0,
    chargesClosed: 0,
    payoutsRetried: 0,
    payoutsSettled: 0,
    stuckPayouts: [] as string[],
  };

  // ── Leg 1: pending charges past the grace window ───────────────────────────
  const graceCutoff = new Date(Date.now() - PENDING_GRACE_MIN * 60_000).toISOString();
  const abandonCutoff = new Date(Date.now() - ABANDON_AFTER_HOURS * 3_600_000).toISOString();

  const { data: pendingPayments } = await admin
    .from("payments")
    .select("reference, created_at")
    .eq("status", "pending")
    .lt("created_at", graceCutoff)
    .order("created_at", { ascending: true })
    .limit(BATCH);

  for (const p of pendingPayments ?? []) {
    summary.chargesChecked += 1;
    if (koraConfigured()) {
      const q = await queryCharge(p.reference);
      if (q.ok && q.status === "success") {
        const settled = await recordChargeSuccess(p.reference, {
          amountNaira: q.amountNaira,
          currency: q.currency,
        });
        if (settled.ok) summary.chargesSettled += 1;
        continue;
      }
      if (q.ok && (q.status === "failed" || q.status === "expired")) {
        await recordChargeFailure(p.reference, q.status);
        summary.chargesClosed += 1;
        continue;
      }
    }
    // Unqueryable or still open: close out very old sessions as abandoned.
    if (p.created_at < abandonCutoff) {
      await recordChargeFailure(p.reference, "abandoned");
      summary.chargesClosed += 1;
    }
  }

  // ── Leg 2: payouts that haven't landed ─────────────────────────────────────
  const { data: openPayouts } = await admin
    .from("payouts")
    .select("id, payment_id, reference, status, attempts")
    .in("status", ["pending", "failed", "processing"])
    .order("created_at", { ascending: true })
    .limit(BATCH);

  for (const po of openPayouts ?? []) {
    if (po.status === "processing") {
      const q = await queryDisburse(po.reference);
      if (q.ok && q.status && q.status !== "processing") {
        await admin
          .from("payouts")
          .update({ status: normalizePayoutStatus(q.status) })
          .eq("id", po.id);
        if (q.status === "success") summary.payoutsSettled += 1;
      }
      continue;
    }
    const res = await ensurePayout(po.payment_id);
    summary.payoutsRetried += 1;
    if (!res.ok) summary.stuckPayouts.push(po.reference);
  }

  if (summary.stuckPayouts.length > 0) {
    console.error(`[recon] payouts needing attention: ${summary.stuckPayouts.join(", ")}`);
  }

  return NextResponse.json({ ok: true, ...summary });
}
