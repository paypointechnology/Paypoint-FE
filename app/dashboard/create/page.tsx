import { getSetupStatus } from "@/lib/setup";
import SetupGate from "../_components/SetupGate";
import CreateBuilder from "./CreateBuilder";

/**
 * Create a payment page — gated on setup completion.
 * Until all four setup steps are done, the builder is replaced by a gate that
 * routes the seller back to the dashboard checklist.
 */
export default async function CreatePage() {
  const status = await getSetupStatus();

  if (!status.complete) {
    return <SetupGate status={status} />;
  }

  return <CreateBuilder />;
}
