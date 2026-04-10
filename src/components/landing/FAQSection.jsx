/**
 * FAQ Section Component
 * Section questions fréquentes avec accordéon
 */
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
    {
        question: 'Faut-il un PC puissant pour créer des vidéos IA ?',
        answer: "Non. Nos méthodes Cloud fonctionnent sur n'importe quel ordinateur — PC ou Mac, même les modèles d'entrée de gamme. La majorité de nos 500+ membres utilisent des méthodes 100% Cloud sans aucune installation. Pour l'option locale (avancée), une carte NVIDIA est un plus mais reste totalement facultative."
    },
    {
        question: 'Cette formation est-elle adaptée aux débutants complets ?',
        answer: "Absolument. Aucun prérequis technique. Vous partez de zéro et le Module 1 vous prend en main étape par étape. La plupart de nos membres créent leur premier visuel exploitable en moins de 10 minutes. Nos méthodes « Zéro-Tech » ont été conçues spécifiquement pour les non-techniciens."
    },
    {
        question: 'Combien de temps pour voir des résultats concrets ?',
        answer: "La formation contient plus de 6 heures de vidéo dense, actionnables immédiatement. Nos membres les plus rapides décrochent leur premier client en 2 à 3 semaines. Vous avez un accès à vie et toutes les futures mises à jour incluses — le contenu évolue avec les outils IA."
    },
    {
        question: 'Y a-t-il une garantie de remboursement ?',
        answer: "Oui, garantie satisfait ou remboursé pendant 14 jours. Appliquez la méthode. Si après 14 jours vous n'avez pas créé de visuels de niveau professionnel, nous vous remboursons intégralement sur simple demande. Aucune question posée. Zéro risque de votre côté."
    },
    {
        question: 'Quels outils IA vais-je apprendre à utiliser ?',
        answer: "Midjourney, Runway Gen-3, Sora, Kling AI, Veo-3, ComfyUI, Stable Diffusion et nos outils IA privés exclusifs. Vous maîtriserez le workflow complet de la génération d'image à la vidéo cinématographique finalisée — les mêmes outils utilisés dans des productions professionnelles."
    }
];

const FAQSection = ({ activeFaq, setActiveFaq }) => {
    return (
        <section className="section-padding" aria-labelledby="faq-heading">
            <div className="container container-narrow">
                <h2 id="faq-heading" className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                    FAQ
                </h2>

                <div className="space-y-4" role="list">
                    {FAQ_ITEMS.map((item, idx) => (
                        <FaqItem
                            key={idx}
                            question={item.question}
                            answer={item.answer}
                            isOpen={activeFaq === idx}
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// FAQ Item Sub-component
const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="faq-item" role="listitem">
        <button
            className="faq-question"
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${question.replace(/\s/g, '-')}`}
        >
            {question}
            {isOpen ? (
                <ChevronUp className="text-purple-500" aria-hidden="true" />
            ) : (
                <ChevronDown className="text-gray-500" aria-hidden="true" />
            )}
        </button>
        <div
            id={`faq-answer-${question.replace(/\s/g, '-')}`}
            className={`faq-answer ${isOpen ? 'open' : ''}`}
            role="region"
            aria-hidden={!isOpen}
        >
            {answer}
        </div>
    </div>
);

export default FAQSection;
