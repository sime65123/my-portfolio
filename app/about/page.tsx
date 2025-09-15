"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { AboutSection } from "@/components/sections/about-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          <AboutSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
