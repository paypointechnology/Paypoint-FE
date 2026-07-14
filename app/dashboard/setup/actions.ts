"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

export async function saveWhatsapp(input: { whatsapp: string }): Promise<Result> {
  // Real OTP delivery is the Meta WhatsApp Cloud API (Phase 2). Here the code
  // is simulated client-side; we persist the number and mark it verified.
  return updateProfile({
    whatsapp: input.whatsapp.trim(),
    phone_verified: true,
  });
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
