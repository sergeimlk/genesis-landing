/**
 * TextHoverEffect — Aceternity-style SVG text with animated gradient outline on hover
 * Inspired by x.ai branding. Mouse position drives a radial gradient mask that
 * reveals a rainbow-to-brand-purple gradient stroke on the text.
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
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 800 200"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none cursor-default"
            aria-label={text}
            role="img"
        >
            <defs>
                {/* Animated gradient that rotates around the text */}
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="20%" stopColor="#ec4899" />
                    <stop offset="40%" stopColor="#8b5cf6" />
                    <stop offset="60%" stopColor="#a855f7" />
                    <stop offset="80%" stopColor="#db2777" />
                    <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>

                {/* Radial gradient mask that follows mouse — reveals the gradient text */}
                <radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="25%"
                    cx={maskPosition.cx}
                    cy={maskPosition.cy}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </radialGradient>

                <mask id="textMask">
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#revealMask)"
                        style={{
                            transition: `all ${duration}s ease`,
                        }}
                    />
                </mask>
            </defs>

            {/* Layer 1: Always-visible dim outline (base state) */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: 'clamp(3rem, 12vw, 9rem)',
                    opacity: hovered ? 0.1 : 0.15,
                    color: 'rgba(255,255,255,0.3)',
                    transition: `opacity ${duration}s ease`,
                    letterSpacing: '0.15em',
                }}
            >
                {text}
            </text>

            {/* Layer 2: Gradient outline — only visible through cursor mask */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="url(#textGradient)"
                strokeWidth="1.5"
                mask="url(#textMask)"
                style={{
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 900,
                    fontSize: 'clamp(3rem, 12vw, 9rem)',
                    letterSpacing: '0.15em',
                    filter: hovered ? 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' : 'none',
                    transition: `filter ${duration}s ease`,
                }}
            >
                {text}
            </text>
        </svg>
    );
};

export default TextHoverEffect;
