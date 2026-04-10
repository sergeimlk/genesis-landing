/**
 * Genesis Landing Page
 * Page principale de la landing page Genesis Academy
 * Utilise des composants modulaires pour une meilleure maintenabilité
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import {
    Navbar,
    Hero,
    TrustSection,
    ComparisonSection,
    TargetAudienceSection,
    ProgrammeSection,
    ReviewsSection,
    PricingSection,
    FAQSection,
    Footer,
    SecretModal,
    ContactModal,
    CgvModal
} from '../components/landing';
import { BeforeAfter } from '../components/BeforeAfter';
import PromptArchitect from './PromptArchitect';
import { ASSETS, EXTERNAL_LINKS } from '../constants/paths';

// Custom Hooks
import { useCountdown } from '../hooks/useCountdown';
import { useScrollState } from '../hooks/useScrollState';

const GenesisLanding = () => {
    const navigate = useNavigate();

    // State Management
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isCgvModalOpen, setIsCgvModalOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);

    // Custom Hooks
    const isScrolled = useScrollState(50);
    const timeLeft = useCountdown();

    // Handlers
    const toggleVideo = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % 2);
    };

    const handleSecretSuccess = () => {
        navigate('/genegym');
    };

    return (
        <div className="app">
            {/* Navigation */}
            <Navbar
                isScrolled={isScrolled}
                onSecretClick={() => setIsSecretModalOpen(true)}
                onContactClick={() => setIsContactModalOpen(true)}
            />

            {/* Hero Section */}
            <Hero
                currentVideoIndex={currentVideoIndex}
                onToggleVideo={toggleVideo}
                onContactClick={() => setIsContactModalOpen(true)}
            />

            {/* Trust Marquee */}
            <TrustSection />

            {/* Reviews */}
            <ReviewsSection />

            {/* Programme Modules */}
            <ProgrammeSection />

            {/* Pricing */}
            <PricingSection timeLeft={timeLeft} />

            {/* Target Audience */}
            <TargetAudienceSection />

            {/* Comparison: Old vs New Way */}
            <ComparisonSection />

            {/* Before/After Transformation Demo */}
            <section className="section-padding bg-black/50">
                <div className="container">
                    <h2 className="text-center mb-4 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                        AVANT / APRÈS — LA PUISSANCE DE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">L'IA</span>
                    </h2>
                    <p className="text-center text-gray-400 mb-10">Glissez le curseur pour voir la transformation</p>
                    <div className="max-w-4xl mx-auto mt-10">
                        <BeforeAfter
                            beforeImage={ASSETS.IMAGES.ERIC_BEFORE}
                            afterImage={ASSETS.IMAGES.ERIC}
                        />
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section-padding" id="contact-form">
                <div className="container container-narrow">
                    <h2 className="text-center mb-4 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                        PRÊT À <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">CRÉER & MONÉTISER</span> ?
                    </h2>
                    <p className="text-center text-gray-400 mb-10">Remplis le formulaire — on te recontacte sous 24h</p>
                    <div className="w-full h-[600px] md:h-[800px] bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl mb-24 px-4 md:px-12">
                        <iframe
                            src={EXTERNAL_LINKS.CONTACT_FORM_URL}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Formulaire de contact"
                            className="iframe-transparent bg-white/5"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection activeFaq={activeFaq} setActiveFaq={setActiveFaq} />

            {/* Footer */}
            <Footer
                onCgvClick={() => setIsCgvModalOpen(true)}
                onContactClick={() => setIsContactModalOpen(true)}
            />

            {/* Modals */}
            <SecretModal
                isOpen={isSecretModalOpen}
                onClose={() => setIsSecretModalOpen(false)}
                onSuccess={handleSecretSuccess}
            />

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />

            <CgvModal
                isOpen={isCgvModalOpen}
                onClose={() => setIsCgvModalOpen(false)}
            />
        </div>
    );
};

export default GenesisLanding;
