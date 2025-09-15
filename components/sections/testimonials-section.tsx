"use client"
import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { portfolioData } from "@/lib/portfolio-data"
import Image from "next/image"
import { useState, useEffect } from "react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1))
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === portfolioData.testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? portfolioData.testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-foreground mb-4">
            Ce que les gens disent de moi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les retours de mes clients sur notre collaboration et les projets que nous avons réalisés
            ensemble.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {portfolioData.testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-card relative overflow-hidden">
                    <CardContent className="p-8">
                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 opacity-10">
                        <Quote className="h-12 w-12 text-primary" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current mx-1" />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-muted-foreground mb-8 leading-relaxed italic text-center text-lg">
                        "{testimonial.content}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} • {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-8 space-x-2">
            {portfolioData.testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-110"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats - unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "5+", label: "Projets réalisés" },
            { number: "91%", label: "Clients satisfaits" },
            { number: "24h", label: "Temps de réponse moyen" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
