import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Seller setup completion — the single source of truth for gating.
 * Derived entirely from flags on the `profiles` row so the dashboard checklist
 * and the "create payment page" gate always agree.
 */
export type SetupStatus = {
  brand: boolean;
  whatsapp: boolean;
  kyb: boolean;
  bank: boolean;
  doneCount: number;
  total: number;
  complete: boolean;
};

const EMPTY: SetupStatus = {
  brand: false,
  whatsapp: false,
  kyb: false,
  bank: false,
  doneCount: 0,
  total: 4,
  complete: false,
};

/**
 * Reads the current user's profile flags and computes setup status.
 * Handles no-session / no-profile / any Supabase error gracefully by returning
 * an all-false status, so callers (dashboard, create gate) never crash even
 * before Supabase is wired to real keys.
 */
export async function getSetupStatus(): Promise<SetupStatus> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return EMPTY;

    const { data: profile } = await supabase
      .from("profiles")
      .select("business_name, logo_url, phone_verified, kyb_status, bank_code, account_number")
      .eq("id", user.id)
      .single();

    if (!profile) return EMPTY;

    const brand = Boolean(profile.business_name) && Boolean(profile.logo_url);
    const whatsapp = profile.phone_verified === true;
    const kyb = profile.kyb_status === "verified";
    // A payout-ready settlement account: verified bank code + full NUBAN.
    const bank = Boolean(profile.bank_code) && Boolean(profile.account_number);

    const doneCount = [brand, whatsapp, kyb, bank].filter(Boolean).length;
    return {
      brand,
      whatsapp,
      kyb,
      bank,
      doneCount,
      total: 4,
      complete: doneCount === 4,
    };
  } catch {
    // No session, unreachable Supabase, or placeholder env — fail safe.
    return EMPTY;
  }
}
