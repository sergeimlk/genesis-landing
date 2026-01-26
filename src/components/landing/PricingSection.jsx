/**
 * Pricing Section Component
 * Section tarification avec countdown et FOMO
 */
import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import CountdownDisplay from '../common/CountdownDisplay';

const FEATURES = [
    { text: '+6H de formation vidéo', icon: Check },
    { text: 'PDF Récapitulatif 32 pages', icon: Check },
    { text: 'Accès outils IA privés', icon: Check },
    { text: 'Workflow "Visuals by Genesis"', icon: Check },
    { text: 'Support Communautaire', icon: Check },
    { text: "On ne te lachera pas tant que tu n'auras pas atteint tes objectifs!", icon: ShieldCheck, highlight: true }
];

const PricingSection = ({ timeLeft }) => {
    const scrollToContact = (e) => {
        e.preventDefault();
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-20 pointer-events-none" aria-hidden="true"></div>

            <div className="container relative z-10">
                <article className="pricing-card">
                    {/* Header with FOMO */}
                    <header className="pricing-header">
                        <div className="fomo-container">
                            <div className="fomo-label">⚡ OFFRE DE LANCEMENT</div>
                            <div className="fomo-warning">Le prix double ce soir à minuit !</div>

                            {/* Countdown */}
                            <CountdownDisplay timeLeft={timeLeft} />
                        </div>

                        <div className="fomo-urgency-tag animate-pulse-fast">
                            ⚠️ PLUS QUE 5 PLACES !
                        </div>

                        <h3 className="font-orbitron font-bold text-2xl mt-4">GENESIS ACADEMY</h3>
                        <p className="text-muted text-sm">Accès illimité à vie + Mises à jour</p>
                    </header>

                    {/* Pricing Content */}
                    <div className="p-8 text-center">
                        <div className="flex-center mb-4">
                            <span className="old-price">800€</span>
                            <span className="price">499€</span>
                        </div>

                        {/* Features List */}
                        <ul className="text-left space-y-4 mb-8 pricing-features-container" aria-label="Ce qui est inclus">
                            {FEATURES.map(({ text, icon: Icon, highlight }, idx) => (
                                <li key={idx} className={`list-item ${highlight ? 'font-bold text-white' : ''}`}>
                                    <Icon size={20} className={highlight ? 'text-cyan-400' : 'text-purple-500'} aria-hidden="true" />
                                    {text}
                                </li>
                            ))}
                        </ul>

                        <a href="#contact-form" onClick={scrollToContact} className="btn-join-main">
                            CHOISIR MON MODULE
                        </a>

                        <p className="flex-center text-xs text-muted mt-4">
                            Paiement sécurisé via Stripe/PayPal
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
};

// Countdown Timer Sub-component REMOVED - using common/CountdownDisplay instead
export default PricingSection;
