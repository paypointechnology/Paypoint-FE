import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

export const metadata: Metadata = {
  title: "Features — Paypoint",
  description:
    "Everything you need to get paid. Beautiful payment pages, a checkout your customers won't abandon, direct bank settlement, and a dashboard to run it all.",
};

type Feature = { title: string; body: string; icon: keyof typeof ICONS };
type Group = {
  n: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  features: Feature[];
};

const GROUPS: Group[] = [
  {
    n: "01",
    eyebrow: "Payment Pages",
    headline: "Beautiful payment pages, ready in seconds.",
    subhead:
      "No templates to customize. No designers to hire. Every Paypoint page is mobile-first, professional, and built to convert.",
    features: [
      {
        icon: "bolt",
        title: "Instant page creation",
        body: "Add a title, price, photo, and description. Your page is live and ready to share in under a minute. No drafts, no approvals, no waiting.",
      },
      {
        icon: "phone",
        title: "Mobile-first design",
        body: "Every page is built for the phone first. Because that's where your customers are scrolling, tapping, and paying.",
      },
      {
        icon: "link",
        title: "Custom payment links",
        body: "Get a clean, shareable URL like paypoint.link/adaezecouture/aso-oke-dress. Easy to remember, easy to share, easy to trust.",
      },
      {
        icon: "layers",
        title: "Unlimited pages",
        body: "Create as many payment pages as you need, one for each product, service, event, or campaign. No limits.",
      },
      {
        icon: "image",
        title: "Product photos",
        body: "Upload a clear image so buyers know exactly what they're getting. Sellers with photos convert 2x more often.",
      },
      {
        icon: "eye",
        title: "Live preview",
        body: "See exactly how your page looks to buyers as you build it. What you preview is what they pay on.",
      },
    ],
  },
  {
    n: "02",
    eyebrow: "Checkout",
    headline: "A checkout your customers won't abandon halfway.",
    subhead:
      "Most online payments fail because checkout is confusing. Paypoint keeps it simple, your customers pay immediately, on any device.",
    features: [
      {
        icon: "check",
        title: "One-page checkout",
        body: "No multi-step forms, no account creation, no app downloads. Customers see your product, fill in their info, and pay.",
      },
      {
        icon: "user",
        title: "Buyer info collection",
        body: "Choose what to collect at checkout: name, phone, email, address. Only ask for what you actually need.",
      },
      {
        icon: "badge",
        title: "Trust signals built in",
        body: "Your business name, photo, payment count, and security badges are displayed automatically, so first-time buyers feel safe paying you.",
      },
      {
        icon: "card",
        title: "Multiple payment methods",
        body: "Card, bank transfer, USSD, your customers pay however they prefer.",
      },
      {
        icon: "lock",
        title: "Secure by default",
        body: "Every transaction is encrypted and processed through trusted payment infrastructure. Your customers' data is always protected.",
      },
      {
        icon: "refresh",
        title: "Failed payment recovery",
        body: "If a payment fails, customers get a friendly retry screen, no panic, no lost sales.",
      },
    ],
  },
  {
    n: "03",
    eyebrow: "Sharing",
    headline: "Built for the platforms you already use.",
    subhead:
      "WhatsApp, Instagram, TikTok, Twitter, Paypoint works where your customers are. No friction, no redirects, no app downloads.",
    features: [
      {
        icon: "chat",
        title: "WhatsApp-ready links",
        body: "Your link previews beautifully when shared in WhatsApp chats, with your product photo, title, and price visible before the buyer even clicks.",
      },
      {
        icon: "user",
        title: "Instagram bio-friendly",
        body: "Pin your Paypoint link to your IG bio and turn every profile visit into a potential sale.",
      },
      {
        icon: "link",
        title: "Universal link sharing",
        body: "Paste your link anywhere, TikTok, Twitter, email, SMS, even printed QR codes on physical materials.",
      },
      {
        icon: "qr",
        title: "QR codes",
        body: "Generate a downloadable QR code for any payment page. Perfect for events, flyers, packaging, or in-store displays.",
      },
      {
        icon: "image",
        title: "Social preview cards",
        body: "When you share your link on social media, it automatically generates a clean preview card, no manual setup needed.",
      },
    ],
  },
  {
    n: "04",
    eyebrow: "Payments",
    headline: "Your money. In your bank. Fast.",
    subhead:
      "Paypoint is not a wallet. Every payment settles directly into the bank account you connect, no holding, no delays, no hoops to jump through.",
    features: [
      {
        icon: "bank",
        title: "Direct bank settlement",
        body: "Money goes straight from your customer to your bank account. We never hold your funds.",
      },
      {
        icon: "activity",
        title: "Real-time payment tracking",
        body: "See every payment as it happens, who paid, what they paid for, when it came in, and the current status.",
      },
      {
        icon: "receipt",
        title: "Instant receipts",
        body: "Both you and your buyer get a receipt with a reference number the moment payment is confirmed. No more “did you send it?” follow-ups.",
      },
      {
        icon: "link",
        title: "Permanent receipt links",
        body: "Every receipt has its own stable URL. Buyers can revisit, download, or share it anytime, for accounting, returns, or proof.",
      },
      {
        icon: "tag",
        title: "Transparent fees",
        body: "You see exactly what you'll earn before any transaction. No hidden charges, no surprise deductions.",
      },
      {
        icon: "refresh",
        title: "Refund support",
        body: "Need to refund a customer? Process it directly from your dashboard in a few clicks.",
      },
    ],
  },
  {
    n: "05",
    eyebrow: "Dashboard",
    headline: "Run your business from one screen.",
    subhead:
      "Your Paypoint dashboard gives you everything you need to track sales, manage pages, and understand your business at a glance.",
    features: [
      {
        icon: "grid",
        title: "Real-time overview",
        body: "See your total collected, monthly earnings, and active pages, all on the home screen.",
      },
      {
        icon: "activity",
        title: "Recent payments feed",
        body: "Every transaction shows up instantly with customer name, item, amount, and status.",
      },
      {
        icon: "layers",
        title: "Page management",
        body: "Edit, duplicate, or archive any payment page in seconds. Update prices, swap photos, change details, no rebuilding.",
      },
      {
        icon: "users",
        title: "Customer insights",
        body: "See repeat customers, popular products, and payment trends, so you can sell smarter.",
      },
      {
        icon: "download",
        title: "Export and reports",
        body: "Download your transaction history as CSV for bookkeeping, tax filing, or sharing with your accountant.",
      },
      {
        icon: "phone",
        title: "Mobile dashboard",
        body: "Manage your business from your phone. Get notifications, check sales, and update pages on the go.",
      },
    ],
  },
  {
    n: "06",
    eyebrow: "Trust & Security",
    headline: "Built on infrastructure you can trust.",
    subhead:
      "When it comes to money, trust is everything. Paypoint is built with bank-grade security and powered by Nigeria's most trusted payment rails.",
    features: [
      {
        icon: "lock",
        title: "Encrypted transactions",
        body: "Every payment is processed with end-to-end encryption. Your data and your customers' data are always protected.",
      },
      {
        icon: "shield",
        title: "PCI-DSS compliant infrastructure",
        body: "We follow the highest global standards for handling payment information.",
      },
      {
        icon: "receipt",
        title: "Verified receipts",
        body: "Every receipt is permanent, verifiable, and stored securely, so buyers can always confirm authenticity.",
      },
      {
        icon: "eye",
        title: "Fraud protection",
        body: "We monitor for suspicious activity automatically and flag risky transactions before they affect your business.",
      },
      {
        icon: "bank",
        title: "Direct settlement (no wallet)",
        body: "Because we never hold your money, there's nothing to lose. Funds flow from customer to bank, every time.",
      },
      {
        icon: "key",
        title: "Account security",
        body: "Two-factor authentication, login alerts, and session monitoring keep your account safe from unauthorized access.",
      },
    ],
  },
];

const COMPARISON = {
  rows: [
    { label: "Setup time", bank: "Instant", other: "1–3 days", paypoint: "60 seconds" },
    { label: "Need a website?", bank: "No", other: "Often yes", paypoint: "No" },
    { label: "Direct to bank?", bank: "Yes", other: "No (wallet)", paypoint: "Yes" },
    { label: "Professional checkout?", bank: "No", other: "Yes", paypoint: "Yes" },
    { label: "Instant receipt?", bank: "No", other: "Sometimes", paypoint: "Yes" },
    { label: "WhatsApp-friendly?", bank: "Awkward", other: "No", paypoint: "Yes" },
    { label: "Cost to start?", bank: "Free", other: "Monthly fees", paypoint: "Free" },
    { label: "Buyer trust signals?", bank: "None", other: "Some", paypoint: "Built-in" },
  ],
};

const ICONS = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />,
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  link: (
    <>
      <path d="M9.5 14.5a4 4 0 0 0 5.66 0l2.84-2.84a4 4 0 0 0-5.66-5.66L11 7.34" />
      <path d="M14.5 9.5a4 4 0 0 0-5.66 0L6 12.34a4 4 0 0 0 5.66 5.66L13 16.66" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 3 7l9 5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 18 5-5 4 3 3-2 4 4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  badge: (
    <>
      <path d="M12 2.5 14.6 5l3.5-.4 1 3.4 2.9 2-1.5 3.2 1.5 3.2-2.9 2-1 3.4-3.5-.4L12 21.5 9.4 19l-3.5.4-1-3.4-2.9-2 1.5-3.2L2 5.6l2.9-2 1-3.4 3.5.4z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6 15h4" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 4v4h-4" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8 8 0 0 1-11.5 7.2L3.5 20.5l1.8-6A8 8 0 1 1 21 11.5Z" />
    </>
  ),
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 14h3v3M21 14v7M14 21h3" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10.5v8M9.5 10.5v8M14.5 10.5v8M19 10.5v8" />
      <path d="M3 21h18" />
    </>
  ),
  activity: <path d="M2.5 12h4l2.5-7 5 14 2.5-7h4" />,
  receipt: (
    <>
      <path d="M5 3.5v17l2-1.3 2 1.3 2-1.3 2 1.3 2-1.3 2 1.3v-17l-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z" />
      <path d="M9 9h6M9 13h4" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12.5V4.5A1.5 1.5 0 0 1 4.5 3h8L21 11.5a1.5 1.5 0 0 1 0 2.1L13.6 21a1.5 1.5 0 0 1-2.1 0z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M17 14.2a6 6 0 0 1 4 5.8" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11" />
      <path d="m7.5 10 4.5 4.5 4.5-4.5" />
      <path d="M4.5 20.5h15" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="14.5" r="4" />
      <path d="m10.3 11.7 8.2-8.2M16 6l2.5 2.5M14 8l2 2" />
    </>
  ),
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5F58F4]">
      {children}
    </span>
  );
}

function FeatureIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEEDFE]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5F58F4"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {ICONS[name]}
      </svg>
    </span>
  );
}

export default function FeaturesPage() {
  return (
    <div className="bg-white text-[#33323F]">
      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-40 text-center sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(95,88,244,0.14),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-[#14132B] sm:text-5xl lg:text-6xl">
            Everything you need to get paid. Nothing you don&rsquo;t.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6C6B7B]">
            Paypoint gives you the tools to sell anything, share anywhere, and
            get paid directly to your bank, without the bloat of traditional
            payment platforms.
          </p>
          <Link
            href="/coming-soon"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#5F58F4] px-7 text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
          >
            Start free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Feature groups */}
      {GROUPS.map((group, i) => (
        <section
          key={group.n}
          className={`px-5 py-16 sm:py-20 ${i % 2 === 1 ? "bg-[#FAFAFE]" : "bg-white"}`}
        >
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#5F58F4]">{group.n}</span>
                <SectionLabel>{group.eyebrow}</SectionLabel>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-4xl">
                {group.headline}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[#6C6B7B]">
                {group.subhead}
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-[#ECEBF3] bg-white p-6 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(20,19,43,0.12)]"
                >
                  <FeatureIcon name={f.icon} />
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-[#14132B]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6C6B7B]">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Comparison table */}
      <section className="bg-white px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Comparison</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[#14132B] sm:text-4xl">
              Why sellers switch to Paypoint.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-[#6C6B7B]">
              See how Paypoint compares to other ways of getting paid.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#ECEBF3]">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#ECEBF3]">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#9A99A8]"></th>
                  <th className="px-5 py-4 text-sm font-semibold text-[#33323F]">Bank Transfer</th>
                  <th className="px-5 py-4 text-sm font-semibold text-[#33323F]">Other Platforms</th>
                  <th className="bg-[#EEEDFE] px-5 py-4 text-sm font-bold text-[#5F58F4]">Paypoint</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={idx !== COMPARISON.rows.length - 1 ? "border-b border-[#ECEBF3]" : ""}
                  >
                    <th className="px-5 py-4 text-left text-sm font-medium text-[#14132B]">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-sm text-[#6C6B7B]">{row.bank}</td>
                    <td className="px-5 py-4 text-sm text-[#6C6B7B]">{row.other}</td>
                    <td className="bg-[#EEEDFE] px-5 py-4 text-sm font-semibold text-[#14132B]">
                      {row.paypoint}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="px-5 py-16 sm:py-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-br from-[#6F68FF] to-[#4A43D6] px-6 py-14 text-center sm:px-10 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            See it all in action.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-base leading-relaxed text-[#E2E1FF]">
            Create your first payment page now, free, no card required.
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
