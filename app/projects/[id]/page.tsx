"use client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { portfolioData } from "@/lib/portfolio-data"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string

  const project = portfolioData.projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageTransition>
          <main className="pt-16">
            <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Projet non trouvé</h1>
              <p className="text-muted-foreground mb-8">Le projet que vous recherchez n'existe pas.</p>
              <Button asChild>
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux projets
                </Link>
              </Button>
            </div>
          </main>
        </PageTransition>
        <Footer />
      </div>
    )
  }

  const relatedProjects = portfolioData.projects
    .filter((p) => p.id !== project.id && p.tags.some((tag) => project.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Button asChild variant="ghost" className="mb-6">
                  <Link href="/projects">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour aux projets
                  </Link>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
                      {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      {project.githubUrl && (
                        <Button asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Voir le code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button asChild variant="outline">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Voir la démo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Project Details */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">À propos du projet</h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-6">{project.longDescription}</p>

                    <h3 className="text-xl font-bold text-foreground mb-4">Fonctionnalités principales</h3>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li>• Interface utilisateur moderne et responsive</li>
                      <li>• Authentification sécurisée des utilisateurs</li>
                      <li>• Gestion en temps réel des données</li>
                      <li>• Optimisation des performances</li>
                      <li>• Tests automatisés et déploiement continu</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mb-4">Défis techniques</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Ce projet m'a permis d'approfondir mes connaissances en architecture logicielle et d'explorer de
                      nouvelles approches pour optimiser les performances. L'intégration de multiples APIs et la gestion
                      d'état complexe ont été des défis particulièrement enrichissants.
                    </p>
                  </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-4">Informations du projet</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Client</p>
                            <p className="font-medium">Projet personnel</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">2024</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Catégorie</p>
                            <p className="font-medium">Application Web</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-4">Technologies utilisées</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">Projets similaires</h2>
                  <p className="text-muted-foreground">
                    Découvrez d'autres projets utilisant des technologies similaires
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.div
                      key={relatedProject.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                          <Image
                            src={relatedProject.image || "/placeholder.svg"}
                            alt={relatedProject.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-foreground mb-2">{relatedProject.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{relatedProject.description}</p>
                          <Button asChild variant="ghost" size="sm" className="w-full">
                            <Link href={`/projects/${relatedProject.id}`}>Voir le projet</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
