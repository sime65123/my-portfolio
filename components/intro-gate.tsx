"use client"

import * as React from "react"

const nodes = ["Terrain", "Serveur", "Données", "Écran"]

/**
 * Ouverture du site : la chaîne « du capteur à l'écran » se met en route,
 * nœud après nœud, puis le rideau s'ouvre en deux.
 * L'animation est en CSS (voir globals.css) pour démarrer sans attendre React.
 * Ce composant retire le calque à la fin et mémorise que l'ouverture a été vue.
 */
export function IntroGate() {
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains("intro-skip") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true)
      return
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem("intro", "1")
      } catch {}
      setDone(true)
    }, 2850)
    return () => window.clearTimeout(timer)
  }, [])

  if (done) return null

  return (
    <div id="intro" className="on-navy" aria-hidden="true">
      <div className="intro-half intro-top" />
      <div className="intro-half intro-bottom" />

      <div className="intro-content">
        <div className="w-full max-w-[34rem]">
          <p className="intro-name">Sime Mbacob</p>
          <p className="intro-sub label mt-3 text-[#96a2ba]">Développeur full-stack · data</p>

          {/* La chaîne : chaque nœud s'allume quand le trait qui le précède est tracé. */}
          <div className="mt-12 flex items-center" role="presentation">
            {nodes.map((name, i) => (
              <React.Fragment key={name}>
                <div className="relative flex flex-col items-center">
                  <span
                    className="intro-node block"
                    style={{ "--nd": `${0.55 + i * 0.3}s` } as React.CSSProperties}
                  />
                  <span
                    className="intro-node-label label absolute top-6 whitespace-nowrap text-[#96a2ba]"
                    style={{ "--nd": `${0.55 + i * 0.3}s` } as React.CSSProperties}
                  >
                    {name}
                  </span>
                </div>
                {i < nodes.length - 1 && (
                  <span
                    className="intro-line mx-1 flex-1"
                    style={{ "--ld": `${0.58 + i * 0.3}s` } as React.CSSProperties}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-16 space-y-1 font-mono text-[0.8125rem] leading-6 text-[#c3cde0]">
            <p className="intro-log" style={{ "--ld": "0.7s" } as React.CSSProperties}>
              › Ticket présenté
            </p>
            <p className="intro-log" style={{ "--ld": "1.1s" } as React.CSSProperties}>
              › Vérification par le serveur local
            </p>
            <p className="intro-log text-[#b0f1cd]" style={{ "--ld": "1.5s" } as React.CSSProperties}>
              › Accès accordé
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
