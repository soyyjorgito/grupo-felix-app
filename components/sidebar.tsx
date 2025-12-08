"use client"

import { useState } from "react" // 1. Importar useState
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button" // 2. Importar Button (asegúrate de tenerlo)
import { 
  LayoutDashboard, 
  Database, 
  Lightbulb, 
  LayoutDashboardIcon, 
  Menu, // Icono hamburguesa
  X     // Icono cerrar
} from "lucide-react"

const navigation = [
  { name: "Panel", href: "/dashboard", icon: LayoutDashboard },
  { name: "Fuentes de Datos", href: "/data-sources", icon: Database },
  { name: "Recomendaciones", href: "/recommendations", icon: Lightbulb },
  { name: "Control de Piso", href: "/floor-control", icon: LayoutDashboardIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // 3. Estado para el menú móvil

  return (
    <>
      <div className="md:hidden flex flex-col bg-sidebar border-b border-sidebar-border">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo Móvil */}
          <div className="flex items-center gap-3">
            <img src="/images/design-mode/image.png" alt="Grupo Felix" className="h-8 w-auto" />
            <span className="text-sm font-semibold text-sidebar-foreground flex md:hidden">Analítica</span>
          </div>

          {/* Botón Hamburguesa */}
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <nav className="pb-4 space-y-1 px-4 animate-in slide-in-from-top-2 border-t border-sidebar-border">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors mt-2",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        )}
      </div>

      <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-3">
            <img src="/images/design-mode/image.png" alt="Grupo Felix" className="h-8 w-auto" />
            <span className="text-sm font-semibold text-sidebar-foreground">Analítica</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}