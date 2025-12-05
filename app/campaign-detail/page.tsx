import { Sidebar } from "@/components/sidebar"
import { CampaignDetailView } from "@/components/campaign-detail-view"

export default function CampaignDetailPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <CampaignDetailView />
        </div>
      </main>
    </div>
  )
}
