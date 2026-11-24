import type { ReactNode } from "react"

import { Container, Eyebrow } from "@/components/sections/section"
import { cn } from "@/lib/utils"

/** Faint engineering-paper grid used behind dark hero areas. */
export const gridBackdrop =
  "bg-[linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] bg-[size:40px_40px]"

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
      <Container className="pt-20 pb-20 sm:pt-28 sm:pb-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </Container>
    </section>
  )
}
