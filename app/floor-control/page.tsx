"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/floor-control/header"
import { RecordCard } from "@/components/floor-control/record-card"
import { RecordDetailModal } from "@/components/floor-control/record-detail-modal"
import { DashboardStats } from "@/components/floor-control/dashboard-stats"
import type { FloorControlRecord } from "@/lib/types"
import { getRecords, generateEmailSummary, exportToJSON } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Printer, Mail, Search, RefreshCw } from "lucide-react"

export default function DashboardPage() {
  const [records, setRecords] = useState<FloorControlRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<FloorControlRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<FloorControlRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadRecords = () => {
    const allRecords = getRecords()
    setRecords(allRecords)
    setFilteredRecords(allRecords)
  }

  useEffect(() => {
    loadRecords()
  }, [])

  useEffect(() => {
    let filtered = records

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.client.first_name.toLowerCase().includes(term) ||
          r.client.last_name.toLowerCase().includes(term) ||
          r.client.advisor.toLowerCase().includes(term) ||
          r.vehicle_interest.vehicle.toLowerCase().includes(term),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter)
    }

    setFilteredRecords(filtered)
  }, [searchTerm, statusFilter, records])

  const handleExportJSON = () => {
    const json = exportToJSON(filteredRecords)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `control-de-piso-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSendDailySummary = () => {
    const summaries = filteredRecords.map((r) => generateEmailSummary(r)).join("\n\n---\n\n")
    const blob = new Blob([summaries], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
    URL.revokeObjectURL(url)
  }

  const handleRecordClick = (record: FloorControlRecord) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Vista general de todos los registros del día.</p>
        </div>

        {/* Stats */}
        <DashboardStats records={records} />

        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row gap-4 my-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, asesor o vehículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="approved">Aprobados</SelectItem>
              <SelectItem value="pending_review">Pendientes</SelectItem>
              <SelectItem value="rejected">Rechazados</SelectItem>
              <SelectItem value="corrected">Corregidos</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={loadRecords} title="Actualizar">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleExportJSON} title="Exportar JSON">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrint} title="Imprimir">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleSendDailySummary} title="Resumen por Correo">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Records Grid */}
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} onClick={() => handleRecordClick(record)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">No se encontraron registros.</p>
            <p className="text-sm text-muted-foreground mt-1">
              {records.length === 0
                ? "Comienza creando una nueva tarjeta de cliente."
                : "Intenta ajustar los filtros de búsqueda."}
            </p>
          </div>
        )}

        {/* Detail Modal */}
        <RecordDetailModal
          record={selectedRecord}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedRecord(null)
          }}
        />
      </main>
    </div>
  )
}
