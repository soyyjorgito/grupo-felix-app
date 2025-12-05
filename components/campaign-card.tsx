import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Target, Lightbulb, ChevronRight } from "lucide-react"
import Link from "next/link"

interface CampaignCardProps {
  dateRange: string
  objective: string
  tactic: string
  id?: string
}

export function CampaignCard({ dateRange, objective, tactic, id = "1" }: CampaignCardProps) {
  return (
    <Link href={`/campaign/${id}`} className="block transition-transform hover:scale-[1.01]">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm font-medium text-accent mb-1">{dateRange}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Objetivo</p>
                    <p className="text-sm text-foreground">{objective}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Táctica</p>
                    <p className="text-sm text-foreground">{tactic}</p>
                  </div>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
