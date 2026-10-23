"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { portfolioData } from "@/lib/portfolio-data"

/** Code-barres décoratif, déterministe (identique côté serveur et client). */
function barcodeBars(seed: string) {
  let h = 2166136261
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (let i = 0; i < 38; i++) {
    h = Math.imul(h ^ (seed.charCodeAt(i % seed.length) + i), 16777619) >>> 0
    const w = 1 + (h % 3)
    if (i % 2 === 0) bars.push({ x, w })
    x += w + 1
  }
  return { bars, width: x }
}

export function AccessBadge() {
  const { personal } = portfolioData
  const ref = React.useRef<HTMLDivElement>(null)

  // Inclinaison au survol (souris uniquement), amortie par un ressort.
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const springX = useSpring(rx, { stiffness: 140, damping: 14 })
  const springY = useSpring(ry, { stiffness: 140, damping: 14 })

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const { bars, width } = barcodeBars(personal.name)

  return (
    <div className="relative mx-auto w-[min(100%,19rem)] lg:mx-0">
      {/* Sangle : fixe, le badge pivote à son extrémité. */}
      <div aria-hidden className="absolute bottom-full left-1/2 hidden h-32 w-7 -translate-x-1/2 bg-awning lg:block">
        <div className="absolute inset-y-0 left-1.5 w-px bg-white/25" />
      </div>
      <div
        aria-hidden
        className="absolute -top-2 left-1/2 z-10 hidden h-4 w-9 -translate-x-1/2 rounded-[2px] bg-[#9aa89f] lg:block"
      />

      <div className="badge-swing">
        <div style={{ perspective: 900 }}>
          <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ rotateX: springX, rotateY: springY }}
            className="rounded-[10px] bg-signal p-4 pb-5 text-ink shadow-[0_28px_40px_-22px_rgb(15_46_34/0.6)]"
          >
            <span aria-hidden className="mx-auto mb-3 block h-2.5 w-16 rounded-full bg-ink/85" />

            <div className="mb-3 flex items-center gap-2 text-sm font-bold">
              <span aria-hidden className="block size-2.5 rounded-full bg-[#0e8a4f]" />
              Accès autorisé
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-awning">
              <Image
                src="/sime-badge.webp"
                alt={`Portrait de ${personal.displayName}`}
                fill
                sizes="(min-width: 1024px) 18rem, 90vw"
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-4">
              <p className="text-[1.65rem] font-black leading-none tracking-tight" style={{ fontStretch: "85%" }}>
                SIME MBACOB
              </p>
              <p className="mt-1 text-base font-semibold">Appolos Noel</p>
              <p className="mt-3 text-sm font-medium">{personal.title}</p>
              <p className="text-sm font-medium">{personal.location}</p>
            </div>

            <svg
              aria-hidden
              viewBox={`0 0 ${width} 22`}
              preserveAspectRatio="none"
              className="mt-4 h-6 w-full"
              fill="currentColor"
            >
              {bars.map((b, i) => (
                <rect key={i} x={b.x} y={0} width={b.w} height={22} />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
