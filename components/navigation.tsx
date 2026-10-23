"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { portfolioData } from "@/lib/portfolio-data"

const links = [
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "services", label: "Services" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [active, setActive] = React.useState("")

  // Barre de progression en bandes de barrière.
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (window.scrollY < 240) setActive("")
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Section active : celle qui traverse le milieu de l'écran.
  React.useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Menu mobile : Échap pour fermer, page figée tant qu'il est ouvert.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || open ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <nav aria-label="Navigation principale" className="wrap flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-black tracking-tight"
            style={{ fontStretch: "110%" }}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden className="block size-3 bg-signal" />
            {portfolioData.personal.displayName}
          </Link>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center md:flex">
              {links.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/#${l.id}`}
                    aria-current={active === l.id ? "true" : undefined}
                    className="group relative block px-3 py-2 text-sm font-semibold"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-0.5 h-[3px] origin-left bg-signal transition-transform duration-300 group-hover:scale-x-100",
                        active === l.id ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            <button
              type="button"
              className="ml-1 px-3 py-2 text-sm font-bold md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </nav>

        <motion.div aria-hidden style={{ width }} className="stripes absolute bottom-0 left-0 h-[3px]" />
      </header>

      {/* Hors de l'en-tête : son backdrop-blur en ferait le conteneur des éléments fixed. */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background md:hidden"
      >
        <ul className="wrap flex flex-col py-8">
          {links.map((l) => (
            <li key={l.id} className="border-b border-border">
              <Link
                href={`/#${l.id}`}
                onClick={() => setOpen(false)}
                className="block py-5 text-5xl font-extrabold tracking-tight"
                style={{ fontStretch: "78%" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
