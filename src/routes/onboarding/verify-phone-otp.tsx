import { createFileRoute } from "@tanstack/react-router";
import { VerifyPhoneOtpPage } from "@/pages/onboarding/VerifyPhoneOtpPage";

export const Route = createFileRoute("/onboarding/verify-phone-otp")({
  component: VerifyPhoneOtpPage,
});
