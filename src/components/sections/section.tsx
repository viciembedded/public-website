import type { ReactNode } from "react"

import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

type SectionProps = {
  id?: string
  tone?: "light" | "white" | "dark"
  className?: string
  children: ReactNode
  labelledBy?: string
}

const tones = {
  light: "bg-background text-foreground",
  white: "bg-card text-card-foreground",
  dark: "dark bg-navy text-foreground",
}

export function Section({
  id,
  tone = "light",
  className,
  children,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-28", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  )
}

/** Small lead-in line above a heading; sentence case, set in the accent colour. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-sm font-medium text-primary dark:text-cyan">
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string
  eyebrow?: string
  title: string
  children?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children && (
        <div className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </Reveal>
  )
}
