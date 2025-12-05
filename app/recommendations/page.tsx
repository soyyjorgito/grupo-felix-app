"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CampaignCard } from "@/components/campaign-card"
import { AssetCard } from "@/components/asset-card"
import { ImageIcon, Video, FileText, Send, Sparkles, Loader2 } from "lucide-react"

export default function RecommendationsPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setShowResults(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Recomendaciones</h1>
            <p className="text-muted-foreground">Sugerencias de campañas impulsadas por IA</p>
          </div>

          <div className="mb-10 max-w-7xl">
            <form onSubmit={handleGenerate} className="relative flex items-center">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Describe tu objetivo (ej: Aumentar ventas de SUV en diciembre...)"
                  className="w-full h-14 pl-10 pr-14 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!query.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            </div>
          )}

          {showResults && (
            <div className="animate-in slide-in-from-bottom-5 duration-700 fade-in">
              <div className="space-y-4 mb-12">
                <CampaignCard
                  id="1"
                  dateRange="Dic 1–8, 2024"
                  objective="Atraer nuevos clientes a las salas de exhibición en mercados urbanos"
                  tactic="Crear contenido de video mostrando la nueva línea de vehículos eléctricos con incentivos de prueba de manejo"
                />
                <CampaignCard
                  id="2"
                  dateRange="Dic 9–15, 2024"
                  objective="Aumentar la tasa de conversión para el segmento de SUV en un 15%"
                  tactic="Lanzar campaña dirigida en redes sociales con testimonios de clientes y opciones de financiamiento"
                />
                <CampaignCard
                  id="3"
                  dateRange="Dic 16–22, 2024"
                  objective="Generar leads para modelos de camionetas en áreas rurales"
                  tactic="Desplegar campaña de marketing por correo destacando características de durabilidad y capacidad"
                />
                <CampaignCard
                  id="4"
                  dateRange="Dic 23–30, 2024"
                  objective="Aumentar el conocimiento de marca para la línea de sedanes de lujo"
                  tactic="Crear serie de contenido premium destacando innovaciones tecnológicas y características de confort"
                />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Activos de Campaña Sugeridos</h2>
              </div>
              <div className="grid grid-cols-3 gap-6 pb-8">
                <AssetCard
                  type="Imagen"
                  title="Diseño de Banner Principal"
                  description="Visual de alto impacto para página de destino con nuevos modelos de VE"
                  icon={<ImageIcon className="h-5 w-5" />}
                />
                <AssetCard
                  type="Video"
                  title="Exhibición del Producto"
                  description="Video de 30 segundos destacando características y beneficios clave"
                  icon={<Video className="h-5 w-5" />}
                />
                <AssetCard
                  type="Copia de Anuncio"
                  title="Contenido para Redes Sociales"
                  description="Copias atractivas para campañas de Facebook e Instagram"
                  icon={<FileText className="h-5 w-5" />}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}