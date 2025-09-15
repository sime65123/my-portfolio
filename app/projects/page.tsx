"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { ProjectsSection } from "@/components/sections/projects-section"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          <ProjectsSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
