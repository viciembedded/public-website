import { CtaBand } from "@/components/sections/cta-band"
import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/sections/section"
import { ServiceDetail } from "@/components/services/service-detail"
import { services } from "@/content/services"
import { Link } from "@/lib/router"
import { usePageMeta } from "@/lib/use-page-meta"

export function ServicesPage() {
  usePageMeta(
    "Services | Vici Embedded",
    "Embedded systems engineering, software development, cybersecurity, technology solutions, IoT and intelligent hardware from Vici Embedded."
  )

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Engineering and technology for practical challenges."
      >
        <p>
          We combine expertise across hardware, software and computing to
          design and develop solutions for individuals, startups, businesses
          and organizations.
        </p>
      </PageHero>

      <nav aria-label="Service areas" className="border-b bg-card">
        <Container>
          <ul className="flex gap-6 overflow-x-auto py-4 text-sm whitespace-nowrap">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`#${service.id}`}
                  className="rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="py-20 sm:py-24">
        {services.map((service) => (
          <ServiceDetail key={service.id} service={service} />
        ))}
      </Container>

      <CtaBand
        title="Need a solution tailored to your requirements?"
        text="Tell us about the challenge, product idea or technical requirement you are working on. We can discuss the scope and determine whether Vici Embedded is a suitable engineering partner."
        cta="Start a Project Enquiry"
      />
    </>
  )
}
