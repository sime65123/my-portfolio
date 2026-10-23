"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ProjectCover } from "@/components/project-cover"
import { portfolioData } from "@/lib/portfolio-data"

export function ProjectsSection() {
  const { projects } = portfolioData
  const [activeId, setActiveId] = React.useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId) ?? projects[0]

  return (
    <section id="projets" className="border-t border-border py-24 lg:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 className="t-h2 lg:col-span-7">Projets</h2>
          <p className="max-w-[28rem] text-muted-foreground lg:col-span-5">
            Chaque projet part d’un besoin concret. Ouvrez-en un pour lire l’étude de cas : contexte, ce qui a été
            construit, technologies.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Index */}
          <ul className="border-b border-border lg:col-span-7">
            {projects.map((project) => (
              <li key={project.id} className="border-t border-border">
                <Link
                  href={`/projects/${project.id}`}
                  data-active={project.id === active.id}
                  onMouseEnter={() => setActiveId(project.id)}
                  onFocus={() => setActiveId(project.id)}
                  className="proj-row group relative block overflow-hidden py-6 lg:px-4 lg:py-7"
                >
                  <span aria-hidden className="proj-fill absolute inset-0 origin-left bg-signal" />

                  <div className="proj-text relative">
                    <span
                      className="proj-title block text-[clamp(2.1rem,5.2vw,4.25rem)] font-extrabold leading-none tracking-tight"
                      style={{ fontStretch: "82%" }}
                    >
                      {project.title}
                    </span>
                    <span className="mt-3 block text-[0.95rem] font-medium opacity-80 lg:translate-x-3">
                      {project.category}
                    </span>

                    {/* Mobile : l'aperçu est dans la ligne elle-même. */}
                    <div className="mt-5 lg:hidden">
                      <ProjectCover project={project} className="aspect-[16/10] w-full" sizes="100vw" />
                      <span className="mt-4 block max-w-[34rem] text-[0.95rem] text-muted-foreground">
                        {project.summary}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Aperçu (bureau) : suit la ligne survolée ou focalisée. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <ProjectCover
                    project={active}
                    className="aspect-video w-full border-2 border-foreground"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <p className="mt-6 text-lg leading-snug">{active.summary}</p>
                  <p className="mt-4 font-semibold">{active.stack.join(", ")}</p>
                  {active.status && <p className="mt-1 text-sm text-muted-foreground">{active.status}</p>}
                  <Link href={`/projects/${active.id}`} className="u-link mt-6 inline-block font-bold">
                    Lire l’étude de cas
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
