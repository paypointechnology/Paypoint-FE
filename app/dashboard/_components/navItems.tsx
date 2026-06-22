import type { ReactNode } from "react";

/**
 * Single source of truth for the dashboard navigation.
 * Consumed by both the desktop Sidebar and the mobile BottomNav (DRY).
 * Each icon is a small inline SVG so we ship no icon dependency.
 */
export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden>
        <path d="M3 10.5 12 4l9 6.5" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M9.5 20v-5.5h5V20" />
      </svg>
    ),
  },
  {
    label: "Pages",
    href: "/dashboard/pages",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.7-1.3-1.8-3.1-2 .8a7.4 7.4 0 0 0-2.6-1.5L14.4 2H9.6l-.3 2a7.4 7.4 0 0 0-2.6 1.5l-2-.8L2.9 7.8l1.7 1.3a7.6 7.6 0 0 0 0 3l-1.7 1.3 1.8 3.1 2-.8a7.4 7.4 0 0 0 2.6 1.5l.3 2h4.8l.3-2a7.4 7.4 0 0 0 2.6-1.5l2 .8 1.8-3.1-1.7-1.3Z" />
      </svg>
    ),
  },
];
