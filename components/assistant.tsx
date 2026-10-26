"use client"

import * as React from "react"
import { ArrowUp, MessageCircle, X } from "lucide-react"

type Msg = { role: "user" | "assistant"; content: string }

const GREETING: Msg = {
  role: "assistant",
  content:
    "Bonjour ! Je suis l’assistant du portfolio. Pose-moi une question sur Sime : ses projets, ses compétences, sa formation, ou comment le contacter.",
}

const SUGGESTIONS = [
  "Qui est Sime ?",
  "Quels projets a-t-il réalisés ?",
  "Quelles technologies utilise-t-il ?",
  "Comment le contacter ?",
]

const MAX_CHARS = 600

/** Rend le texte en rendant cliquables les adresses web, e-mails et pages de projet. */
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+|\/projects\/[a-z-]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return <React.Fragment key={i}>{part}</React.Fragment>
        const clean = part.replace(/[.,;:]+$/, "")
        const tail = part.slice(clean.length)
        const href = clean.includes("@") ? `mailto:${clean}` : clean
        const external = clean.startsWith("http")
        return (
          <React.Fragment key={i}>
            <a
              href={href}
              className="u-link"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {clean}
            </a>
            {tail}
          </React.Fragment>
        )
      })}
    </>
  )
}

export function Assistant() {
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Msg[]>([GREETING])
  const [input, setInput] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const launcherRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, busy, open])

  React.useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const send = async (raw: string) => {
    const text = raw.trim().slice(0, MAX_CHARS)
    if (!text || busy) return
    const next: Msg[] = [...messages, { role: "user", content: text }]
    setMessages(next)
    setInput("")
    setBusy(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // L'accueil n'est pas envoyé : seul l'échange réel compte.
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      })
      const data = await res.json().catch(() => ({}))
      const reply =
        typeof data.reply === "string" && data.reply
          ? data.reply
          : "Je n’ai pas pu répondre. Écris directement à Sime via le formulaire de contact."
      setMessages((m) => [...m, { role: "assistant", content: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connexion impossible pour le moment. Réessaie, ou utilise le formulaire de contact." },
      ])
    } finally {
      setBusy(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void send(input)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void send(input)
    }
  }

  const fresh = messages.length === 1

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="Poser une question"
          className="assistant-in group fixed bottom-4 right-4 z-40 flex h-12 items-center border border-navy-line bg-navy pl-[0.8125rem] pr-[0.8125rem] text-[#f2f5fb] shadow-lg transition-[background-color,padding] duration-300 hover:bg-brand hover:pr-4 focus-visible:bg-brand focus-visible:pr-4 sm:bottom-6 sm:right-6"
        >
          <MessageCircle className="size-[1.375rem] shrink-0" aria-hidden />
          <span
            aria-hidden
            className="label max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-300 group-hover:ml-2.5 group-hover:max-w-[12rem] group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[12rem] group-focus-visible:opacity-100 motion-reduce:transition-none"
          >
            Poser une question
          </span>
        </button>
      )}

      {open && (
        <section
          role="dialog"
          aria-label="Assistant du portfolio"
          className="fixed inset-x-3 bottom-3 z-[60] flex max-h-[min(36rem,calc(100svh-6rem))] flex-col border border-line bg-surface shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-navy-line bg-navy px-4 py-3 text-[#f2f5fb]">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="pulse-dot !bg-mint after:!bg-mint" />
              <div>
                <h2 className="font-display text-sm font-semibold leading-none">Assistant</h2>
                <p className="label mt-1 text-navy-faint">Répond sur Sime et ses projets</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                launcherRef.current?.focus()
              }}
              aria-label="Fermer l’assistant"
              className="grid size-9 place-items-center text-navy-text transition-colors hover:text-mint"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[85%] whitespace-pre-wrap bg-navy px-3.5 py-2.5 text-[0.9375rem] leading-relaxed text-[#f2f5fb]"
                      : "max-w-[90%] whitespace-pre-wrap border border-line bg-surface-low px-3.5 py-2.5 text-[0.9375rem] leading-relaxed text-ink"
                  }
                >
                  {m.role === "assistant" ? <Linkified text={m.content} /> : m.content}
                </p>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start" role="status" aria-label="L’assistant écrit">
                <span className="flex gap-1 border border-line bg-surface-low px-3.5 py-3.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      aria-hidden
                      className="size-1.5 animate-bounce rounded-full bg-ink-faint motion-reduce:animate-none"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            )}

            {fresh && !busy && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => void send(s)} className="chip transition-colors hover:border-brand hover:text-brand">
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-line p-3">
            <label htmlFor="assistant-input" className="sr-only">
              Votre question
            </label>
            <textarea
              id="assistant-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              maxLength={MAX_CHARS}
              rows={1}
              placeholder="Votre question…"
              className="field max-h-28 min-h-11 flex-1 resize-none py-2.5 text-[0.9375rem]"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Envoyer"
              className="btn btn-primary size-11 shrink-0 !p-0"
            >
              <ArrowUp className="size-5" aria-hidden />
            </button>
          </form>
          <p className="border-t border-line px-4 py-2 text-xs text-ink-faint">
            Assistant automatique : pour un devis ou une collaboration, utilise le formulaire de contact.
          </p>
        </section>
      )}
    </>
  )
}
