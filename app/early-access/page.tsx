import type { Metadata } from "next";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import Waitlist from "./Waitlist";

export const metadata: Metadata = {
  title: "Paypoint, join early access",
  description:
    "Paypoint turns any product or service into a payment link. Join early access and start selling before we open to the public.",
};

/** Public early-access / waitlist page — the destination of every marketing CTA. */
export default function ComingSoonPage() {
  return (
    <>
      <SiteHeader />
      <Waitlist />
      <SiteFooter />
    </>
  );
}
