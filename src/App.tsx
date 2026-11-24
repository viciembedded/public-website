import { lazy, Suspense, type ComponentType } from "react"

import { RootLayout } from "@/components/layout/root-layout"
import { usePath } from "@/routes/router"
import { AboutPage } from "@/pages/about"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"
import { ProductsPage } from "@/pages/products"
import { ServicesPage } from "@/pages/services"

// Split out so the form and its validation library (zod) only download on /contact.
const ContactPage = lazy(() =>
  import("@/pages/contact").then((module) => ({ default: module.ContactPage }))
)

const routes: Record<string, ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/products": ProductsPage,
  "/contact": ContactPage,
}

export default function App() {
  const path = usePath().replace(/\/+$/, "") || "/"
  const Page = routes[path] ?? NotFoundPage

  return (
    <RootLayout>
      {/* Fallback is a blank navy band, matching the page hero, so the swap doesn't flash. */}
      <Suspense fallback={<div className="min-h-[60vh] bg-navy" />}>
        <Page />
      </Suspense>
    </RootLayout>
  )
}
