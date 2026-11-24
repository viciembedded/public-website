import { m } from "motion/react"

import { HeroSchematic } from "@/components/home/hero-schematic"
import { gridBackdrop } from "@/components/sections/page-hero"
import { Container, Eyebrow } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"
import { loadSequence } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section
      className={cn(
        "dark overflow-hidden bg-navy text-foreground",
        gridBackdrop
      )}
    >
      <Container className="grid items-center gap-14 pt-36 pb-20 sm:pt-44 sm:pb-28 lg:grid-cols-[1.15fr_1fr]">
        <m.div variants={loadSequence.parent} initial="hidden" animate="show">
          <m.div variants={loadSequence.child}>
            <Eyebrow>Technology, engineering, innovation</Eyebrow>
          </m.div>
          <m.h1
            variants={loadSequence.child}
            className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
          >
            Engineering Technology. Building Possibilities.
          </m.h1>
          <m.div
            variants={loadSequence.child}
            className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              We design and develop practical technology solutions by bringing
              together embedded systems, software engineering, cybersecurity and
              intelligent connected technologies.
            </p>
            <p>
              From custom engineering projects to products built for the market,
              we turn ideas into solutions designed for the real world.
            </p>
          </m.div>
          <m.div
            variants={loadSequence.child}
            className="mt-9 flex flex-wrap gap-3"
          >
            <ButtonLink href="/contact" onDark>
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" onDark>
              Explore What We Do
            </ButtonLink>
          </m.div>
        </m.div>
        <HeroSchematic />
      </Container>
    </section>
  )
}
