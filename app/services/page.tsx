"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { ServicesSection } from "@/components/sections/services-section"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          <ServicesSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
