/**
 * useScrollState Hook
 * Détecte si l'utilisateur a scrollé au-delà d'un seuil
 */
import { useState, useEffect } from 'react';

export const useScrollState = (threshold = 50) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        // Check initial state
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
};

export default useScrollState;
