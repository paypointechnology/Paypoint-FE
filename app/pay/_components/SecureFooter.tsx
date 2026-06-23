import { ShieldIcon } from "./icons";

/**
 * Shared "Secure checkout" footer line for the public buyer flow.
 * No payment-processor name — generic trust language only.
 */
export default function SecureFooter() {
  return (
    <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#9A99A8]">
      <ShieldIcon size={13} />
      Secure checkout
    </p>
  );
}
