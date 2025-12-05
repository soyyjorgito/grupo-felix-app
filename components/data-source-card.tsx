import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"

interface DataSourceCardProps {
  name: string
  description: string
  status: "connected" | "pending"
  icon: React.ReactNode
  lastSync?: string
}

export function DataSourceCard({ name, description, status, icon, lastSync }: DataSourceCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
          <Badge variant={status === "connected" ? "default" : "secondary"}>
            {status === "connected" ? "Conectada" : "Pendiente"}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {status === "connected" && lastSync && (
          <p className="text-xs text-muted-foreground mb-4">Última sincronización: {lastSync}</p>
        )}

        <Button variant={status === "connected" ? "outline" : "default"} className="w-full">
          {status === "connected" ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </>
          ) : (
            "Conectar"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
