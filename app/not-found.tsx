import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="wrap flex min-h-[80svh] flex-col justify-center py-32">
        <h1 className="t-h2">Page introuvable</h1>
        <p className="t-lead mt-6 max-w-[32rem]">
          Cette adresse ne correspond à aucune page. Le projet a peut-être été renommé ou retiré.
        </p>
        <div className="mt-10">
          <Link href="/#projets" className="btn-signal">
            Voir les projets
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
