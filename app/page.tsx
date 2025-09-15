"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { PageTransition } from "@/components/page-transition"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageTransition>
          <main className="pt-16">
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <ServicesSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
        </PageTransition>
        <Footer />
      </div>
    </>
  )
}
