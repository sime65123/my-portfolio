# Portfolio Professionnel React.js

Un portfolio moderne et responsive développé avec React.js, Next.js, Tailwind CSS et Framer Motion.

## 🚀 Fonctionnalités

- **Design moderne** : Interface élégante avec thème sombre/clair
- **Animations fluides** : Transitions et micro-interactions avec Framer Motion
- **Responsive** : Parfaitement adapté à tous les écrans
- **Performance optimisée** : Chargement rapide et SEO-friendly
- **Navigation intuitive** : Menu sticky avec indicateurs visuels
- **Sections complètes** : Hero, À propos, Formation, Compétences, Projets, Services, Contact

## 🛠️ Technologies utilisées

- **Frontend** : React.js, Next.js 15, TypeScript
- **Styling** : Tailwind CSS v4, CSS personnalisé
- **Animations** : Framer Motion
- **UI Components** : Radix UI, Lucide React
- **Thèmes** : next-themes pour le mode sombre/clair
- **Analytics** : Vercel Analytics

## 📁 Structure du projet

\`\`\`
├── app/                    # Pages Next.js App Router
│   ├── about/             # Page À propos
│   ├── contact/           # Page Contact
│   ├── education/         # Page Formation
│   ├── projects/          # Pages Projets
│   ├── services/          # Page Services
│   ├── skills/            # Page Compétences
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   ├── sections/          # Sections du portfolio
│   ├── ui/               # Composants UI de base
│   ├── navigation.tsx     # Navigation principale
│   ├── footer.tsx         # Pied de page
│   └── theme-provider.tsx # Fournisseur de thème
├── lib/                   # Utilitaires et données
│   ├── portfolio-data.ts  # Données du portfolio
│   └── utils.ts          # Fonctions utilitaires
└── public/               # Assets statiques
\`\`\`

## 🎨 Personnalisation

### 1. Informations personnelles

Modifiez le fichier `lib/portfolio-data.ts` pour personnaliser :

\`\`\`typescript
export const portfolioData = {
  personal: {
    name: "Votre Nom",
    title: "Votre Titre",
    email: "votre@email.com",
    // ... autres informations
  },
  // ... autres sections
}
\`\`\`

### 2. Projets

Ajoutez vos projets dans le même fichier :

\`\`\`typescript
projects: [
  {
    id: "mon-projet",
    title: "Mon Projet",
    description: "Description courte",
    longDescription: "Description détaillée",
    image: "/chemin/vers/image.jpg",
    tags: ["React", "Next.js"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    featured: true
  }
]
\`\`\`

### 3. Compétences

Personnalisez vos compétences :

\`\`\`typescript
skills: [
  { name: "React.js", level: 95, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  // ...
]
\`\`\`

### 4. Formation

Ajoutez votre parcours académique :

\`\`\`typescript
education: [
  {
    id: "1",
    degree: "Master en Informatique",
    institution: "École Supérieure",
    period: "2020 - 2022",
    description: "Spécialisation...",
    location: "Paris, France"
  }
]
\`\`\`

### 5. Services

Définissez vos services :

\`\`\`typescript
services: [
  {
    id: "web-dev",
    title: "Développement Web",
    description: "Création d'applications...",
    icon: "Code",
    features: ["React.js", "Next.js", "..."]
  }
]
\`\`\`

## 🎯 Images et Assets

### Images de profil et projets

1. Ajoutez vos images dans le dossier `public/`
2. Mettez à jour les chemins dans `portfolio-data.ts`
3. Formats recommandés : JPG, PNG, WebP
4. Tailles recommandées :
   - Avatar : 400x400px
   - Images de projets : 800x600px

### Favicon

Remplacez `public/favicon.ico` par votre propre favicon.

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Déployez en un clic !

### Autres plateformes

\`\`\`bash
# Build de production
npm run build

# Démarrage en production
npm start
\`\`\`

## 📱 Responsive Design

Le portfolio est entièrement responsive avec des breakpoints optimisés :

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

## ⚡ Performance

- **Lazy loading** des images
- **Code splitting** automatique avec Next.js
- **Optimisation des fonts** avec next/font
- **Compression** des assets
- **SEO optimisé** avec métadonnées complètes

## 🎨 Thèmes

Le portfolio supporte les thèmes clair et sombre avec :

- Basculement automatique selon les préférences système
- Bouton de basculement manuel
- Transitions fluides entre thèmes
- Couleurs optimisées pour l'accessibilité

## 📧 Formulaire de contact

Le formulaire de contact est prêt à être connecté à :

- **Formspree** (recommandé pour la simplicité)
- **EmailJS** (pour l'envoi côté client)
- **API personnalisée** (pour plus de contrôle)

### Configuration Formspree

1. Créez un compte sur [Formspree](https://formspree.io)
2. Créez un nouveau formulaire
3. Remplacez l'action du formulaire dans `contact-section.tsx`

## 🔧 Développement

\`\`\`bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Linting
npm run lint
\`\`\`

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

## 🤝 Support

Pour toute question ou problème :

1. Consultez la documentation
2. Vérifiez les issues GitHub
3. Contactez le développeur

---

**Créé avec ❤️ par [Votre Nom]**
