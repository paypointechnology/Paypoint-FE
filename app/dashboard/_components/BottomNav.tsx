import { navItems } from "./navItems";
import { TabLink } from "./NavLink";

/**
 * Mobile bottom tab bar — fixed, < md only, safe-area aware.
 * Reuses the same navItems config as the sidebar (DRY).
 */
export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#ECEBF3] bg-white/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      {navItems.map((item) => (
        <TabLink key={item.href} item={item} />
      ))}
    </nav>
  );
}
