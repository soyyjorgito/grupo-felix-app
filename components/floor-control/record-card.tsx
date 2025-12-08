"use client"

import type { FloorControlRecord } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StatusBadge } from "@/components/floor-control/status-badge"
import { Phone, Mail, Car, Calendar, User, AlertCircle } from "lucide-react"

interface RecordCardProps {
  record: FloorControlRecord
  onClick?: () => void
}

export function RecordCard({ record, onClick }: RecordCardProps) {
  const firstName = record.client.first_name || "Cliente"
  const lastName = record.client.last_name || "Sin Nombre"
  const advisor = record.client.advisor || "Sin Asignar"
  const date = record.client.date || "Fecha desconocida"
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-[#00539B] h-full" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="overflow-hidden">
            <h3 className="font-semibold text-foreground truncate" title={`${firstName} ${lastName}`}>
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <User className="h-3 w-3 shrink-0" />
              <span className="truncate">{advisor}</span>
            </p>
          </div>
          <div className="shrink-0">
             <StatusBadge status={record.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="truncate">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span className="truncate">{record.client.phone_primary || "Sin Teléfono"}</span>
          </div>
        </div>

        {record.vehicle_interest.vehicle ? (
          <div className="flex items-start gap-2 text-sm text-[#00539B] font-medium bg-blue-50 p-2 rounded-md">
            <Car className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="line-clamp-2">
              {record.vehicle_interest.vehicle} {record.vehicle_interest.year}
              {record.vehicle_interest.version && ` - ${record.vehicle_interest.version}`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground/70 italic p-2">
             <Car className="h-4 w-4" />
             <span>Sin vehículo de interés</span>
          </div>
        )}

        {record.client.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1 border-t">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate" title={record.client.email}>{record.client.email}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}