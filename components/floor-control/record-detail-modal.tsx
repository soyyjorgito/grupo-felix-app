"use client"

import type { FloorControlRecord } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/floor-control/status-badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { CheckCircle, XCircle, Download, Mail, Loader2, Trash2 } from "lucide-react"
import { generateEmailSummary, exportToJSON } from "@/lib/store"
import { withAppointmentOptions, withoutAppointmentOptions } from "@/lib/options"

interface RecordDetailModalProps {
  record: FloorControlRecord | null
  open: boolean
  onClose: () => void
  onApprove?: (id: string) => void
  onReject?: (id: string, comment: string) => void
  onDelete?: (id: string) => void // Nueva prop para eliminar
  isManagerView?: boolean
  isUpdating?: boolean
}

export function RecordDetailModal({
  record,
  open,
  onClose,
  onApprove,
  onReject,
  onDelete,
  isManagerView = true,
  isUpdating = false,
}: RecordDetailModalProps) {
  const [rejectionComment, setRejectionComment] = useState("")
  const [showRejectForm, setShowRejectForm] = useState(false)

  if (!record) return null

  const getLabel = (id: string, options: { id: string; label: string }[]) => {
    const option = options.find((opt) => opt.id === id)
    return option ? option.label : id 
  }

  // --- HANDLERS ---
  const handleReject = () => {
    if (rejectionComment.trim() && onReject) {
      onReject(record.id, rejectionComment)
    }
  }

  const handleApprove = () => {
    if (onApprove) {
      onApprove(record.id)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(record.id)
    }
  }

  const handleExportJSON = () => {
    const json = exportToJSON([record])
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `floor-control-${record.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEmailPreview = () => {
    const summary = generateEmailSummary(record)
    const blob = new Blob([summary], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
    URL.revokeObjectURL(url)
  }

  const pvaLabels: Record<string, string> = {
    insurance: "Seguro",
    extended_warranty: "Garantía extendida",
    accessories: "Accesorios",
  }

  const financingLabels: Record<string, string> = {
    cash: "Contado",
    credit: "Crédito",
    leasing: "Leasing",
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !isUpdating && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-foreground">Detalle del Registro</DialogTitle>
            <StatusBadge status={record.status} />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          
          {/* 1. Motivo de Rechazo (si existe) */}
          {record.status === "rejected" && record.rejection_comment && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm font-medium text-destructive">Motivo del rechazo:</p>
              <p className="text-sm text-destructive/80 mt-1">{record.rejection_comment}</p>
            </div>
          )}

          {/* 2. Información del Cliente */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">👤 Información del Cliente</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="text-muted-foreground">Asesor:</span> {record.client.advisor}</p>
              <p><span className="text-muted-foreground">Fecha:</span> {record.client.date}</p>
              <p><span className="text-muted-foreground">Nombre:</span> {record.client.first_name} {record.client.last_name}</p>
              <p><span className="text-muted-foreground">Teléfono:</span> {record.client.phone_primary}</p>
              {record.client.phone_secondary && <p><span className="text-muted-foreground">Tel. Secundario:</span> {record.client.phone_secondary}</p>}
              {record.client.email && <p><span className="text-muted-foreground">Email:</span> {record.client.email}</p>}
              {record.client.city && <p><span className="text-muted-foreground">Ciudad:</span> {record.client.city}</p>}
              {record.client.state && <p><span className="text-muted-foreground">Estado:</span> {record.client.state}</p>}
              {record.client.address && <p className="col-span-2"><span className="text-muted-foreground">Dirección:</span> {record.client.address}</p>}
              <p><span className="text-muted-foreground">Primera visita:</span> {record.client.first_time === "yes" ? "Sí" : "No"}</p>
            </div>
          </div>

          {/* 3. Información de Visita (TRADUCIDA) */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">📅 Información de la Visita</h4>
            <div className="text-sm space-y-1">
              {record.visit.with_appointment.length > 0 && (
                <p>
                  <span className="text-muted-foreground">Con cita:</span>{" "}
                  {record.visit.with_appointment.map((id) => getLabel(id, withAppointmentOptions)).join(", ")}
                </p>
              )}
              {record.visit.other_with_appointment && (
                <p>
                  <span className="text-muted-foreground">Otro (con cita):</span> {record.visit.other_with_appointment}
                </p>
              )}

              {record.visit.without_appointment.length > 0 && (
                <p>
                  <span className="text-muted-foreground">Sin cita:</span>{" "}
                  {record.visit.without_appointment.map((id) => getLabel(id, withoutAppointmentOptions)).join(", ")}
                </p>
              )}
              {record.visit.other_without_appointment && (
                <p>
                  <span className="text-muted-foreground">Otro (sin cita):</span> {record.visit.other_without_appointment}
                </p>
              )}
            </div>
          </div>

          {/* 4. Vehículo de Interés */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">🚗 Vehículo de Interés</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="text-muted-foreground">Vehículo:</span> {record.vehicle_interest.vehicle || "N/A"}</p>
              <p><span className="text-muted-foreground">Año:</span> {record.vehicle_interest.year || "N/A"}</p>
              <p><span className="text-muted-foreground">Versión:</span> {record.vehicle_interest.version || "N/A"}</p>
              <p><span className="text-muted-foreground">Color:</span> {record.vehicle_interest.color || "N/A"}</p>
              {record.vehicle_interest.accessories && <p className="col-span-2"><span className="text-muted-foreground">Accesorios:</span> {record.vehicle_interest.accessories}</p>}
              {record.vehicle_interest.second_option && <p><span className="text-muted-foreground">Segunda opción:</span> {record.vehicle_interest.second_option}</p>}
              <p><span className="text-muted-foreground">Prueba de manejo:</span> {record.vehicle_interest.test_drive === "yes" ? "Sí" : "No"}</p>
            </div>
          </div>

          {/* 5. Vehículo Actual */}
          {(record.current_vehicle.brand || record.current_vehicle.model) && (
            <div className="space-y-2">
              <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">🔄 Vehículo Actual</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><span className="text-muted-foreground">Marca:</span> {record.current_vehicle.brand || "N/A"}</p>
                <p><span className="text-muted-foreground">Modelo:</span> {record.current_vehicle.model || "N/A"}</p>
                <p><span className="text-muted-foreground">Año:</span> {record.current_vehicle.year || "N/A"}</p>
                <p><span className="text-muted-foreground">Toma de unidad:</span> {record.current_vehicle.trade_in === "yes" ? "Sí" : "No"}</p>
              </div>
            </div>
          )}

          {/* 6. Financiamiento */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">💰 Financiamiento</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="text-muted-foreground">Tipo de compra:</span> {record.financing.type ? financingLabels[record.financing.type] : "N/A"}</p>
              <p><span className="text-muted-foreground">Transferido a F&I:</span> {record.financing.f_and_i === "yes" ? "Sí" : "No"}</p>
            </div>
          </div>

          {/* 7. PVA */}
          {record.pva.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">⭐ PVA</h4>
              <p className="text-sm">{record.pva.map((p) => pvaLabels[p] || p).join(", ")}</p>
            </div>
          )}

          {/* 8. Notas */}
          {record.notes && (
            <div className="space-y-2">
              <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">📝 Notas</h4>
              <p className="text-sm whitespace-pre-wrap">{record.notes}</p>
            </div>
          )}

          {/* 9. Firmas */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#00539B] border-b border-border pb-1">✍️ Firmas</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="text-muted-foreground">Asesor:</span> {record.signatures.advisor || "N/A"}</p>
              <p><span className="text-muted-foreground">Gerente:</span> {record.signatures.sales_manager || "N/A"}</p>
            </div>
          </div>

          {/* --- BOTONES DE ACCIÓN --- */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
            {/* Botones comunes */}
            <Button variant="outline" size="sm" onClick={handleExportJSON} disabled={isUpdating}>
              <Download className="h-4 w-4 mr-1" />
              Exportar JSON
            </Button>
            <Button variant="outline" size="sm" onClick={handleEmailPreview} disabled={isUpdating}>
              <Mail className="h-4 w-4 mr-1" />
              Revisar Email
            </Button>

            {/* Espaciador flexible para separar grupos de botones */}
            <div className="flex-1"></div>
            {isManagerView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isUpdating}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 mr-2"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-1" />}
                Eliminar
              </Button>
            )}

            {isManagerView && (record.status === "pending_review" || record.status === "corrected") && (
              <>
                {!showRejectForm ? (
                  <>
                    <Button
                      size="sm"
                      className="bg-[#008460] hover:bg-[#006B4D] text-white"
                      onClick={handleApprove}
                      disabled={isUpdating}
                    >
                      {isUpdating ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                      Aprobar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => setShowRejectForm(true)} disabled={isUpdating}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Rechazar
                    </Button>
                  </>
                ) : (
                  // Formulario de Rechazo
                  <div className="w-full space-y-2 mt-2 bg-muted/30 p-3 rounded-md border border-border">
                    <Label className="text-foreground font-medium">Motivo del rechazo (requerido):</Label>
                    <Textarea
                      value={rejectionComment}
                      onChange={(e) => setRejectionComment(e.target.value)}
                      placeholder="Ingrese el motivo del rechazo..."
                      rows={3}
                      disabled={isUpdating}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setShowRejectForm(false)
                          setRejectionComment("")
                        }}
                        disabled={isUpdating}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleReject}
                        disabled={!rejectionComment.trim() || isUpdating}
                      >
                        {isUpdating ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : null}
                        {isUpdating ? "Rechazando..." : "Confirmar Rechazo"}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}