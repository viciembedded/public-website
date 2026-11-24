import { Approach } from "@/components/home/approach"
import { Expertise } from "@/components/home/expertise"
import { Hero } from "@/components/home/hero"
import { Intro } from "@/components/home/intro"
import { ProductsTeaser } from "@/components/home/products-teaser"
import { CtaBand } from "@/components/sections/cta-band"
import { usePageMeta } from "@/lib/use-page-meta"

export function HomePage() {
  usePageMeta(
    "Vici Embedded | Technology and Engineering Solutions",
    "Vici Embedded designs and develops technology solutions across embedded systems, software development, cybersecurity and intelligent connected technologies."
  )

  return (
    <>
      <Hero />
      <Intro />
      <Expertise />
      <ProductsTeaser />
      <Approach />
      <CtaBand />
    </>
  )
}
