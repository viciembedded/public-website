import { ContactForm } from "@/components/contact/contact-form"
import { PageHero } from "@/components/sections/page-hero"
import { Section } from "@/components/sections/section"
import { usePageMeta } from "@/lib/use-page-meta"

export function ContactPage() {
  usePageMeta(
    "Contact | Vici Embedded",
    "Discuss a product idea, engineering challenge or software requirement with Vici Embedded."
  )

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's build something meaningful."
      >
        <p>
          Have a product idea, engineering challenge or software requirement? We
          would like to hear about it.
        </p>
        <p>
          Whether you are an individual, startup, business or organization,
          contact Vici Embedded to discuss how we may be able to help.
        </p>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <ContactForm />

          <aside className="space-y-10 text-sm leading-relaxed text-muted-foreground lg:pt-14">
            {/* Add verified email, phone, address and social links here once confirmed. */}
            <div>
              <h2 className="font-heading text-base font-semibold text-foreground">
                How we use your information
              </h2>
              {/* Placeholder privacy notice: confirm wording before launch. */}
              <p className="mt-3">
                We use the details you submit only to review and respond to your
                enquiry. We don't add you to mailing lists or share your details
                with third parties for marketing.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
