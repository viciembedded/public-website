import { Section, SectionHeading } from "@/components/sections/section"
import { StatusBadge } from "@/components/ui/status-badge"
import { services } from "@/content/services"
import { Link } from "@/lib/router"

export function Expertise() {
  return (
    <Section tone="white" labelledBy="expertise-heading">
      <SectionHeading id="expertise-heading" title="Our Areas of Expertise">
        <p>
          We work across interconnected areas of technology, combining
          engineering knowledge and software development to create practical
          solutions.
        </p>
      </SectionHeading>

      <ul className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ id, title, icon: Icon, status, teaser, linkLabel }) => (
          <li key={id} className="flex flex-col border-t py-8">
            <div className="flex items-center justify-between gap-4">
              <Icon aria-hidden="true" className="size-7 text-primary" stroke={1.5} />
              <StatusBadge status={status} />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
              {teaser}
            </p>
            <Link
              href={`/services#${id}`}
              className="mt-5 self-start rounded-sm text-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {linkLabel}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
