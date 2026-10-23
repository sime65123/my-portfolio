"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

type Status = "idle" | "sending" | "success" | "error"

export function ContactSection() {
  const { personal } = portfolioData
  const [status, setStatus] = React.useState<Status>("idle")
  const [copied, setCopied] = React.useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus("sending")

    try {
      // FormSubmit.co : envoie le message par e-mail, sans serveur à maintenir.
      const res = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _replyto: data.get("email"),
          _honey: data.get("_honey"),
          _subject: "Nouveau message depuis le portfolio",
          _template: "table",
          _captcha: "false",
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || String(json.success) === "false") throw new Error("send failed")
      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="bg-finale py-24 text-[#eaf0e6] lg:py-32" style={{ ["--btn-shadow" as string]: "#eaf0e6" }}>
      <div className="wrap">
        <h2 className="t-h2 text-signal">Parlons de votre projet</h2>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={`mailto:${personal.email}`}
            className="u-link break-all text-[clamp(1.5rem,4.2vw,3.5rem)] font-extrabold leading-tight tracking-tight"
            style={{ fontStretch: "88%" }}
          >
            {personal.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 border-2 border-[#eaf0e6]/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-signal hover:text-signal"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            <span aria-live="polite">{copied ? "Adresse copiée" : "Copier l’adresse"}</span>
          </button>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <dl className="space-y-6 lg:col-span-4">
            <div>
              <dt className="text-sm text-[#eaf0e6]/60">Téléphone</dt>
              <dd className="mt-1 text-lg font-semibold">
                <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="u-link">
                  {personal.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-[#eaf0e6]/60">Localisation</dt>
              <dd className="mt-1 text-lg font-semibold">{personal.location}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#eaf0e6]/60">En ligne</dt>
              <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-lg font-semibold">
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="u-link">
                  GitHub
                </a>
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="u-link">
                  LinkedIn
                </a>
                <a href={personal.resume} download className="u-link">
                  CV
                </a>
              </dd>
            </div>
          </dl>

          <form onSubmit={onSubmit} className="space-y-8 lg:col-span-8" aria-describedby="form-status">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold">
                  Nom
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold">
                  Adresse e-mail
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className="field" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-semibold">
                Votre projet
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Le besoin, le contexte, le délai souhaité…"
                className="field resize-y"
              />
            </div>

            {/* Piège à robots : invisible pour les humains. */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="submit" disabled={status === "sending"} className="btn-signal">
                {status === "sending" ? "Envoi en cours" : "Envoyer le message"}
              </button>

              <p id="form-status" role="status" className="text-sm font-semibold">
                {status === "success" && (
                  <span className="text-signal">Message envoyé. Je vous réponds par e-mail.</span>
                )}
                {status === "error" && (
                  <span>
                    Le message n’a pas pu partir. Écrivez-moi directement à{" "}
                    <a href={`mailto:${personal.email}`} className="u-link">
                      {personal.email}
                    </a>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
