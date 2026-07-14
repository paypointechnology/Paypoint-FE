import type { PaymentStatus } from "./StatusPill";

/**
 * View type for a payment row. Real rows are loaded from Supabase in
 * lib/data.ts (getUserPayments) and mapped into this shape.
 */
export type Payment = {
  customer: string;
  item: string;
  amount: string;
  status: PaymentStatus;
  date: string;
  /** Receipt reference — links to /pay/receipt/{reference}. */
  reference: string;
};
