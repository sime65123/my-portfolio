"use client"
import { motion } from "framer-motion"
import { Code, Palette, Users, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioData } from "@/lib/portfolio-data"
import Link from "next/link"

const iconMap = {
  Code,
  Palette,
  Users,
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">Mes Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Je propose des solutions complètes pour donner vie à vos projets digitaux, de la conception au déploiement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {portfolioData.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-playfair group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <Button variant="ghost" className="group/btn w-full">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-playfair font-bold text-foreground mb-8">Mon processus de travail</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Analyse", description: "Compréhension de vos besoins et objectifs" },
              { step: "02", title: "Conception", description: "Création des maquettes et prototypes" },
              { step: "03", title: "Développement", description: "Codage et intégration des fonctionnalités" },
              { step: "04", title: "Livraison", description: "Tests, déploiement et formation" },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                    {process.step}
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{process.title}</h4>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30" />
                )}
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
          <p className="text-muted-foreground mb-6">Prêt à démarrer votre projet ?</p>
          <Button asChild size="lg">
            <Link href="/contact">Demander un devis gratuit</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
