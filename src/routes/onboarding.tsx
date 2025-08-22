import { OnboardingLayout } from "@/layouts/OnboardingLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayoutRoute,
});

function OnboardingLayoutRoute() {
  return (
    <OnboardingLayout>
      <Outlet />
    </OnboardingLayout>
  );
}
