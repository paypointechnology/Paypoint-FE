import type { PaymentStatus } from "./StatusPill";

/** Static sample data — newest first. Frontend only, no backend. */
export type Payment = {
  customer: string;
  item: string;
  amount: string;
  status: PaymentStatus;
  date: string;
  /** Receipt reference — links to /pay/receipt/{reference}. */
  reference: string;
};

export const recentPayments: Payment[] = [
  { customer: "Chidinma Okeke", item: "Aso Oke Dress", amount: "₦35,000", status: "Paid", date: "Today", reference: "PP-7F3A9C2E" },
  { customer: "Tunde Adeyemi", item: "Professional CV Writing", amount: "₦25,000", status: "Paid", date: "Today", reference: "PP-1B8D44A0" },
  { customer: "Ngozi Eze", item: "Bridal Gele Styling", amount: "₦18,000", status: "Pending", date: "Yesterday", reference: "PP-9C2E55F1" },
  { customer: "Bola Ahmed", item: "Asoebi Bundle", amount: "₦15,000", status: "Paid", date: "Yesterday", reference: "PP-3A6F12B7" },
  { customer: "Emeka Obi", item: "Professional CV Writing", amount: "₦25,000", status: "Failed", date: "2 days ago", reference: "PP-5D0E7788" },
  { customer: "Funke Akindele", item: "Aso Oke Dress", amount: "₦35,000", status: "Paid", date: "2 days ago", reference: "PP-8E1C90DA" },
  { customer: "Ibrahim Musa", item: "Bridal Gele Styling", amount: "₦18,000", status: "Abandoned", date: "This week", reference: "PP-2F77B3C4" },
  { customer: "Amaka Nwosu", item: "Asoebi Bundle", amount: "₦15,000", status: "Paid", date: "This week", reference: "PP-6B40AE19" },
  { customer: "Segun Bello", item: "Professional CV Writing", amount: "₦25,000", status: "Pending", date: "This week", reference: "PP-0A93FD52" },
  { customer: "Halima Yusuf", item: "Aso Oke Dress", amount: "₦35,000", status: "Paid", date: "This week", reference: "PP-4C18E6BB" },
];
