/**
 * Navbar Component
 * Barre de navigation principale avec effet scroll et logo cliquable
 */
import React from 'react';
import { ASSETS } from '../../constants/paths';

const Navbar = ({
    isScrolled,
    onSecretClick,
    onContactClick
}) => {
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navigation principale">
            <div className="container nav-container">
                {/* Logo */}
                <div
                    className="logo-container"
                    onClick={onSecretClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSecretClick()}
                    aria-label="Genesis - Accès membre"
                >
                    <img
                        src={ASSETS.LOGO.MAIN}
                        alt="Genesis Logo"
                        className="t-logo"
                        loading="eager"
                    />
                    <h2 className="footer-title ml-2 mt-5">GENESIS</h2>
                </div>

                {/* Navigation Links */}
                <div className="nav-links-group">
                    <a
                        href="#programme"
                        className="link-nav nav-link-item"
                        onClick={(e) => scrollToSection(e, 'programme')}
                    >
                        Programme
                    </a>
                    <a
                        href="#reviews"
                        className="link-nav nav-link-item"
                        onClick={(e) => scrollToSection(e, 'reviews')}
                    >
                        Avis
                    </a>
                    <button
                        onClick={onContactClick}
                        className="btn-cta-nav"
                        aria-label="Rejoindre Genesis"
                    >
                        <span className="btn-cta-nav-content">Rejoindre</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
