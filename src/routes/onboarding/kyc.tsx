import { createFileRoute } from "@tanstack/react-router";
import { KycPage } from "@/pages/onboarding/KycPage";

export const Route = createFileRoute("/onboarding/kyc")({
  component: KycPage,
});
