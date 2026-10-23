export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  /** Ce que c'est, en quelques mots. */
  category: string
  /** Une ou deux phrases pour l'aperçu. */
  summary: string
  /** Le contexte, pour l'étude de cas. */
  context: string
  /** Ce qui a été construit, point par point. */
  built: string[]
  stack: string[]
  status?: string
  /** Capture d'écran. Sans image, une couverture typographique est générée. */
  image?: string
  imageAlt?: string
  cover: "green" | "yellow" | "ink" | "red"
  links: ProjectLink[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  period: string
  description: string
  location: string
  current?: boolean
}

export interface StackStage {
  id: string
  name: string
  note: string
  tools: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
}

export const portfolioData = {
  personal: {
    name: "SIME MBACOB Appolos Noel",
    displayName: "Sime Mbacob",
    title: "Développeur full-stack et data",
    tagline:
      "Développeur full-stack et data à Yaoundé. Je construis des applications web, mobiles et embarquées pour des besoins concrets : contrôle d’accès, paiement Mobile Money, immobilier.",
    bio: "Développeur web, mobile et data à Yaoundé. Je conçois des applications qui relient le logiciel au monde physique : portiques connectés, paiement Mobile Money, plateformes immobilières.",
    email: "simembacob@gmail.com",
    phone: "+237 6 50 19 26 42",
    location: "Yaoundé, Cameroun",
    resume: "/cv.pdf",
    social: {
      github: "https://github.com/sime65123",
      linkedin: "https://www.linkedin.com/in/mbacob-sime-3a2a95294/",
    },
  },

  about: {
    statement:
      "Mes projets partent presque toujours d’un besoin local : automatiser le paiement et l’accès à une station de lavage, publier et louer un logement depuis son téléphone, donner à une entreprise d’import-export un site à son image. Je travaille sur toute la chaîne, du capteur au serveur, de l’écran aux données.",
    facts: [
      { label: "Basé à", value: "Yaoundé, Cameroun" },
      {
        label: "En ce moment",
        value: "Master 2 Concepteur et Administrateur des Systèmes Informatiques, Université de Siantou",
      },
      { label: "Domaines", value: "Web, mobile, embarqué, données" },
      { label: "Langues", value: "Français, anglais" },
      { label: "Disponibilité", value: "Disponible pour de nouveaux projets" },
    ],
  },

  projects: [
    {
      id: "wash-wallet",
      title: "Wash Wallet",
      category: "Paiement et contrôle d’accès pour station de lavage",
      status: "Projet de mémoire de Master",
      summary:
        "Une plateforme qui automatise le paiement et commande l’accès à un portique de lavage automobile. Serveur local, application web et module embarqué travaillent ensemble.",
      context:
        "Wash Wallet est mon projet de mémoire de Master. L’objectif : automatiser le paiement et l’accès à un portique de lavage automobile. Le système est hybride. Un serveur de gestion local en Django centralise les données, une application web en Next.js permet le suivi, et un module d’accès embarqué sur Arduino et ESP32 pilote le portique physique.",
      built: [
        "Un système de gestion local en Django, dont les accès sont protégés par connexion",
        "Un module d’accès sur Arduino et ESP32 qui commande le portique, avec un indicateur d’état de connexion visible dans l’interface",
        "La vérification des tickets",
        "Une page de rapport d’activité complète",
        "Une interface web de suivi en Next.js",
      ],
      stack: ["Django", "Next.js", "Arduino", "ESP32", "Tailwind CSS"],
      cover: "yellow",
      links: [
        { label: "Dépôt GitHub : VirtualWallet", href: "https://github.com/sime65123/VirtualWallet" },
        { label: "Dépôt GitHub : Localpayement", href: "https://github.com/sime65123/Localpayement" },
      ],
    },
    {
      id: "camerimmo",
      title: "CamerImmo",
      category: "Application mobile immobilière",
      status: "En développement",
      summary:
        "Une application Flutter pour chercher, publier et louer des biens immobiliers au Cameroun, avec messagerie, documents et paiement par Mobile Money.",
      context:
        "CamerImmo répond à un besoin du marché camerounais : trouver un logement, publier une annonce, échanger avec le propriétaire et payer depuis son téléphone. L’application est écrite en Flutter, avec Riverpod et GoRouter. Elle s’appuie sur Supabase pour l’authentification, la base de données, le stockage de fichiers et les fonctions serveur. Les paiements passent par CinetPay, avec MTN MoMo et Orange Money.",
      built: [
        "Recherche de biens, fiche détaillée et publication d’une annonce",
        "Demande de location avec acceptation ou refus par le propriétaire, et suivi du statut du bail",
        "Messagerie entre locataire et propriétaire",
        "Paiement par MTN MoMo et Orange Money via CinetPay",
        "Documents, alertes, profil et tableau d’analyse",
        "Sécurité des données par règles RLS Supabase, et envoi d’images fiabilisé",
      ],
      stack: ["Flutter", "Riverpod", "GoRouter", "Supabase", "CinetPay"],
      cover: "green",
      links: [],
    },
    {
      id: "gymzone",
      title: "GymZone",
      category: "Gestion de salle de sport",
      summary:
        "Une application web pour gérer une salle de sport : abonnements, inscriptions aux cours, paiements et présences du personnel.",
      context:
        "GymZone centralise la gestion quotidienne d’une salle de sport : abonnements, inscriptions aux cours et paiements. Le tableau de bord suit aussi les présences du personnel, avec le nombre de présents du jour, l’effectif total et le taux de présence. Le front-end est en Next.js avec Tailwind CSS, le back-end en Django.",
      built: [
        "Gestion des abonnements et des inscriptions aux cours",
        "Suivi des paiements",
        "Pointage des présences du personnel, avec statistiques du jour",
      ],
      stack: ["Next.js", "Django", "Tailwind CSS"],
      image: "/gymzone.png",
      imageAlt: "Tableau de bord GymZone : présences du jour, effectif total et taux de présence",
      cover: "ink",
      links: [
        { label: "Voir la démo", href: "https://gymzon.netlify.app/" },
        { label: "Dépôt GitHub", href: "https://github.com/sime65123/gym-management-app" },
      ],
    },
    {
      id: "ktis-group",
      title: "KTIS Group",
      category: "Site vitrine d’entreprise",
      summary:
        "Un site multipage pour une entreprise camerounaise d’import-export et de services techniques, avec formulaires de contact et de devis.",
      context:
        "KTIS Group est une entreprise camerounaise active dans l’import-export et les services techniques. J’ai conçu son site institutionnel en plusieurs pages : mise en page adaptée à tous les écrans, mode clair et sombre mémorisé dans le navigateur, et formulaires de contact et de devis qui livrent les messages par e-mail. Un sélecteur de langue français/anglais est en cours d’intégration.",
      built: [
        "Un site multipage adapté aux mobiles, tablettes et ordinateurs",
        "Un mode clair et sombre dont le choix est mémorisé",
        "Des formulaires de contact et de devis livrés par e-mail (FormSubmit, envoi AJAX avec repli natif)",
        "Des flyers pour l’entreprise",
        "Une version bilingue français/anglais, en cours",
      ],
      stack: ["HTML", "CSS", "JavaScript", "FormSubmit"],
      cover: "ink",
      links: [],
    },
    {
      id: "boutique-informatique",
      title: "Boutique informatique",
      category: "E-commerce de matériel informatique",
      summary:
        "Une plateforme e-commerce spécialisée en équipements informatiques, avec catalogue dynamique, panier, paiement sécurisé et back-office.",
      context:
        "Un site e-commerce complet dédié à la vente d’équipements informatiques. Il comprend un catalogue de produits dynamique, un panier personnalisé, un processus de paiement sécurisé et un back-office de gestion. La recherche filtrée, les recommandations personnalisées et la gestion de stock complètent l’expérience côté client comme côté administration.",
      built: [
        "Un catalogue de produits dynamique avec recherche filtrée",
        "Un panier et un processus de paiement sécurisé",
        "Un back-office de gestion",
        "La gestion de stock",
        "Des recommandations personnalisées",
      ],
      stack: ["Laravel", "MySQL", "Bootstrap"],
      image: "/ecom.png",
      imageAlt: "Tableau de bord administrateur de la boutique : commandes, produits, catégories et utilisateurs",
      cover: "red",
      links: [{ label: "Dépôt GitHub", href: "https://github.com/sime65123/E-commerce" }],
    },
  ] as Project[],

  stack: [
    {
      id: "terrain",
      name: "Terrain",
      note: "Des modules d’accès sur Arduino et ESP32 qui commandent un portique et remontent leur état de connexion.",
      tools: ["Arduino", "ESP32"],
    },
    {
      id: "serveur",
      name: "Serveur",
      note: "Des API et des bases de données, avec le paiement Mobile Money branché via CinetPay.",
      tools: ["Django", "Laravel", "Supabase", "MySQL", "SQLite", "Postman", "CinetPay"],
    },
    {
      id: "donnees",
      name: "Données",
      note: "Nettoyer, analyser et automatiser le traitement des données.",
      tools: ["Python", "SQL", "Airflow", "Excel"],
    },
    {
      id: "ecran",
      name: "Écran",
      note: "Des interfaces web en Next.js et des applications mobiles Flutter, maquettées sur Figma.",
      tools: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Flutter", "Figma"],
    },
  ] as StackStage[],

  services: [
    {
      id: "web",
      title: "Applications web",
      description: "Du site vitrine à la plateforme de gestion, du front-end à l’API.",
      features: [
        "Applications React.js et Next.js",
        "Sites responsives et performants",
        "APIs REST avec Django et Laravel",
        "Bases de données MySQL et SQLite",
        "Authentification JWT et OAuth",
      ],
    },
    {
      id: "mobile",
      title: "Applications mobiles",
      description: "Des applications Flutter connectées à un back-end Supabase, avec paiement Mobile Money.",
      features: [
        "Applications Flutter avec Riverpod",
        "Authentification, base de données et stockage Supabase",
        "Paiement MTN MoMo et Orange Money via CinetPay",
        "Messagerie, notifications et gestion de documents",
      ],
    },
    {
      id: "embarque",
      title: "Objets connectés et contrôle d’accès",
      description: "Relier un module Arduino ou ESP32 à une application web pour piloter un équipement réel.",
      features: [
        "Modules d’accès sur Arduino et ESP32",
        "Suivi de l’état de connexion des équipements",
        "Vérification de tickets et gestion des accès",
        "Rapports d’activité",
      ],
    },
    {
      id: "data",
      title: "Data et analyse",
      description: "Tirer des enseignements exploitables de vos données.",
      features: [
        "Analyse exploratoire des données",
        "Nettoyage et préparation des données",
        "Machine learning avec Python",
        "Visualisation avec Matplotlib",
        "Traitement du langage naturel et modèles prédictifs",
      ],
    },
  ] as Service[],

  process: [
    { title: "Analyse", description: "Comprendre votre besoin et vos contraintes." },
    { title: "Conception", description: "Maquettes et prototypes à valider ensemble." },
    { title: "Développement", description: "Code et intégration des fonctionnalités." },
    { title: "Livraison", description: "Tests, déploiement et prise en main." },
  ],

  education: [
    {
      id: "master",
      degree: "Master 2, Concepteur et Administrateur des Systèmes Informatiques (CASI)",
      institution: "Université de Siantou",
      period: "En cours",
      description: "Mémoire : Wash Wallet, plateforme de paiement et de contrôle d’accès.",
      location: "Cameroun",
      current: true,
    },
    {
      id: "licence",
      degree: "Licence, Concepteur Développeur Réseau et Internet",
      institution: "IUT Fotso Victor de Bandjoun",
      period: "2023 – 2024",
      description: "Spécialisation en développement web et ingénierie logicielle.",
      location: "Bandjoun, Cameroun",
    },
    {
      id: "bts",
      degree: "BTS Génie Logiciel",
      institution: "Institut Universitaire de la Côte",
      period: "2021 – 2022",
      description: "Formation complète en programmation et systèmes informatiques.",
      location: "Douala, Cameroun",
    },
  ] as Education[],

  distinction: "Meilleur projet de fin d’études 2024, IUT Fotso Victor",

  certifications: [
    "Python Associate",
    "SQL Intermediate",
    "JavaScript Advanced",
    "Hashgraph Developer Course",
  ],
}
