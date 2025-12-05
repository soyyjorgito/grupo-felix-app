"use client"

import { 
  Car, 
  Menu, 
  X, 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardCheck, 
  FileWarning, 
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { 
    href: "/floor-control", 
    label: "Dashboard", 
    icon: LayoutDashboard 
  },
  { 
    href: "/new-card", 
    label: "Nueva Tarjeta", 
    icon: PlusCircle 
  },
  { 
    href: "/manager", 
    label: "Revisión Gerente", 
    icon: ClipboardCheck 
  },
  { 
    href: "/corrections", 
    label: "Correcciones", 
    icon: FileWarning 
  },
  { 
    href: "/dashboard", 
    label: "Volver a Analítica", 
    icon: ArrowLeft
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="felix-gradient text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Car className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg leading-tight">Control de Piso</h1>
              <p className="text-xs text-white/80">Grupo Félix Automotriz</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-white/20 text-white shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}