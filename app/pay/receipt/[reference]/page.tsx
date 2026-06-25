import Receipt from "../../_components/Receipt";

/**
 * Stable, retrievable receipt — /pay/receipt/[reference].
 * Renders the shared Receipt in its "stable" variant, so a buyer who lost the
 * tab can reopen it anytime. Uses the `reference` route param in the receipt.
 */
export default function ReceiptPage({
  params,
}: {
  params: { reference: string };
}) {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5 py-8 sm:py-12">
      <Receipt
        reference={decodeURIComponent(params.reference)}
        variant="stable"
      />
    </main>
  );
}
