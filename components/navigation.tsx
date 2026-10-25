"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { portfolioData } from "@/lib/portfolio-data"

const links = [
  { id: "a-propos", label: "À propos" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "services", label: "Services" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const { personal } = portfolioData
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [active, setActive] = React.useState("")

  // Filet de progression de lecture sous l'en-tête.
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, (v) => `${v * 100}%`)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      if (window.scrollY < 240) setActive("")
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Section active : celle qui traverse le milieu de l'écran.
  React.useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)
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
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled || open ? "border-line bg-surface/90 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="relative block size-9 shrink-0 overflow-hidden rounded-full border border-line bg-brand">
                <Image src={personal.photo} alt="" fill sizes="36px" className="object-cover object-top" />
              </span>
              <span className="flex flex-col">
                <span className="font-display text-base font-bold uppercase leading-none tracking-tight transition-colors group-hover:text-brand">
                  Sime Mbacob
                </span>
                <span className="label mt-1 hidden text-ink-faint sm:block">{personal.shortTitle}</span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 border-l border-line pl-6 2xl:flex">
              <span aria-hidden className="pulse-dot" />
              <span className="label text-brand">Disponible pour de nouveaux projets</span>
            </div>
          </div>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {links.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/#${l.id}`}
                    aria-current={active === l.id ? "true" : undefined}
                    className={cn(
                      "label relative block px-2.5 py-2 transition-colors hover:text-ink",
                      active === l.id ? "text-ink" : "text-ink-faint",
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-2.5 bottom-0.5 h-0.5 origin-left bg-brand transition-transform duration-300",
                        active === l.id ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 xl:flex">
              <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="tag-link">
                GitHub
              </a>
              <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="tag-link">
                LinkedIn
              </a>
              <a
                href={personal.resume}
                download
                className="tag-link border-navy bg-navy text-[#faf9f7] hover:bg-brand hover:text-[#faf9f7] dark:border-ink dark:bg-ink dark:text-surface"
              >
                CV
              </a>
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="label px-3 py-2 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </div>

        <motion.div aria-hidden style={{ width }} className="absolute bottom-[-1px] left-0 h-0.5 bg-brand" />
      </header>

      {/* Hors de l'en-tête : son backdrop-blur en ferait le conteneur des éléments fixed. */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-surface lg:hidden"
      >
        <ul className="wrap flex flex-col py-6">
          {links.map((l) => (
            <li key={l.id} className="border-b border-line">
              <Link
                href={`/#${l.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-2xl font-semibold tracking-tight"
              >
                {l.label}
                <span aria-hidden className="text-ink-faint">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="wrap flex flex-wrap gap-3 pb-10">
          <a href={personal.resume} download className="btn btn-primary">
            Télécharger le CV
          </a>
          <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            GitHub
          </a>
          <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  )
}
