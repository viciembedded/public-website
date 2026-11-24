import { ProductsEmpty } from "@/components/products/products-empty"
import { Section, SectionHeading } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"

export function ProductsTeaser() {
  return (
    <Section tone="dark" labelledBy="products-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          id="products-heading"
          eyebrow="Built by Vici Embedded"
          title="Technology products, developed with purpose."
        >
          <p>
            We believe engineering should lead to solutions people can use.
            Alongside our client-focused work, we develop our own technology
            products with a focus on practical applications, usability and
            reliability.
          </p>
          <p className="mt-4">
            As our product portfolio grows, this is where you will find the
            technologies we are bringing to market.
          </p>
        </SectionHeading>
        <ProductsEmpty
          title="Our product portfolio is in development."
          action={
            <ButtonLink href="/products" variant="outline" onDark>
              Explore Our Products
            </ButtonLink>
          }
        >
          We are working on technology designed to address practical needs.
          Check back as we introduce our products.
        </ProductsEmpty>
      </div>
    </Section>
  )
}
