/**
 * App.jsx - Application Root
 * 
 * Point d'entrée principal de l'application Genesis Academy
 * Gère le routing et les composants globaux (Flash Offer)
 * 
 * Architecture:
 * - Pages séparées dans /pages
 * - Composants réutilisables dans /components
 * - Logique métier dans /hooks
 * - Constantes dans /constants
 */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { X, ShieldCheck } from 'lucide-react';

// Styles
import './App.css';

// Pages
import GenesisLanding from './pages/GenesisLanding';
import PromptArchitect from './pages/PromptArchitect';
import GeneGym from './pages/GeneGym';

// Hooks
import { useCountdown } from './hooks/useCountdown';

// Constants
import { EXTERNAL_LINKS } from './constants/paths';

// ==============================
// PROTECTED ROUTE COMPONENT
// ==============================
const ProtectedRoute = ({ children }) => {
  const isAllowed = localStorage.getItem('genegym_access') === 'true';
  return isAllowed ? children : <Navigate to="/" replace />;
};

// ==============================
// FLASH OFFER MODAL COMPONENT
// ==============================
export const FlashOfferModal = ({ isOpen, onClose }) => {
  const timeLeft = useCountdown();

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay modal-z-high"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flash-offer-title"
    >
      <div className="relative w-full max-w-[400px] mx-auto animate-fade-up">
        <button
          onClick={onClose}
          className="absolute -top-12 -right-2 text-white/80 hover:text-white p-2 transition-colors z-50"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>

        <div className="modal-content modal-content-flash">
          <div className="pricing-card pricing-card-modal">
            <div className="pricing-header pricing-header-compact">
              <div className="fomo-container">
                <div className="fomo-label fomo-label-sm">⚡ OFFRE DE LANCEMENT</div>
                <div className="fomo-warning fomo-warning-sm">Le prix double ce soir à minuit !</div>

                <div className="fomo-countdown fomo-countdown-mb" role="timer" aria-label="Temps restant">
                  <div className="countdown-item">
                    <span className="countdown-number countdown-number-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label countdown-label-xs">H</span>
                  </div>
                  <span className="countdown-sep countdown-sep-sm" aria-hidden="true">:</span>
                  <div className="countdown-item">
                    <span className="countdown-number countdown-number-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label countdown-label-xs">Min</span>
                  </div>
                  <span className="countdown-sep countdown-sep-sm" aria-hidden="true">:</span>
                  <div className="countdown-item">
                    <span className="countdown-number countdown-number-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label countdown-label-xs">Sec</span>
                  </div>
                </div>
              </div>

              <div className="fomo-urgency-tag animate-pulse-fast fomo-urgency-sm">
                ⚠️ PLUS QUE 5 PLACES !
              </div>

              <h3 id="flash-offer-title" className="font-orbitron font-bold text-lg mt-2">GENESIS ACADEMY</h3>
              <p className="text-muted text-xs">Accès illimité à vie + Mises à jour</p>
            </div>

            <div className="p-6 text-center bg-black/50">
              <div className="flex-center mb-3">
                <span className="old-price old-price-sm">800€</span>
                <span className="price price-lg">499€</span>
              </div>

              <a
                href={EXTERNAL_LINKS.CONTACT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-join-main btn-join-full"
              >
                CHOISIR <br /> MON MODULE
              </a>

              <p className="flex-center text-xs text-muted mt-4">
                Paiement sécurisé via Stripe/PayPal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================
// MAIN APP COMPONENT
// ==============================
const App = () => {
  const [showFlashOffer, setShowFlashOffer] = useState(false);

  useEffect(() => {
    // 30% chance to show the popup on load
    if (Math.random() < 0.3) {
      // Small delay to not be too aggressive
      const timer = setTimeout(() => setShowFlashOffer(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenesisLanding />} />
        <Route path="/prompt" element={<PromptArchitect />} />
        <Route
          path="/genegym"
          element={
            <ProtectedRoute>
              <GeneGym />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <FlashOfferModal isOpen={showFlashOffer} onClose={() => setShowFlashOffer(false)} />
    </Router>
  );
};

export default App;
