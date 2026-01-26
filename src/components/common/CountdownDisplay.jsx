import React from 'react';

/**
 * Affiche un compte à rebours stylisé pour le FOMO
 * @param {Object} props
 * @param {{hours: number, minutes: number, seconds: number}} props.timeLeft
 * @param {boolean} small - Version compacte (pour modales/mobile)
 */
const CountdownDisplay = ({ timeLeft, small = false }) => {
    const pad = (n) => String(n).padStart(2, '0');

    // Classes CSS en fonction de la taille
    // Note: les classes CSS sont définies dans App.css
    const numberClass = small ? "countdown-number countdown-number-sm" : "countdown-number";
    const labelClass = small ? "countdown-label countdown-label-xs" : "countdown-label";
    const sepClass = small ? "countdown-sep countdown-sep-sm" : "countdown-sep";
    const containerClass = small ? "fomo-countdown fomo-countdown-mb" : "fomo-countdown";

    return (
        <div className={containerClass} role="timer" aria-label="Temps restant">
            <div className="countdown-item">
                <span className={numberClass}>{pad(timeLeft.hours)}</span>
                <span className={labelClass}>H</span>
            </div>
            <span className={sepClass} aria-hidden="true">:</span>
            <div className="countdown-item">
                <span className={numberClass}>{pad(timeLeft.minutes)}</span>
                <span className={labelClass}>Min</span>
            </div>
            <span className={sepClass} aria-hidden="true">:</span>
            <div className="countdown-item">
                <span className={numberClass}>{pad(timeLeft.seconds)}</span>
                <span className={labelClass}>Sec</span>
            </div>
        </div>
    );
};

export default CountdownDisplay;
