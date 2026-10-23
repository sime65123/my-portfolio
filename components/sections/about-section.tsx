import { portfolioData } from "@/lib/portfolio-data"

export function AboutSection() {
  const { about } = portfolioData

  return (
    <section id="profil" className="border-t border-border py-24 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 className="t-h2 lg:col-span-3">Profil</h2>

        <div className="lg:col-span-9">
          <p className="t-statement max-w-[34em]">{about.statement}</p>

          <dl className="mt-16 grid gap-x-12 sm:grid-cols-2">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-4">
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd className="font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
