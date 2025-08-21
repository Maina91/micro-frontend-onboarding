import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kyc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/kyc"!</div>
}
