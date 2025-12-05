import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  icon?: ReactNode
  children: ReactNode
}

export function FormSection({ title, icon, children }: FormSectionProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="section-header flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  )
}
