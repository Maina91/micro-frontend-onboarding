import { useState } from "react";
import { SignupForm } from "@/components/forms/SignupForm";
import { PreSignupForm } from "@/components/forms/PreSignupForm";

export function SignupPage() {
  const [step, setStep] = useState<"pre-signup" | "signup">("pre-signup");
  const [preSignupData, setPreSignupData] = useState<{
    accountType: string;
    referralCode?: string;
  } | null>(null);

  const handlePreSignupContinue = (data: {
    accountType: string;
    referralCode?: string;
  }) => {
    setPreSignupData(data);
    setStep("signup");
  };

  const handleBack = () => {
    setStep("pre-signup");
    setPreSignupData(null);
  };

  if (step === "pre-signup") {
    return (
      <div className="space-y-6">
        <PreSignupForm onContinue={handlePreSignupContinue} />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SignupForm preSignupData={preSignupData!} onBack={handleBack} />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
