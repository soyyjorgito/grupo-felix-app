import type React from "react"
import { Badge } from "@/components/ui/badge"
import type { RecordStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CheckCircle, Clock, XCircle, RefreshCw, HelpCircle } from "lucide-react"

interface StatusBadgeProps {
  // Permitimos string para que no explote si TS no detecta el tipo exacto en runtime
  status: RecordStatus | string 
  className?: string
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
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
  pending: {
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
  // Intentamos obtener la configuración
  const config = statusConfig[status]

  // PROTECCIÓN: Si config es undefined (status desconocido), mostramos un badge genérico
  if (!config) {
    return (
      <Badge variant="outline" className={cn("flex items-center gap-1 bg-gray-200 text-gray-700", className)}>
        <HelpCircle className="h-3 w-3" />
        {status || "Sin Estado"}
      </Badge>
    )
  }

  return (
    <Badge className={cn("flex items-center gap-1", config.className, className)}>
      {config.icon}
      {config.label}
    </Badge>
  )
}