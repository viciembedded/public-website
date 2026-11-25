import type { ReactNode } from "react"
import { m } from "motion/react"

import { Container, Eyebrow } from "@/components/sections/section"
import { loadSequence } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Glow + fading grid behind dark hero areas (styles in index.css). */
export const gridBackdrop = "hero-backdrop"

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section className={cn("dark bg-navy text-foreground", gridBackdrop)}>
      <Container className="pt-40 pb-20 sm:pt-48 sm:pb-24">
        <m.div variants={loadSequence.parent} initial="hidden" animate="show">
          <m.div variants={loadSequence.child}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </m.div>
          <m.h1
            variants={loadSequence.child}
            className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </m.h1>
          <m.div
            variants={loadSequence.child}
            className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground"
          >
            {children}
          </m.div>
        </m.div>
      </Container>
    </section>
  )
}
