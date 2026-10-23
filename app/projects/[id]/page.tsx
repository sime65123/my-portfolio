import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectCover } from "@/components/project-cover"
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
          <header className="wrap">
            <Link href="/#projets" className="u-link inline-flex items-center gap-2 text-sm font-semibold">
              <ArrowLeft className="size-4" aria-hidden />
              Tous les projets
            </Link>

            <h1
              className="mt-10 text-[clamp(3rem,11vw,9.5rem)] font-black leading-[0.88] tracking-tight"
              style={{ fontStretch: "100%" }}
            >
              {project.title}
            </h1>
            <p className="t-lead mt-6 max-w-[40rem]">{project.category}</p>
          </header>

          <div className="wrap mt-12">
            <ProjectCover
              project={project}
              className="aspect-[16/9] w-full border-2 border-foreground"
              sizes="(min-width: 1400px) 1300px, 100vw"
              priority
            />
          </div>

          <div className="wrap mt-16 grid gap-14 pb-24 lg:grid-cols-12 lg:gap-12 lg:pb-32">
            <div className="lg:col-span-7">
              <h2 className="t-h3">Contexte</h2>
              <p className="mt-5 max-w-[60ch] text-lg leading-relaxed">{project.context}</p>

              <h2 className="t-h3 mt-14">Ce que j’ai construit</h2>
              <ul className="mt-5 border-b border-border">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-border py-4">
                    <span aria-hidden className="mt-2.5 block size-2 shrink-0 bg-signal" />
                    <span className="max-w-[56ch]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                {project.status && (
                  <div className="border-t-2 border-foreground py-4">
                    <h2 className="text-sm text-muted-foreground">Statut</h2>
                    <p className="mt-1 font-semibold">{project.status}</p>
                  </div>
                )}

                <div className="border-t-2 border-foreground py-4">
                  <h2 className="text-sm text-muted-foreground">Technologies</h2>
                  <ul className="mt-2 space-y-1 font-semibold">
                    {project.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>

                {project.links.length > 0 && (
                  <div className="border-t-2 border-foreground py-4">
                    <h2 className="text-sm text-muted-foreground">Liens</h2>
                    <ul className="mt-2 space-y-2 font-semibold">
                      {project.links.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="u-link">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </article>

        <nav aria-label="Autres projets" className="border-t border-border">
          <div className="wrap grid sm:grid-cols-2">
            <Link
              href={`/projects/${previous.id}`}
              className="group flex flex-col gap-2 border-b border-border py-10 sm:border-b-0 sm:border-r sm:pr-10"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowLeft className="size-4" aria-hidden />
                Projet précédent
              </span>
              <span
                className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none"
                style={{ fontStretch: "82%" }}
              >
                {previous.title}
              </span>
            </Link>
            <Link href={`/projects/${next.id}`} className="group flex flex-col gap-2 py-10 sm:items-end sm:pl-10 sm:text-right">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                Projet suivant
                <ArrowRight className="size-4" aria-hidden />
              </span>
              <span
                className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none transition-transform duration-300 group-hover:-translate-x-2 motion-reduce:transition-none"
                style={{ fontStretch: "82%" }}
              >
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
