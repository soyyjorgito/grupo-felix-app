"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Ene", visitors: 4200 },
  { month: "Feb", visitors: 5100 },
  { month: "Mar", visitors: 4800 },
  { month: "Abr", visitors: 6200 },
  { month: "May", visitors: 7100 },
  { month: "Jun", visitors: 6800 },
  { month: "Jul", visitors: 8400 },
  { month: "Ago", visitors: 9200 },
  { month: "Sep", visitors: 8900 },
  { month: "Oct", visitors: 10500 },
  { month: "Nov", visitors: 11200 },
  { month: "Dic", visitors: 12458 },
]

const chartConfig = {
  visitors: {
    label: "Visitantes",
    color: "hsl(var(--chart-1))",
  },
}

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tráfico en Sala de Exhibición</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] lg:w-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
