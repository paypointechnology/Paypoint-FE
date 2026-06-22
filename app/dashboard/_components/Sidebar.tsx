import Link from "next/link";
import { navItems } from "./navItems";
import NavLink from "./NavLink";

/**
 * Desktop sidebar — fixed, ~240px, visible md:+ only.
 * Brand mark + wordmark, primary "Create Paypoint" CTA, nav, account row.
 */
export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-[#ECEBF3] bg-[#FAFAFE] px-4 py-5 md:flex">
      {/* Brand */}
      <Link href="/dashboard" className="mb-7 flex items-center gap-2 px-1">
        <img
          src="/assets/paypoint-icon.png"
          alt=""
          className="h-8 w-8 rounded-lg"
        />
        <span className="text-[17px] font-semibold tracking-[-0.01em] text-[#14132B]">
          Paypoint
        </span>
      </Link>

      {/* Primary CTA */}
      <Link
        href="/dashboard/create"
        className="mb-6 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5F58F4] text-sm font-semibold text-white shadow-[0_1px_2px_rgba(95,88,244,0.25)] transition hover:bg-[#4A43D6]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
        Create Paypoint
      </Link>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Account row */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#ECEBF3] bg-white px-3 py-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEEDFE] text-sm font-semibold text-[#5F58F4]">
          AC
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#14132B]">Adaeze</p>
          <p className="truncate text-xs text-[#9A99A8]">Adaeze Couture</p>
        </div>
      </div>
    </aside>
  );
}
