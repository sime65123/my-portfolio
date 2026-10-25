import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { portfolioData } from "@/lib/portfolio-data"

export function AboutSection() {
  const { about, personal } = portfolioData

  return (
    <section id="a-propos" className="section border-b border-line bg-surface-low">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="label text-brand">À propos</p>
          <Reveal as="h2" variant="mask" className="t-h2 mt-3">
            Je construis de la donnée au capteur
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal className="space-y-5">
            <p className="t-title max-w-[40rem] text-ink">{about.paragraphs[0]}</p>
            <p className="max-w-[40rem] text-ink-soft">{about.paragraphs[1]}</p>
          </Reveal>

          <Reveal className="mt-8">
            <a href={personal.resume} download className="btn btn-primary">
              <Download className="size-4" aria-hidden />
              Télécharger mon CV
            </a>
          </Reveal>

          <ul className="mt-14 grid border-t border-line sm:grid-cols-3">
            {about.focus.map((item, i) => (
              <li key={item.title} className="border-b border-line sm:border-b-0 sm:[&:not(:first-child)]:border-l">
                <Reveal delay={i * 0.08} className="h-full">
                  <Link
                    href={`/projects/${item.project}`}
                    className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-surface-mid"
                  >
                    <div>
                      <h3 className="t-h3">{item.title}</h3>
                      <p className="mt-2 text-ink-soft">{item.text}</p>
                    </div>
                    <span className="label flex items-center gap-1.5 text-brand">
                      Voir le projet
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
