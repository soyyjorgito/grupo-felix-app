import { Sidebar } from "@/components/sidebar"
import { DataSourceCard } from "@/components/data-source-card"
import { Database, Cloud, FileText } from "lucide-react"

export default function DataSourcesPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Fuentes de Datos</h1>
            <p className="text-muted-foreground">Administra tus integraciones conectadas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DataSourceCard
              name="Global CRM"
              description="Sistema de gestión de relaciones con clientes"
              status="connected"
              icon={<Database className="h-6 w-6" />}
              lastSync="hace 2 horas"
            />
            <DataSourceCard
              name="Kommo"
              description="Plataforma de seguimiento de clientes"
              status="connected"
              icon={<Cloud className="h-6 w-6" />}
              lastSync="hace 1 hora"
            />
            <DataSourceCard
              name="Carga de PDF"
              description="Sistema de importación de documentos"
              status="pending"
              icon={<FileText className="h-6 w-6" />}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
