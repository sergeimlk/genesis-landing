/**
 * FAQ Section Component
 * Section questions fréquentes avec accordéon
 */
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
    {
        question: 'Faut-il un PC de gamer ?',
        answer: "Non ! Nous montrons des méthodes Cloud qui tournent sur n'importe quel ordinateur, même un Mac. Pour la partie locale (optimale), une carte NVIDIA est recommandée mais pas obligatoire."
    },
    {
        question: 'Est-ce adapté aux débutants ?',
        answer: 'Absolument. Nous partons de zéro. Le module 1 est dédié à la prise en main des outils. Vous créerez votre première image en 10 minutes.'
    },
    {
        question: 'Combien de temps dure la formation ?',
        answer: "C'est une formation dense et concise pour aller droit au but. Comptez environ 6 heures de vidéo, plus le temps de pratique."
    },
    {
        question: 'Y a-t-il une garantie ?',
        answer: "Oui. Essayez la méthode pendant 14 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement. Aucun risque."
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
