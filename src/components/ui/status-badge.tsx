import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getVariant = () => {
    if (variant) return variant

    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
      case "paid":
        return "default"
      case "pending":
      case "maintenance":
        return "secondary"
      case "cancelled":
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant()}>{status}</Badge>
}
