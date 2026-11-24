import { Section } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"

export function CtaBand({
  title = "Have an idea that needs engineering?",
  text = "Whether you are exploring a new product, need a custom software solution or have a technical challenge to solve, let's start a conversation.",
  cta = "Discuss Your Project",
}: {
  title?: string
  text?: string
  cta?: string
}) {
  return (
    <Section tone="dark" labelledBy="cta-heading" className="bg-navy-2">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2
            id="cta-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {text}
          </p>
        </div>
        <ButtonLink href="/contact" onDark className="self-start md:self-auto">
          {cta}
        </ButtonLink>
      </div>
    </Section>
  )
}
