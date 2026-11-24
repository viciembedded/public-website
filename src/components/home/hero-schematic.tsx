// A restrained schematic of an embedded system: sensor and power feeding a microcontroller,
// which talks to a radio and a software interface. One looping signal pulse; off under reduced motion.

const traces = [
  "M120 105 H155 V170 H190", // sensor -> MCU
  "M120 315 H155 V250 H190", // power -> MCU
  "M330 170 H365 V85 H400", // MCU -> radio
  "M330 250 H365 V310 H380", // MCU -> software
]

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
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        className="fill-navy-2 stroke-white/25"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        className="fill-[#c4cddb] font-sans text-[13px]"
      >
        {label}
      </text>
    </g>
  )
}

export function HeroSchematic() {
  const pins = [165, 190, 210, 230, 255]

  return (
    <svg
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

      {traces.map((d) => (
        <path key={d} d={d} className="stroke-white/30" strokeWidth="2" />
      ))}
      {/* Wireless link between radio and software */}
      <path
        d="M445 110 V270"
        className="stroke-cyan/40"
        strokeWidth="2"
        strokeDasharray="2 7"
        strokeLinecap="round"
      />

      {/* Signal pulses */}
      {[traces[0], traces[2], traces[3]].map((d, i) => (
        <path
          key={d}
          d={d}
          className="stroke-cyan motion-safe:animate-signal motion-reduce:hidden"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="24 216"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}

      {/* Vias */}
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

      {/* Microcontroller */}
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

      <Block x={30} y={80} w={90} h={50} label="Sensor" />
      <Block x={30} y={290} w={90} h={50} label="Power" />
      <Block x={400} y={60} w={90} h={50} label="Radio" />

      {/* Software interface */}
      <rect
        x="380"
        y="270"
        width="120"
        height="100"
        rx="6"
        className="fill-navy-2 stroke-white/25"
      />
      <path d="M380 290 H500" className="stroke-white/15" />
      {[388, 398, 408].map((cx) => (
        <circle key={cx} cx={cx} cy="280" r="2.5" className="fill-white/30" />
      ))}
      <text x="392" y="314" className="fill-[#c4cddb] font-sans text-[13px]">
        API
      </text>
      <path d="M392 332 H470" className="stroke-cyan/60" strokeWidth="3" strokeLinecap="round" />
      <path d="M392 348 H448" className="stroke-white/25" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
