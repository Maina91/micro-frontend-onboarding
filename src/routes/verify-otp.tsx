import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/verify-otp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/verify-otp"!</div>
}
