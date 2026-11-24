import logoMark from "@/assests/logo/vici-logo.png"
import { Link } from "@/routes/router"
import { cn } from "@/lib/utils"

// The mark is white on transparent, so it is only used on navy surfaces (header, footer).
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 rounded-md font-heading text-lg font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-cyan/60",
        className
      )}
    >
      {/* Decorative: the visible company name beside it is the link text. */}
      <img
        src={logoMark}
        alt=""
        width={32}
        height={32}
        className="size-9 shrink-0"
      />
      <span>
        Vici <span className="font-normal opacity-80">Embedded</span>
      </span>
    </Link>
  )
}
