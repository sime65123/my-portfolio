"use client"

import * as React from "react"

/**
 * Ouverture du site : un ticket est validé, la barrière se lève, le rideau monte.
 * L'animation est en CSS (voir globals.css) pour démarrer sans attendre React.
 * Ce composant ne fait que retirer le calque une fois l'animation terminée
 * et mémoriser, pour la session, qu'elle a été vue.
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
    }, 2600)
    return () => window.clearTimeout(timer)
  }, [])

  if (done) return null

  return (
    <div id="intro" aria-hidden="true">
      <div className="flex w-full max-w-[36rem] flex-col items-center px-6">
        {/* Portique : poteau à gauche, lisse rouge et blanc qui pivote, appui à droite. */}
        <div className="relative h-40 w-full">
          <div className="absolute bottom-0 left-0 h-32 w-14 rounded-[3px] bg-signal">
            <div className="absolute inset-x-2.5 top-3 grid h-9 place-items-center rounded-[2px] bg-ink">
              <span className="gate-led block size-3.5 rounded-full" />
            </div>
          </div>
          <div
            className="gate-pole stripes absolute top-[34px] h-[18px] rounded-[2px]"
            style={{ left: "3.25rem", right: "1.25rem" }}
          />
          <div className="absolute bottom-0 right-0 h-16 w-4 rounded-[2px] bg-[#9aa89f]" />
        </div>

        <div className="relative mt-10 h-6 w-full text-center text-sm font-semibold text-[#e6ebe3]">
          <span className="gate-text-a absolute inset-x-0">Vérification du ticket</span>
          <span className="gate-text-b absolute inset-x-0 text-signal">Ticket valide</span>
        </div>
      </div>
    </div>
  )
}
