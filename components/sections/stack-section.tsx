"use client"

import * as React from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"
import { portfolioData } from "@/lib/portfolio-data"

/**
 * « Du capteur à l'écran » : la chaîne technique sur laquelle je travaille.
 * La ligne se remplit au fil du défilement, les étapes s'allument une à une.
 */
export function StackSection() {
  const { stack } = portfolioData
  const ref = React.useRef<HTMLDivElement>(null)
  const [reached, setReached] = React.useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(stack.length, Math.floor(v * (stack.length + 0.999))))
  })

  return (
    <section id="competences" className="border-t border-border py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 className="t-h2 lg:col-span-7">Du capteur à l’écran</h2>
          <p className="max-w-[28rem] text-muted-foreground lg:col-span-5">
            Mes projets traversent toute la chaîne. Voici les outils que j’utilise à chaque étape.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* Ligne : verticale sur mobile, horizontale sur bureau. */}
          <div aria-hidden className="absolute bottom-2 left-[9px] top-2 w-[2px] bg-border lg:hidden">
            <motion.div style={{ scaleY: scrollYProgress }} className="h-full origin-top bg-foreground" />
          </div>
          <div aria-hidden className="absolute left-2 right-2 top-[9px] hidden h-[2px] bg-border lg:block">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-foreground" />
          </div>

          <ol className="grid gap-14 lg:grid-cols-4 lg:gap-8">
            {stack.map((stage, i) => (
              <li key={stage.id} className="relative pl-11 lg:pl-0 lg:pt-14">
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1 size-5 rounded-full border-2 border-foreground transition-colors duration-300 lg:top-0",
                    reached > i ? "bg-signal" : "bg-background",
                  )}
                />
                <h3 className="t-h3">{stage.name}</h3>
                <p className="mt-3 max-w-[30ch] text-muted-foreground">{stage.note}</p>
                <ul className="mt-6 border-t border-border">
                  {stage.tools.map((tool) => (
                    <li key={tool} className="border-b border-border py-2.5 font-semibold">
                      {tool}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-14 text-muted-foreground">Git versionne l’ensemble, de l’ESP32 à l’écran.</p>
      </div>
    </section>
  )
}
