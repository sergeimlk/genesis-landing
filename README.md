# Genesis Academy - Landing Page

> 🚀 Formation IA pour créer des visuels de niveau cinéma en 7 jours

## 📁 Structure du Projet

```
genesis-web/
├── public/
│   ├── assets/                    # Assets statiques réorganisés
│   │   ├── documents/             # PDF, CGV, etc.
│   │   ├── icons/                 # Favicons et icônes PWA
│   │   ├── images/
│   │   │   ├── logo/              # Logos Genesis
│   │   │   ├── examples/          # Images avant/après
│   │   │   ├── hero/              # Images du hero
│   │   │   └── og/                # Images Open Graph
│   │   ├── screenshots/           # Screenshots PWA
│   │   └── ui/
│   │       ├── animation/         # Assets d'animation
│   │       ├── lighting/          # Icônes d'éclairage
│   │       └── models/            # Logos des modèles IA
│   │           ├── video/
│   │           ├── image/
│   │           └── styles/
│   ├── manifest.json              # PWA Manifest
│   └── sw.js                      # Service Worker
│
├── src/
│   ├── components/
│   │   ├── common/                # Composants réutilisables
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── index.js
│   │   ├── landing/               # Composants de la landing page
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── TrustSection.jsx
│   │   │   ├── ComparisonSection.jsx
│   │   │   ├── TargetAudienceSection.jsx
│   │   │   ├── ProgrammeSection.jsx
│   │   │   ├── ReviewsSection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modals.jsx
│   │   │   └── index.js
│   │   ├── architect/             # Composants Prompt Architect
│   │   └── BeforeAfter.jsx
│   │
│   ├── constants/
│   │   └── paths.js               # Chemins et URLs centralisés
│   │
│   ├── data/
│   │   ├── promptData.js          # Données du Prompt Architect
│   │   └── modelLimits.json
│   │
│   ├── hooks/
│   │   ├── useCountdown.js        # Hook compte à rebours
│   │   ├── useScrollState.js      # Hook détection scroll
│   │   ├── usePromptGenerator.js  # Hook génération prompts
│   │   └── index.js
│   │
│   ├── pages/
│   │   ├── GenesisLanding.jsx     # Page landing principale
│   │   ├── PromptArchitect.jsx    # Outil Prompt Architect
│   │   └── GeneGym.jsx            # App GeneGym (protégée)
│   │
│   ├── App.jsx                    # Point d'entrée + routing
│   ├── App.css                    # Styles principaux
│   ├── index.css                  # Styles globaux + Tailwind
│   └── main.jsx                   # Bootstrap React
```

## 🛠️ Technologies

- **React 19** - Framework UI
- **Vite 7** - Build tool
- **TailwindCSS 3** - Styling utilitaire
- **React Router 7** - Navigation
- **Lucide React** - Icônes

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build
```

## 📱 PWA (Progressive Web App)

L'application supporte l'installation sur l'écran d'accueil :

1. **Desktop** : Icône "Installer" dans la barre d'adresse
2. **Mobile iOS** : Safari → Partager → "Sur l'écran d'accueil"
3. **Mobile Android** : Popup automatique ou menu → "Installer l'application"

### Fonctionnalités PWA

- ✅ Manifest.json configuré
- ✅ Service Worker avec cache offline
- ✅ Icons multiples tailles
- ✅ Theme color configuré
- ✅ Orientation any (portrait/landscape)

## 🎨 Architecture des Composants

Chaque composant suit le principe de **Responsabilité Unique** :

| Composant | Responsabilité |
|-----------|----------------|
| `Navbar` | Navigation + branding |
| `Hero` | Section héro + vidéo |
| `TrustSection` | Marquee partenaires |
| `ComparisonSection` | Avec/Sans Genesis |
| `TargetAudienceSection` | Profils cibles |
| `ProgrammeSection` | 6 modules formation |
| `ReviewsSection` | Témoignages |
| `PricingSection` | Tarification + FOMO |
| `FAQSection` | Questions fréquentes |
| `Footer` | Pied de page + légal |

## 🔗 Liens Importants

- **Instagram**: [@visuals.by.genesis](https://www.instagram.com/visuals.by.genesis/)
- **TikTok**: [@visuals.by.genesis](https://www.tiktok.com/@visuals.by.genesis)

## 📄 License

© 2026 Visuals by Genesis. All rights reserved.
