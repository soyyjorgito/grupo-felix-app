"use client"

import { Header } from "@/components/floor-control/header"
import { ClientCardForm } from "@/components/floor-control/client-card-form"
import { addRecord } from "@/lib/store"
import type { FloorControlRecord } from "@/lib/types"
import { useRouter } from "next/navigation"

export default function NewClientPage() {
  const router = useRouter()

  const handleSubmit = async (data: Omit<FloorControlRecord, "id" | "created_at" | "updated_at">) => {
    addRecord(data)
    router.push("/floor-control")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Nueva Tarjeta de Cliente</h1>
          <p className="text-muted-foreground">Complete el formulario para registrar una nueva visita de cliente.</p>
        </div>
        <ClientCardForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}
