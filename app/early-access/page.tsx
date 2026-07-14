import type { Metadata } from "next";
import SiteHeader from "../_components/SiteHeader";
import SiteFooter from "../_components/SiteFooter";
import Waitlist from "./Waitlist";

const OG_TITLE =
  "Paypoint | The Commerce Infrastructure Powering Africa's Social Economy";
const OG_DESCRIPTION =
  "Turn social attention into completed transactions with frictionless, direct-to-bank checkout built for African businesses.";

export const metadata: Metadata = {
  title:
    "Paypoint Early Access | Frictionless Checkout for Social Commerce in Africa",
  description:
    "Join the Paypoint waitlist and be among the first businesses to turn social media attention into completed sales with frictionless, direct-to-bank checkout built for Africa.",
  openGraph: { title: OG_TITLE, description: OG_DESCRIPTION },
  twitter: { title: OG_TITLE, description: OG_DESCRIPTION },
};

/** Public early-access / waitlist page — the destination of every marketing CTA. */
export default function EarlyAccessPage() {
  return (
    <>
      <SiteHeader />
      <Waitlist />
      <SiteFooter />
    </>
  );
}
