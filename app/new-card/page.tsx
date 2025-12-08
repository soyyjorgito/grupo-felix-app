"use client"

import { Header } from "@/components/floor-control/header"
import { ClientCardForm } from "@/components/floor-control/client-card-form"
import type { FloorControlRecord } from "@/lib/types"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"

export default function NewClientPage() {
  const router = useRouter()

  const handleSubmit = async (data: Omit<FloorControlRecord, "id" | "created_at" | "updated_at">) => {
    
    const URL = `${API_URL}/api/client-cards`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }

      const result = await response.json(); 
      console.log("Cliente creado:", result);

      router.push("/floor-control");

    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      alert("Hubo un error al guardar el registro. Por favor intente de nuevo.");
      
      throw error; 
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Nueva Tarjeta de Cliente</h1>
          <p className="text-muted-foreground">Complete el formulario para registrar una nueva visita de cliente.</p>
        </div>
        {/* Pasamos la nueva función handleSubmit conectada a la Lambda */}
        <ClientCardForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}