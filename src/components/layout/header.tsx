import { useEffect, useRef, useState } from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"

import { Logo } from "@/components/brand/logo"
import { navItems } from "@/components/layout/nav-items"
import { Container } from "@/components/sections/section"
import { ButtonLink } from "@/components/ui/button-link"
import { Link, usePath } from "@/lib/router"
import { cn } from "@/lib/utils"

function NavLink({
  href,
  label,
  current,
  onClick,
  className,
}: {
  href: string
  label: string
  current: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={cn(
        "rounded-md text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-cyan/60 aria-[current=page]:text-foreground",
        className
      )}
    >
      {label}
    </Link>
  )
}

export function Header() {
  const path = usePath()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

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
    <header className="dark sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-foreground backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink {...item} current={path === item.href} />
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href="/contact" className="hidden h-9 md:inline-flex">
          Discuss a Project
        </ButtonLink>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md outline-none hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-cyan/60 md:hidden"
        >
          {open ? <IconX aria-hidden="true" /> : <IconMenu2 aria-hidden="true" />}
        </button>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="border-t border-white/10 md:hidden"
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
          <ButtonLink href="/contact" onClick={close} className="mt-4 w-full">
            Discuss a Project
          </ButtonLink>
        </Container>
      </nav>
    </header>
  )
}
