import { Sidebar } from "@/components/sidebar"
import { MetricCard } from "@/components/metric-card"
import { AreaChartComponent } from "@/components/area-chart"
import { BarChartComponent } from "@/components/bar-chart"
import { Users, TrendingUp, Target } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">Panel</h1>
            <p className="text-muted-foreground">Resumen de tu desempeño de marketing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Personas llegando a piso"
              value="1,458"
              change="+12.5%"
              trend="up"
              icon={<Users className="h-5 w-5" />}
            />
            <MetricCard
              title="Conversiones"
              value="1,847"
              change="+8.2%"
              trend="up"
              icon={<Target className="h-5 w-5" />}
            />
            <MetricCard
              title="Leads Generados"
              value="8,291"
              change="+15.3%"
              trend="up"
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaChartComponent />
            <BarChartComponent />
          </div>
        </div>
      </main>
    </div>
  )
}