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
      className="fixed inset-0 z-[3000] flex items-center justify-center p-5 bg-black/90 backdrop-blur-md animate-fade-up"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flash-offer-title"
    >
      <div className="relative w-full max-w-[400px] mx-auto animate-fade-up">
        <button
          onClick={onClose}
          className="absolute -top-12 -right-2 text-white/80 hover:text-white p-2 transition-colors z-50 transform hover:scale-110"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>

        <div className="w-full bg-[#050505] border border-purple-600/50 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-b from-purple-900/20 to-black p-6 text-center border-b border-white/10">

            {/* FOMO Container */}
            <div className="relative bg-gradient-to-br from-red-600/10 to-purple-500/5 border-2 border-red-600/40 rounded-2xl p-5 mb-5 overflow-hidden animate-pulse">
              <div className="font-orbitron text-[0.7rem] font-bold text-amber-400 tracking-[2px] uppercase mb-2">⚡ OFFRE DE LANCEMENT</div>
              <div className="text-sm font-semibold text-red-300 mb-4">Le prix double ce soir à minuit !</div>

              {/* Countdown */}
              <div className="flex justify-center items-center gap-3 mb-1" role="timer" aria-label="Temps restant">
                <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-xl p-2 min-w-[65px]">
                  <span className="font-orbitron text-2xl font-black text-white leading-none drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[0.6rem] text-gray-400 uppercase tracking-widest mt-1">H</span>
                </div>
                <span className="font-orbitron text-xl font-black text-red-500 animate-pulse" aria-hidden="true">:</span>
                <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-xl p-2 min-w-[65px]">
                  <span className="font-orbitron text-2xl font-black text-white leading-none drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[0.6rem] text-gray-400 uppercase tracking-widest mt-1">Min</span>
                </div>
                <span className="font-orbitron text-xl font-black text-red-500 animate-pulse" aria-hidden="true">:</span>
                <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-xl p-2 min-w-[65px]">
                  <span className="font-orbitron text-2xl font-black text-white leading-none drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[0.6rem] text-gray-400 uppercase tracking-widest mt-1">Sec</span>
                </div>
              </div>
            </div>

            <div className="inline-block bg-red-600/20 border border-red-600/50 text-red-400 px-4 py-1.5 rounded-full font-extrabold text-[0.7rem] tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.2)] animate-pulse">
              ⚠️ PLUS QUE 5 PLACES !
            </div>

            <h3 id="flash-offer-title" className="font-orbitron font-bold text-xl mt-5 text-white tracking-wide">GENESIS ACADEMY</h3>
            <p className="text-gray-400 text-xs mt-1">Accès illimité à vie + Mises à jour</p>
          </div>

          <div className="p-6 text-center bg-black/40">
            <div className="flex justify-center items-center mb-5 gap-3">
              <span className="line-through text-gray-500 text-lg">800€</span>
              <span className="font-orbitron text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">499€</span>
            </div>

            <a
              href={EXTERNAL_LINKS.CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center items-center w-full p-4 text-lg tracking-[2px] uppercase bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all transform hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(147,51,234,0.6)] relative overflow-hidden"
            >
              <span className="relative z-10 text-center leading-tight">CHOISIR <br /> MON MODULE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>

            <p className="flex justify-center items-center text-[0.7rem] text-gray-500 mt-5 opacity-80">
              <ShieldCheck size={12} className="mr-1" /> Paiement sécurisé via Stripe/PayPal
            </p>
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
