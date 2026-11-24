import { Section } from "@/components/sections/section"
import { Link } from "@/lib/router"

export function Intro() {
  return (
    <Section labelledBy="intro-heading">
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <h2
          id="intro-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Technology built around real-world needs.
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Vici Embedded is a technology and engineering company focused on
            designing, developing and delivering innovative technological
            solutions.
          </p>
          <p>
            We combine hardware and software expertise to address practical
            challenges, develop useful products and help organizations bring
            technical ideas to life.
          </p>
          <p className="text-foreground">
            Whether we are developing our own technology or working on a custom
            project, our focus remains the same: understand the problem,
            engineer the solution and build with purpose.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-sm font-medium text-primary underline underline-offset-4 outline-none hover:decoration-2 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Learn About Vici Embedded
          </Link>
        </div>
      </div>
    </Section>
  )
}
