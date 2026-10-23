import Link from "next/link"
import { AccessBadge } from "@/components/access-badge"
import { portfolioData } from "@/lib/portfolio-data"

export function HeroSection() {
  const { personal } = portfolioData

  return (
    <section id="accueil" className="relative flex min-h-[100svh] items-center pb-16 pt-28 lg:pt-24">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <h1 className="hero-name t-display">
            <span className="block">Sime</span>
            <span className="block lg:pl-[0.5em]">Mbacob</span>
          </h1>

          <p className="t-lead mt-9 max-w-[36rem]">{personal.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Link href="/#projets" className="btn-signal">
              Voir les projets
            </Link>
            <a href={personal.resume} download className="u-link font-semibold">
              Télécharger le CV
            </a>
          </div>

          <p className="mt-10 flex items-center gap-2.5 text-sm font-semibold">
            <span aria-hidden className="block size-2.5 rounded-full bg-[#1fa463]" />
            Disponible pour de nouveaux projets
          </p>
        </div>

        <AccessBadge />
      </div>
    </section>
  )
}
