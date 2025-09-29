export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  description: string
  location: string
}

export interface Skill {
  name: string
  level: number
  category: "frontend" | "backend" | "tools" | "other"
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

// Adding testimonial interface
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export const portfolioData = {
  personal: {
    name: "SIME MBACOB Appolos Noel",
    title: "Développeur Full-Stack | Data Scientist",
    subtitle: "Spécialisé en React.js & Next.js | Python",
    bio: "Développeur web/mobile et data scientist, je crée des applications innovantes et des modèles prédictifs qui transforment les données en valeur ajoutée.",
    email: "simembacob@gmail.com",
    phone: "+237 6 50 19 26 42",
    location: "Yaounde, Cameroun",
    avatar: "/noel.png",
    resume: "/cv.pdf",
    social: {
      github: "https://github.com/sime65123",
      linkedin: "https://www.linkedin.com/in/mbacob-sime-3a2a95294/",
      twitter: "https://twitter.com/votre-username",
    },
  },

  education: [
    {
      id: "1",
      degree: "Licence en Concepteur Développeur Reseau et Internet",
      institution: "IUT Fotso Victor de Bandjoun",
      period: "2023 - 2024",
      description: "Spécialisation en développement web et ingénierie logicielle",
      location: "Bandjoun, Cameroun",
    },
    {
      id: "2",
      degree: "BTS en Genie Logiciel",
      institution: "Institut Universitaire de la Côte",
      period: "2021 - 2022",
      description: "Formation complète en programmation et systèmes informatiques",
      location: "Douala, Cameroun",
    },
  ] as Education[],

  skills: [
    { name: "React.js", level: 80, category: "frontend" },
    { name: "Next.js", level: 80, category: "frontend" },
    { name: "TypeScript", level: 70, category: "frontend" },
    { name: "Tailwind CSS", level: 70, category: "frontend" },
    { name: "Django", level: 85, category: "backend" },
    { name: "Laravel", level: 75, category: "backend" },
    { name: "MySql | Sqlite", level: 90, category: "backend" },
    { name: "Postman", level: 75, category: "backend" },
    { name: "Git", level: 85, category: "tools" },
    { name: "Airflow", level: 70, category: "tools" },
    { name: "Figma", level: 80, category: "tools" },
    { name: "Trello", level: 92, category: "tools" },
    { name: "Python", level: 80, category: "other" },
    { name: "SQL", level: 85, category: "other" },
    { name: "Excel", level: 80, category: "other" },
  ] as Skill[],

  projects: [
    {
      id: "iot-access-control",
      title: "Système IoT de Contrôle d’Accès Automobile",
      description: "Conception et développement d’un système IoT complet permettant de gérer l’accès à un portique automobile.",
      longDescription:
        "Conception et développement d’un système IoT complet permettant de gérer l’accès à un portique automobile. Le projet inclut une interface web en Next.js pour le suivi, une API backend en Django, et un module Arduino pour le contrôle physique du portique.",
      image: "/portique.jpg",
      tags: ["React", "Django", "Arduino", "Tailwind CSS"],
      githubUrl: "https://github.com/sime65123/VirtualWallet",
      liveUrl: "https://ecommerce-demo.vercel.app",
      featured: true,
    },
    {
      id: "sport-center-management",
      title: "Application Web de Gestion d'une salle de sport",
      description: "Application de gestion de salle de sport permettant de gérer les abonnements, les inscriptions aux cours, les paiements, etc.",
      longDescription:
        "Application de gestion de salle de sport permettant de gérer les abonnements, les inscriptions aux cours, les paiements, etc.",
      image: "/gymzone.png",
      tags: ["Next.js", "Django", "Tailwind CSS"],
      githubUrl: "https://github.com/sime65123/gym-management-app",
      liveUrl: "https://gymzon.netlify.app/",
      featured: true,
    },
    {
      id: "computer-equipment-ecommerce",
      title: "Site e-commerce de vente d'equippement informatique",
      description: "Plateforme e-commerce spécialisée en équipements informatiques, offrant une expérience d'achat fluide et sécurisée.",
      longDescription:
        "Développement d'un site e-commerce complet dédié à la vente d'équipements informatiques. Le projet inclut un catalogue produits dynamique, un système de panier personnalisé, un processus de paiement sécurisé et un backoffice de gestion. Des fonctionnalités avancées comme la recherche filtrée, les recommandations personnalisées et la gestion de stock ont été implémentées pour optimiser l'expérience utilisateur et administrative.",
      image: "/modern-ecommerce-interface.png",
      tags: ["Laravel", "MySQL", "Bootstrap"],
      githubUrl: "https://github.com/sime65123/E-commerce",
      liveUrl: "https://ecommerce-demo.vercel.app",
      featured: false,
    },
  ] as Project[],

  services: [
    {
      id: "frontend-development",
      title: "Développement Frontend",
      description: "Création d'applications web modernes et performantes",
      icon: "Code",
      features: [
        "Applications React.js/Next.js",
        "Sites web responsives",
        "Progressive Web Apps (PWA)",
        "Optimisation des performances",
      ],
    },
    {
      id: "backend-development",
      title: "Développement Backend",
      description: "Conception et déploiement d'APIs robustes et sécurisées",
      icon: "Server", // ou "Database", "Cloud"
      features: [
        "APIs RESTful avec Django",
        "Bases de données SQLite & MySQL",
        "Authentification JWT et OAuth",
        "Microservices architecture",
        "Tests unitaires et d'intégration"
      ]
    },
    {
      id: "data-science",
      title: "Data Science & Analyse",
      description: "Extraction de insights valorisables à partir des données",
      icon: "BarChart3", // ou "LineChart", "Brain"
      features: [
        "Analyse exploratoire des données (EDA)",
        "Machine Learning avec Python",
        "Visualisation de données (Matplotlib)",
        "Traitement du langage naturel (NLP)",
        "Modèles prédictifs et classification",
        "Nettoyage et prétraitement des données"
      ]
    },
  ] as Service[],

  testimonials: [
    {
      id: "1",
      name: "Marie Dubois",
      role: "Directrice Marketing",
      company: "TechStart",
      content:
        "SIME a transformé notre vision en une application web exceptionnelle. Son expertise technique et sa créativité ont dépassé nos attentes. Le projet a été livré dans les délais avec une qualité irréprochable.",
      avatar: "/temoignage.jpg",
      rating: 5,
    },
    {
      id: "2",
      name: "Jean-Pierre Martin",
      role: "CEO",
      company: "InnovateCorp",
      content:
        "Collaboration remarquable ! SIME comprend parfaitement les enjeux business et propose des solutions techniques adaptées. Son approche professionnelle et sa réactivité font la différence.",
      avatar: "/temoignage.jpg",
      rating: 5,
    },
    {
      id: "3",
      name: "Sophie Laurent",
      role: "Product Manager",
      company: "DigitalFlow",
      content:
        "Un développeur d'exception ! SIME a su créer une interface utilisateur intuitive et performante pour notre plateforme. Son attention aux détails et sa passion pour le code sont remarquables.",
      avatar: "/temoignage.jpg",
      rating: 5,
    },
    {
      id: "4",
      name: "Alexandre Rousseau",
      role: "CTO",
      company: "WebSolutions",
      content:
        "SIME maîtrise parfaitement les technologies modernes. Il a développé notre application avec une architecture solide et évolutive. Je recommande vivement ses services pour tout projet web ambitieux.",
      avatar: "/temoignage.jpg",
      rating: 5,
    },
    {
      id: "5",
      name: "Camille Moreau",
      role: "Fondatrice",
      company: "CreativeStudio",
      content:
        "Travail exceptionnel ! SIME a su traduire nos idées créatives en code avec une précision remarquable. Son expertise en React et Next.js nous a permis d'avoir une application ultra-performante.",
      avatar: "/temoignage.jpg",
      rating: 5,
    },
    {
      id: "6",
      name: "Thomas Leroy",
      role: "Directeur Technique",
      company: "FutureTech",
      content:
        "SIME est un développeur passionné qui livre un travail de qualité supérieure. Sa capacité à résoudre des problèmes complexes et son sens du détail en font un partenaire de choix pour nos projets.",
      avatar: "/temoignage.jpg",
      rating: 5,
    },
  ] as Testimonial[],
}
