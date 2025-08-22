import { createFileRoute } from "@tanstack/react-router";
import { VerifyOtpPage } from "@/pages/onboarding/VerifyOtpPage";

export const Route = createFileRoute("/onboarding/verify-otp")({
  component: VerifyOtpPage,
});
