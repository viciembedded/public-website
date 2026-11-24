import { statusLabels, type ServiceStatus } from "@/content/services"
import { cn } from "@/lib/utils"

// The dot shape varies with status so the label isn't communicated by colour alone.
const dotStyles: Record<ServiceStatus, string> = {
  core: "bg-primary",
  scoped: "bg-primary/60",
  expanding: "border-2 border-cyan bg-transparent",
  exploring: "border-2 border-dashed border-muted-foreground bg-transparent",
}

export function StatusBadge({
  status,
  className,
}: {
  status: ServiceStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-2.5 rounded-full", dotStyles[status])}
      />
      {statusLabels[status]}
    </span>
  )
}
