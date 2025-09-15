"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioData } from "@/lib/portfolio-data"

export function HeroSection() {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const texts = [
    portfolioData.personal.title,
    portfolioData.personal.subtitle,
    "Créateur d'expériences digitales",
    "Passionné par l'innovation",
  ]

  React.useEffect(() => {
    const currentText = texts[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting]) // Removed texts from dependencies

  const socialLinks = [
    { icon: Github, href: portfolioData.personal.social.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.personal.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${portfolioData.personal.email}`, label: "Email" },
  ]

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Disponible pour de nouveaux projets
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-4 leading-tight">
                Bonjour, je suis{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {portfolioData.personal.name}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-2xl text-muted-foreground">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {portfolioData.personal.bio}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  Voir mes projets
                  <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group bg-transparent">
                <a href={portfolioData.personal.resume} download>
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Télécharger CV
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center lg:justify-start space-x-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-card hover:bg-accent border border-border rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src={portfolioData.personal.avatar || "/placeholder.svg"}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Défiler vers le bas</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
