"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ArrowLeft, Calendar, DollarSign, Target, Users, Tv, Megaphone, FileText, Play } from "lucide-react"
import Link from "next/link"

const performanceData = [
  { date: "Dic 1", impressions: 12000, clicks: 850, conversions: 42 },
  { date: "Dic 2", impressions: 15000, clicks: 920, conversions: 58 },
  { date: "Dic 3", impressions: 18000, clicks: 1100, conversions: 65 },
  { date: "Dic 4", impressions: 21000, clicks: 1250, conversions: 78 },
  { date: "Dic 5", impressions: 24000, clicks: 1400, conversions: 85 },
]

const budgetData = [
  { category: "Redes Sociales", spent: 8500, budget: 12000 },
  { category: "Anuncios de Búsqueda", spent: 6200, budget: 8000 },
  { category: "Display", spent: 4100, budget: 5000 },
  { category: "Video", spent: 3800, budget: 5000 },
]

export default function CampaignDetailPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/recommendations">
              <Button variant="ghost" className="mb-4 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Recomendaciones
              </Button>
            </Link>

            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">Campaña de Lanzamiento S10 Pick Up</h1>
                <p className="text-muted-foreground">ID de Campaña: CAMP-2024-001</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-500/10 text-green-700 border-green-500/20">Activa</Badge>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Dic 1–8, 2024
                </Button>
              </div>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Objetivos de la Campaña
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primary-objective">Objetivo Principal</Label>
                <Input
                  id="primary-objective"
                  defaultValue="Atraer nuevos clientes a las salas de exhibición en mercados urbanos"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="kpis">Indicadores Clave de Rendimiento</Label>
                <Textarea
                  id="kpis"
                  defaultValue="- Aumentar visitas a salas de exhibición en un 25%&#10;- Generar más de 500 leads calificados&#10;- Lograr una tasa de conversión del 3.5%"
                  className="mt-2 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="target-reach">Alcance Objetivo</Label>
                  <Input id="target-reach" defaultValue="50,000" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="target-ctr">CTR Objetivo</Label>
                  <Input id="target-ctr" defaultValue="4.2%" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="target-roas">ROAS Objetivo</Label>
                  <Input id="target-roas" defaultValue="3.5x" className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Audiencia Objetivo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="demographics">Demografía</Label>
                  <Input id="demographics" defaultValue="Edad 28-55, Profesionales urbanos" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="interests">Intereses y Comportamientos</Label>
                  <Textarea
                    id="interests"
                    defaultValue="Conciencia ambiental, Entusiastas de la tecnología, Buscadores de marcas premium"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Ubicación Geográfica</Label>
                  <Input
                    id="location"
                    defaultValue="Áreas metropolitanas principales, radio de 50+ millas"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tv className="h-5 w-5 text-primary" />
                  Canales y Formato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="channels">Canales de Marketing</Label>
                  <Select defaultValue="multi">
                    <SelectTrigger id="channels" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multi">Multi-canal (Social, Búsqueda, Display)</SelectItem>
                      <SelectItem value="social">Solo Redes Sociales</SelectItem>
                      <SelectItem value="search">Solo Anuncios de Búsqueda</SelectItem>
                      <SelectItem value="display">Solo Anuncios Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="platforms">Plataformas</Label>
                  <Input id="platforms" defaultValue="Facebook, Instagram, Google Ads, YouTube" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="format">Formato de Anuncio</Label>
                  <Select defaultValue="video">
                    <SelectTrigger id="format" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Contenido de Video</SelectItem>
                      <SelectItem value="image">Anuncios de Imagen</SelectItem>
                      <SelectItem value="carousel">Carrusel</SelectItem>
                      <SelectItem value="mixed">Formato Mixto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-primary" />
                  Promociones y Ofertas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="offer-type">Tipo de Oferta</Label>
                  <Select defaultValue="test-drive">
                    <SelectTrigger id="offer-type" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test-drive">Incentivo de Prueba de Manejo</SelectItem>
                      <SelectItem value="discount">Descuento Especial</SelectItem>
                      <SelectItem value="financing">Oferta de Financiamiento</SelectItem>
                      <SelectItem value="trade-in">Bonificación por Intercambio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="offer-details">Detalles de la Oferta</Label>
                  <Textarea
                    id="offer-details"
                    defaultValue="Programa una prueba de manejo y recibe una tarjeta de regalo de $100. Oferta por tiempo limitado."
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="promo-code">Código Promocional</Label>
                  <Input id="promo-code" defaultValue="EVTEST2024" className="mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Presupuesto y Asignación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="total-budget">Presupuesto Total</Label>
                    <Input id="total-budget" defaultValue="$30,000" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="daily-budget">Presupuesto Diario</Label>
                    <Input id="daily-budget" defaultValue="$3,750" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bidding">Estrategia de Puja</Label>
                  <Select defaultValue="max-conversions">
                    <SelectTrigger id="bidding" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="max-conversions">Maximizar Conversiones</SelectItem>
                      <SelectItem value="target-cpa">CPA Objetivo</SelectItem>
                      <SelectItem value="target-roas">ROAS Objetivo</SelectItem>
                      <SelectItem value="manual">Puja Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Presupuesto Utilizado</span>
                    <span className="font-medium">$22,600 / $30,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: "75.3%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Contenido de la Campaña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-border bg-muted/30">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg mb-3 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="font-semibold mb-1">Video del Producto</h4>
                    <p className="text-sm text-muted-foreground mb-2">Video principal de 30 segundos</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Vista Previa
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border bg-muted/30">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-linear-to-br from-purple-500 to-pink-500 rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="font-semibold mb-1">Conjunto de Copias</h4>
                    <p className="text-sm text-muted-foreground mb-2">5 variaciones incluidas</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Vista Previa
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border bg-muted/30">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-linear-to-br from-orange-500 to-red-500 rounded-lg mb-3 flex items-center justify-center">
                      <Target className="h-12 w-12 text-white" />
                    </div>
                    <h4 className="font-semibold mb-1">Página de Destino</h4>
                    <p className="text-sm text-muted-foreground mb-2">Optimizada para conversiones</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Vista Previa
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento de la Campaña</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    impressions: { label: "Impresiones", color: "hsl(var(--chart-1))" },
                    clicks: { label: "Clics", color: "hsl(var(--chart-2))" },
                    conversions: { label: "Conversiones", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px] lg:w-[450px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="impressions" stroke="var(--color-chart-1)" strokeWidth={2} />
                      <Line type="monotone" dataKey="clicks" stroke="var(--color-chart-2)" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" stroke="var(--color-chart-3)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Presupuesto por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    spent: { label: "Gastado", color: "hsl(var(--chart-1))" },
                    budget: { label: "Presupuesto", color: "hsl(var(--chart-4))" },
                  }}
                  className="h-[300px] lg:w-[450px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="spent" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="budget" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Link href="/recommendations">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Recomendaciones
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                Guardar Cambios
              </Button>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Activar Campaña
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
