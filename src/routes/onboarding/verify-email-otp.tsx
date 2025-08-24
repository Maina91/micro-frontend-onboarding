import { createFileRoute } from "@tanstack/react-router";
import { VerifyEmailOtpPage } from "@/pages/onboarding/VerifyEmailOtpPage";

export const Route = createFileRoute("/onboarding/verify-email-otp")({
  component: VerifyEmailOtpPage,
});
