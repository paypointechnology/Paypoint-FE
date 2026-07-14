import Link from "next/link";
import type { SetupStatus } from "@/lib/setup";

type Step = {
  key: keyof Pick<SetupStatus, "brand" | "whatsapp" | "kyb" | "bank">;
  title: string;
  description: string;
  href: string;
};

const STEPS: Step[] = [
  {
    key: "brand",
    title: "Set up your brand",
    description: "Logo, business name and color buyers see at checkout.",
    href: "/dashboard/setup/brand",
  },
  {
    key: "whatsapp",
    title: "Verify your WhatsApp number",
    description: "Confirm the number buyers use to reach you.",
    href: "/dashboard/setup/whatsapp",
  },
  {
    key: "kyb",
    title: "Verify your business",
    description: "A quick check that keeps payouts flowing without holds.",
    href: "/dashboard/setup/kyb",
  },
  {
    key: "bank",
    title: "Connect your bank account",
    description: "Where your payments settle, instantly.",
    href: "/dashboard/setup/bank",
  },
];

/**
 * Dashboard "Finish setting up" card. Reads the server-computed SetupStatus and
 * renders progress plus a row per step. Gates payment-link creation elsewhere;
 * here it just guides the seller through the four steps.
 */
export default function SetupChecklist({ status }: { status: SetupStatus }) {
  const pct = Math.round((status.doneCount / status.total) * 100);

  return (
    <section className="rounded-[20px] border border-[#ECEBF3] bg-white p-5 shadow-[0_1px_3px_rgba(20,19,43,0.04)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-[-0.01em] text-[#14132B]">
            Finish setting up
          </h2>
          <p className="mt-1 text-sm text-[#6C6B7B]">
            Complete these steps to start creating payment pages.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#EEEDFE] px-3 py-1 text-xs font-semibold text-[#5F58F4]">
          {status.doneCount} of {status.total} done
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEBF3]">
        <div
          className="h-full rounded-full bg-[#5F58F4] transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Steps */}
      <ul className="mt-5 divide-y divide-[#F1F0F7]">
        {STEPS.map((step) => {
          const done = status[step.key];
          return (
            <li
              key={step.key}
              className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0"
            >
              {/* Status marker */}
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  done
                    ? "bg-[#E7F8EF] text-[#0B7A4B]"
                    : "border border-dashed border-[#C7C4F7] bg-[#F5F4FF] text-[#5F58F4]"
                }`}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[#5F58F4]" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#14132B]">{step.title}</p>
                <p className="truncate text-xs text-[#9A99A8]">{step.description}</p>
              </div>

              {done ? (
                <span className="shrink-0 text-xs font-semibold text-[#0B7A4B]">
                  Done
                </span>
              ) : (
                <Link
                  href={step.href}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[#5F58F4] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#4A43D6]"
                >
                  Set up
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
