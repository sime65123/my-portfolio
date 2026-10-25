import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectCover } from "@/components/project-cover"
import { TypedLog } from "@/components/typed-log"
import { Reveal } from "@/components/reveal"
import { portfolioData } from "@/lib/portfolio-data"

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return portfolioData.projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = portfolioData.projects.find((p) => p.id === id)
  if (!project) return {}
  return {
    title: `${project.title}, ${project.category}`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const { projects } = portfolioData
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) notFound()

  const project = projects[index]
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <Navigation />
      <main className="pt-28 lg:pt-32">
        <article>
          <header className="wrap pb-12">
            <Link href="/#projets" className="label inline-flex items-center gap-2 text-ink-soft hover:text-brand">
              <ArrowLeft className="size-4" aria-hidden />
              Tous les projets
            </Link>
            <p className="label mt-10 text-brand">
              Projet {String(index + 1).padStart(2, "0")}
              {project.status ? ` · ${project.status}` : ""}
            </p>
            <h1 className="t-display mt-3">{project.title}</h1>
            <p className="t-title mt-4 max-w-[40rem] text-ink-soft">{project.category}</p>

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={i === 0 ? "btn btn-primary" : "btn btn-outline"}
                  >
                    {link.label}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </header>

          <div className="wrap">
            <ProjectCover
              project={project}
              className="aspect-[16/9] w-full border border-line"
              sizes="(min-width: 1400px) 1300px, 100vw"
              priority
            />
          </div>

          <div className="wrap mt-16 grid gap-14 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-24">
            <div className="lg:col-span-7">
              <h2 className="label text-brand">Contexte</h2>
              <div className="mt-4 max-w-[40rem] space-y-4 text-ink-soft">
                {project.context.map((p, i) => (
                  <p key={i} className={i === 0 ? "t-title text-ink" : undefined}>
                    {p}
                  </p>
                ))}
              </div>

              <h2 className="label mt-14 text-brand">Ce que j’ai construit</h2>
              <ul className="mt-4 border-t border-line">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-line py-4">
                    <span aria-hidden className="mt-[0.8em] block h-px w-3 shrink-0 bg-brand" />
                    <span className="max-w-[38rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="border-t border-ink py-4">
                  <h2 className="label text-ink-faint">Technologies</h2>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tool) => (
                      <li key={tool} className="chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
                {project.status && (
                  <div className="border-t border-line py-4">
                    <h2 className="label text-ink-faint">Statut</h2>
                    <p className="mt-2 font-display font-semibold">{project.status}</p>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {project.nodes && (
            <section aria-label="Architecture" className="on-navy section bg-navy text-navy-text">
              <div className="wrap">
                <p className="label text-mint">Architecture</p>
                <Reveal as="h2" variant="mask" className="t-h2 mt-3 text-[#f2f5fb]">
                  Comment les pièces s’articulent
                </Reveal>

                <ol className="mt-10 grid gap-px border border-navy-line bg-navy-line md:grid-cols-3">
                  {project.nodes.map((node, i) => (
                    <li key={node.title} className="bg-navy">
                      <Reveal delay={i * 0.08} className="h-full p-6">
                        <p className="label text-mint">{node.kicker}</p>
                        <h3 className="t-h3 mt-4 text-[#f2f5fb]">{node.title}</h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed">{node.text}</p>
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {node.tools.map((t) => (
                            <li key={t} className="border border-navy-line px-2 py-1 font-mono text-xs">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </li>
                  ))}
                </ol>

                {project.flow && (
                  <div className="mt-10 max-w-[40rem]">
                    <TypedLog title={project.flow.title} lines={project.flow.lines} />
                  </div>
                )}
              </div>
            </section>
          )}
        </article>

        <nav aria-label="Autres projets" className="border-t border-line">
          <div className="wrap grid sm:grid-cols-2">
            <Link
              href={`/projects/${previous.id}`}
              className="group flex flex-col gap-2 border-b border-line py-10 sm:border-b-0 sm:border-r sm:pr-10"
            >
              <span className="label flex items-center gap-2 text-ink-faint">
                <ArrowLeft className="size-4" aria-hidden />
                Projet précédent
              </span>
              <span className="t-h2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand motion-reduce:transition-none">
                {previous.title}
              </span>
            </Link>
            <Link href={`/projects/${next.id}`} className="group flex flex-col gap-2 py-10 sm:items-end sm:pl-10 sm:text-right">
              <span className="label flex items-center gap-2 text-ink-faint">
                Projet suivant
                <ArrowRight className="size-4" aria-hidden />
              </span>
              <span className="t-h2 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-brand motion-reduce:transition-none">
                {next.title}
              </span>
            </Link>
          </div>
        </nav>
      </main>
      <Footer />
    </>
  )
}
