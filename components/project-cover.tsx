import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"

const palette: Record<Project["cover"], string> = {
  navy: "bg-navy-deep text-mint",
  green: "bg-brand text-surface dark:text-[#0e1411]",
  paper: "bg-surface-high text-ink",
}

/**
 * Visuel d'un projet : la capture d'écran si elle existe,
 * sinon une couverture typographique sur fond quadrillé.
 */
export function ProjectCover({
  project,
  className,
  sizes,
  priority,
}: {
  project: Project
  className?: string
  sizes?: string
  priority?: boolean
}) {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-mid", className)}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    )
  }

  const words = project.title.split(" ")
  const longest = Math.max(...words.map((w) => w.length))
  // Unités de conteneur : le plus long mot occupe environ 80 % de la largeur.
  const size = Math.min(14, 80 / (longest * 0.74))

  return (
    <div
      role="img"
      aria-label={`Couverture du projet ${project.title}`}
      className={cn("relative overflow-hidden", palette[project.cover], className)}
      style={{ containerType: "inline-size" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "6cqw 6cqw",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: "6cqw" }}>
        <p
          aria-hidden
          className="font-display font-bold uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: `${size}cqw` }}
        >
          {words.map((w, i) => (
            <span key={i} className="block">
              {w}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
