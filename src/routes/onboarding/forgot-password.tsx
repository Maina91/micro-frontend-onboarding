import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordPage } from '@/pages/onboarding/ForgotPasswordPage'

export const Route = createFileRoute('/onboarding/forgot-password')({
  component: ForgotPasswordPage,
})

