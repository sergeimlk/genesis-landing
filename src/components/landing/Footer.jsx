/**
 * Footer Component
 * Pied de page avec liens sociaux et légaux
 */
import React from 'react';
import { Instagram } from 'lucide-react';
import { EXTERNAL_LINKS } from '../../constants/paths';

const Footer = ({ onCgvClick, onContactClick }) => {
    return (
        <footer className="py-12 bg-black border-t border-white/10 text-center" role="contentinfo">
            <div className="container">
                <h2 className="footer-title">GENESIS</h2>

                {/* Social Links */}
                <nav className="flex justify-center gap-6 mb-8" aria-label="Réseaux sociaux">
                    <a
                        href={EXTERNAL_LINKS.INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors"
                        aria-label="Instagram Genesis"
                    >
                        <Instagram size={24} aria-hidden="true" />
                    </a>
                    <a
                        href={EXTERNAL_LINKS.TIKTOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors"
                        aria-label="TikTok Genesis"
                    >
                        <TikTokIcon />
                    </a>
                </nav>

                {/* Copyright */}
                <p className="text-muted text-sm mb-8">© 2026 Visuals by Genesis. All rights reserved.</p>

                {/* Legal Links */}
                <nav className="flex-center gap-6 text-sm text-muted" aria-label="Liens légaux">
                    <a href={EXTERNAL_LINKS.CONTACT_LINK} target="_blank" rel="noopener noreferrer">
                        Mentions Légales
                    </a>
                    <button onClick={onCgvClick} className="hover:text-white transition-colors">
                        CGV
                    </button>
                    <a href={EXTERNAL_LINKS.CONTACT_LINK} target="_blank" rel="noopener noreferrer">
                        RGPD
                    </a>
                    <button onClick={onContactClick} className="hover:text-white transition-colors">
                        Contact
                    </button>
                </nav>
            </div>
        </footer>
    );
};

// TikTok Icon (Lucide doesn't have one)
const TikTokIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default Footer;
