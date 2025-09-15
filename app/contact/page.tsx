"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { ContactSection } from "@/components/sections/contact-section"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
        <main className="pt-16">
          <ContactSection />
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
