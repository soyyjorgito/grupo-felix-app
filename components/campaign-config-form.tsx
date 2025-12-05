"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CampaignConfigForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const steps = [
    { number: 1, title: "Audiencia", description: "Define tu audiencia objetivo" },
    { number: 2, title: "Canal y Formato", description: "Selecciona canales de marketing" },
    { number: 3, title: "Promoción", description: "Configura detalles promocionales" },
    { number: 4, title: "Contenido", description: "Crea contenido de campaña" },
    { number: 5, title: "Presupuesto y Admin", description: "Define presupuesto y finaliza" },
  ]

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                      step >= s.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.number}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${step >= s.number ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {s.title}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 mb-6 ${step > s.number ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">{steps[step - 1].title}</h2>
            <p className="text-muted-foreground">{steps[step - 1].description}</p>
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="age-range">Rango de Edad</Label>
                  <Select>
                    <SelectTrigger id="age-range">
                      <SelectValue placeholder="Selecciona rango de edad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-24">18-24</SelectItem>
                      <SelectItem value="25-34">25-34</SelectItem>
                      <SelectItem value="35-44">35-44</SelectItem>
                      <SelectItem value="45-54">45-54</SelectItem>
                      <SelectItem value="55+">55+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación Objetivo</Label>
                  <Input id="location" placeholder="ej., Ciudad de México, Áreas urbanas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interests">Intereses</Label>
                  <Input id="interests" placeholder="ej., Vehículos eléctricos, Tecnología" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="channel">Canal de Marketing</Label>
                  <Select>
                    <SelectTrigger id="channel">
                      <SelectValue placeholder="Selecciona canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Redes Sociales</SelectItem>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="display">Publicidad Display</SelectItem>
                      <SelectItem value="video">Publicidad en Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Formato de Anuncio</Label>
                  <Select>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Selecciona formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Imagen Estática</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carrusel</SelectItem>
                      <SelectItem value="story">Anuncio de Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="offer">Oferta Promocional</Label>
                  <Input id="offer" placeholder="ej., 0% de financiamiento por 60 meses" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración de Campaña</Label>
                  <Input id="duration" type="text" placeholder="ej., 2 semanas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta">Llamado a la Acción</Label>
                  <Input id="cta" placeholder="ej., Agenda una Prueba de Manejo" />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="headline">Título de Campaña</Label>
                  <Input id="headline" placeholder="Ingresa título de campaña" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Ingresa descripción de campaña" rows={4} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creative">Recursos Creativos</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-sm text-muted-foreground">Sube imágenes o videos</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Elegir Archivos
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto Total</Label>
                  <Input id="budget" type="text" placeholder="$10,000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-date">Fecha de Inicio</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Fecha de Fin</Label>
                  <Input id="end-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Responsable de Campaña</Label>
                  <Input id="owner" placeholder="Ingresa nombre del responsable" />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              Paso {step} de {totalSteps}
            </div>
            <Button onClick={step === totalSteps ? () => alert("¡Campaña creada!") : nextStep}>
              {step === totalSteps ? "Crear Campaña" : "Siguiente"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
