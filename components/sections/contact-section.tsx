"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Reveal } from "@/components/reveal"
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
    <section id="contact" className="section bg-surface">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="label text-brand">Contact</p>
            <Reveal as="h2" variant="mask" className="t-h2 mt-3">
              Parlons de votre projet
            </Reveal>
            <p className="mt-4 max-w-[28rem] text-ink-soft">
              Un besoin, une idée, une collaboration ? Décrivez-moi le contexte, je réponds par e-mail.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${personal.email}`} className="u-link break-all font-display text-lg font-semibold">
                {personal.email}
              </a>
              <button type="button" onClick={copyEmail} className="btn btn-outline min-h-0 px-3 py-1.5">
                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                <span aria-live="polite">{copied ? "Adresse copiée" : "Copier l’adresse"}</span>
              </button>
            </div>

            <dl className="mt-8 space-y-5 border-t border-line pt-6">
              <div>
                <dt className="label text-ink-faint">Téléphone</dt>
                <dd className="mt-1">
                  <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="u-link">
                    {personal.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-ink-faint">Localisation</dt>
                <dd className="mt-1">{personal.location}</dd>
              </div>
              <div>
                <dt className="label text-ink-faint">En ligne</dt>
                <dd className="mt-1 flex flex-wrap gap-x-5">
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
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6 border border-line bg-surface-low p-6 sm:p-8 lg:col-span-7"
            aria-describedby="form-status"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="label text-ink-soft">
                  Nom
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" className="field mt-2" />
              </div>
              <div>
                <label htmlFor="email" className="label text-ink-soft">
                  Adresse e-mail
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className="field mt-2" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="label text-ink-soft">
                Votre projet
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Le besoin, le contexte, le délai souhaité…"
                className="field mt-2 resize-y"
              />
            </div>

            {/* Piège à robots : invisible pour les humains. */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary">
                {status === "sending" ? "Envoi en cours" : "Envoyer le message"}
              </button>

              <p id="form-status" role="status" className="text-sm">
                {status === "success" && <span className="font-semibold text-brand">Message envoyé. Je vous réponds par e-mail.</span>}
                {status === "error" && (
                  <span className="text-danger">
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
