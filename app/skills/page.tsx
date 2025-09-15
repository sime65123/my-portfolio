"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { SkillsSection } from "@/components/sections/skills-section"

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          <SkillsSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
