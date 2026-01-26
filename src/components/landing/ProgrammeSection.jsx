/**
 * Programme Section Component
 * Affiche les 6 modules de la formation
 */
import React from 'react';
import { Zap, Film, Monitor, ShieldCheck, Users, Star, Check, Sparkles } from 'lucide-react';

const MODULES = [
    {
        step: 1,
        icon: Zap,
        title: 'Clarté & Positionnement',
        objective: 'Savoir où aller et pourquoi',
        items: [
            'Analyse du profil',
            'Identification de secteurs réalistes',
            "Choix d'une niche exploitable",
            "Définition d'un objectif concret"
        ],
        deliverable: 'Direction claire, axe de travail défini, cadre réaliste'
    },
    {
        step: 2,
        icon: Film,
        title: 'Compétence Vidéo IA',
        objective: 'Produire des vidéos IA montrables',
        items: [
            "Création d'images et vidéos IA",
            'Logique de rendu professionnel',
            'Cohérence visuelle',
            'Simplicité et efficacité'
        ],
        deliverable: 'Premiers visuels exploitables, base de portfolio'
    },
    {
        step: 3,
        icon: Monitor,
        title: 'Structuration du Portfolio',
        objective: 'Crédibilité auprès des prospects',
        items: [
            'Sélection des bons visuels',
            'Présentation claire',
            'Logique de valeur'
        ],
        deliverable: 'Mini-portfolio clair et professionnel'
    },
    {
        step: 4,
        icon: ShieldCheck,
        title: "Construction de l'Offre",
        objective: 'Ne plus dire "je fais un peu de tout"',
        items: [
            "Définition d'une offre simple",
            'Clarification du service',
            'Cadrage du prix',
            'Message clair'
        ],
        deliverable: 'Offre compréhensible et discours clair'
    },
    {
        step: 5,
        icon: Users,
        title: 'Prospection & Action',
        objective: 'Sortir de la théorie',
        items: [
            'Choix des canaux adaptés',
            'Messages simples',
            'Posture professionnelle',
            'Gestion des échanges'
        ],
        deliverable: 'Premières démarches et conversations réelles'
    },
    {
        step: 6,
        icon: Star,
        title: 'Ajustements & Consolidation',
        objective: 'Solidifier ce qui fonctionne',
        items: [
            'Analyse des retours',
            "Ajustement de l'offre",
            'Optimisation de la méthode',
            'Projection sur la suite'
        ],
        deliverable: 'Système clair et autonomie renforcée'
    }
];

const ProgrammeSection = () => {
    return (
        <section id="programme" className="section-padding bg-black/50">
            <div className="container">
                <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                    LE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">PROGRAMME</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
                    6 étapes concrètes pour passer de zéro à autonome dans la création et la vente de vidéos IA
                </p>

                <div className="modules-grid">
                    {MODULES.map((module) => (
                        <ModuleCard key={module.step} {...module} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Module Card Sub-component
const ModuleCard = ({ step, icon: Icon, title, objective, items, deliverable }) => (
    <article className="module-card-detailed group">
        <div className="module-step-badge">ÉTAPE {step}</div>
        <div className="module-icon"><Icon aria-hidden="true" /></div>
        <h3 className="module-title">{title}</h3>
        <p className="module-objective">
            <Sparkles size={14} className="inline mr-1 text-purple-400" aria-hidden="true" />
            {objective}
        </p>
        <ul className="module-list" aria-label={`Contenu de l'étape ${step}`}>
            {items.map((item, idx) => (
                <li key={idx}>
                    <Check size={14} className="text-purple-400" aria-hidden="true" /> {item}
                </li>
            ))}
        </ul>
        <div className="module-deliverable">
            <span className="deliverable-label">Livrable:</span>
            <span>{deliverable}</span>
        </div>
    </article>
);

export default ProgrammeSection;
