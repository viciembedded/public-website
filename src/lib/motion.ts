import type { MotionProps } from "motion/react"

export const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Fade-and-rise once when the element scrolls into view. Spread onto any motion element. */
export function reveal(delay = 0): MotionProps {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.6, ease: easeOut, delay },
  }
}

/** Parent/child variants for a sequence that plays on page load. */
export const loadSequence = {
  parent: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  },
  child: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  },
}
