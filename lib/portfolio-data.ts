export interface ProjectLink {
  label: string
  href: string
  kind: "demo" | "code"
}

/** Un maillon de l'architecture d'un projet (carte de la section sombre). */
export interface ProjectNode {
  kicker: string
  title: string
  text: string
  tools: string[]
}

export interface Project {
  id: string
  title: string
  category: string
  /** Une ou deux phrases pour l'aperçu. */
  summary: string
  /** Le contexte : un paragraphe par entrée. */
  context: string[]
  /** Ce qui a été construit, point par point. */
  built: string[]
  stack: string[]
  status?: string
  /** Capture d'écran. Sans image, une couverture typographique est générée. */
  image?: string
  imageAlt?: string
  cover: "navy" | "green" | "paper"
  links: ProjectLink[]
  /** Architecture : facultative, affichée dans une section sombre. */
  nodes?: ProjectNode[]
  /** Illustration du parcours d'une opération, facultative. */
  flow?: { title: string; lines: string[] }
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
  kicker: string
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
    title: "Développeur Full-Stack & Data Scientist",
    shortTitle: "Développeur full-stack · data",
    // Texte d'accroche : il parle de Sime, pas de ses projets.
    bio: "Développeur web/mobile et data scientist, je crée des applications innovantes et des modèles prédictifs qui transforment les données en valeur ajoutée.",
    bioMore:
      "Basé à Yaoundé, je réponds à des besoins concrets : contrôle d’accès, paiement Mobile Money, immobilier, sites d’entreprise.",
    email: "simembacob@gmail.com",
    phone: "+237 6 50 19 26 42",
    location: "Yaoundé, Cameroun",
    resume: "/cv.pdf",
    photo: "/sime-badge.webp",
    social: {
      github: "https://github.com/sime65123",
      linkedin: "https://www.linkedin.com/in/mbacob-sime-3a2a95294/",
    },
  },

  hero: {
    facts: [
      { label: "Basé à", value: "Yaoundé, Cameroun" },
      { label: "En ce moment", value: "Master 2 CASI", note: "Université de Siantou" },
      { label: "Domaines", value: "Web, mobile, embarqué, data" },
      { label: "Langues", value: "Français, anglais" },
    ],
  },

  about: {
    paragraphs: [
      "Mes projets partent presque toujours d’un besoin local : automatiser le paiement et l’accès à une station de lavage, publier et louer un logement depuis son téléphone, donner à une entreprise d’import-export un site à son image. Je travaille sur toute la chaîne, du capteur au serveur, de l’écran aux données.",
      "Je me forme aujourd’hui plus en profondeur à la data et à l’IA, pour relier mes applications à leurs données : nettoyage, analyse et modèles prédictifs.",
    ],
    focus: [
      { title: "Contrôle d’accès connecté", text: "Paiement et accès physique à un portique.", project: "wash-wallet" },
      { title: "Applications mobiles", text: "Immobilier et paiement Mobile Money.", project: "camerimmo" },
      { title: "Sites et plateformes web", text: "Vitrines d’entreprise, gestion, e-commerce.", project: "ktis-group" },
    ],
  },

  projects: [
    {
      id: "wash-wallet",
      title: "Wash Wallet",
      category: "Paiement et contrôle d’accès pour station de lavage",
      status: "Projet de mémoire de Master 2",
      summary:
        "Une plateforme hybride qui automatise le paiement et commande l’accès à un portique de lavage automobile.",
      context: [
        "Wash Wallet est mon projet de mémoire de Master 2. L’objectif : automatiser le paiement et le contrôle physique de l’accès à un portique de lavage automobile.",
        "Le système est hybride. Un serveur de gestion local en Django centralise les données, une application web permet le suivi, et un module d’accès embarqué sur Arduino et ESP32 commande le portique.",
      ],
      built: [
        "Un système de gestion local en Django, dont les pages sont protégées par connexion",
        "Un module d’accès sur Arduino et ESP32 qui commande le portique",
        "Un indicateur d’état de connexion du module, visible dans l’interface",
        "La vérification des tickets",
        "Une page de rapport d’activité complète",
        "Une interface web de suivi",
      ],
      stack: ["Django", "Next.js", "Arduino", "ESP32", "Tailwind CSS"],
      image: "/washwallet.png",
      cover: "navy",
      links: [
        { label: "VirtualWallet", href: "https://github.com/sime65123/VirtualWallet", kind: "code" },
        { label: "Localpayement", href: "https://github.com/sime65123/Localpayement", kind: "code" },
      ],
      nodes: [
        {
          kicker: "Terrain",
          title: "Module d’accès",
          text: "Un module Arduino et ESP32 commande le portique physique et signale son état de connexion.",
          tools: ["Arduino", "ESP32"],
        },
        {
          kicker: "Serveur",
          title: "Gestion locale",
          text: "Le système local centralise les tickets et les accès. Ses pages sont protégées par connexion.",
          tools: ["Django"],
        },
        {
          kicker: "Écran",
          title: "Suivi et rapports",
          text: "Une interface web pour vérifier les tickets et consulter le rapport d’activité.",
          tools: ["Interface web", "Tailwind CSS"],
        },
      ],
      flow: {
        title: "Parcours d’un ticket (illustration)",
        lines: [
          "Un ticket est présenté au portique",
          "Le serveur local vérifie le ticket",
          "Ticket valide : l’accès est accordé",
          "Le module reçoit l’ordre d’ouvrir le portique",
          "Le passage est ajouté au rapport d’activité",
        ],
      },
    },
    {
      id: "camerimmo",
      title: "CamerImmo",
      category: "Application mobile immobilière",
      status: "En développement",
      summary:
        "Une application Flutter pour chercher, publier et louer des biens immobiliers au Cameroun, avec messagerie et paiement Mobile Money.",
      context: [
        "CamerImmo répond à un besoin du marché camerounais : trouver un logement, publier une annonce, échanger avec le propriétaire et payer depuis son téléphone.",
        "L’application est écrite en Flutter, avec Riverpod et GoRouter. Elle s’appuie sur Supabase pour l’authentification, la base de données, le stockage de fichiers et les fonctions serveur. Les paiements passent par CinetPay, avec MTN MoMo et Orange Money.",
      ],
      built: [
        "Recherche de biens, fiche détaillée et publication d’une annonce",
        "Demande de location avec acceptation ou refus par le propriétaire, et suivi du statut du bail",
        "Messagerie entre locataire et propriétaire",
        "Paiement par MTN MoMo et Orange Money via CinetPay",
        "Documents, alertes, profil et tableau d’analyse",
        "Sécurité des données par règles RLS Supabase, et envoi d’images fiabilisé",
      ],
      stack: ["Flutter", "Riverpod", "GoRouter", "Supabase", "CinetPay"],
      image: "/camerimmo.png",
      cover: "green",
      links: [],
      nodes: [
        {
          kicker: "Écran",
          title: "Application mobile",
          text: "Une application Flutter. Riverpod gère l’état, GoRouter la navigation.",
          tools: ["Flutter", "Riverpod", "GoRouter"],
        },
        {
          kicker: "Serveur",
          title: "Supabase",
          text: "Authentification, base de données, stockage de fichiers et fonctions serveur.",
          tools: ["Auth", "Base de données", "Stockage", "Edge Functions"],
        },
        {
          kicker: "Paiement",
          title: "Mobile Money",
          text: "Les paiements passent par CinetPay.",
          tools: ["CinetPay", "MTN MoMo", "Orange Money"],
        },
      ],
    },
    {
      id: "gymzone",
      title: "GymZone",
      category: "Gestion de salle de sport",
      summary:
        "Une application web pour gérer une salle de sport : abonnements, inscriptions aux cours, paiements et présences du personnel.",
      context: [
        "GymZone centralise la gestion quotidienne d’une salle de sport : abonnements, inscriptions aux cours et paiements.",
        "Le tableau de bord suit aussi les présences du personnel, avec le nombre de présents du jour, l’effectif total et le taux de présence. Le front-end est en Next.js avec Tailwind CSS, le back-end en Django.",
      ],
      built: [
        "Gestion des abonnements et des inscriptions aux cours",
        "Suivi des paiements",
        "Pointage des présences du personnel, avec statistiques du jour",
      ],
      stack: ["Next.js", "Django", "Tailwind CSS"],
      image: "/gymzone.png",
      imageAlt: "Tableau de bord GymZone : présences du jour, effectif total et taux de présence",
      cover: "paper",
      links: [
        { label: "Voir la démo", href: "https://gymzon.netlify.app/", kind: "demo" },
        { label: "Code source", href: "https://github.com/sime65123/gym-management-app", kind: "code" },
      ],
    },
    {
      id: "ktis-group",
      title: "KTIS Group",
      category: "Site vitrine d’entreprise",
      summary:
        "Le site multipage d’une entreprise de Douala spécialisée dans l’import-export, le commerce général et les prestations de services.",
      context: [
        "KTIS Group est une entreprise basée à Douala, active dans l’import-export, le commerce général et les prestations de services. J’ai conçu son site institutionnel en plusieurs pages.",
        "Le site s’adapte à tous les écrans, propose un mode clair et sombre mémorisé dans le navigateur, et deux formulaires, contact et demande de devis, dont les messages arrivent par e-mail. Un sélecteur de langue français/anglais est en cours d’intégration.",
      ],
      built: [
        "Un site multipage adapté aux mobiles, tablettes et ordinateurs",
        "Un mode clair et sombre dont le choix est mémorisé",
        "Des formulaires de contact et de devis livrés par e-mail (FormSubmit, envoi AJAX avec repli natif)",
        "Des flyers pour l’entreprise",
        "Une version bilingue français/anglais, en cours",
      ],
      stack: ["HTML", "CSS", "JavaScript", "FormSubmit"],
      image: "/gymzone.png",
      cover: "green",
      links: [{ label: "Voir le site", href: "https://ktisgroupsarl.netlify.app/", kind: "demo" }],
    },
    {
      id: "boutique-informatique",
      title: "Boutique informatique",
      category: "E-commerce de matériel informatique",
      summary:
        "Une plateforme e-commerce spécialisée en équipements informatiques, avec catalogue, panier, paiement sécurisé et back-office.",
      context: [
        "Un site e-commerce complet dédié à la vente d’équipements informatiques. Il comprend un catalogue de produits dynamique, un panier personnalisé, un processus de paiement sécurisé et un back-office de gestion.",
        "La recherche filtrée, les recommandations personnalisées et la gestion de stock complètent l’expérience côté client comme côté administration.",
      ],
      built: [
        "Un catalogue de produits dynamique avec recherche filtrée",
        "Un panier et un processus de paiement sécurisé",
        "Un back-office de gestion",
        "La gestion de stock",
        "Des recommandations personnalisées",
      ],
      stack: ["Laravel", "MySQL", "Bootstrap"],
      image: "/ecom.png",
      imageAlt: "Tableau de bord administrateur de la boutique : commandes, produits, catégories et utilisateurs",
      cover: "paper",
      links: [{ label: "Code source", href: "https://github.com/sime65123/E-commerce", kind: "code" }],
    },
  ] as Project[],

  stack: [
    {
      id: "terrain",
      kicker: "Capteurs",
      name: "Terrain",
      note: "Des modules d’accès qui commandent un portique et signalent leur état.",
      tools: ["Arduino", "ESP32"],
    },
    {
      id: "serveur",
      kicker: "Logique",
      name: "Serveur",
      note: "Des API et des bases de données, avec le paiement Mobile Money branché.",
      tools: ["Django", "Laravel", "Supabase", "MySQL", "SQLite", "Postman", "CinetPay"],
    },
    {
      id: "donnees",
      kicker: "Analyse",
      name: "Données",
      note: "Nettoyer, analyser et automatiser le traitement des données.",
      tools: ["Python", "SQL", "Airflow", "Excel"],
    },
    {
      id: "ecran",
      kicker: "Interface",
      name: "Écran",
      note: "Des interfaces web et des applications mobiles, maquettées sur Figma.",
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
      description: "Mémoire : Wash Wallet, plateforme de paiement et de contrôle d’accès.",
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
    { name: "Python Associate" },
    { name: "SQL Intermediate" },
    { name: "JavaScript Advanced" },
    { name: "Hashgraph Developer Course" },
  ],
}
