import type { ReactNode } from "react"
import { LazyMotion, MotionConfig } from "motion/react"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { useInitialHashScroll } from "@/routes/router"

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((module) => module.default)

export function RootLayout({ children }: { children: ReactNode }) {
  useInitialHashScroll()

  return (
    // strict: throws if a full `motion.*` component sneaks in and defeats the lazy loading.
    <LazyMotion features={loadMotionFeatures} strict>
      {/* "user" drops movement for visitors with reduced motion enabled; fades remain. */}
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-svh flex-col">
          <a
            href="#main"
            className="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
