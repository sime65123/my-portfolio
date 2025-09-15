"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { EducationSection } from "@/components/sections/education-section"

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          <EducationSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
