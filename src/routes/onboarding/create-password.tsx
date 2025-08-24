import { createFileRoute } from "@tanstack/react-router";
import PasswordPage from "@/pages/onboarding/PasswordPage";

export const Route = createFileRoute("/onboarding/create-password")({
  component: PasswordPage,
});
