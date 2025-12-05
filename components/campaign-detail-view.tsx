"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Play, Upload, Calendar, Target, Users, Megaphone, Gift, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

export function CampaignDetailView() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Campaña de Lanzamiento de Vehículo Eléctrico</h1>
              <p className="text-sm text-muted-foreground mt-1">ID de Campaña: CAMP-2024-001</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>15 de diciembre de 2024 – 15 de enero de 2025</span>
                </div>
                <Badge variant="secondary">En planificación</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Save className="h-4 w-4 mr-2" />
            Guardar cambios
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Activar campaña
          </Button>
        </div>
      </div>

      {/* Objectives & Tactics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Objetivos y Tácticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Meta Principal</Label>
            <p className="text-foreground mt-1">
              Incrementar el conocimiento y las pre-órdenes de la nueva línea de vehículos eléctricos, posicionando la
              marca como líder en transporte sustentable.
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Tácticas</Label>
            <p className="text-foreground mt-1">
              Anuncios de video digital destacando sustentabilidad e innovación, asociaciones con influencers
              eco-conscientes, experiencias web interactivas para pruebas virtuales, y contenido educativo sobre los
              beneficios de vehículos eléctricos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Audience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Audiencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Segmento</Label>
            <p className="text-foreground mt-1">
              Consumidores ambientalmente conscientes de 28-50 años, adoptadores tempranos conocedores de tecnología,
              profesionales urbanos, y familias interesadas en vida sustentable.
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Ubicaciones</Label>
            <p className="text-foreground mt-1">
              Principales áreas metropolitanas de México incluyendo Ciudad de México, Guadalajara, Monterrey y Querétaro
              con infraestructura de carga para vehículos eléctricos.
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Fuentes de Datos</Label>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">CRM</Badge>
              <Badge variant="outline">Integración Kommo</Badge>
              <Badge variant="outline">Analíticas Web</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel & Format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Canal y Formato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Plataformas</Label>
            <div className="flex gap-2 mt-1">
              <Badge>Meta Ads</Badge>
              <Badge>YouTube</Badge>
              <Badge>Google Display</Badge>
              <Badge>Instagram</Badge>
              <Badge>TikTok</Badge>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Formatos</Label>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline">Anuncios de video (15-30s)</Badge>
              <Badge variant="outline">Stories y Reels</Badge>
              <Badge variant="outline">Banners interactivos</Badge>
              <Badge variant="outline">Contenido de influencers</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Promoción
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Oferta</Label>
            <p className="text-foreground mt-1">
              "Incentivo de pre-orden anticipada: $50,000 MXN de descuento + instalación gratuita de estación de carga
              en casa."
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Duración</Label>
            <p className="text-foreground mt-1">15 de diciembre de 2024 – 15 de enero de 2025</p>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Contenido</CardTitle>
          <CardDescription>Copy sugerido y recursos visuales para esta campaña</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="copy">Copy Sugerido</Label>
            <Textarea
              id="copy"
              placeholder="Ingresa el copy de la campaña..."
              defaultValue="Experimenta el futuro de conducir. Cero emisiones, máxima innovación. Pre-ordena tu vehículo eléctrico hoy y únete a la revolución sustentable."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label>Recursos Visuales</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg border-2 border-dashed border-border bg-muted/30 overflow-hidden">
                <img
                  src="/modern-electric-vehicle-charging-in-urban-setting.jpg"
                  alt="Imagen hero de vehículo eléctrico cargando"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary">
                    <Upload className="h-4 w-4 mr-2" />
                    Reemplazar
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg border-2 border-dashed border-border bg-muted/30 overflow-hidden">
                <img
                  src="/sleek-electric-vehicle-on-highway-with-greenery.jpg"
                  alt="Miniatura de video promocional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary">
                    <Upload className="h-4 w-4 mr-2" />
                    Reemplazar
                  </Button>
                </div>
                <Badge className="absolute top-2 left-2 bg-black/70">30 seg</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Subir recursos adicionales
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Budget & Administration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Presupuesto y Administración
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Presupuesto Total</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input id="budget" type="text" defaultValue="150,000" className="pl-7" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">MXN</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Alcance Estimado</Label>
              <div className="text-2xl font-semibold text-foreground">2,500,000</div>
              <p className="text-sm text-muted-foreground">impresiones</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Distribución de Presupuesto</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>Meta Ads</Badge>
                  <span className="text-sm text-muted-foreground">35%</span>
                </div>
                <span className="font-semibold">$52,500 MXN</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>YouTube</Badge>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <span className="font-semibold">$45,000 MXN</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-chart-2 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>Instagram/TikTok</Badge>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
                <span className="font-semibold">$37,500 MXN</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-chart-3 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>Google Display</Badge>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
                <span className="font-semibold">$15,000 MXN</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-chart-4 h-2 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
