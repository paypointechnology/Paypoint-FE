import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/kora-payments";
import {
  recordChargeSuccess,
  recordChargeFailure,
  normalizePayoutStatus,
} from "@/lib/payment-flow";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * Kora webhook — the source of truth for money movement.
 *   charge.success  -> settle the payment once + fire the auto-payout
 *   charge.failed   -> mark the payment failed
 *   transfer.*      -> update the payout leg (references are `po_...`)
 *
 * Signature: `x-korapay-signature` is HMAC-SHA256 of the JSON-stringified
 * `data` object only, keyed with the secret key. We respond 200 fast; the
 * reconciliation sweep repairs anything a retry storm or outage misses.
 */
export async function POST(req: Request) {
  let body: { event?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body?.event || !body?.data) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const signature = req.headers.get("x-korapay-signature");
  if (!verifyWebhookSignature(JSON.stringify(body.data), signature)) {
    return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
  }

  const reference = typeof body.data.reference === "string" ? body.data.reference : null;
  if (!reference) return NextResponse.json({ ok: true });

  try {
    switch (body.event) {
      case "charge.success": {
        // Settle only what was actually paid: the event's amount/currency are
        // validated against the payment row (underpaid transfers stay pending).
        const amount = Number(body.data.amount);
        await recordChargeSuccess(reference, {
          amountNaira: Number.isFinite(amount) ? amount : undefined,
          currency: typeof body.data.currency === "string" ? body.data.currency : undefined,
        });
        break;
      }

      case "charge.failed":
        await recordChargeFailure(reference, String(body.data.status ?? "failed"));
        break;

      case "transfer.success":
      case "transfer.failed": {
        const admin = createAdminClient();
        const status = normalizePayoutStatus(
          body.event === "transfer.success" ? "success" : "failed",
        );
        await admin
          .from("payouts")
          .update({
            status,
            last_error: status === "failed" ? String(body.data.reason ?? "Transfer failed") : null,
            provider_response: body.data,
          })
          .eq("reference", reference)
          .neq("status", "success");
        break;
      }

      default:
        break; // Unknown events are acknowledged, not errored.
    }
  } catch (e) {
    // Log and still 200: the reconciliation sweep is the safety net, and a
    // 5xx would only trigger provider retry storms.
    console.error(`[webhook:kora] ${body.event} ${reference} failed:`, e);
  }

  return NextResponse.json({ ok: true });
}
