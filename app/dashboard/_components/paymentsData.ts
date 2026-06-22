import type { PaymentStatus } from "./StatusPill";

/** Static sample data — newest first. Frontend only, no backend. */
export type Payment = {
  customer: string;
  item: string;
  amount: string;
  status: PaymentStatus;
  date: string;
};

export const recentPayments: Payment[] = [
  { customer: "Chidinma Okeke", item: "Aso Oke Dress", amount: "₦35,000", status: "Paid", date: "Today" },
  { customer: "Tunde Adeyemi", item: "CV Writing", amount: "₦25,000", status: "Paid", date: "Today" },
  { customer: "Ngozi Eze", item: "Bridal Gele", amount: "₦18,000", status: "Pending", date: "Yesterday" },
  { customer: "Bola Ahmed", item: "Event Ticket", amount: "₦10,000", status: "Paid", date: "Yesterday" },
  { customer: "Emeka Obi", item: "Consultation", amount: "₦40,000", status: "Failed", date: "2 days ago" },
];
