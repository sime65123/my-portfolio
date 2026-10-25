/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Le portfolio est désormais une seule page : les anciennes adresses
  // (partagées sur le CV, LinkedIn, etc.) pointent vers la bonne section.
  async redirects() {
    return [
      { source: "/about", destination: "/#a-propos", permanent: true },
      { source: "/education", destination: "/#parcours", permanent: true },
      { source: "/skills", destination: "/#competences", permanent: true },
      { source: "/projects", destination: "/#projets", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/testimonials", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
