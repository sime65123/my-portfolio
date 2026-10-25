"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { ProjectCover } from "@/components/project-cover"
import { portfolioData } from "@/lib/portfolio-data"

export function ProjectsSection() {
  const { projects } = portfolioData
  const [activeId, setActiveId] = React.useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId) ?? projects[0]

  return (
    <section id="projets" className="section border-b border-line bg-surface">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="label text-brand">Projets</p>
            <Reveal as="h2" variant="mask" className="t-h2 mt-3">
              Des applications qui servent à quelque chose
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-6 lg:self-end">
            <p className="text-ink-soft">
              Cinq réalisations : applications web et mobile, site d’entreprise, e-commerce et objet connecté. Chacune a sa page : contexte, ce qui a
              été construit, outils utilisés.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ul className="border-t border-line lg:col-span-7" onMouseLeave={() => undefined}>
            {projects.map((project, i) => (
              <li key={project.id} className="border-b border-line">
                <Reveal delay={i * 0.04}>
                  <Link
                    href={`/projects/${project.id}`}
                    data-active={project.id === activeId}
                    className="ledger-row group grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 px-1 py-6 sm:px-3"
                    onMouseEnter={() => setActiveId(project.id)}
                    onFocus={() => setActiveId(project.id)}
                  >
                    <span className="label pt-1.5 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="ledger-title t-h3 block text-[1.375rem] transition-colors">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-ink-soft">{project.category}</span>
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((s) => (
                          <span key={s} className="chip">
                            {s}
                          </span>
                        ))}
                      </span>
                    </span>
                    <ArrowUpRight className="ledger-arrow mt-1.5 size-5 text-ink-faint" aria-hidden />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Aperçu : suit le projet survolé (ordinateur uniquement). */}
          <aside className="hidden lg:col-span-5 lg:block" aria-hidden>
            <div className="sticky top-28">
              <ProjectCover
                key={active.id}
                project={active}
                className="aspect-[4/3] w-full border border-line"
                sizes="40vw"
              />
              <p className="label mt-3 flex justify-between text-ink-faint">
                <span>{active.title}</span>
                <span>{active.status ?? "Réalisé"}</span>
              </p>
              <p className="mt-2 text-ink-soft">{active.summary}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
