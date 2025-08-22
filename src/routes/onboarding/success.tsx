import { createFileRoute } from "@tanstack/react-router";
import { SuccessPage } from "@/pages/onboarding/SuccessPage";

export const Route = createFileRoute("/onboarding/success")({
  component: SuccessPage,
});
