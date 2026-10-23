import { IntroGate } from "@/components/intro-gate"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { StackSection } from "@/components/sections/stack-section"
import { ServicesSection } from "@/components/sections/services-section"
import { JourneySection } from "@/components/sections/journey-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <>
      <IntroGate />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <StackSection />
        <ServicesSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
