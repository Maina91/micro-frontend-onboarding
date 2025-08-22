import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/pages/onboarding/SignupPage";

export const Route = createFileRoute("/onboarding/signup")({
  component: SignupPage,
});
