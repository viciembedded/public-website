import type { ComponentType } from "react"

import { RootLayout } from "@/components/layout/root-layout"
import { usePath } from "@/lib/router"
import { AboutPage } from "@/pages/about"
import { ContactPage } from "@/pages/contact"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"
import { ProductsPage } from "@/pages/products"
import { ServicesPage } from "@/pages/services"

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
      <Page />
    </RootLayout>
  )
}
