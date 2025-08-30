import { OtpVerificationForm } from "@/components/forms/OtpForm";

export function VerifyEmailOtpPage() {
  return (
    <OtpVerificationForm
      mode="email"
      title="Email Verification"
      description="Enter your email address to receive a 6-digit verification code."
      fieldName="email"
      placeholder="your@email.com"
      sendOtp={async (email) => {
        return { success: true }; 
      }}
      verifyOtp={async (email, otp) => {
        return { success: true }; 
      }}
      onVerified={(email) => {
        console.log("[DEV] Email verified:", email);
      }}
    />
  );
}
