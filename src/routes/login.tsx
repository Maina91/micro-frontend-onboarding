import { createFileRoute } from '@tanstack/react-router'
import { SigninPage } from '@/pages/onboarding/SigninPage'

export const Route = createFileRoute('/login')({
  component: SigninPage,
})
