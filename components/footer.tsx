import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

const navLinks = [
  { href: "/#a-propos", label: "À propos" },
  { href: "/#projets", label: "Projets" },
  { href: "/#competences", label: "Compétences" },
  { href: "/#services", label: "Services" },
  { href: "/#parcours", label: "Parcours" },
  { href: "/#contact", label: "Contact" },
]

export function Footer() {
  const { personal } = portfolioData

  return (
    <footer className="border-t border-line bg-surface-mid">
      <div className="wrap pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-display text-xl font-bold uppercase leading-none tracking-tight">Sime Mbacob</p>
            <p className="label mt-2 text-ink-faint">{personal.shortTitle}</p>
            <p className="mt-5 max-w-[26rem] text-ink-soft">{personal.bio}</p>
            <p className="mt-6 flex items-center gap-2.5">
              <span aria-hidden className="pulse-dot" />
              <span className="label text-brand">Disponible pour de nouveaux projets</span>
            </p>
          </div>

          <nav aria-label="Pied de page" className="lg:col-span-2">
            <h2 className="label text-brand">Navigation</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="u-link text-ink-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label text-brand">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-ink-soft">
              <li>{personal.location}</li>
              <li>
                <a href={`mailto:${personal.email}`} className="u-link break-all">
                  {personal.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="u-link">
                  {personal.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-brand">En ligne</h2>
            <ul className="mt-4 space-y-2.5 text-ink-soft">
              <li>
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="u-link">
                  GitHub
                </a>
              </li>
              <li>
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="u-link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={personal.resume} download className="u-link">
                  Curriculum vitae (PDF)
                </a>
              </li>
            </ul>
            <Link href="/#accueil" className="btn btn-outline mt-7">
              <ArrowUp className="size-4" aria-hidden />
              Haut de page
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {personal.name}
          </p>
          <p>Conçu et développé à Yaoundé</p>
        </div>
      </div>
    </footer>
  )
}
