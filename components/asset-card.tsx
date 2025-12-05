import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AssetCardProps {
  type: string
  title: string
  description: string
  icon: React.ReactNode
}

export function AssetCard({ type, title, description, icon }: AssetCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{type}</p>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Generar
        </Button>
      </CardContent>
    </Card>
  )
}
