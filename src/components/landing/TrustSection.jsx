/**
 * Trust Section Component
 * Marquee de logos/noms des clients qui font confiance.
 * TextHoverEffect "GENESIS" en fond — cursor tracking sur toute la section.
 */
import React, { useRef, useState, useEffect } from 'react';

const BRANDS = [
    'KOZI', 'GUY2BEZBAR', 'GENEZIO', 'MAYO', 'KABBSKY',
    'DMG', 'R2', '360 OTG', 'ERON', 'BELIEVE'
];

/* ─── Inline TextHoverEffect (section-aware cursor tracking) ──────────── */
const GenesisBackground = ({ sectionRef }) => {
    const svgRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [maskPos, setMaskPos] = useState({ cx: '50%', cy: '50%' });

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleMove = (e) => {
            if (!svgRef.current) return;
            const rect = svgRef.current.getBoundingClientRect();
            const cx = ((e.clientX - rect.left) / rect.width) * 100;
            const cy = ((e.clientY - rect.top) / rect.height) * 100;
            setMaskPos({ cx: `${cx}%`, cy: `${cy}%` });
            setHovered(true);
        };
        const handleLeave = () => setHovered(false);

        section.addEventListener('mousemove', handleMove);
        section.addEventListener('mouseleave', handleLeave);
        return () => {
            section.removeEventListener('mousemove', handleMove);
            section.removeEventListener('mouseleave', handleLeave);
        };
    }, [sectionRef]);

    return (
        /*
         * viewBox "0 0 900 280"
         * fontSize 172 SVG units → cap-height ≈ 120px
         * y="212" → text sits in the bottom 75 % of the space (pushed low)
         * letterSpacing 10px → "GENESIS" fills ≈ 95 % of 900-unit width
         */
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 900 280"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="select-none cursor-default"
            aria-hidden="true"
            style={{ pointerEvents: 'none' }}
        >
            <defs>
                <linearGradient id="tg-trust" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="0">
                    <stop offset="0%"   stopColor="#7c3aed" />
                    <stop offset="25%"  stopColor="#9333ea" />
                    <stop offset="50%"  stopColor="#ec4899" />
                    <stop offset="75%"  stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>

                <radialGradient id="rm-trust" gradientUnits="userSpaceOnUse" r="230" cx={maskPos.cx} cy={maskPos.cy}>
                    <stop offset="0%"   stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </radialGradient>

                <mask id="tm-trust">
                    <rect x="0" y="0" width="900" height="280" fill="url(#rm-trust)" style={{ transition: 'all 0.35s ease' }} />
                </mask>
            </defs>

            {/* Dim base outline */}
            <text
                x="450" y="212"
                textAnchor="middle" dominantBaseline="middle"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.8"
                style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: '172px',
                    letterSpacing: '10px',
                    opacity: hovered ? 0.08 : 0.15,
                    transition: 'opacity 0.35s ease',
                }}
            >
                GENESIS
            </text>

            {/* Gradient stroke revealed by cursor */}
            <text
                x="450" y="212"
                textAnchor="middle" dominantBaseline="middle"
                fill="none"
                stroke="url(#tg-trust)"
                strokeWidth="1.4"
                mask="url(#tm-trust)"
                style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: '172px',
                    letterSpacing: '10px',
                    filter: hovered ? 'drop-shadow(0 0 14px rgba(168,85,247,0.7))' : 'none',
                    transition: 'filter 0.35s ease',
                }}
            >
                GENESIS
            </text>
        </svg>
    );
};

/* ─── TrustSection ────────────────────────────────────────────────────── */
const TrustSection = () => {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            className="trust-section relative overflow-hidden"
            aria-label="Nos partenaires et clients"
            style={{ padding: '96px 0 48px', minHeight: '340px' }}
        >
            {/* GENESIS background — absolutely fills section, pointer-events disabled so marquee stays interactive */}
            <div className="absolute inset-0 z-0" aria-hidden="true" style={{ padding: '0 3%' }}>
                <GenesisBackground sectionRef={sectionRef} />
            </div>

            {/* Vignette — darkens edges so marquee text stays legible */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                aria-hidden="true"
                style={{
                    background:
                        'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 25%, rgba(0,0,0,0.52) 100%)',
                }}
            />

            {/* Foreground content */}
            <div className="relative z-20">
                <p className="trust-title">Ils nous font confiance</p>

                <div className="marquee-container" role="marquee" aria-label="Défilement des marques partenaires">
                    <div className="marquee-track marquee-normal">
                        {BRANDS.map((brand, idx) => (
                            <span key={idx} className="marquee-item">{brand}</span>
                        ))}
                        {BRANDS.map((brand, idx) => (
                            <span key={`dup-${idx}`} className="marquee-item" aria-hidden="true">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
