"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioData } from "@/lib/portfolio-data"

const socialLinks = [
  { name: "GitHub", icon: Github, href: portfolioData.personal.social.github },
  { name: "LinkedIn", icon: Linkedin, href: portfolioData.personal.social.linkedin },
  { name: "Twitter", icon: Twitter, href: portfolioData.personal.social.twitter },
]

const quickLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
  { name: "Projets", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">VN</span>
              </div>
              <span className="font-playfair font-bold text-xl text-foreground">{portfolioData.personal.name}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">{portfolioData.personal.bio}</p>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-primary transition-colors">
                  {portfolioData.personal.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${portfolioData.personal.phone}`} className="hover:text-primary transition-colors">
                  {portfolioData.personal.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{portfolioData.personal.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Suivez-moi</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground mb-4 sm:mb-0"
          >
            © {new Date().getFullYear()} {portfolioData.personal.name}. Tous droits réservés.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Retour en haut
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
