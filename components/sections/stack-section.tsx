import { Reveal } from "@/components/reveal"
import { portfolioData } from "@/lib/portfolio-data"

export function StackSection() {
  const { stack } = portfolioData

  return (
    <section id="competences" className="section on-navy bg-navy text-navy-text">
      <div className="wrap">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="label text-mint">Compétences</p>
            <Reveal as="h2" variant="mask" className="t-h2 mt-3 text-[#f2f5fb]">
              Mes outils au quotidien
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <p>
              De l’interface à la base de données, les technologies que j’utilise pour construire une application complète.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-px border border-navy-line bg-navy-line sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((stage, i) => (
            <li key={stage.id} className="bg-navy">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="label text-mint">{stage.kicker}</span>
                  <span className="label text-navy-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="t-h3 mt-5 text-[1.375rem] text-[#f2f5fb]">{stage.name}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed">{stage.note}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {stage.tools.map((tool) => (
                    <li
                      key={tool}
                      className="border border-navy-line px-2 py-1 font-mono text-xs text-navy-text"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
