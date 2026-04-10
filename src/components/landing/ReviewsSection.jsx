/**
 * Reviews Section Component
 * Section témoignages clients
 */
import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
    {
        name: 'Sergeï',
        role: 'Créateur de Contenu',
        text: "En 3 semaines j'avais un portfolio complet sur Instagram. Grâce à Genesis j'ai signé mes 2 premiers clients à 300€ chacun. Le ROI est immédiat."
    },
    {
        name: 'Eric',
        role: 'Artiste & Vidéaste',
        text: "Rentabilisé en 2 clips. Mes vidéos passent de 2K à 80K vues. L'accompagnement est ultra précis — ils ne te lâchent pas tant que tu n'as pas le résultat."
    },
    {
        name: 'Sarah L.',
        role: 'Marque Streetwear',
        text: "Mes campagnes TikTok ont explosé : +340% d'engagement. Des visuels que personne d'autre peut produire. Genesis m'a donné une avance de 2 ans sur mes concurrents."
    }
];

const ReviewsSection = () => {
    return (
        <section id="reviews" className="section-padding">
            <div className="container">
                <h2 className="text-center mb-4 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                    CE QU'ILS EN <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">PENSENT</span>
                </h2>
                <p className="text-center text-gray-400 mb-10">500+ créateurs formés — résultats réels, aucun filtre</p>

                <div className="modules-grid" role="list" aria-label="Témoignages clients">
                    {REVIEWS.map((review, idx) => (
                        <ReviewCard key={idx} {...review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Review Card Sub-component
const ReviewCard = ({ name, role, text }) => (
    <article className="card" role="listitem">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4" aria-label="5 étoiles sur 5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-gold" aria-hidden="true" />
            ))}
        </div>

        {/* Quote */}
        <blockquote className="italic text-muted mb-6">"{text}"</blockquote>

        {/* Author */}
        <footer className="flex items-center gap-4">
            <div className="review-avatar" aria-hidden="true">
                {name.charAt(0)}
            </div>
            <div>
                <cite className="font-bold text-sm not-italic">{name}</cite>
                <p className="text-xs text-purple-400">{role}</p>
            </div>
        </footer>
    </article>
);

export default ReviewsSection;
