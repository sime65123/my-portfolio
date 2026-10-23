import { portfolioData } from "@/lib/portfolio-data"

export function JourneySection() {
  const { education, distinction, certifications } = portfolioData

  return (
    <section id="parcours" className="border-t border-border py-24 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2 className="t-h2 lg:col-span-3">Parcours</h2>

        <div className="lg:col-span-9">
          {/* Formation : du plus récent au plus ancien. */}
          <ol className="border-b border-border">
            {education.map((item) => (
              <li key={item.id} className="grid gap-3 border-t border-border py-8 lg:grid-cols-[15rem_1fr] lg:gap-10">
                <p
                  className="flex items-center gap-2.5 text-2xl font-black leading-none"
                  style={{ fontStretch: "78%" }}
                >
                  {item.current && <span aria-hidden className="block size-3 bg-signal" />}
                  {item.period}
                </p>
                <div>
                  <h3 className="text-xl font-bold leading-snug">{item.degree}</h3>
                  <p className="mt-1 font-semibold text-primary">
                    {item.institution}, {item.location}
                  </p>
                  <p className="mt-2 max-w-[44ch] text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 lg:grid-cols-[15rem_1fr] lg:gap-10">
            <h3 className="t-h3">Certifications</h3>
            <ul className="border-b border-border">
              <li className="flex items-start gap-3 border-t border-border py-4 font-bold">
                <span aria-hidden className="mt-2 block size-2.5 shrink-0 bg-signal" />
                {distinction}
              </li>
              {certifications.map((cert) => (
                <li key={cert} className="border-t border-border py-4 font-semibold">
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
