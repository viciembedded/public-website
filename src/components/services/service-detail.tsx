import { m } from "motion/react"

import { StatusBadge } from "@/components/ui/status-badge"
import type { Service } from "@/content/services"
import { reveal } from "@/lib/motion"

export function ServiceDetail({ service }: { service: Service }) {
  const {
    id,
    title,
    icon: Icon,
    status,
    summary,
    body,
    areasLabel,
    areas,
  } = service

  return (
    <m.article
      {...reveal()}
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-24 gap-8 border-t py-14 first:border-t-0 first:pt-0 md:grid-cols-[1fr_1.4fr] md:gap-16"
    >
      <div>
        <Icon aria-hidden="true" className="size-8 text-electric" stroke={1.5} />
        <h2
          id={`${id}-title`}
          className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        <StatusBadge status={status} className="mt-4" />
        <p className="mt-5 font-heading text-lg leading-snug">{summary}</p>
      </div>

      <div className="space-y-5 leading-relaxed text-muted-foreground">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {areas && (
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-foreground">
              {areasLabel}
            </h3>
            <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {areas.map((area) => (
                <li key={area} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-3 shrink-0 bg-primary"
                  />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </m.article>
  )
}
