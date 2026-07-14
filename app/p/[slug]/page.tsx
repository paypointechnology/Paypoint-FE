import Link from "next/link";
import CheckoutCard, {
  type BuyerFields,
  type CheckoutData,
} from "../_components/CheckoutCard";
import { createClient } from "@/lib/supabase/server";
import { nairaFromKobo } from "@/app/_lib/format";

/**
 * Public buyer checkout — /p/[slug].
 * Reads the live page through the public_page_by_slug RPC (SECURITY DEFINER,
 * returns only checkout-safe columns for active pages). Lives outside
 * /dashboard, so it gets NO app shell (root layout only).
 */

export const dynamic = "force-dynamic";

type PublicPage = {
  slug: string;
  title: string;
  type: string;
  price_kobo: number;
  currency: string;
  description: string | null;
  image_url: string | null;
  delivery_info: string | null;
  collect_fields: BuyerFields | null;
  customers_served: number;
  business_name: string | null;
  logo_url: string | null;
};

async function getPage(slug: string): Promise<PublicPage | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("public_page_by_slug", {
      page_slug: slug,
    });
    if (error || !data || data.length === 0) return null;
    return data[0] as PublicPage;
  } catch {
    return null;
  }
}

export default async function CheckoutPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#FAFAFE] px-5 py-8 sm:py-12">
      {page ? (
        <CheckoutCard data={toCheckoutData(page)} />
      ) : (
        <Unavailable />
      )}
    </main>
  );
}

/** Map a DB page row to the checkout card's content shape. */
function toCheckoutData(page: PublicPage): CheckoutData {
  const fields: BuyerFields = page.collect_fields ?? {
    phone: false,
    email: false,
    address: false,
  };
  return {
    business: page.business_name || "This business",
    sellerLogo: page.logo_url || "/assets/paypoint-icon.png",
    contacts: [], // seller contact chips are added when contact data is exposed
    productImage: page.image_url || "",
    title: page.title || "",
    description: page.description || "",
    priceLabel: nairaFromKobo(page.price_kobo),
    delivery: page.delivery_info || "",
    paidCount: page.customers_served || 0,
    buyerFields: fields,
  };
}

/** Calm, branded state for a missing or inactive page — not a 404. */
function Unavailable() {
  return (
    <div className="w-full max-w-[420px] text-center">
      <div className="overflow-hidden rounded-[20px] border border-[#ECEBF3] bg-white p-8 shadow-[0_4px_24px_rgba(20,19,43,0.06)]">
        <div className="mb-5 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/paypoint-wordmark-indigo.png"
            alt="Paypoint"
            className="h-6 w-auto opacity-80"
          />
        </div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-[#14132B]">
          This payment page is unavailable
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#6C6B7B]">
          The link may be inactive or no longer exist. Please check with the
          seller for an updated link.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#5F58F4] px-5 text-sm font-semibold text-white transition hover:bg-[#4A43D6]"
        >
          Go to Paypoint
        </Link>
      </div>
      <p className="mt-6 text-xs text-[#9A99A8]">Secure checkout</p>
    </div>
  );
}
