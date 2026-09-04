import "server-only";

/**
 * Kora Identity client (KYC/KYB).
 * Verifies Nigerian business registrations (CAC) and owner identity (BVN).
 *
 * DEV FALLBACK: until a real KORA_SECRET_KEY is set (and Identity access is
 * approved on the Kora dashboard), no registry call is made — lookups return a
 * simulated success flagged `dev` so the full setup flow stays testable.
 */

const KORA_BASE = "https://api.korapay.com/merchant/api/v1";

/** True only when a real secret key is configured. */
export function koraConfigured(): boolean {
  const key = process.env.KORA_SECRET_KEY;
  return Boolean(key && key !== "placeholder");
}

export type IdentityResult = {
  ok: boolean;
  dev?: boolean;
  error?: string;
  /** Registered/legal name returned by the registry, when available. */
  registeredName?: string;
  /** Raw provider response — persisted server-side for the audit trail. */
  raw?: unknown;
};

/** Registries name the company field inconsistently across ID types. */
function pickRegisteredName(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const d = data as Record<string, unknown>;
  const name = d.company_name ?? d.registration_name ?? d.business_name ?? d.name;
  return typeof name === "string" && name.trim() ? name.trim() : undefined;
}

async function identityRequest(
  path: string,
  body: Record<string, unknown>,
): Promise<IdentityResult> {
  try {
    const res = await fetch(`${KORA_BASE}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = (await res.json().catch(() => null)) as
      | { status?: boolean; message?: string; data?: unknown }
      | null;

    if (!res.ok || !json?.status) {
      return {
        ok: false,
        error: json?.message || "Verification failed. Please try again.",
        raw: json ?? { http_status: res.status },
      };
    }

    return { ok: true, registeredName: pickRegisteredName(json.data), raw: json };
  } catch {
    return { ok: false, error: "Could not reach the verification service. Please try again." };
  }
}

/**
 * KYB: look up a business registration (RC/BN number) against CAC.
 * `registrationName` is optional context Kora can match against.
 */
export async function verifyCac(
  rcNumber: string,
  registrationName?: string,
): Promise<IdentityResult> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] CAC lookup for ${rcNumber} — simulated success`);
    return { ok: true, dev: true, registeredName: registrationName };
  }

  const body: Record<string, unknown> = { id: rcNumber, verification_consent: true };
  if (registrationName) body.registration_name = registrationName;
  return identityRequest("/identities/ng/cac", body);
}

/**
 * KYC: verify the owner's BVN, optionally matching name/date of birth.
 * Not yet wired to a setup step — used when owner-identity checks land.
 */
export async function verifyBvn(
  bvn: string,
  validation?: { firstName?: string; lastName?: string; dateOfBirth?: string },
): Promise<IdentityResult> {
  if (!koraConfigured()) {
    console.log(`[kora:dev] BVN lookup — simulated success`);
    return { ok: true, dev: true };
  }

  const body: Record<string, unknown> = { id: bvn, verification_consent: true };
  if (validation) {
    body.validation = {
      ...(validation.firstName ? { first_name: validation.firstName } : {}),
      ...(validation.lastName ? { last_name: validation.lastName } : {}),
      ...(validation.dateOfBirth ? { date_of_birth: validation.dateOfBirth } : {}),
    };
  }
  return identityRequest("/identities/ng/bvn", body);
}
