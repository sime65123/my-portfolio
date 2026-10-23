# Portfolio de Sime Mbacob

Portfolio personnel en Next.js 15, React 19, Tailwind CSS 4 et Framer Motion.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Où modifier le contenu

Tout le contenu est dans `lib/portfolio-data.ts` : informations personnelles, projets, outils, services, formation.

### Ajouter un projet

Ajoutez un objet dans `projects`. Sa page d'étude de cas (`/projects/<id>`) est générée automatiquement.

```ts
{
  id: "mon-projet",            // devient l'adresse /projects/mon-projet
  title: "Mon projet",
  category: "Ce que c'est, en quelques mots",
  summary: "Une ou deux phrases pour l'aperçu.",
  context: "Le contexte, pour l'étude de cas.",
  built: ["Ce qui a été construit", "point par point"],
  stack: ["Next.js", "Django"],
  image: "/capture.png",       // optionnel : sans image, une couverture typographique est générée
  imageAlt: "Description de la capture",
  cover: "green",              // green | yellow | ink | red (couleur de la couverture sans image)
  links: [{ label: "Dépôt GitHub", href: "https://github.com/..." }],
}
```

## Design

- **Palette** (`app/globals.css`) : gris béton, vert bâche, jaune signal, rouge de barrière, vert encre.
- **Police** : Archivo variable, auto-hébergée dans `app/fonts/`. L'axe de largeur est animé sur le nom.
- **Ouverture** (`components/intro-gate.tsx`) : un ticket est validé et une barrière se lève. Elle est jouée une fois par session et désactivée si le visiteur préfère réduire les animations.
- **Thème** clair et sombre via `next-themes`.

## Formulaire de contact

Le formulaire envoie un e-mail via [FormSubmit](https://formsubmit.co). **À la première utilisation**, FormSubmit envoie un e-mail de confirmation à l'adresse du portfolio : cliquez sur le lien qu'il contient pour activer la réception des messages.

## Déploiement

Connectez le dépôt à Vercel : Next.js est détecté automatiquement.
