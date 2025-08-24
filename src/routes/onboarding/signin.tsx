import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboarding/signin"!</div>
}
