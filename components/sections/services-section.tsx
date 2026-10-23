"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { portfolioData } from "@/lib/portfolio-data"

export function ServicesSection() {
  const { services, process } = portfolioData
  const [openId, setOpenId] = React.useState<string | null>(services[0].id)

  return (
    <section id="services" className="border-t border-border py-24 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <h2 className="t-h2">Services</h2>
        </div>

        <div className="lg:col-span-9">
          <ul className="border-b border-border">
            {services.map((service) => {
              const open = openId === service.id
              return (
                <li key={service.id} className="border-t border-border">
                  <h3>
                    <button
                      type="button"
                      id={`service-${service.id}`}
                      aria-expanded={open}
                      aria-controls={`panel-${service.id}`}
                      onClick={() => setOpenId(open ? null : service.id)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="t-h3">{service.title}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "relative block size-5 shrink-0 transition-transform duration-300",
                          open && "rotate-45",
                        )}
                      >
                        <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-foreground" />
                        <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-foreground" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`panel-${service.id}`}
                    role="region"
                    aria-labelledby={`service-${service.id}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden" inert={!open}>
                      <div className="grid gap-8 pb-8 md:grid-cols-2">
                        <p className="max-w-[30ch] text-lg leading-snug">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="border-l-2 border-signal pl-3">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link href="/#contact" className="u-link mb-8 inline-block font-bold">
                        Parler de ce besoin
                      </Link>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Méthode : ici l'ordre compte, donc les étapes sont numérotées. */}
          <div className="mt-20">
            <h3 className="t-h3">Comment je travaille</h3>
            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, i) => (
                <li key={step.title} className="border-t-2 border-foreground pt-4">
                  <span className="block text-4xl font-black leading-none" style={{ fontStretch: "78%" }}>
                    {i + 1}
                  </span>
                  <p className="mt-3 font-bold">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
