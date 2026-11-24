import { Section, SectionHeading } from "@/components/sections/section"

const steps = [
  {
    title: "Understand",
    text: "Define the problem, requirements, constraints and intended outcome.",
  },
  {
    title: "Design",
    text: "Develop the system architecture, technical approach and solution design.",
  },
  {
    title: "Build",
    text: "Implement the hardware, software or integrated system.",
  },
  {
    title: "Test and refine",
    text: "Evaluate performance, identify issues and improve the solution.",
  },
  {
    title: "Deliver",
    text: "Prepare the solution for its intended use and provide agreed handover or support.",
  },
]

export function Approach() {
  return (
    <Section labelledBy="approach-heading">
      <SectionHeading id="approach-heading" title="From idea to working solution.">
        <p>
          Our process is grounded in engineering, collaboration and continuous
          improvement. We work to understand the challenge before selecting
          the technology and approach best suited to the task.
        </p>
      </SectionHeading>

      {/* A real sequence, so numbered; the connecting line echoes a circuit trace. */}
      <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
        <span
          aria-hidden="true"
          className="absolute top-5 right-[10%] left-5 hidden h-0.5 bg-border md:block"
        />
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-5 md:block">
            <span
              aria-hidden="true"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-heading font-semibold text-primary"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:mt-5">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-sm text-muted-foreground">
        The exact process may vary depending on the scope and nature of each
        project.
      </p>
    </Section>
  )
}
