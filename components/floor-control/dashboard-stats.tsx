"use client"

import type { FloorControlRecord } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Users, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react"

interface DashboardStatsProps {
  records: FloorControlRecord[]
}

export function DashboardStats({ records }: DashboardStatsProps) {
  const stats = {
    total: records.length,
    approved: records.filter((r) => r.status === "approved").length,
    pending: records.filter((r) => r.status === "pending_review").length,
    rejected: records.filter((r) => r.status === "rejected").length,
    corrected: records.filter((r) => r.status === "corrected").length,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card className="bg-[#00539B] text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#008460] text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Aprobados</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#F59E0B] text-[#1D1D1D]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#1D1D1D]/70">Pendientes</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-[#1D1D1D]/40" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-destructive text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Rechazados</p>
              <p className="text-2xl font-bold">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1A75BB] text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Corregidos</p>
              <p className="text-2xl font-bold">{stats.corrected}</p>
            </div>
            <RefreshCw className="h-8 w-8 text-white/60" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
