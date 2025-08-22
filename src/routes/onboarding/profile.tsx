import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/onboarding/ProfilePage";

export const Route = createFileRoute("/onboarding/profile")({
  component: ProfilePage,
});
