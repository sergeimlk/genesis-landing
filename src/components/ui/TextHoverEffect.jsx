/**
 * TextHoverEffect — Aceternity/x.ai style SVG text with animated gradient outline on hover.
 * Uses SVG-unit font sizing so the text scales proportionally at ALL screen sizes.
 * Mouse position drives a radial gradient mask revealing a purple→pink gradient stroke.
 */
import React, { useRef, useState, useEffect } from 'react';

const TextHoverEffect = ({ text, duration = 0.4 }) => {
    const svgRef = useRef(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercent = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercent = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercent}%`,
                cy: `${cyPercent}%`,
            });
        }
    }, [cursor]);

    return (
        /*
         * viewBox "0 0 800 230":
         *   - 800 units wide, 230 tall
         *   - Text at y="50%" = 115 units from top
         *   - fontSize 138 → cap-height ≈ 96 units → ~48 units margin top & bottom
         *   - letterSpacing 0.12em ≈ 16.5 units/char → "GENESIS" fills ~86% of width
         */
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 800 230"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none cursor-default"
            aria-label={text}
            role="img"
        >
            <defs>
                {/* Purple → pink → violet gradient for the stroke */}
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="800"
                    y2="0"
                >
                    <stop offset="0%"   stopColor="#7c3aed" />
                    <stop offset="25%"  stopColor="#9333ea" />
                    <stop offset="50%"  stopColor="#ec4899" />
                    <stop offset="75%"  stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>

                {/* Radial reveal mask — follows cursor */}
                <radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="200"
                    cx={maskPosition.cx}
                    cy={maskPosition.cy}
                >
                    <stop offset="0%"   stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </radialGradient>

                <mask id="textMask">
                    <rect
                        x="0"
                        y="0"
                        width="800"
                        height="230"
                        fill="url(#revealMask)"
                        style={{ transition: `all ${duration}s ease` }}
                    />
                </mask>
            </defs>

            {/* Layer 1: Always-visible faint outline (base state) */}
            <text
                x="400"
                y="115"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.8"
                style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: '138px',
                    letterSpacing: '16px',
                    opacity: hovered ? 0.1 : 0.18,
                    transition: `opacity ${duration}s ease`,
                }}
            >
                {text}
            </text>

            {/* Layer 2: Gradient stroke — revealed only under cursor mask */}
            <text
                x="400"
                y="115"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="url(#textGradient)"
                strokeWidth="1.2"
                mask="url(#textMask)"
                style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: '138px',
                    letterSpacing: '16px',
                    filter: hovered
                        ? 'drop-shadow(0 0 12px rgba(168,85,247,0.7))'
                        : 'none',
                    transition: `filter ${duration}s ease`,
                }}
            >
                {text}
            </text>
        </svg>
    );
};

export default TextHoverEffect;
