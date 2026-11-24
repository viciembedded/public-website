import { useEffect, useRef, useState } from "react"
import { IconMenu2, IconMessageCircle, IconX } from "@tabler/icons-react"
import { AnimatePresence, m } from "motion/react"

import { Logo } from "@/components/brand/logo"
import { navItems } from "@/components/layout/nav-items"
import { Container } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"
import { Link, usePath } from "@/routes/router"
import { cn } from "@/lib/utils"

function NavLink({
  href,
  label,
  current,
  onClick,
  className,
  indicator,
}: {
  href: string
  label: string
  current: boolean
  onClick?: () => void
  className?: string
  /** Show the sliding underline that marks the current page (desktop). */
  indicator?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={cn(
        "relative rounded-md text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-cyan/60 aria-[current=page]:text-foreground",
        className
      )}
    >
      {label}
      {indicator && current && (
        <m.span
          layoutId="nav-indicator"
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-cyan"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </Link>
  )
}

export function Header() {
  const path = usePath()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)
  // Transparent over the hero at the top of the page; solid once scrolled so it stays legible.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const solid = scrolled || open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header
      className={cn(
        "dark fixed inset-x-0 top-0 z-50 border-b text-foreground transition-[background-color,border-color] duration-300",
        solid
          ? "border-white/10 bg-navy/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink {...item} current={path === item.href} indicator />
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          className="group relative isolate hidden items-center gap-2.5 justify-self-end overflow-hidden rounded-full border border-white/20 bg-white/5 py-1.5 pr-1.5 pl-4 text-sm font-medium transition-colors duration-500 outline-none hover:border-primary hover:text-primary-foreground focus-visible:border-primary focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-cyan/60 md:inline-flex"
        >
          {/* Fill: a copy of the icon's circle that grows from behind it to cover the pill on hover/focus. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-1.5 -z-10 size-7 -translate-y-1/2 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14] group-focus-visible:scale-[14] motion-reduce:transition-none"
          />
          Discuss a Project
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconMessageCircle
              aria-hidden="true"
              className="size-4 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
            />
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-cyan/60 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              {open ? (
                <IconX aria-hidden="true" />
              ) : (
                <IconMenu2 aria-hidden="true" />
              )}
            </m.span>
          </AnimatePresence>
        </button>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Main"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <Container className="py-4">
              <ul>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      {...item}
                      current={path === item.href}
                      onClick={close}
                      className="flex min-h-12 items-center text-base"
                    />
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contact"
                onClick={close}
                className="mt-4 w-full"
              >
                Discuss a Project
              </ButtonLink>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
