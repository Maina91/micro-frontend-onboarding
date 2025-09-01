import type React from "react";
import { Stepper } from "@/components/ui/stepper";
import { useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";

const steps = ["Signup", "Verify Phone", "Complete"];

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const location = useLocation();

  const getActiveStep = () => {
    if (location.pathname.includes("signup")) return 0;
    if (location.pathname.includes("verify-phone-otp")) return 1;
    if (location.pathname.includes("invest")) return 2;
    return 0;
  };

  const activeStep = getActiveStep();
  const progressPercent = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-muted/20">
      {/* Left section: full image background */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        // className="hidden lg:flex relative flex-1"
        className="hidden lg:flex relative lg:basis-5/12 xl:basis-4/12"
      >
        <img
          src="/images/side.jpg"
          alt="Onboarding Illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Logo on top-left of the image */}
        <div className="absolute top-3 left-6">
          <motion.img
            src="/images/logo.png"
            alt="Aurora Capital"
            width={80}
            height={80}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Right section: Stepper + Form */}
      {/* <main className="flex flex-1 items-center justify-center px-2 py-4"> */}
      <main className="flex lg:basis-7/12 xl:basis-8/12 items-center justify-center px-2 py-4">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-lg bg-background shadow-xl rounded-2xl p-8 md:p-10"
        >
          {/* Stepper */}
          <div className="mb-8">
            <Stepper steps={steps} activeStep={activeStep} />
            <div className="mt-4 w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Dynamic Page Content */}
          <div>{children}</div>
        </motion.div>
      </main>
    </div>
  );
}
