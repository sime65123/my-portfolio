import type React from "react"
import type { Metadata, Viewport } from "next"
import "@fontsource-variable/syne"
import "@fontsource-variable/newsreader"
import "@fontsource-variable/newsreader/wght-italic.css"
import "@fontsource-variable/jetbrains-mono"
import { ThemeProvider } from "@/components/theme-provider"
import { portfolioData } from "@/lib/portfolio-data"
import "./globals.css"

const { personal } = portfolioData

const title = `${personal.displayName} | ${personal.title}`

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${personal.displayName}`,
  },
  description: personal.bio,
  keywords: [
    "développeur full-stack",
    "data scientist",
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
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1411" },
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

// Évite de rejouer l'ouverture à chaque visite de la même session.
const introScript = `try{if(sessionStorage.getItem("intro")==="1")document.documentElement.classList.add("intro-skip")}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`[data-rv]{opacity:1!important;transform:none!important;clip-path:none!important}.rise,.photo-reveal{animation:none!important;opacity:1!important;transform:none!important;clip-path:none!important}#intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
