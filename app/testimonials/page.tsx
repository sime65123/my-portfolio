"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Button variant="ghost" asChild className="mb-6">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
              <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">Témoignages</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Découvrez les retours de mes clients sur notre collaboration et les projets que nous avons réalisés
                ensemble.
              </p>
            </motion.div>
          </div>
          <TestimonialsSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
