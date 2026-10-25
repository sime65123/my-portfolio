import { Reveal } from "@/components/reveal"
import { portfolioData } from "@/lib/portfolio-data"

export function JourneySection() {
  const { education, distinction, certifications } = portfolioData

  return (
    <section id="parcours" className="section border-b border-line bg-surface-low">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="label text-brand">Parcours</p>
          <Reveal as="h2" variant="mask" className="t-h2 mt-3">
            Formation et distinctions
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <ol className="border-t border-line">
            {education.map((item, i) => (
              <li key={item.id} className="border-b border-line">
                <Reveal delay={i * 0.06} className="grid gap-1 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="label flex items-center gap-2 pt-1 text-ink-faint">
                    {item.current && <span aria-hidden className="pulse-dot" />}
                    <span className={item.current ? "text-brand" : undefined}>{item.period}</span>
                  </p>
                  <div>
                    <h3 className="t-h3">{item.degree}</h3>
                    <p className="mt-1 text-ink-soft">
                      {item.institution}, {item.location}
                    </p>
                    <p className="mt-2 text-[0.9375rem] text-ink-soft">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10 border border-brand bg-brand-tint p-5 dark:bg-transparent">
            <p className="label text-brand">Distinction</p>
            <p className="t-h3 mt-2">{distinction}</p>
          </Reveal>

          <div className="mt-10">
            <h3 className="label text-brand">Certifications</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c.name} className="chip text-sm">
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
