import type { FloorControlRecord } from "./types"

// Mock data store - in production, this would be a database
const records: FloorControlRecord[] = []

export function getRecords(): FloorControlRecord[] {
  return [...records]
}

export function getRecordById(id: string): FloorControlRecord | undefined {
  return records.find((r) => r.id === id)
}

export function addRecord(record: Omit<FloorControlRecord, "id" | "created_at" | "updated_at">): FloorControlRecord {
  const newRecord: FloorControlRecord = {
    ...record,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  records.push(newRecord)
  return newRecord
}

export function updateRecord(id: string, updates: Partial<FloorControlRecord>): FloorControlRecord | null {
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  records[index] = {
    ...records[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }
  return records[index]
}

export function getTodayRecords(): FloorControlRecord[] {
  const today = new Date().toISOString().split("T")[0]
  return records.filter((r) => r.client.date === today)
}

export function getRecordsByStatus(status: FloorControlRecord["status"]): FloorControlRecord[] {
  return records.filter((r) => r.status === status)
}

export function generateEmailSummary(record: FloorControlRecord): string {
  return `
CONTROL DE PISO – GRUPO FÉLIX AUTOMOTRIZ
Fecha: ${record.client.date}
Asesor: ${record.client.advisor}

CLIENTE
${record.client.first_name} ${record.client.last_name}
Teléfono: ${record.client.phone_primary} / ${record.client.phone_secondary || "N/A"}
Correo: ${record.client.email || "N/A"}
Dirección: ${record.client.address || "N/A"}, ${record.client.city || ""}, ${record.client.state || ""} ${record.client.zip || ""}
Primera visita: ${record.client.first_time === "yes" ? "Sí" : "No"}

TIPO DE VISITA
Con cita: ${record.visit.with_appointment.join(", ") || "Ninguno"}${record.visit.other_with_appointment ? ` (Otro: ${record.visit.other_with_appointment})` : ""}
Sin cita: ${record.visit.without_appointment.join(", ") || "Ninguno"}${record.visit.other_without_appointment ? ` (Otro: ${record.visit.other_without_appointment})` : ""}

VEHÍCULO DE INTERÉS
${record.vehicle_interest.vehicle} (${record.vehicle_interest.year} – ${record.vehicle_interest.version})
Color: ${record.vehicle_interest.color || "N/A"}
Accesorios: ${record.vehicle_interest.accessories || "N/A"}
Segunda opción: ${record.vehicle_interest.second_option || "N/A"}
Prueba de manejo: ${record.vehicle_interest.test_drive === "yes" ? "Sí" : "No"}

VEHÍCULO ACTUAL
${record.current_vehicle.brand || "N/A"} ${record.current_vehicle.model || ""} (${record.current_vehicle.year || "N/A"})
Toma a cuenta: ${record.current_vehicle.trade_in === "yes" ? "Sí" : "No"}

FINANCIAMIENTO: ${record.financing.type || "N/A"}
Transferido a F&I: ${record.financing.f_and_i === "yes" ? "Sí" : "No"}

PVA: ${record.pva.join(", ") || "Ninguno"}

NOTAS:
${record.notes || "Sin notas"}

ESTADO: ${
    record.status === "approved"
      ? "APROBADO"
      : record.status === "pending_review"
        ? "PENDIENTE DE REVISIÓN"
        : record.status === "rejected"
          ? "RECHAZADO"
          : "CORREGIDO"
  }

---
Enviado automáticamente a: Gerente BDC, Gerente de Ventas, Recepcionista, Asesor de Ventas
  `.trim()
}

export function exportToJSON(records: FloorControlRecord[]): string {
  return JSON.stringify(records, null, 2)
}
