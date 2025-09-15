"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { portfolioData, type Project } from "@/lib/portfolio-data"

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card">
        <div className="relative overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <Star className="h-3 w-3 mr-1" />
                Projet vedette
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              {project.githubUrl && (
                <Button size="sm" variant="secondary" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Button asChild variant="ghost" className="w-full group/btn">
            <Link href={`/projects/${project.id}`}>
              Voir les détails
              <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [filter, setFilter] = React.useState<"all" | "featured">("all")

  const filteredProjects = React.useMemo(() => {
    if (filter === "featured") {
      return portfolioData.projects.filter((project) => project.featured)
    }
    return portfolioData.projects
  }, [filter])

  const allTags = React.useMemo(() => {
    const tags = new Set<string>()
    portfolioData.projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }, [])

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">Mes Projets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Découvrez une sélection de mes réalisations récentes, alliant créativité et expertise technique.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="min-w-[120px]"
            >
              <Filter className="h-4 w-4 mr-2" />
              Tous ({portfolioData.projects.length})
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
              className="min-w-[120px]"
            >
              <Star className="h-4 w-4 mr-2" />
              Vedettes ({portfolioData.projects.filter((p) => p.featured).length})
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-6">Technologies utilisées</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {allTags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="outline" className="px-3 py-1 hover:bg-accent/10 transition-colors">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">Intéressé par mon travail ?</p>
          <Button asChild size="lg">
            <Link href="/contact">Discutons de votre projet</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
