/**
 * Button Component
 * Composant bouton réutilisable avec différentes variantes
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'cta' | 'ghost'} variant - Style du bouton
 * @param {React.ReactNode} children - Contenu du bouton
 * @param {string} className - Classes CSS additionnelles
 * @param {boolean} fullWidth - Bouton pleine largeur
 * @param {React.ReactNode} icon - Icône optionnelle
 * @param {string} href - Si fourni, rend un lien au lieu d'un bouton
 */
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Button = ({
    variant = 'primary',
    children,
    className = '',
    fullWidth = false,
    icon,
    href,
    onClick,
    disabled = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:translate-y-[-2px] focus:ring-purple-500',
        secondary: 'bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/20 backdrop-blur-sm focus:ring-white/50',
        cta: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-lg shadow-xl shadow-purple-600/40 hover:shadow-purple-600/60 hover:scale-105 active:scale-95 focus:ring-purple-500',
        ghost: 'text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 focus:ring-white/30'
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const combinedClassName = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

    const content = (
        <>
            {children}
            {icon || (variant === 'cta' && <ArrowRight size={20} />)}
        </>
    );

    if (href) {
        return (
            <a href={href} className={combinedClassName} {...props}>
                {content}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;
