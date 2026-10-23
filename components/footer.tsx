import Link from "next/link"
import { portfolioData } from "@/lib/portfolio-data"

export function Footer() {
  const { personal } = portfolioData

  return (
    <footer className="relative overflow-hidden bg-finale text-[#eaf0e6]">
      <div aria-hidden className="stripes h-2.5 w-full" />

      <div className="wrap flex flex-col gap-4 pb-6 pt-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personal.name}
        </p>
        <Link href="/#accueil" className="u-link font-semibold">
          Retour en haut
        </Link>
      </div>

      {/* Signature : décorative, coupée par le bas de page. */}
      <p
        aria-hidden
        className="wrap select-none whitespace-nowrap pb-3 text-[clamp(2rem,11vw,16rem)] font-black leading-[0.9] tracking-tighter text-signal/90"
        style={{ fontStretch: "118%" }}
      >
        Sime Mbacob
      </p>
    </footer>
  )
}
