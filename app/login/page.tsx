"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute inset-0 bg-linear-to-br from-muted/30 to-background" />

      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 relative z-10">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 flex items-center justify-center">
              <img
                src="/images/design-mode/image.png"
                alt="Grupo Felix"
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Grupo Felix
            </h1>
            <p className="text-muted-foreground text-sm">
              Plataforma de Análisis de Marketing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                Correo Electrónico
              </label>

              <input
                id="email"
                type="email"
                placeholder="tu@grupofelix.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-foreground text-sm font-medium"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-primary text-white rounded-md text-base font-medium hover:bg-primary/90 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Acceso seguro solo para personal autorizado
          </p>
        </div>
      </div>
    </div>
  )
}
