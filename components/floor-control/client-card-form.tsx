"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormSection } from "@/components/floor-control/form-section"
import { type FloorControlRecord, initialFormState } from "@/lib/types"

import {
    RotateCcw,
    User,
    CalendarDays,
    Car,
    CarFront,
    CreditCard,
    ShieldCheck,
    FileText,
    Briefcase,
    MapPin,
    Phone,
    Mail,
    Hash,
    Palette,
    Clock,
    Navigation,
    ChevronRight,
    ChevronLeft,
    CheckCircle2
} from "lucide-react"

interface ClientCardFormProps {
    initialData?: FloorControlRecord
    isCorrection?: boolean
    onSubmit: (data: Omit<FloorControlRecord, "id" | "created_at" | "updated_at">) => Promise<void>
}

const STEPS = [
    { id: 1, title: "Cliente" },
    { id: 2, title: "Visita" },
    { id: 3, title: "Interés" },
    { id: 4, title: "Vehículo Actual" },
    { id: 5, title: "Finanzas" },
    { id: 6, title: "PVA" },
    { id: 7, title: "Notas" },
]

export function ClientCardForm({ initialData, isCorrection = false, onSubmit }: ClientCardFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState(initialData || initialFormState)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Nuevo estado para controlar el paso actual
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = STEPS.length

    const updateClient = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            client: { ...prev.client, [field]: value },
        }))
        if (errors[`client.${field}`]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[`client.${field}`]
                return newErrors
            })
        }
    }

    const updateVehicleInterest = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            vehicle_interest: { ...prev.vehicle_interest, [field]: value },
        }))
    }

    const updateCurrentVehicle = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            current_vehicle: { ...prev.current_vehicle, [field]: value },
        }))
    }

    const updateFinancing = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            financing: { ...prev.financing, [field]: value },
        }))
    }

    const toggleVisitOption = (type: "with_appointment" | "without_appointment", option: string) => {
        setFormData((prev) => {
            const current = prev.visit[type]
            const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option]
            return {
                ...prev,
                visit: { ...prev.visit, [type]: updated },
            }
        })
    }

    const togglePVA = (option: string) => {
        setFormData((prev) => {
            const current = prev.pva
            const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option]
            return { ...prev, pva: updated }
        })
    }

    // --- Lógica de Validación y Navegación ---

    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {}
        let isValid = true

        if (step === 1) {
            if (!formData.client.advisor.trim()) newErrors["client.advisor"] = "El asesor es requerido"
            if (!formData.client.date) newErrors["client.date"] = "La fecha es requerida"
            if (!formData.client.first_name.trim()) newErrors["client.first_name"] = "El nombre es requerido"
            if (!formData.client.last_name.trim()) newErrors["client.last_name"] = "El apellido es requerido"
            if (!formData.client.phone_primary.trim()) newErrors["client.phone_primary"] = "El teléfono principal es requerido"
        }

        // Validación del Paso 2: Visita
        if (step === 2) {
            const withAppointmentSelected = formData.visit.with_appointment.length > 0 || formData.visit.other_with_appointment.trim()
            const withoutAppointmentSelected = formData.visit.without_appointment.length > 0 || formData.visit.other_without_appointment.trim()
            
            if (!withAppointmentSelected && !withoutAppointmentSelected) {
                newErrors["visit.type"] = "Debe seleccionar al menos una opción de visita (Con Cita o Sin Cita)"
            }
        }

        if (step === 3) {
            if (!formData.vehicle_interest.vehicle.trim()) newErrors["vehicle_interest.vehicle"] = "El vehículo de interés es requerido"
            if (!formData.vehicle_interest.year.trim()) newErrors["vehicle_interest.year"] = "El año del vehículo es requerido"
        }
        
        if (step === 4) {
            if (formData.current_vehicle.trade_in === 'yes') {
                if (!formData.current_vehicle.brand.trim()) newErrors["current_vehicle.brand"] = "La marca del vehículo actual es requerida para toma de unidad"
                if (!formData.current_vehicle.model.trim()) newErrors["current_vehicle.model"] = "El modelo del vehículo actual es requerido para toma de unidad"
            }
            if (!formData.current_vehicle.trade_in) {
                 newErrors["current_vehicle.trade_in"] = "¿Toma de unidad? es requerido"
            }
        }
        


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            isValid = false
        }

        return isValid
    }

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handlePrev = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateStep(1)) {
            setCurrentStep(1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        setIsSubmitting(true)
        try {
            console.log(formData);
            const submitData = {
                ...formData,
                status: isCorrection ? ("corrected" as const) : ("pending_review" as const),
            }
            await onSubmit(submitData)
            router.push("/floor-control")
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // --- Opciones (Arrays) ---
    const withAppointmentOptions = [
        { id: "appointment", label: "Con cita" },
        { id: "incoming_call", label: "Llamada entrante" },
        { id: "internet", label: "Oportunidad Internet" },
        { id: "database", label: "Base de datos" },
        { id: "follow_up", label: "Seguimiento (No vendido)" },
    ]

    const withoutAppointmentOptions = [
        { id: "advertising", label: "Publicidad" },
        { id: "fresh_up", label: "Fresh up" },
        { id: "referral", label: "Referido" },
    ]

    const pvaOptions = [
        { id: "insurance", label: "Seguro" },
        { id: "extended_warranty", label: "Garantía extendida" },
        { id: "accessories", label: "Accesorios" },
    ]

    return (
        <div className="space-y-6">
            {/* Barra de Progreso (Stepper) */}
            <div className="w-full mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Paso {currentStep} de {totalSteps}: {STEPS[currentStep - 1].title}
                    </span>
                    <span className="text-sm font-medium text-primary">
                        {Math.round((currentStep / totalSteps) * 100)}%
                    </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#00539B] transition-all duration-300 ease-in-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
                {/* Indicadores visuales pequeños para pantallas grandes */}
                <div className="hidden md:flex justify-between mt-2 px-1">
                    {STEPS.map((step) => (
                        <div key={step.id} className={`flex flex-col items-center ${step.id <= currentStep ? 'text-[#00539B]' : 'text-muted-foreground'}`}>
                            <div className={`h-2 w-2 rounded-full mb-1 ${step.id === currentStep ? 'bg-[#00539B]' : step.id < currentStep ? 'bg-[#00539B]/60' : 'bg-gray-300'}`} />
                            <span className="text-[10px] uppercase font-bold tracking-wider">{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="min-h-[400px]">
                {/* Section 1: Client Information */}
                {currentStep === 1 && (
                    <FormSection
                        title="Sección 1 — Información del Cliente"
                        icon={<User className="h-5 w-5 text-white" />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="advisor" className="text-foreground flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Asesor de Ventas <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="advisor"
                                    value={formData.client.advisor}
                                    onChange={(e) => updateClient("advisor", e.target.value)}
                                    placeholder="Nombre del asesor"
                                    className={errors["client.advisor"] ? "border-destructive" : ""}
                                />
                                {errors["client.advisor"] && <p className="text-xs text-destructive">{errors["client.advisor"]}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-foreground flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4" />
                                    Fecha <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.client.date}
                                    onChange={(e) => updateClient("date", e.target.value)}
                                    className={errors["client.date"] ? "border-destructive" : ""}
                                />
                                {errors["client.date"] && <p className="text-xs text-destructive">{errors["client.date"]}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="first_name" className="text-foreground flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Nombre(s) <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="first_name"
                                    value={formData.client.first_name}
                                    onChange={(e) => updateClient("first_name", e.target.value)}
                                    placeholder="Nombre(s)"
                                    className={errors["client.first_name"] ? "border-destructive" : ""}
                                />
                                {errors["client.first_name"] && <p className="text-xs text-destructive">{errors["client.first_name"]}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="last_name" className="text-foreground">
                                    Apellido(s) <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="last_name"
                                    value={formData.client.last_name}
                                    onChange={(e) => updateClient("last_name", e.target.value)}
                                    placeholder="Apellido(s)"
                                    className={errors["client.last_name"] ? "border-destructive" : ""}
                                />
                                {errors["client.last_name"] && <p className="text-xs text-destructive">{errors["client.last_name"]}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-foreground flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Ciudad
                                </Label>
                                <Input
                                    id="city"
                                    value={formData.client.city}
                                    onChange={(e) => updateClient("city", e.target.value)}
                                    placeholder="Ciudad"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-foreground">
                                    Estado
                                </Label>
                                <Input
                                    id="state"
                                    value={formData.client.state}
                                    onChange={(e) => updateClient("state", e.target.value)}
                                    placeholder="Estado"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address" className="text-foreground">
                                    Dirección
                                </Label>
                                <Textarea
                                    id="address"
                                    value={formData.client.address}
                                    onChange={(e) => updateClient("address", e.target.value)}
                                    placeholder="Dirección completa"
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="zip" className="text-foreground">
                                    Código Postal
                                </Label>
                                <Input
                                    id="zip"
                                    type="text"
                                    inputMode="numeric"
                                    value={formData.client.zip}
                                    onChange={(e) => updateClient("zip", e.target.value)}
                                    placeholder="12345"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone_primary" className="text-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Teléfono Principal <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="phone_primary"
                                    type="tel"
                                    value={formData.client.phone_primary}
                                    onChange={(e) => updateClient("phone_primary", e.target.value)}
                                    placeholder="(123) 456-7890"
                                    className={errors["client.phone_primary"] ? "border-destructive" : ""}
                                />
                                {errors["client.phone_primary"] && (
                                    <p className="text-xs text-destructive">{errors["client.phone_primary"]}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone_secondary" className="text-foreground">
                                    Teléfono Secundario
                                </Label>
                                <Input
                                    id="phone_secondary"
                                    type="tel"
                                    value={formData.client.phone_secondary}
                                    onChange={(e) => updateClient("phone_secondary", e.target.value)}
                                    placeholder="(123) 456-7890"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Correo Electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.client.email}
                                    onChange={(e) => updateClient("email", e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-foreground">¿Primera vez que visita?</Label>
                                <RadioGroup
                                    value={formData.client.first_time}
                                    onValueChange={(value: string) => updateClient("first_time", value)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="first_time_yes" />
                                        <Label htmlFor="first_time_yes" className="text-foreground font-normal">
                                            Sí
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="first_time_no" />
                                        <Label htmlFor="first_time_no" className="text-foreground font-normal">
                                            No
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </FormSection>
                )}

                {/* Section 2: Visit Information */}
                {currentStep === 2 && (
                    <FormSection
                        title="Sección 2 — Información de la Visita"
                        icon={<Clock className="h-5 w-5 text-white" />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-3">
                                <Label className="text-foreground font-medium">Con Cita:</Label>
                                <div className="space-y-2">
                                    {withAppointmentOptions.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option.id}
                                                checked={formData.visit.with_appointment.includes(option.id)}
                                                onCheckedChange={() => toggleVisitOption("with_appointment", option.id)}
                                            />
                                            <Label htmlFor={option.id} className="text-foreground font-normal">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <Input
                                            placeholder="Otro (especificar)"
                                            value={formData.visit.other_with_appointment}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    visit: { ...prev.visit, other_with_appointment: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-foreground font-medium">Sin Cita:</Label>
                                <div className="space-y-2">
                                    {withoutAppointmentOptions.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={option.id}
                                                checked={formData.visit.without_appointment.includes(option.id)}
                                                onCheckedChange={() => toggleVisitOption("without_appointment", option.id)}
                                            />
                                            <Label htmlFor={option.id} className="text-foreground font-normal">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <Input
                                            placeholder="Otro (especificar)"
                                            value={formData.visit.other_without_appointment}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    visit: { ...prev.visit, other_without_appointment: e.target.value },
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormSection>
                )}

                {/* Section 3: Vehicle of Interest */}
                {currentStep === 3 && (
                    <FormSection
                        title="Sección 3 — Vehículo de Interés"
                        icon={<Car className="h-5 w-5 text-white" />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="vehicle" className="text-foreground flex items-center gap-2">
                                    <CarFront className="h-4 w-4" />
                                    Vehículo
                                </Label>
                                <Input
                                    id="vehicle"
                                    value={formData.vehicle_interest.vehicle}
                                    onChange={(e) => updateVehicleInterest("vehicle", e.target.value)}
                                    placeholder="Ej: Chevrolet Silverado"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vehicle_year" className="text-foreground flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4" />
                                    Año
                                </Label>
                                <Input
                                    id="vehicle_year"
                                    type="text"
                                    inputMode="numeric"
                                    value={formData.vehicle_interest.year}
                                    onChange={(e) => updateVehicleInterest("year", e.target.value)}
                                    placeholder="2024"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="version" className="text-foreground flex items-center gap-2">
                                    <Hash className="h-4 w-4" />
                                    Versión
                                </Label>
                                <Input
                                    id="version"
                                    value={formData.vehicle_interest.version}
                                    onChange={(e) => updateVehicleInterest("version", e.target.value)}
                                    placeholder="LT, RST, High Country..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="color" className="text-foreground flex items-center gap-2">
                                    <Palette className="h-4 w-4" />
                                    Color
                                </Label>
                                <Input
                                    id="color"
                                    value={formData.vehicle_interest.color}
                                    onChange={(e) => updateVehicleInterest("color", e.target.value)}
                                    placeholder="Color deseado"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="accessories" className="text-foreground">
                                    Accesorios
                                </Label>
                                <Textarea
                                    id="accessories"
                                    value={formData.vehicle_interest.accessories}
                                    onChange={(e) => updateVehicleInterest("accessories", e.target.value)}
                                    placeholder="Lista de accesorios deseados"
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="second_option" className="text-foreground">
                                    Segunda Opción
                                </Label>
                                <Input
                                    id="second_option"
                                    value={formData.vehicle_interest.second_option}
                                    onChange={(e) => updateVehicleInterest("second_option", e.target.value)}
                                    placeholder="Vehículo alternativo"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground flex items-center gap-2">
                                    <Navigation className="h-4 w-4" />
                                    ¿Se realizó prueba de manejo?
                                </Label>
                                <RadioGroup
                                    value={formData.vehicle_interest.test_drive}
                                    onValueChange={(value: string) => updateVehicleInterest("test_drive", value)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="test_drive_yes" />
                                        <Label htmlFor="test_drive_yes" className="text-foreground font-normal">
                                            Sí
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="test_drive_no" />
                                        <Label htmlFor="test_drive_no" className="text-foreground font-normal">
                                            No
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </FormSection>
                )}

                {/* Section 4: Current Vehicle */}
                {currentStep === 4 && (
                    <FormSection
                        title="Sección 4 — Vehículo Actual"
                        icon={<RotateCcw className="h-5 w-5 text-white" />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label htmlFor="current_brand" className="text-foreground">
                                    Marca
                                </Label>
                                <Input
                                    id="current_brand"
                                    value={formData.current_vehicle.brand}
                                    onChange={(e) => updateCurrentVehicle("brand", e.target.value)}
                                    placeholder="Marca del vehículo actual"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="current_model" className="text-foreground">
                                    Modelo
                                </Label>
                                <Input
                                    id="current_model"
                                    value={formData.current_vehicle.model}
                                    onChange={(e) => updateCurrentVehicle("model", e.target.value)}
                                    placeholder="Modelo"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="current_year" className="text-foreground">
                                    Año
                                </Label>
                                <Input
                                    id="current_year"
                                    type="text"
                                    inputMode="numeric"
                                    value={formData.current_vehicle.year}
                                    onChange={(e) => updateCurrentVehicle("year", e.target.value)}
                                    placeholder="Año"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground">¿Toma de unidad?</Label>
                                <RadioGroup
                                    value={formData.current_vehicle.trade_in}
                                    onValueChange={(value: string) => updateCurrentVehicle("trade_in", value)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="trade_in_yes" />
                                        <Label htmlFor="trade_in_yes" className="text-foreground font-normal">
                                            Sí
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="trade_in_no" />
                                        <Label htmlFor="trade_in_no" className="text-foreground font-normal">
                                            No
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </FormSection>
                )}

                {/* Section 5: Financing */}
                {currentStep === 5 && (
                    <FormSection
                        title="Sección 5 — Financiamiento"
                        icon={<CreditCard className="h-5 w-5 text-white" />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <Label className="text-foreground">Tipo de Compra</Label>
                                <RadioGroup
                                    value={formData.financing.type}
                                    onValueChange={(value: string) => updateFinancing("type", value)}
                                    className="flex flex-wrap gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cash" id="financing_cash" />
                                        <Label htmlFor="financing_cash" className="text-foreground font-normal">
                                            Contado
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="credit" id="financing_credit" />
                                        <Label htmlFor="financing_credit" className="text-foreground font-normal">
                                            Crédito
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="leasing" id="financing_leasing" />
                                        <Label htmlFor="financing_leasing" className="text-foreground font-normal">
                                            Leasing
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground">¿Transferido a F&I?</Label>
                                <RadioGroup
                                    value={formData.financing.f_and_i}
                                    onValueChange={(value: string) => updateFinancing("f_and_i", value)}
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="f_and_i_yes" />
                                        <Label htmlFor="f_and_i_yes" className="text-foreground font-normal">
                                            Sí
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="f_and_i_no" />
                                        <Label htmlFor="f_and_i_no" className="text-foreground font-normal">
                                            No
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </FormSection>
                )}

                {/* Section 6: PVA */}
                {currentStep === 6 && (
                    <FormSection
                        title="Sección 6 — PVA (Productos de Valor Agregado)"
                        icon={<ShieldCheck className="h-5 w-5 text-white" />}
                    >
                        <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {pvaOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`pva_${option.id}`}
                                        checked={formData.pva.includes(option.id)}
                                        onCheckedChange={() => togglePVA(option.id)}
                                    />
                                    <Label htmlFor={`pva_${option.id}`} className="text-foreground font-normal">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </FormSection>
                )}

                {/* Section 7: Notes */}
                {currentStep === 7 && (
                    <FormSection
                        title="Sección 7 — Notas"
                        icon={<FileText className="h-5 w-5 text-white" />}
                    >
                        <div className="space-y-2 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Label htmlFor="notes" className="text-foreground">
                                Notas Generales
                            </Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                                placeholder="Agregar notas adicionales sobre la visita del cliente..."
                                rows={4}
                            />
                        </div>
                    </FormSection>
                )}

                {/* Footer Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-6">
                    {/* Botón Atrás */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentStep === 1 || isSubmitting}
                        className={`sm:w-auto ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Atrás
                    </Button>

                    <div className="flex-1"></div>

                    {/* Botón Siguiente / Guardar */}
                    {currentStep < totalSteps ? (
                        <Button
                            type="button" 
                            onClick={handleNext}
                            className="bg-[#00539B] hover:bg-[#0A4C86] text-white"
                        >
                            Continuar
                            <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="button" 
                            disabled={isSubmitting}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={(e) => { // Añadimos el manejador onClick
                                const confirmationMessage = isCorrection
                                    ? "¿Estás seguro de enviar la corrección de esta tarjeta de cliente?"
                                    : "¿Estás seguro de crear el registro de esta tarjeta de cliente?"

                                if (window.confirm(confirmationMessage)) {
                                    // Si confirma, llamamos al handleSubmit
                                    handleSubmit(e as unknown as React.FormEvent)
                                }
                            }}
                        >
                            {isSubmitting ? (
                                <>Guardando...</>
                            ) : (
                                <>
                                    {isCorrection ? "Enviar Corrección" : "Finalizar Registro"}
                                    <CheckCircle2 className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}