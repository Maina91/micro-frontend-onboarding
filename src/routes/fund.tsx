import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/fund')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/fund"!</div>
}
