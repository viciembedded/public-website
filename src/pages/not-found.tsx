import { PageHero } from "@/components/sections/page-hero"
import { ButtonLink } from "@/components/ui/button-link"
import { usePageMeta } from "@/lib/use-page-meta"

export function NotFoundPage() {
  usePageMeta("Page not found | Vici Embedded", "This page doesn't exist.")

  return (
    <PageHero eyebrow="Error 404" title="This page doesn't exist.">
      <p>The link may be out of date, or the address may have a typo.</p>
      <div className="pt-4">
        <ButtonLink href="/" onDark>
          Go to the home page
        </ButtonLink>
      </div>
    </PageHero>
  )
}
