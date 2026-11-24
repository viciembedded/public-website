import { ProductsEmpty } from "@/components/products/products-empty"
import { PageHero } from "@/components/sections/page-hero"
import { Section } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"
import { usePageMeta } from "@/lib/use-page-meta"

export function ProductsPage() {
  usePageMeta(
    "Products | Vici Embedded",
    "Technology products designed and developed by Vici Embedded."
  )

  return (
    <>
      <PageHero eyebrow="Our products" title="Ideas engineered into products.">
        <p>
          We develop our own technology products to address practical needs
          and create useful solutions. Our product work brings together
          engineering, design, software and testing.
        </p>
      </PageHero>

      <Section>
        <ProductsEmpty
          title="Our products are taking shape."
          action={<ButtonLink href="/contact">Contact Us</ButtonLink>}
        >
          We are developing technology products with practical applications in
          mind. More information will be shared as products are ready for
          introduction.
        </ProductsEmpty>
      </Section>
    </>
  )
}
