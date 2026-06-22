"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./navItems";

/**
 * Active state is detected with usePathname.
 * Home (/dashboard) must match exactly so it isn't "active" on every sub-route;
 * the others match on prefix so nested pages keep their tab highlighted.
 */
export function useIsActive(href: string) {
  const pathname = usePathname();
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop sidebar row. */
export default function NavLink({ item }: { item: NavItem }) {
  const active = useIsActive(item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[#EEEDFE] text-[#5F58F4]"
          : "text-[#6C6B7B] hover:bg-[#F5F4FF] hover:text-[#33323F]"
      }`}
    >
      <span className="shrink-0">{item.icon}</span>
      {item.label}
    </Link>
  );
}

/** Mobile bottom-bar tab. */
export function TabLink({ item }: { item: NavItem }) {
  const active = useIsActive(item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors ${
        active ? "text-[#5F58F4]" : "text-[#9A99A8]"
      }`}
    >
      <span className="shrink-0">{item.icon}</span>
      {item.label}
    </Link>
  );
}
