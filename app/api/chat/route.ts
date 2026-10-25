import { localAnswer, systemPrompt } from "@/lib/assistant-knowledge"

/**
 * Assistant du portfolio.
 *
 * Choix du moteur, selon les variables d'environnement :
 *  1. ANTHROPIC_API_KEY             → API Anthropic (Claude)
 *  2. CHAT_API_KEY (+ CHAT_API_URL, CHAT_MODEL) → toute API compatible OpenAI (Groq, OpenRouter, Gemini…)
 *  3. aucune clé                    → réponses locales par mots-clés (gratuit, sans service externe)
 *
 * La clé reste côté serveur : elle n'est jamais envoyée au navigateur.
 */

export const runtime = "edge"

type Msg = { role: "user" | "assistant"; content: string }

const MAX_MESSAGES = 10
const MAX_CHARS = 600
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 20

// Limite simple par adresse IP (mémoire de l'instance : suffit à décourager les abus ordinaires).
const hits = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
  }
  return recent.length > MAX_PER_WINDOW
}

function clean(input: unknown): Msg[] | null {
  if (!Array.isArray(input)) return null
  const out: Msg[] = []
  for (const m of input.slice(-MAX_MESSAGES)) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return null
    const content = m.content.trim().slice(0, MAX_CHARS)
    if (content) out.push({ role: m.role, content })
  }
  // La conversation doit se terminer par une question du visiteur.
  while (out.length && out[0].role !== "user") out.shift()
  return out.length && out[out.length - 1].role === "user" ? out : null
}

async function askAnthropic(messages: Msg[]) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL || "claude-haiku-4-5",
      max_tokens: 500,
      system: systemPrompt,
      messages,
    }),
  })
  if (!res.ok) throw new Error(`anthropic ${res.status}`)
  const data = await res.json()
  const text = data?.content?.find((c: { type: string }) => c.type === "text")?.text
  if (typeof text !== "string" || !text.trim()) throw new Error("empty")
  return text.trim()
}

async function askOpenAICompatible(messages: Msg[]) {
  const base = (process.env.CHAT_API_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "")
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.CHAT_API_KEY}` },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL || "llama-3.3-70b-versatile",
      max_tokens: 500,
      temperature: 0.4,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  })
  if (!res.ok) throw new Error(`compat ${res.status}`)
  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (typeof text !== "string" || !text.trim()) throw new Error("empty")
  return text.trim()
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("cf-connecting-ip") || "anon"
  if (limited(ip)) {
    return Response.json(
      { reply: "Tu as posé beaucoup de questions d’un coup. Réessaie dans quelques minutes, ou écris directement à Sime." },
      { status: 429 },
    )
  }

  let body: { messages?: unknown }
  try {
    body = await req.json()
  } catch {
    return Response.json({ reply: "Requête invalide." }, { status: 400 })
  }

  const messages = clean(body.messages)
  if (!messages) return Response.json({ reply: "Pose-moi une question sur Sime." }, { status: 400 })

  try {
    let reply: string
    if (process.env.ANTHROPIC_API_KEY) reply = await askAnthropic(messages)
    else if (process.env.CHAT_API_KEY) reply = await askOpenAICompatible(messages)
    else reply = localAnswer(messages[messages.length - 1].content)
    return Response.json({ reply })
  } catch {
    // Service d'IA indisponible : on répond quand même avec les informations du site.
    return Response.json({ reply: localAnswer(messages[messages.length - 1].content) })
  }
}
