import CheckoutCard from "../_components/CheckoutCard";

/**
 * Public buyer checkout — /p/[slug].
 * Frontend prototype: renders fixed sample data regardless of `slug`.
 * Lives outside /dashboard, so it gets NO app shell (root layout only).
 */
export default function CheckoutPage() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5 py-8 sm:py-12">
      <CheckoutCard />
    </main>
  );
}
