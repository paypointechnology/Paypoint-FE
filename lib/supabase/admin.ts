import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for privileged server-side operations
 * (bypasses RLS). NEVER import this into client code — the "server-only"
 * import above will fail the build if you do.
 *
 * Use only inside Route Handlers, Server Actions, or webhook handlers for
 * trusted operations (e.g. writing payments from a verified Paystack webhook).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
