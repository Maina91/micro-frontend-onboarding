import { createFileRoute } from "@tanstack/react-router";
import { FundPage } from "@/pages/onboarding/FundPage";

export const Route = createFileRoute("/onboarding/fund")({
  component: FundPage,
});
