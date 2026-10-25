import { Reveal } from "@/components/reveal"
import { portfolioData } from "@/lib/portfolio-data"

export function ServicesSection() {
  const { services, process } = portfolioData

  return (
    <section id="services" className="section border-b border-line bg-surface">
      <div className="wrap">
        <div className="max-w-xl">
          <p className="label text-brand">Services</p>
          <Reveal as="h2" variant="mask" className="t-h2 mt-3">
            Ce que je peux faire pour vous
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.id} className="bg-surface">
              <Reveal delay={(i % 2) * 0.08} className="h-full p-6 sm:p-8">
                <p className="label text-ink-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-3 text-[1.3125rem]">{service.title}</h3>
                <p className="mt-2 text-ink-soft">{service.description}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[0.9375rem] text-ink-soft">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] block h-px w-3 shrink-0 bg-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="label text-brand">Ma façon de travailler</h3>
          <ol className="mt-5 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="border-b border-line py-5 sm:pr-6 lg:border-b-0">
                <Reveal delay={i * 0.08}>
                  <p className="label text-ink-faint">Étape {i + 1}</p>
                  <p className="t-h3 mt-2">{step.title}</p>
                  <p className="mt-1 text-ink-soft">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
