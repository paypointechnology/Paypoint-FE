import "server-only";
import { createClient } from "@/lib/supabase/server";
import { nairaFromKobo, relativeDay } from "@/app/_lib/format";
import type { PaymentStatus } from "@/app/dashboard/_components/StatusPill";
import type { SellerPage } from "@/app/dashboard/_components/pagesData";
import type { Payment } from "@/app/dashboard/_components/paymentsData";

/**
 * Read layer for the authenticated seller's dashboard.
 * Every function is scoped to the current user via RLS (auth.uid()) — no
 * user_id filtering needed in the query, the database enforces it. All
 * functions fail safe (empty/zero) when there's no session or Supabase is
 * unreachable, so pages never crash.
 */

export type SellerProfile = {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  whatsapp: string;
  email: string;
  logoUrl: string;
  bankName: string;
  accountLast4: string;
  accountName: string;
  hasBank: boolean;
};

export type DashboardMetrics = {
  totalLabel: string; // all-time collected
  monthLabel: string; // this calendar month
  monthName: string; // e.g. "July 2026"
  activePages: number;
};

/** Map the DB payment_status enum to the display pill status. */
function toPillStatus(status: string | null): PaymentStatus {
  switch (status) {
    case "success":
      return "Paid";
    case "failed":
    case "refunded":
    case "reversed":
      return "Failed";
    case "abandoned":
      return "Abandoned";
    default:
      return "Pending";
  }
}

/** Current seller's profile, shaped for the UI. Null when no session. */
export async function getProfile(): Promise<SellerProfile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: p } = await supabase
      .from("profiles")
      .select(
        "id, first_name, last_name, business_name, whatsapp, logo_url, bank_name, account_last4, account_name, subaccount_code",
      )
      .eq("id", user.id)
      .single();

    return {
      id: user.id,
      firstName: p?.first_name ?? "",
      lastName: p?.last_name ?? "",
      businessName: p?.business_name ?? "",
      whatsapp: p?.whatsapp ?? "",
      email: user.email ?? "",
      logoUrl: p?.logo_url ?? "",
      bankName: p?.bank_name ?? "",
      accountLast4: p?.account_last4 ?? "",
      accountName: p?.account_name ?? "",
      hasBank: Boolean(p?.subaccount_code),
    };
  } catch {
    return null;
  }
}

/** All of the seller's payment pages, newest first, shaped for PageCard. */
export async function getUserPages(): Promise<SellerPage[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("pages")
      .select(
        "slug, title, type, price_kobo, image_url, is_active, customers_served, created_at",
      )
      .order("created_at", { ascending: false });

    return (data ?? []).map((r) => ({
      slug: r.slug ?? "",
      title: r.title ?? "Untitled",
      type: r.type === "service" ? "Service" : "Product",
      priceLabel: nairaFromKobo(r.price_kobo),
      paidCount: r.customers_served ?? 0,
      active: r.is_active ?? false,
      image: r.image_url ?? "",
    }));
  } catch {
    return [];
  }
}

/** The seller's payments, newest first, shaped for PaymentsList. */
export async function getUserPayments(limit?: number): Promise<Payment[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("payments")
      .select(
        "customer_name, amount_kobo, status, reference, paid_at, created_at, pages(title)",
      )
      .order("created_at", { ascending: false });
    if (limit) query = query.limit(limit);

    const { data } = await query;

    return (data ?? []).map((r) => {
      // Supabase types the embedded relation as an array; take the first.
      const page = Array.isArray(r.pages) ? r.pages[0] : r.pages;
      return {
        customer: r.customer_name ?? "Customer",
        item: page?.title ?? "—",
        amount: nairaFromKobo(r.amount_kobo),
        status: toPillStatus(r.status),
        date: relativeDay(r.paid_at ?? r.created_at),
        reference: r.reference ?? "",
      };
    });
  } catch {
    return [];
  }
}

/** Headline metrics for the dashboard/payments cards. */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const now = new Date();
  const monthName = now.toLocaleDateString("en-NG", {
    month: "long",
    year: "numeric",
  });
  const empty: DashboardMetrics = {
    totalLabel: nairaFromKobo(0),
    monthLabel: nairaFromKobo(0),
    monthName,
    activePages: 0,
  };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return empty;

    // Successful payments only count toward money collected.
    const { data: paid } = await supabase
      .from("payments")
      .select("amount_kobo, paid_at, created_at")
      .eq("status", "success");

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    let totalKobo = 0;
    let monthKobo = 0;
    for (const row of paid ?? []) {
      const amt = row.amount_kobo ?? 0;
      totalKobo += amt;
      const when = new Date(row.paid_at ?? row.created_at ?? 0).getTime();
      if (when >= monthStart) monthKobo += amt;
    }

    const { count: activePages } = await supabase
      .from("pages")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true);

    return {
      totalLabel: nairaFromKobo(totalKobo),
      monthLabel: nairaFromKobo(monthKobo),
      monthName,
      activePages: activePages ?? 0,
    };
  } catch {
    return empty;
  }
}
