import { Logo } from "@/components/brand/logo"
import { navItems } from "@/components/layout/nav-items"
import { Container } from "@/components/sections/section"
import { Link } from "@/routes/router"

const linkClass =
  "rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-cyan/60"

export function Footer() {
  return (
    <footer className="dark border-t border-white/10 bg-navy text-foreground">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 font-heading font-medium">
            Engineering Technology. Building Possibilities.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Vici Embedded is a technology and engineering company developing
            practical solutions across embedded systems, software, cybersecurity
            and connected technologies.
          </p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="text-sm font-semibold">
            Quick links
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          {/* Add verified email, phone and social links here once confirmed. */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Project or partnership in mind?{" "}
            <Link href="/contact" className={`${linkClass} underline`}>
              Send us an enquiry
            </Link>
            .
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vici Embedded. All rights reserved.
        </Container>
      </div>
    </footer>
  )
}
