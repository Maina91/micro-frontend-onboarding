import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resume')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resume"!</div>
}
