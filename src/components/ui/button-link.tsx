import type { ComponentProps } from "react"
import type { VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/routes/router"
import { cn } from "@/lib/utils"

type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    /** Use on navy sections, where the default outline would be a light box. */
    onDark?: boolean
  }

export function ButtonLink({
  className,
  variant,
  onDark,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant }),
        "h-11 px-5 text-[0.95rem]",
        onDark &&
          variant === "outline" &&
          "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white dark:bg-transparent",
        onDark && "focus-visible:ring-cyan/60",
        className
      )}
      {...props}
    />
  )
}
