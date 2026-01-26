/**
 * Hero Section Component
 * Section principale avec vidéo YouTube et appel à l'action
 */
import React from 'react';
import YouTube from 'react-youtube';
import { Play, ArrowRight, ChevronRight } from 'lucide-react';

const VIDEOS = ["mVfM2ogLpwc", "piJ78nUKtgI"];

const Hero = ({
    currentVideoIndex,
    onToggleVideo,
    onContactClick
}) => {
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="hero" role="banner">
            {/* Background Effects */}
            <div className="hero-bg" aria-hidden="true">
                <div className="grid-overlay"></div>
                <div className="radial-glow"></div>
            </div>

            <div className="container hero-main">
                {/* Top Header */}
                <div className="hero-top-header animate-fade-up">
                    <div className="hero-tag mb-6">
                        <span className="dot" aria-hidden="true"></span>
                        Formation Disponible • Accès exclusif
                    </div>
                    <h1 className="hero-title-main">
                        CRÉEZ DES <span className="text-gradient">VISUELS</span><br />
                        DE NIVEAU <span className="text-gradient">CINÉMA</span> EN 7 JOURS
                    </h1>
                </div>

                <div className="hero-split-layout">
                    {/* Left Actions */}
                    <div className="text-base hero-left-col animate-fade-up delay-100">
                        <p className="hero-desc">
                            Le workflow secret utilisé par les réalisateurs pour générer des revenus passifs et signer des clients premium. Même sans compétences techniques. Un workflow de réalisateurs pensé pour créer des vidéos IA exploitables et vendables.
                        </p>

                        <div className="hero-actions">
                            <button onClick={onContactClick} className="btn-primary">
                                Rejoindre l'Élite <ArrowRight size={20} aria-hidden="true" />
                            </button>
                            <a
                                href="#programme"
                                className="btn-secondary"
                                onClick={(e) => scrollToSection(e, 'programme')}
                            >
                                <Play size={20} fill="white" aria-hidden="true" /> Découvrir
                            </a>
                        </div>

                        {/* Social Proof */}
                        <SocialProof onClick={() => scrollToSection({ preventDefault: () => { } }, 'reviews')} />
                    </div>

                    {/* Right Video */}
                    <div className="video-card-wrapper animate-float relative group">
                        <div className="video-card">
                            <div className="video-aspect-container">
                                <YouTube
                                    key={currentVideoIndex}
                                    videoId={VIDEOS[currentVideoIndex]}
                                    opts={{
                                        height: '100%',
                                        width: '100%',
                                        playerVars: {
                                            autoplay: 1,
                                            controls: 0,
                                            rel: 0,
                                            modestbranding: 1,
                                            loop: 1,
                                            playlist: VIDEOS[currentVideoIndex],
                                        },
                                    }}
                                    onReady={(event) => {
                                        event.target.setVolume(20);
                                        event.target.playVideo();
                                    }}
                                    className="video-iframe-fill"
                                    title="Genesis AI Video Demo"
                                />
                            </div>
                            <div className="video-glow" aria-hidden="true"></div>
                        </div>

                        {/* Video Toggle Arrow */}
                        <button
                            onClick={onToggleVideo}
                            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 z-50"
                            aria-label="Vidéo suivante"
                        >
                            <ChevronRight size={24} className="text-white" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Social Proof Sub-component
const SocialProof = ({ onClick }) => (
    <div
        className="social-proof"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
        <div className="avatar-stack flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
                <img
                    key={i}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 345}&mouth=smile&eyebrows=default`}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-black bg-black transition-all duration-300 hover:shadow-[0_0_15px_#a855f7] hover:scale-110 hover:z-10"
                    loading="lazy"
                />
            ))}
        </div>
        <p className="text-sm ml-6">
            Rejoint par <strong>500+ créateurs</strong><br />
            dont <span className="text-purple-500">KOZI, ERON...</span>
        </p>
    </div>
);

export default Hero;
