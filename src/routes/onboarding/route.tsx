import { OnboardingLayout } from "@/layouts/OnboardingLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingRouteComponent,
});

function OnboardingRouteComponent() {
  return (
    <OnboardingLayout>
      <Outlet />
    </OnboardingLayout>
  );
}


