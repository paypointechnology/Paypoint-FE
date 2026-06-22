import Link from "next/link";
import Sidebar from "./_components/Sidebar";
import BottomNav from "./_components/BottomNav";

/**
 * Authenticated app shell.
 * Desktop (md:+): fixed left sidebar, content offset by its width.
 * Mobile (< md): bottom tab bar + a floating "Create Paypoint" action,
 * with extra bottom padding so the bar never overlaps content.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-[#FAFAFE] text-[#33323F]">
      <Sidebar />

      <div className="md:pl-60">
        <main className="mx-auto w-full max-w-5xl px-5 pb-28 pt-6 sm:px-6 md:pb-12 md:pt-10">
          {children}
        </main>
      </div>

      {/* Mobile floating Create action — sits just above the tab bar */}
      <Link
        href="/dashboard/create"
        aria-label="Create Paypoint"
        className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#5F58F4] text-white shadow-[0_6px_20px_rgba(95,88,244,0.45)] transition hover:bg-[#4A43D6] md:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>

      <BottomNav />
    </div>
  );
}
