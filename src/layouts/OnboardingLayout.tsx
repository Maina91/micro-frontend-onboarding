"use client";

import type React from "react";
import { Stepper } from "@/components/ui/stepper";
import { useLocation } from "@tanstack/react-router";

const steps = ["Signup", "Verify", "Profile", "Preferences", "Complete"];

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const location = useLocation();

  // Determine active step based on current path
  const getActiveStep = () => {
    if (location.pathname.includes("signup")) return 0;
    if (location.pathname.includes("verify")) return 1;
    if (location.pathname.includes("profile")) return 2;
    if (location.pathname.includes("preferences")) return 3;
    if (location.pathname.includes("complete")) return 4;
    return 0;
  };

  const activeStep = getActiveStep();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
      <div className="container max-w-lg py-8 px-4">
        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={steps} activeStep={activeStep} />
        </div>

        {/* Page Content */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
