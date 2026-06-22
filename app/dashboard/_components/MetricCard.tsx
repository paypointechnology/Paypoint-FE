/**
 * Metric summary card. `variant="hero"` renders a filled-indigo card used for
 * the headline "Total collected" stat; default is a clean white/soft card.
 */
export default function MetricCard({
  label,
  value,
  hint,
  variant = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  variant?: "default" | "hero";
}) {
  if (variant === "hero") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-[#5F58F4] p-5 text-white shadow-[0_2px_10px_rgba(95,88,244,0.25)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10"
        />
        <p className="text-sm font-medium text-white/80">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-[-0.02em]">{value}</p>
        {hint && <p className="mt-1.5 text-xs text-white/70">{hint}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#ECEBF3] bg-white p-5 shadow-[0_1px_3px_rgba(20,19,43,0.04)]">
      <p className="text-sm font-medium text-[#6C6B7B]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-[-0.02em] text-[#14132B]">
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-[#9A99A8]">{hint}</p>}
    </div>
  );
}
