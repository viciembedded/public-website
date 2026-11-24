import { CtaBand } from "@/components/sections/cta-band"
import { PageHero } from "@/components/sections/page-hero"
import { Section, SectionHeading } from "@/components/sections/section"
import { Reveal } from "@/components/ui/reveal"
import { usePageMeta } from "@/lib/use-page-meta"

const differentiators = [
  {
    title: "A connected engineering perspective",
    text: "We consider how hardware, software and systems work together rather than treating them as isolated parts.",
  },
  {
    title: "Problem-first thinking",
    text: "We begin with the actual need and choose an appropriate technical approach.",
  },
  {
    title: "Build and test",
    text: "We value implementation, testing and refinement, not just concepts.",
  },
  {
    title: "Product and project mindset",
    text: "We develop our own products while also undertaking custom client projects.",
  },
  {
    title: "Continuous development",
    text: "We keep learning, researching and adapting as technology evolves.",
  },
]

export function AboutPage() {
  usePageMeta(
    "About | Vici Embedded",
    "Vici Embedded is a technology and engineering company bringing hardware and software together to solve real-world problems."
  )

  return (
    <>
      <PageHero
        eyebrow="About Vici Embedded"
        title="Engineering ideas into practical technology."
      >
        <p>
          Vici Embedded is a technology and engineering company focused on
          developing innovative solutions through embedded systems, software,
          cybersecurity and computer technology.
        </p>
        <p>
          We bring hardware and software together to solve real-world problems,
          develop products and support organizations with custom engineering and
          development projects.
        </p>
      </PageHero>

      <Section labelledBy="who-heading">
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Reveal>
            <h2
              id="who-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Who we are
            </h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="space-y-5 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              At Vici Embedded, we see technology as more than a collection of
              tools. It is a way to solve problems, improve processes and create
              new possibilities.
            </p>
            <p>
              Our work spans multiple areas of engineering and computing. We
              develop our own technology products for the market and collaborate
              with individuals, startups, businesses and organizations that need
              technical expertise to bring their ideas to life.
            </p>
            <p>
              By combining hardware and software engineering, we aim to create
              solutions that are functional, scalable and designed around
              practical needs.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {[
            {
              title: "Our vision",
              text: "To become a recognized technology and engineering company known for building innovative products, developing intelligent systems and delivering technological solutions that make a meaningful difference.",
            },
            {
              title: "Our mission",
              text: "To transform ideas into practical technological solutions through engineering, innovation, research and continuous development, while making advanced technology more accessible and useful.",
            },
          ].map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.1}
              className="border-l-2 border-primary pl-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="approach-heading">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeading id="approach-heading" title="Our approach">
            <p>
              We believe technology should go beyond theory. We focus on
              designing, building, testing and delivering solutions that work in
              the real world.
            </p>
            <p className="mt-4">
              Whether it is a custom embedded device, a software application, a
              cybersecurity solution or an intelligent connected system, we
              approach every project with engineering discipline, creativity and
              a commitment to quality.
            </p>
          </SectionHeading>

          <Reveal delay={0.1}>
            <h3 className="text-sm font-semibold">
              What sets our approach apart
            </h3>
            <dl className="mt-2">
              {differentiators.map((item) => (
                <div key={item.title} className="border-b py-5 last:border-b-0">
                  <dt className="font-heading text-lg font-semibold tracking-tight">
                    {item.title}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-muted-foreground">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
