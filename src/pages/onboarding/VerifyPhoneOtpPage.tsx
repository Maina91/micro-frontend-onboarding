// src/pages/onboarding/VerifyPhoneOtpPage.tsx
import { OtpVerificationForm } from "@/components/forms/OtpForm";
// import { sendPhoneOtp, verifyPhoneOtp } from "@/core/actions/onboarding/otp";

export function VerifyPhoneOtpPage() {
  return (
    <OtpVerificationForm
      mode="phone"
      title="Phone Verification"
      description="Enter your phone number to receive a 6-digit verification code."
      fieldName="phone"
      placeholder="+254700000000"
      sendOtp={async (phone) => {
        return { success: true }; 
      }}
      verifyOtp={async (phone, otp) => {
        return { success: true }; 
      }}
      onVerified={(phone) => {
        console.log("[DEV] Phone verified:", phone);
      }}
    />
  );
}
