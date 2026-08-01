"use server";

import { randomInt, createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeNgPhone } from "@/lib/phone";
import { sendOtpTemplate } from "@/lib/whatsapp";

/**
 * Setup-step persistence.
 *
 * Each action writes the relevant flags to the signed-in user's `profiles` row
 * so `getSetupStatus()` reflects progress. The provider integrations these
 * steps stand in for arrive in later phases — for now the verification is
 * simulated client-side and only the resulting flag is persisted here.
 *
 * Every action returns a plain `{ ok, error }` result so client wrappers can
 * show inline errors, then navigate on success.
 */

type Result = { ok: boolean; error?: string };

async function updateProfile(patch: Record<string, unknown>): Promise<Result> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false, error: "You need to be logged in." };

    const { error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("id", user.id);

    if (error) return { ok: false, error: error.message };

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/create");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function saveBrand(input: {
  businessName: string;
  logoUrl: string;
  brandColor: string;
  firstName?: string;
  lastName?: string;
}): Promise<Result> {
  return updateProfile({
    business_name: input.businessName.trim(),
    logo_url: input.logoUrl,
    brand_color: input.brandColor,
    first_name: input.firstName?.trim() || null,
    last_name: input.lastName?.trim() || null,
  });
}

// ── WhatsApp OTP verification (Phase 2) ──────────────────────────────────────
const OTP_TTL_MIN = 10;
const RESEND_COOLDOWN_S = 30;
const MAX_SENDS_PER_HOUR = 5;
const MAX_ATTEMPTS = 5;

function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

/**
 * Generate a 6-digit code, store its hash, and send it over WhatsApp.
 * Rate-limited (cooldown + hourly cap). In dev fallback (no real template) the
 * code isn't sent — it's returned as `devCode` so we can test the flow.
 */
export async function sendWhatsappOtp(input: {
  whatsapp: string;
}): Promise<Result & { dev?: boolean; devCode?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You need to be logged in." };

  const phone = normalizeNgPhone(input.whatsapp);
  if (!phone) return { ok: false, error: "Enter a valid Nigerian phone number." };

  const admin = createAdminClient();

  // Rate limits: hourly cap + short resend cooldown.
  const { data: recent } = await admin
    .from("phone_otps")
    .select("created_at")
    .eq("user_id", user.id)
    .gte("created_at", new Date(Date.now() - 3_600_000).toISOString())
    .order("created_at", { ascending: false });
  const sends = recent ?? [];
  if (sends.length >= MAX_SENDS_PER_HOUR) {
    return { ok: false, error: "Too many code requests. Please try again later." };
  }
  if (
    sends[0] &&
    Date.now() - new Date(sends[0].created_at).getTime() < RESEND_COOLDOWN_S * 1000
  ) {
    return { ok: false, error: "Please wait a few seconds before requesting another code." };
  }

  // Invalidate any earlier unconsumed codes so only the newest is valid.
  await admin
    .from("phone_otps")
    .update({ consumed: true })
    .eq("user_id", user.id)
    .eq("consumed", false);

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const { error: insErr } = await admin.from("phone_otps").insert({
    user_id: user.id,
    phone: phone.e164,
    code_hash: hashCode(code),
    expires_at: new Date(Date.now() + OTP_TTL_MIN * 60_000).toISOString(),
  });
  if (insErr) return { ok: false, error: "Could not start verification. Please try again." };

  const send = await sendOtpTemplate(phone.wa, code);
  if (!send.ok) return { ok: false, error: send.error ?? "Could not send the code." };

  return { ok: true, dev: send.dev, devCode: send.dev ? code : undefined };
}

/**
 * Verify a submitted code against the newest unconsumed OTP for this user.
 * On success, persist the number and mark phone_verified.
 */
export async function verifyWhatsappOtp(input: {
  whatsapp: string;
  code: string;
}): Promise<Result> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You need to be logged in." };

  const phone = normalizeNgPhone(input.whatsapp);
  if (!phone) return { ok: false, error: "Enter a valid Nigerian phone number." };

  const admin = createAdminClient();
  const { data: otp } = await admin
    .from("phone_otps")
    .select("id, code_hash, expires_at, attempts")
    .eq("user_id", user.id)
    .eq("consumed", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!otp) return { ok: false, error: "Your code expired. Please request a new one." };
  if (new Date(otp.expires_at).getTime() < Date.now()) {
    await admin.from("phone_otps").update({ consumed: true }).eq("id", otp.id);
    return { ok: false, error: "Your code expired. Please request a new one." };
  }
  if ((otp.attempts ?? 0) >= MAX_ATTEMPTS) {
    await admin.from("phone_otps").update({ consumed: true }).eq("id", otp.id);
    return { ok: false, error: "Too many wrong attempts. Please request a new code." };
  }

  if (hashCode(input.code.trim()) !== otp.code_hash) {
    await admin
      .from("phone_otps")
      .update({ attempts: (otp.attempts ?? 0) + 1 })
      .eq("id", otp.id);
    return { ok: false, error: "That code is incorrect. Please try again." };
  }

  // Success — consume the code and mark the profile verified.
  await admin.from("phone_otps").update({ consumed: true }).eq("id", otp.id);
  return updateProfile({ whatsapp: phone.e164, phone_verified: true });
}

export async function saveKyb(): Promise<Result> {
  // Real KYB (RC/BN lookup, document + liveness checks) runs via Dojah (Phase 3).
  return updateProfile({ kyb_status: "verified" });
}

export async function saveBank(input: {
  bankName: string;
  accountLast4: string;
  accountName: string;
}): Promise<Result> {
  // Real settlement account is a Paystack Subaccount (Phase 3). We store the
  // resolved bank details and a placeholder subaccount code to satisfy the gate.
  return updateProfile({
    subaccount_code: `PENDING_${Date.now()}`,
    bank_name: input.bankName,
    account_last4: input.accountLast4,
    account_name: input.accountName,
  });
}
