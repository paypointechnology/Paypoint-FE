/** Payment status pill — brand status colors, 999px radius. */
export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Abandoned";

const styles: Record<PaymentStatus, string> = {
  Paid: "bg-[#E7F8EF] text-[#0B7A4B]",
  Pending: "bg-[#FEF0DC] text-[#9A5A00]",
  Failed: "bg-[#FEECEB] text-[#B42318]",
  Abandoned: "bg-[#F1F0F7] text-[#6C6B7B]",
};

export default function StatusPill({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
