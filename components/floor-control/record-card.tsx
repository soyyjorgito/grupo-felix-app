"use client"

import type { FloorControlRecord } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StatusBadge } from "@/components/floor-control/status-badge"
import { Phone, Mail, Car, Calendar, User } from "lucide-react"

interface RecordCardProps {
  record: FloorControlRecord
  onClick?: () => void
}

export function RecordCard({ record, onClick }: RecordCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-[#00539B]" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              {record.client.first_name} {record.client.last_name}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              {record.client.advisor}
            </p>
          </div>
          <StatusBadge status={record.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{record.client.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{record.client.phone_primary}</span>
          </div>
        </div>

        {record.vehicle_interest.vehicle && (
          <div className="flex items-center gap-2 text-sm text-[#00539B] font-medium">
            <Car className="h-4 w-4" />
            <span>
              {record.vehicle_interest.vehicle} {record.vehicle_interest.year}
              {record.vehicle_interest.version && ` - ${record.vehicle_interest.version}`}
            </span>
          </div>
        )}

        {record.client.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{record.client.email}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
