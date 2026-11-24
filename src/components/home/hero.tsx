import { HeroSchematic } from "@/components/home/hero-schematic"
import { gridBackdrop } from "@/components/sections/page-hero"
import { Container, Eyebrow } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section
      className={cn("dark overflow-hidden bg-navy text-foreground", gridBackdrop)}
    >
      <Container className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <Eyebrow>Technology, engineering, innovation</Eyebrow>
          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Engineering Technology. Building Possibilities.
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              We design and develop practical technology solutions by bringing
              together embedded systems, software engineering, cybersecurity
              and intelligent connected technologies.
            </p>
            <p>
              From custom engineering projects to products built for the
              market, we turn ideas into solutions designed for the real world.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" onDark>
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" onDark>
              Explore What We Do
            </ButtonLink>
          </div>
        </div>
        <HeroSchematic />
      </Container>
    </section>
  )
}
