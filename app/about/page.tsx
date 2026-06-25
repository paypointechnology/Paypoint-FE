import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

export const metadata: Metadata = {
  title: "About — Paypoint",
  description:
    "We're building the simplest way for anyone in Africa to get paid. Learn the story behind Paypoint and what we believe.",
};

const VALUES = [
  {
    n: "01",
    title: "Simplicity is a feature.",
    body: "We'll never make selling complex. If a feature doesn't make it easier for you to get paid, it doesn't belong in Paypoint.",
  },
  {
    n: "02",
    title: "Your money is your money.",
    body: "We never hold your funds. Payments settle directly into your bank account. You stay in control of every naira, always.",
  },
  {
    n: "03",
    title: "Trust is the product.",
    body: "In Africa, trust is the currency that makes commerce work. Every page, receipt, and notification we design is built to earn it.",
  },
  {
    n: "04",
    title: "Mobile-friendly.",
    body: "Most of our users run their entire business from a phone. So we build mobile-first, not as an afterthought, but as the standard.",
  },
  {
    n: "05",
    title: "Made in Africa, for Africa.",
    body: "We're not localizing a foreign product. We're building from the ground up for the way Africans truly sell, in DMs, on social media, at markets, and everywhere in between.",
  },
  {
    n: "06",
    title: "Built with speed.",
    body: "We move fast, ship often, and listen closely. Every feature we build comes from real conversations with real sellers.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5F58F4]">
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white text-[#33323F]">
      {/* Header */}
      <SiteHeader />

      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-40 text-center sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(95,88,244,0.14),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-[#14132B] sm:text-5xl lg:text-6xl">
            We&rsquo;re building the simplest way for anyone in Africa to get paid.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6C6B7B]">
            From the fashion designer to the freelancer, Paypoint gives every
            seller the tools to collect payments with just a link.
          </p>
        </div>
      </section>

      {/* Section 2 — Our Story */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-4xl">
            It started with a problem we couldn&rsquo;t stop noticing.
          </h2>
          <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-[#33323F]">
            <p>
              Every day across Nigeria, the same scene plays out. A customer
              slides into a seller&rsquo;s DMs asking about a product. The seller
              replies with a price. The customer asks for an account number. The
              seller sends it. And then, silence.
            </p>
            <p>
              Sometimes the payment comes. Often it doesn&rsquo;t. And when it
              does, there&rsquo;s no receipt, no reference, no proof. Just a
              screenshot, a hope, and a follow-up message asking,
              &ldquo;Did you get it?&rdquo;
            </p>
            <p>
              We watched this happen everywhere, in fashion, food, freelancing,
              beauty, events. Millions of small businesses, all losing sales to
              the same broken checkout flow. Meanwhile, every payment platform in
              the market was built for big companies with websites.
            </p>
            <p>
              So we built Paypoint, the payment tool for the rest of us. A tool
              that lets anyone create a professional payment page in under a
              minute, share it on WhatsApp or Instagram, and get paid directly to
              their bank.{" "}
              <span className="font-semibold text-[#14132B]">No website. No code.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — What We Do */}
      <section className="bg-[#FAFAFE] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-4xl">
            We make getting paid as easy as sending a link.
          </h2>
          <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-[#33323F]">
            <p>
              Paypoint is a payment infrastructure company built for African
              sellers, from individual creators to small businesses.
            </p>
            <p>
              Our flagship product lets anyone create a beautiful payment page in
              seconds, share it anywhere, and receive money directly into their
              bank account. No merchant accounts. No integrations. No barriers.
            </p>
            <p>
              Behind the simple link is a powerful payments engine, built on
              trusted infrastructure, secured with end-to-end encryption, and
              designed to handle everything from a ₦5,000 order to a ₦5 million
              event ticket.
            </p>
            <p className="font-semibold text-[#14132B]">
              We&rsquo;re just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Our Values */}
      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-4xl">
              What we believe.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="rounded-2xl border border-[#ECEBF3] bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(20,19,43,0.12)]"
              >
                <span className="text-sm font-bold text-[#5F58F4]">{v.n}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-[#14132B]">
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#6C6B7B]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section — Join us */}
      <section className="bg-[#FAFAFE] px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Come build with us</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-4xl">
            Building something that matters.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#33323F]">
            We&rsquo;re a small, fast-moving team building something that matters.
            If you care about great products, real users, and the future of
            social commerce, we&rsquo;d love to hear from you.
          </p>
          <a
            href="mailto:hello@paypoint.co"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#5F58F4] px-7 text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
          >
            Send us a message
          </a>
        </div>
      </section>

      {/* Footer CTA band */}
      <section className="px-5 py-16 sm:py-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-br from-[#6F68FF] to-[#4A43D6] px-6 py-14 text-center sm:px-10 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            Ready to get paid?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-base leading-relaxed text-[#E2E1FF]">
            Join thousands of sellers across Nigeria already using Paypoint.
          </p>
          <Link
            href="/coming-soon"
            className="relative mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#5F58F4] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
          >
            Start free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
