// A restrained schematic of an embedded system: sensor and power feeding a microcontroller,
// which talks to a radio and a software interface. On load the board powers up: parts fade in, traces
// draw, then signal pulses start looping. Reduced motion shows the finished board with no pulses.
import { m, useReducedMotion } from "motion/react"

import { easeOut } from "@/lib/motion"

const traces = [
  "M120 105 H155 V170 H190", // sensor -> MCU
  "M120 315 H155 V250 H190", // power -> MCU
  "M330 170 H365 V85 H400", // MCU -> radio
  "M330 250 H365 V310 H380", // MCU -> software
]

const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1 } }

function Block({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
}) {
  return (
    <m.g variants={fadeIn} transition={{ duration: 0.5, delay: 0.9 }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        className="fill-navy-2 stroke-white/25 transition-colors duration-300 hover:stroke-cyan"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        className="fill-[#d1d5db] font-sans text-[13px]"
      >
        {label}
      </text>
    </m.g>
  )
}

export function HeroSchematic() {
  const pins = [165, 190, 210, 230, 255]
  const reduceMotion = useReducedMotion()

  return (
    <m.svg
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      viewBox="0 0 520 420"
      role="img"
      aria-label="Diagram of an embedded system: a microcontroller connected to a sensor, a power supply, a radio module and a software interface."
      className="h-auto w-full"
      fill="none"
    >
      {/* Board outline */}
      <rect
        x="10"
        y="20"
        width="500"
        height="380"
        rx="14"
        className="stroke-white/10"
        strokeDasharray="4 6"
      />

      {traces.map((d, i) => (
        <m.path
          key={d}
          d={d}
          className="stroke-white/30"
          strokeWidth="2"
          variants={{
            hidden: { pathLength: 0 },
            show: { pathLength: 1 },
          }}
          transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: easeOut }}
        />
      ))}
      {/* Wireless link between radio and software */}
      <m.path
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 1.2 }}
        d="M445 110 V270"
        className="stroke-cyan/40"
        strokeWidth="2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />

      {/* Signal pulses, starting once the traces have drawn */}
      <m.g variants={fadeIn} transition={{ duration: 0.3, delay: 1.4 }}>
        {traces.map((d, i) => (
          <path
            key={d}
            d={d}
            className="stroke-cyan motion-safe:animate-signal motion-reduce:hidden"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="24 216"
            style={{ animationDelay: `${1.4 + i * 0.8}s` }}
          />
        ))}
      </m.g>

      {/* Vias */}
      <m.g variants={fadeIn} transition={{ duration: 0.4, delay: 0.6 }}>
        {[
          [155, 105],
          [155, 315],
          [365, 85],
          [365, 310],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            className="fill-navy stroke-white/40"
            strokeWidth="1.5"
          />
        ))}
      </m.g>

      {/* Microcontroller */}
      <m.g
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          show: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
      >
        {pins.map((y) => (
          <g key={y} className="stroke-white/35" strokeWidth="2">
            <path d={`M178 ${y} H190`} />
            <path d={`M330 ${y} H342`} />
          </g>
        ))}
        {pins.map((offset) => (
          <g key={offset} className="stroke-white/35" strokeWidth="2">
            <path d={`M${offset + 50} 128 V140`} />
            <path d={`M${offset + 50} 280 V292`} />
          </g>
        ))}
        <rect
          x="190"
          y="140"
          width="140"
          height="140"
          rx="8"
          className="fill-navy-2 stroke-cyan"
          strokeWidth="2"
        />
        <circle cx="206" cy="156" r="4" className="fill-cyan/70" />
        <text
          x="260"
          y="218"
          textAnchor="middle"
          className="fill-white font-heading text-[22px] font-semibold"
        >
          MCU
        </text>
      </m.g>

      <Block x={30} y={80} w={90} h={50} label="Sensor" />
      <Block x={30} y={290} w={90} h={50} label="Power" />
      <Block x={400} y={60} w={90} h={50} label="Radio" />

      {/* Software interface */}
      <m.g variants={fadeIn} transition={{ duration: 0.5, delay: 1 }}>
        <rect
          x="380"
          y="270"
          width="120"
          height="100"
          rx="6"
          className="fill-navy-2 stroke-white/25 transition-colors duration-300 hover:stroke-cyan"
        />
        <path d="M380 290 H500" className="stroke-white/15" />
        {[388, 398, 408].map((cx) => (
          <circle key={cx} cx={cx} cy="280" r="2.5" className="fill-white/30" />
        ))}
        <text x="392" y="314" className="fill-[#d1d5db] font-sans text-[13px]">
          API
        </text>
        <path
          d="M392 332 H470"
          className="stroke-cyan/60"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M392 348 H448"
          className="stroke-white/25"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </m.g>
    </m.svg>
  )
}
