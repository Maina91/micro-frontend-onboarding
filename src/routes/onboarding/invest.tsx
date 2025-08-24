import { createFileRoute } from "@tanstack/react-router";
import { InvestPage } from "@/pages/onboarding/InvestPage";

export const Route = createFileRoute("/onboarding/invest")({
  component: InvestPage,
});
