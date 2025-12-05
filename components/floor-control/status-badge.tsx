import type React from "react"
import { Badge } from "@/components/ui/badge"
import type { RecordStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react"

interface StatusBadgeProps {
  status: RecordStatus
  className?: string
}

const statusConfig: Record<RecordStatus, { label: string; className: string; icon: React.ReactNode }> = {
  approved: {
    label: "Aprobado",
    className: "bg-[#008460] text-white hover:bg-[#008460]",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  pending_review: {
    label: "Pendiente",
    className: "bg-[#F59E0B] text-[#1D1D1D] hover:bg-[#F59E0B]",
    icon: <Clock className="h-3 w-3" />,
  },
  rejected: {
    label: "Rechazado",
    className: "bg-destructive text-white hover:bg-destructive",
    icon: <XCircle className="h-3 w-3" />,
  },
  corrected: {
    label: "Corregido",
    className: "bg-[#1A75BB] text-white hover:bg-[#1A75BB]",
    icon: <RefreshCw className="h-3 w-3" />,
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge className={cn("flex items-center gap-1", config.className, className)}>
      {config.icon}
      {config.label}
    </Badge>
  )
}
