"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download, MapPin, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioData } from "@/lib/portfolio-data"

const stats = [
  { label: "Projets réalisés", value: "11+", icon: Award },
  { label: "Années d'expérience", value: "2+", icon: Calendar },
  { label: "Technologies maîtrisées", value: "7+", icon: Award },
  { label: "Clients satisfaits", value: "10+", icon: Award },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">À propos de moi</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez mon parcours, mes passions et ce qui me motive dans le développement web moderne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={portfolioData.personal.avatar || "/placeholder.svg"}
                  alt={`${portfolioData.personal.name} - À propos`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Passionné par l'innovation technologique
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Avec plus de 2 années d'expérience dans le développement web, je me spécialise dans la création
                  d'applications modernes et performantes. Mon expertise couvre l'ensemble de la stack technologique, du
                  front-end au back-end.
                </p>
                <p>
                  Je suis particulièrement passionné par React.js, Next.js et les technologies émergentes qui permettent
                  de créer des expériences utilisateur exceptionnelles. Mon approche combine créativité, performance
                  technique et attention aux détails.
                </p>
                <p>
                  Toujours en quête d'apprentissage, je reste à l'affût des dernières tendances et meilleures pratiques
                  pour offrir des solutions innovantes et durables à mes clients.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Disponible</span>
              </div>
            </div>

            <Button asChild className="group">
              <a href={portfolioData.personal.resume} download>
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Télécharger mon CV
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
