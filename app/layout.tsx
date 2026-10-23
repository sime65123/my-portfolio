import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { portfolioData } from "@/lib/portfolio-data"
import "./globals.css"

// Archivo variable (poids 100–900, largeur 62–125 %), auto-hébergée :
// aucune requête externe, donc rapide même sur une connexion lente.
const archivo = localFont({
  src: "./fonts/archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
})

const { personal } = portfolioData

const title = `${personal.displayName} | Développeur full-stack et data`

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${personal.displayName}`,
  },
  description: personal.bio,
  keywords: [
    "développeur full-stack",
    "data",
    "Next.js",
    "Django",
    "Flutter",
    "Arduino",
    "ESP32",
    "Yaoundé",
    "Cameroun",
    "portfolio",
  ],
  authors: [{ name: personal.name, url: personal.social.github }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title,
    description: personal.bio,
    siteName: personal.displayName,
  },
  twitter: {
    card: "summary",
    title,
    description: personal.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e4e6e0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1a13" },
  ],
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  alternateName: personal.displayName,
  jobTitle: personal.title,
  email: `mailto:${personal.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yaoundé",
    addressCountry: "CM",
  },
  sameAs: [personal.social.github, personal.social.linkedin],
}

// Évite de rejouer l'ouverture (barrière) à chaque visite de la même session.
const introScript = `try{if(sessionStorage.getItem("intro")==="1")document.documentElement.classList.add("intro-skip")}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className={`${archivo.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
      </body>
    </html>
  )
}
