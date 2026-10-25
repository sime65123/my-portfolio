"use client"

import * as React from "react"
import { useInView, useReducedMotion } from "framer-motion"

/**
 * Console qui écrit ses lignes une à une quand elle apparaît à l'écran.
 * Illustration : le texte décrit un parcours, il ne montre pas de vraies données.
 */
export function TypedLog({ title, lines }: { title: string; lines: string[] }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduced = useReducedMotion()
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    if (reduced) {
      setCount(lines.length)
      return
    }
    setCount(1)
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= lines.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 650)
    return () => window.clearInterval(id)
  }, [inView, reduced, lines.length])

  const done = count >= lines.length

  return (
    <div ref={ref} className="border border-navy-line bg-[#070d17]">
      <div className="flex items-center justify-between gap-4 border-b border-navy-line bg-navy-deep px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-navy-faint/50" />
            <span className="size-2.5 rounded-full bg-navy-faint/50" />
            <span className="size-2.5 rounded-full bg-navy-faint/50" />
          </span>
          <span className="label text-navy-faint">{title}</span>
        </div>
      </div>

      <ol className="min-h-[11.5rem] space-y-2 p-4 font-mono text-[0.8125rem] leading-6 text-navy-text sm:p-5">
        {lines.map((line, i) => (
          <li
            key={line}
            className={i < count ? "flex gap-3" : "hidden"}
            aria-hidden={i >= count}
          >
            <span aria-hidden className="text-navy-faint">
              ›
            </span>
            <span className={i === lines.length - 1 && done ? "text-mint" : undefined}>{line}</span>
          </li>
        ))}
        {!done && (
          <li aria-hidden className="text-mint">
            <span className="caret" />
          </li>
        )}
      </ol>
    </div>
  )
}
