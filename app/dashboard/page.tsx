import Link from "next/link";
import { getSetupStatus, type SetupStatus } from "@/lib/setup";
import {
  getProfile,
  getUserPayments,
  getUserPages,
  getSalesOverview,
  type SalesOverview,
} from "@/lib/data";
import type { Payment } from "./_components/paymentsData";
import RecentPayments from "./_components/RecentPayments";
import SetupChecklist from "./_components/SetupChecklist";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/** Dashboard home — the Sales Command Center. Zero-state until the first
 *  successful payment, then the live sales dashboard. All on real data. */
export default async function DashboardHome() {
  const [status, profile, overview, pages, recent] = await Promise.all([
    getSetupStatus(),
    getProfile(),
    getSalesOverview(),
    getUserPages(),
    getUserPayments(5),
  ]);

  const name = profile?.firstName || profile?.businessName || "there";
  const hasPage = pages.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#6C6B7B]">{greeting()} 👋</p>
          <h1 className="mt-0.5 text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
            {overview.hasSales ? `Welcome back, ${name}` : `Welcome, ${name}`}
          </h1>
        </div>
        <Link
          href="/dashboard/create"
          className="hidden h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6] sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create checkout
        </Link>
      </div>

      {overview.hasSales ? (
        <ActiveHome overview={overview} recent={recent} />
      ) : (
        <ZeroHome name={name} status={status} hasPage={hasPage} />
      )}
    </div>
  );
}

/* ─────────────────────────── ZERO STATE ─────────────────────────── */
function ZeroHome({
  name,
  status,
  hasPage,
}: {
  name: string;
  status: SetupStatus;
  hasPage: boolean;
}) {
  const banner = !status.complete
    ? { tag: "Let's finish setup", title: `You're almost ready, ${name}.`, sub: "Complete a few quick steps to start getting paid." }
    : !hasPage
    ? { tag: "You're all set", title: "Time to create your first checkout.", sub: "It takes under a minute. No website needed." }
    : { tag: "You're almost ready", title: "Your checkout is live.", sub: "One share away from your first payment." };

  const cta = !status.complete
    ? null
    : !hasPage
    ? { href: "/dashboard/create", label: "Create your first checkout" }
    : { href: "/dashboard/pages", label: "Share your checkout" };

  return (
    <>
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6F68FF] to-[#4A43D6] p-5 text-white sm:p-6">
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wide">
          🚀 {banner.tag}
        </span>
        <h2 className="relative mt-3 text-xl font-extrabold tracking-[-0.01em]">{banner.title}</h2>
        <p className="relative mt-1 text-sm text-white/75">{banner.sub}</p>
        {cta && (
          <Link
            href={cta.href}
            className="relative mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-[#5F58F4] transition hover:bg-white/90"
          >
            {cta.label}
          </Link>
        )}
      </div>

      {/* Setup checklist (until complete), else progress tracker */}
      {!status.complete ? (
        <SetupChecklist status={status} />
      ) : (
        <ProgressTracker hasPage={hasPage} />
      )}

      {/* Ghost KPIs */}
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A99A8]">Sales snapshot</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-[#ECEBF3] bg-white p-4">
              <div className="h-2.5 w-3/5 rounded bg-[#F1F0F7]" />
              <div className="mt-3 h-5 w-4/5 rounded bg-[#F1F0F7]" />
            </div>
          ))}
        </div>
        <p className="mt-2.5 text-center text-xs text-[#9A99A8]">
          Your sales dashboard comes alive after your first payment.
        </p>
      </div>

      <QuickActions />
      <TipCard>
        Businesses with real product photos build more buyer confidence. Add a
        clear photo to your checkout to get paid faster.
      </TipCard>

      {/* Empty activity */}
      <div className="rounded-2xl border border-[#ECEBF3] bg-white p-6 text-center">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A99A8]">Recent activity</p>
        <div className="text-2xl">💭</div>
        <p className="mt-1.5 text-sm font-semibold text-[#14132B]">Nothing here yet.</p>
        <p className="mt-1 text-sm text-[#6C6B7B]">
          Once customers start paying, every payment appears here.
        </p>
      </div>
    </>
  );
}

function ProgressTracker({ hasPage }: { hasPage: boolean }) {
  const steps = [
    { label: "Account created", done: true },
    { label: "Business set up", done: true },
    { label: "First checkout created", done: hasPage },
    { label: "Share your checkout", done: false },
    { label: "Receive your first payment", done: false },
  ];
  const done = steps.filter((s) => s.done).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <div className="rounded-2xl border border-[#ECEBF3] bg-white p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="max-w-[240px] text-sm font-bold text-[#14132B]">
          You&rsquo;re {pct}% of the way to your first sale.
        </p>
        <span className="text-lg font-extrabold text-[#5F58F4]">{pct}%</span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-[#E3E2EE]">
        <div className="h-full rounded-full bg-[#5F58F4]" style={{ width: `${pct}%` }} />
      </div>
      <ul className="flex flex-col gap-2.5">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-sm">
            {s.done ? (
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#12B76A] text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
              </span>
            ) : (
              <span className="h-[18px] w-[18px] rounded-md border-[1.5px] border-[#E3E2EE]" />
            )}
            <span className={s.done ? "font-medium text-[#33323F]" : "text-[#9A99A8]"}>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────── ACTIVE STATE ─────────────────────────── */
function ActiveHome({ overview, recent }: { overview: SalesOverview; recent: Payment[] }) {
  return (
    <>
      {/* Hero KPI */}
      <div className="rounded-2xl bg-gradient-to-br from-[#6F68FF] to-[#5F58F4] p-5 text-white shadow-[0_12px_36px_-16px_rgba(95,88,244,0.6)] sm:p-6">
        <p className="text-xs font-medium text-white/70">Total collected</p>
        <p className="mt-1 text-[34px] font-extrabold leading-none tracking-[-0.03em]">{overview.totalLabel}</p>
        <p className="mt-2 text-xs text-white/65">
          All time · {overview.successCount} successful {overview.successCount === 1 ? "payment" : "payments"}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Today" value={overview.todayLabel} sub={`${overview.todayCount} ${overview.todayCount === 1 ? "payment" : "payments"}`} up={overview.todayCount > 0} />
        <Kpi
          label="This week"
          value={overview.weekLabel}
          sub={overview.weekDeltaPct == null ? "vs last week" : `${overview.weekDeltaPct >= 0 ? "▲" : "▼"} ${Math.abs(overview.weekDeltaPct)}% vs last`}
          up={(overview.weekDeltaPct ?? 0) >= 0}
        />
        <Kpi label="This month" value={overview.monthLabel} sub={overview.monthName} />
        <Kpi label="Avg order" value={overview.avgOrderLabel} sub="per payment" />
      </div>

      {/* Revenue chart */}
      <RevenueChart series={overview.series7d} />

      {/* Top checkouts */}
      {overview.topCheckouts.length > 0 && (
        <div className="rounded-2xl border border-[#ECEBF3] bg-white p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A99A8]">Top performing checkouts</p>
          <div className="flex flex-col">
            {overview.topCheckouts.map((c, i) => (
              <div key={c.title} className={`flex items-center gap-3 py-2.5 ${i < overview.topCheckouts.length - 1 ? "border-b border-[#ECEBF3]" : ""}`}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-[11px] font-extrabold text-[#5F58F4]">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#14132B]">{c.title}</p>
                  <p className="text-[11px] text-[#6C6B7B]">{c.count} {c.count === 1 ? "payment" : "payments"}</p>
                </div>
                <p className="shrink-0 text-sm font-extrabold text-[#14132B]">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent payments */}
      <RecentPayments rows={recent} />

      <QuickActions />
    </>
  );
}

function Kpi({ label, value, sub, up }: { label: string; value: string; sub: string; up?: boolean }) {
  return (
    <div className="rounded-2xl border border-[#ECEBF3] bg-white p-4">
      <p className="text-[11px] font-medium text-[#6C6B7B]">{label}</p>
      <p className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#14132B]">{value}</p>
      <p className={`mt-0.5 text-[11px] ${up ? "text-[#0B7A4B]" : "text-[#9A99A8]"}`}>{sub}</p>
    </div>
  );
}

function RevenueChart({ series }: { series: { day: string; kobo: number }[] }) {
  const max = Math.max(1, ...series.map((s) => s.kobo));
  return (
    <div className="rounded-2xl border border-[#ECEBF3] bg-white p-5">
      <p className="mb-4 text-sm font-bold text-[#14132B]">Revenue · last 7 days</p>
      <div className="flex h-24 items-end gap-2">
        {series.map((s, i) => {
          const h = Math.max(6, Math.round((s.kobo / max) * 100));
          const isMax = s.kobo === max && s.kobo > 0;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className={`w-full rounded-t-md ${isMax ? "bg-[#5F58F4]" : "bg-[#EEEDFE]"}`} style={{ height: `${h}%` }} />
              <span className="text-[10px] font-medium text-[#9A99A8]">{s.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */
function QuickActions() {
  const actions = [
    { href: "/dashboard/create", icon: "➕", label: "New checkout" },
    { href: "/dashboard/pages", icon: "🏷️", label: "My checkouts" },
    { href: "/dashboard/payments", icon: "💳", label: "Payments" },
    { href: "/dashboard/settings", icon: "⚙️", label: "Settings" },
  ];
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A99A8]">Quick actions</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#ECEBF3] bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-[#5F58F4] hover:shadow-[0_10px_30px_-20px_rgba(95,88,244,0.6)]"
          >
            <span className="text-2xl">{a.icon}</span>
            <span className="text-[13px] font-bold text-[#14132B]">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TipCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#ECEBF3] border-l-[3px] border-l-[#5F58F4] bg-white p-4">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5F58F4]">Grow faster</p>
      <div className="flex items-start gap-2.5">
        <span className="text-lg">💡</span>
        <p className="text-[13px] leading-relaxed text-[#33323F]">{children}</p>
      </div>
    </div>
  );
}
