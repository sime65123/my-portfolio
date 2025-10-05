"use client"
import { motion } from "framer-motion"
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioData } from "@/lib/portfolio-data"

export function EducationSection() {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">Formation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mon parcours académique et les certifications qui ont façonné mes compétences techniques.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

            <div className="space-y-8">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-lg z-10" />

                  {/* Content Card */}
                  <div className="ml-20">
                    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center">
                              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                              {edu.degree}
                            </h3>
                            <p className="text-lg text-primary font-medium mb-2">{edu.institution}</p>
                            <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-8 text-center">
              Certifications & Formations complémentaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Python Associate Certification",
                "SQL Intermediate Certification",
                "JavaScript Advanced",
                "Meilleur Projet de Fin d'Étude 2024(IUT-FV)",
                "Hashgraph Developer Course",
              ].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                      <p className="font-medium text-foreground">{cert}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
