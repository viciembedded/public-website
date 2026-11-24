import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

// Temporary text wordmark until the final logo is supplied (blueprint §5).
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md font-heading text-lg font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-cyan/60",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-7 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2.5"
          className="stroke-cyan"
          strokeWidth="1.6"
        />
        <path
          d="M8 9l4 7 4-7"
          className="stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 1.5v2.5M15 1.5v2.5M9 20v2.5M15 20v2.5M1.5 9H4M1.5 15H4M20 9h2.5M20 15h2.5"
          className="stroke-cyan"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span>
        Vici <span className="font-normal opacity-80">Embedded</span>
      </span>
    </Link>
  )
}
