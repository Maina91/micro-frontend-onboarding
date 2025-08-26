import { createFileRoute } from '@tanstack/react-router'
import { SigninPage } from '@/pages/onboarding/SigninPage'

export const Route = createFileRoute('/signin')({
  component: SigninPage,
})
