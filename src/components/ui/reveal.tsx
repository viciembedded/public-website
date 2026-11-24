import { m, type HTMLMotionProps } from "motion/react"

import { reveal } from "@/lib/motion"

export function Reveal({
  delay,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return <m.div {...reveal(delay)} {...props} />
}
