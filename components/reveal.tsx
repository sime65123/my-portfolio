"use client"

import * as React from "react"

type Variant = "rise" | "mask" | "line"

/**
 * Révèle son contenu quand il entre dans l'écran (une seule fois).
 * - rise : léger glissement vers le haut avec fondu
 * - mask : le texte se dévoile de haut en bas, comme derrière un cache
 * - line : un filet se dessine de gauche à droite
 * Les styles sont dans globals.css ; sans JavaScript ou avec « réduire les animations », tout est visible.
 */
export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className,
  children,
}: {
  as?: React.ElementType
  variant?: Variant
  delay?: number
  className?: string
  children?: React.ReactNode
}) {
  const ref = React.useRef<HTMLElement>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    // Un élément entièrement rogné (clip-path) n'est jamais « visible » pour l'observateur : on observe son parent.
    io.observe(variant === "mask" && el.parentElement ? el.parentElement : el)
    return () => io.disconnect()
  }, [variant])

  return (
    <Tag
      ref={ref}
      data-rv={variant}
      data-in={inView}
      className={className}
      style={delay ? ({ "--rv-d": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
