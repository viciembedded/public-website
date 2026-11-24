import type { ReactNode } from "react"

/** Shown until real products are ready; the blueprint forbids placeholder product cards. */
export function ProductsEmpty({
  title,
  children,
  action,
}: {
  title: string
  children: ReactNode
  action: ReactNode
}) {
  return (
    <div className="rounded-xl border border-dashed border-input p-8 sm:p-10">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
        {children}
      </p>
      <div className="mt-6">{action}</div>
    </div>
  )
}
