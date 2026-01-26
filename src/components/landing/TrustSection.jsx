/**
 * Trust Section Component
 * Marquee de logos/noms des clients qui font confiance
 */
import React from 'react';

const BRANDS = [
    'KOZI', 'GUY2BEZBAR', 'GENEZIO', 'MAYO', 'KABBSKY',
    'DMG', 'R2', '360 OTG', 'ERON', 'BELIEVE'
];

const TrustSection = () => {
    return (
        <section className="section-padding trust-section" aria-label="Nos partenaires et clients">
            <p className="trust-title">Ils nous font confiance</p>

            <div className="marquee-container" role="marquee" aria-label="Défilement des marques partenaires">
                <div className="marquee-track marquee-normal">
                    {/* First set */}
                    {BRANDS.map((brand, idx) => (
                        <span key={idx} className="marquee-item">{brand}</span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {BRANDS.map((brand, idx) => (
                        <span key={`dup-${idx}`} className="marquee-item" aria-hidden="true">{brand}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
