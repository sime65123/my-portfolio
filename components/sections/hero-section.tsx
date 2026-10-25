import Image from "next/image"
import Link from "next/link"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties

export function HeroSection() {
  const { personal, hero } = portfolioData

  const socials = [
    { icon: Github, href: personal.social.github, label: "GitHub" },
    { icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${personal.email}`, label: "E-mail" },
  ]

  return (
    <section id="accueil" className="border-b border-line bg-surface">
      <div className="wrap pb-14 pt-32 lg:pb-20 lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="rise label text-brand" style={d(0)}>
              {personal.location}
            </p>
            <h1 className="rise t-display mt-4" style={d(0.08)}>
              {personal.displayName}
            </h1>
            <p className="rise mt-4 font-display text-xl font-semibold tracking-tight sm:text-2xl" style={d(0.16)}>
              {personal.title}
            </p>

            <p className="rise t-lead mt-7 max-w-[35rem] text-ink-soft" style={d(0.24)}>
              {personal.bio}
            </p>
            <p className="rise mt-4 max-w-[35rem] text-ink-soft" style={d(0.3)}>
              {personal.bioMore}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={d(0.38)}>
              <Link href="/#projets" className="btn btn-primary">
                Voir mes projets
              </Link>
              <a href={personal.resume} download className="btn btn-outline">
                <Download className="size-4" aria-hidden />
                Télécharger mon CV
              </a>
            </div>

            <ul className="rise mt-7 flex items-center gap-2" style={d(0.44)}>
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="grid size-11 place-items-center border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:mr-0">
              <div className="relative">
              {/* Repères de coupe aux quatre coins, comme sur une planche technique. */}
              <span aria-hidden className="absolute -left-2 -top-2 size-5 border-l border-t border-ink-faint" />
              <span aria-hidden className="absolute -right-2 -top-2 size-5 border-r border-t border-ink-faint" />
              <span aria-hidden className="absolute -bottom-2 -left-2 size-5 border-b border-l border-ink-faint" />
              <span aria-hidden className="absolute -bottom-2 -right-2 size-5 border-b border-r border-ink-faint" />

              <div className="photo-reveal relative aspect-[4/5] overflow-hidden bg-brand" style={d(0.1)}>
                <Image
                  src={personal.photo}
                  alt={`Portrait de ${personal.displayName}`}
                  fill
                  sizes="(min-width: 1024px) 26rem, 90vw"
                  priority
                  className="object-cover"
                />
              </div>
              </div>
              <figcaption className="rise mt-4 flex items-center gap-2.5" style={d(0.5)}>
                <span aria-hidden className="pulse-dot" />
                <span className="label text-ink-soft">Disponible pour de nouveaux projets</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <dl
          className="rise mt-16 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          style={d(0.55)}
        >
          {hero.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label text-ink-faint">{fact.label}</dt>
              <dd className="mt-1.5 font-display font-semibold leading-snug">{fact.value}</dd>
              {"note" in fact && fact.note && <dd className="mt-0.5 text-sm text-ink-soft">{fact.note}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
