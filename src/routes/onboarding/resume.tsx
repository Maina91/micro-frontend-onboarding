import { createFileRoute } from "@tanstack/react-router";
import { ResumePage } from "@/pages/onboarding/ResumePage";

export const Route = createFileRoute("/onboarding/resume")({
  component: ResumePage,
});
