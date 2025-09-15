import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CursorFollower } from "@/components/cursor-follower"
import { FloatingElements } from "@/components/floating-elements"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Portfolio Professionnel | Développeur Full-Stack",
  description:
    "Portfolio moderne et responsive d'un développeur full-stack spécialisé en React.js, Next.js et technologies web modernes.",
  keywords: ["développeur", "portfolio", "React", "Next.js", "full-stack", "web development"],
  authors: [{ name: "Votre Nom" }],
  creator: "Votre Nom",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://votre-portfolio.vercel.app",
    title: "Portfolio Professionnel | Développeur Full-Stack",
    description:
      "Portfolio moderne et responsive d'un développeur full-stack spécialisé en React.js, Next.js et technologies web modernes.",
    siteName: "Portfolio Professionnel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Professionnel | Développeur Full-Stack",
    description:
      "Portfolio moderne et responsive d'un développeur full-stack spécialisé en React.js, Next.js et technologies web modernes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${inter.variable} ${playfair.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
            <FloatingElements />
            <CursorFollower />
            {children}
            <ScrollToTop />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
