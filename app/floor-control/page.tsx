"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/floor-control/header"
import { RecordCard } from "@/components/floor-control/record-card"
import { RecordDetailModal } from "@/components/floor-control/record-detail-modal"
import { DashboardStats } from "@/components/floor-control/dashboard-stats"
import type { FloorControlRecord } from "@/lib/types"
import { generateEmailSummary, exportToJSON } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Printer, Mail, Search, RefreshCw, Loader2 } from "lucide-react"
import { API_URL } from "@/lib/api"

export default function DashboardPage() {
  const [records, setRecords] = useState<FloorControlRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<FloorControlRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<FloorControlRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const CLIENT_CARDS_ENDPOINT = `${API_URL}/api/client-cards`;

  const sanitizeRecord = (data: any): FloorControlRecord => {
    return {
      ...data,
      client: {
        ...data.client,
        first_name: data.client?.first_name || "",
        last_name: data.client?.last_name || "",
        advisor: data.client?.advisor || "Sin Asignar",
        phone_primary: data.client?.phone_primary || "",
        email: data.client?.email || "",
      },
      visit: {
        ...data.visit,
        with_appointment: data.visit?.with_appointment || [],
        without_appointment: data.visit?.without_appointment || [],
        other_with_appointment: data.visit?.other_with_appointment || "",
        other_without_appointment: data.visit?.other_without_appointment || "",
      },
      vehicle_interest: {
        ...data.vehicle_interest,
        vehicle: data.vehicle_interest?.vehicle || "",
        year: data.vehicle_interest?.year?.toString() || "", 
      },
      status: data.status === "pending" ? "pending_review" : data.status || "pending_review", 
      id: data.id || crypto.randomUUID(), 
    }
  }

  const loadRecords = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(CLIENT_CARDS_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los datos`)
      }

      const rawData = await response.json()
      
      const dataArray = Array.isArray(rawData) ? rawData : [rawData]
      
      const cleanData = dataArray.map(sanitizeRecord)

      setRecords(cleanData)
      setFilteredRecords(cleanData)
    } catch (error) {
      console.error("Error cargando registros:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])


  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected', comment: string = "N/A") => {
    setIsUpdating(true);
    

    const recordToUpdate = records.find(r => r.id === id);
    if (!recordToUpdate) return;


    const bodyPayload = {
        status: newStatus,
        notes: newStatus === 'approved' ? "N/A" : comment, 
        client: {
            name: `${recordToUpdate.client.first_name} ${recordToUpdate.client.last_name}`.trim(),
            phone: recordToUpdate.client.phone_primary,
            email: recordToUpdate.client.email || ""
        }
    };
    
    console.log(bodyPayload);

    try {
        const response = await fetch(`${CLIENT_CARDS_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyPayload)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el estado");
        }

        await loadRecords(); 
        setIsModalOpen(false);
        setSelectedRecord(null);
    } catch (error) {
        console.error("Error updating record:", error);
        alert("Hubo un error al actualizar el registro.");
    } finally {
        setIsUpdating(false);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este registro permanentemente? Esta acción no se puede deshacer.")) {
        return;
    }

    setIsUpdating(true);
    try {
        const response = await fetch(`${CLIENT_CARDS_ENDPOINT}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el registro");
        }

        // Refrescar la tabla y cerrar el modal
        await loadRecords();
        setIsModalOpen(false);
        setSelectedRecord(null);
        
    } catch (error) {
        console.error("Error deleting record:", error);
        alert("Hubo un error al eliminar el registro.");
    } finally {
        setIsUpdating(false);
    }
  };

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
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Vista general de todos los registros del día.</p>
          </div>
          {/* Indicador de carga discreto o última actualización */}
          {!isLoading && (
            <span className="text-xs text-muted-foreground">
               {records.length} registros cargados
            </span>
          )}
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
            <Button variant="outline" size="icon" onClick={loadRecords} title="Actualizar" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
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
        {isLoading ? (
          // Skeleton loader básico mientras carga
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredRecords.length > 0 ? (
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
                ? "La base de datos está vacía o hubo un error de conexión."
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
        onApprove={(id) => handleUpdateStatus(id, 'approved')}
        onReject={(id, comment) => handleUpdateStatus(id, 'rejected', comment)}
        onDelete={handleDeleteRecord}
        isUpdating={isUpdating}
      />
      </main>
    </div>
  )
}