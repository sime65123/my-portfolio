import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"

const palette: Record<Project["cover"], string> = {
  green: "bg-awning text-signal",
  yellow: "bg-signal text-ink",
  ink: "bg-ink text-signal",
  red: "bg-barrier text-white",
}

/**
 * Visuel d'un projet : la capture d'écran si elle existe,
 * sinon une couverture typographique (le nom du projet en grand).
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
      <div className={cn("relative overflow-hidden bg-card", className)}>
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
  // Taille en unités de conteneur : le plus long mot occupe ~90 % de la largeur.
  const size = Math.min(26, 90 / (longest * 0.84))

  return (
    <div
      role="img"
      aria-label={`Couverture du projet ${project.title}`}
      className={cn("relative overflow-hidden", palette[project.cover], className)}
      style={{ containerType: "inline-size" }}
    >
      <div className="absolute inset-0 flex items-end" style={{ padding: "5cqw" }}>
        <p
          aria-hidden
          className="font-black leading-[0.86] tracking-tight"
          style={{ fontStretch: "118%", fontSize: `${size}cqw` }}
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
