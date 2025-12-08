import { Sidebar } from "@/components/sidebar"
import { CampaignConfigForm } from "@/components/campaign-config-form"

export default function CampaignPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Configuración de Campaña</h1>
            <p className="text-muted-foreground">Configura los parámetros de tu campaña de marketing</p>
          </div>

          <CampaignConfigForm />
        </div>
      </main>
    </div>
  )
}
