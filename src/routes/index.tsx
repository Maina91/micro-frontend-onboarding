import { createFileRoute } from '@tanstack/react-router'
import LandingPage from '@/pages/guest/LandingPage'

export const Route = createFileRoute('/')({
  component: LandingPage,
})
