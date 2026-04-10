/**
 * HoverBorderGradient — Aceternity-style animated conic-gradient border.
 *
 * How it works:
 *  1. The outer container clips overflow with a 2px "padding" acting as border thickness.
 *  2. A spinning conic-gradient div fills the full container background.
 *  3. The inner Tag sits on top with a dark background — revealing only the gradient edges.
 *  4. A blurred copy of the gradient behind creates the glow.
 *
 * Usage:
 *   <HoverBorderGradient as="a" href="#..." containerClassName="rounded-full">
 *     content
 *   </HoverBorderGradient>
 */
import React, { useState } from 'react';

const HoverBorderGradient = ({
    as: Tag = 'button',
    children,
    containerClassName = '',
    className = '',
    duration = 1.4,
    clockwise = true,
    innerBackground = 'transparent',
    ...props
}) => {
    const [hovered, setHovered] = useState(false);

    const deg = clockwise ? 360 : -360;
    const keyframes = `
        @keyframes hbg-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(${deg}deg); }
        }
    `;

    const gradient = 'conic-gradient(from 0deg, #7c3aed 0%, #9333ea 25%, #ec4899 50%, #a855f7 75%, #7c3aed 100%)';

    return (
        <>
            <style>{keyframes}</style>

            {/* Outer container — overflow:hidden + padding = border thickness */}
            <div
                className={containerClassName}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    display: 'inline-flex',
                    borderRadius: 'inherit',
                    padding: '2px',
                    overflow: 'hidden',
                }}
            >
                {/* Spinning gradient (fills container, clipped by overflow:hidden) */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: '-100%',          /* oversized so rotation corners don't show gaps */
                        background: gradient,
                        animation: `hbg-spin ${duration}s linear infinite`,
                        animationPlayState: hovered ? 'running' : 'paused',
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.35s ease',
                        zIndex: 0,
                    }}
                />

                {/* Glow layer behind */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: '-100%',
                        background: gradient,
                        filter: 'blur(10px)',
                        animation: `hbg-spin ${duration}s linear infinite`,
                        animationPlayState: hovered ? 'running' : 'paused',
                        opacity: hovered ? 0.35 : 0,
                        transition: 'opacity 0.35s ease',
                        zIndex: 0,
                    }}
                />

                {/* Actual button — dark background to reveal the border illusion */}
                <Tag
                    {...props}
                    className={className}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        background: innerBackground,
                        borderRadius: 'inherit',
                        border: 'none',
                    }}
                >
                    {children}
                </Tag>
            </div>
        </>
    );
};

export default HoverBorderGradient;
