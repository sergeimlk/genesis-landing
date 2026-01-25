import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  Play, Check, Star, ChevronDown, ChevronUp, ChevronRight, Instagram, ArrowRight, Zap,
  Monitor, Film, Users, ShieldCheck, Clock, Lock, X,
  Sparkles, Terminal
} from 'lucide-react';
import './App.css';

const CONTACT_LINK = "https://boiled-gondola-ea5.notion.site/2837b3ecdb188150bacef0d0c737d637";
const INSTAGRAM_URL = "https://www.instagram.com/visuals.by.genesis/";
const TIKTOK_URL = "https://www.tiktok.com/@visuals.by.genesis";

import YouTube from 'react-youtube';
import { BeforeAfter } from './components/BeforeAfter';
import PromptArchitect from './pages/PromptArchitect';
import GeneGym from './pages/GeneGym';


const VIDEOS = [
  "mVfM2ogLpwc",
  "piJ78nUKtgI"
];

const GenesisLanding = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const toggleVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);



  const navigate = useNavigate();

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const difference = midnight - now;
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const verifyCode = () => {
    if (secretCode.toUpperCase() === 'GENEGYM' || secretCode.toUpperCase() === 'GENEFIT') {
      localStorage.setItem('genegym_access', 'true');
      setIsSecretModalOpen(false);
      navigate('/genegym');
    } else {
      setErrorMsg('Code invalide. Accès refusé.');
      setTimeout(() => setErrorMsg(''), 2000);
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo-container" onClick={() => setIsSecretModalOpen(true)}>
            <img src="/img/Glogo.png" alt="Genesis Logo" className="t-logo" />
            <img src="/img/GENESIS.png" alt="GENESIS" style={{ height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#programme" className="link-nav" style={{ color: '#9ca3af', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); document.getElementById('programme').scrollIntoView({ behavior: 'smooth' }); }}>Programme</a>
            <a href="#reviews" className="link-nav" style={{ color: '#9ca3af', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' }); }}>Avis</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }} className="btn-cta-nav">
              <span className="btn-cta-nav-content">Rejoindre</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg">
          <div className="grid-overlay"></div>
          <div className="radial-glow"></div>
        </div>

        <div className="container hero-main">
          {/* Top Header */}
          <div className="hero-top-header animate-fade-up">
            <div className="hero-tag mb-6">
              <span className="dot"></span>
              Formation Disponible • Accès exclusif
            </div>
            <h1 className="hero-title-main">
              CRÉEZ DES <span className="text-gradient">VISUELS</span><br />
              DE NIVEAU <span className="text-gradient">CINÉMA</span> EN 7 JOURS
            </h1>
          </div>

          <div className="hero-split-layout">
            {/* Left Actions */}
            <div className="hero-left-col animate-fade-up delay-100">
              <p className="hero-desc">
                Le workflow secret utilisé par les réalisateurs pour générer des revenus passifs et signer des clients premium. Même sans compétences techniques. Un workflow de réalisateurs pensé pour créer des vidéos IA exploitables et vendables.
              </p>
              <div className="hero-actions">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }} className="btn-primary">
                  Rejoindre l'Élite <ArrowRight size={20} />
                </a>
                <a href="#programme" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('programme').scrollIntoView({ behavior: 'smooth' }); }}>
                  <Play size={20} fill="white" /> Découvrir
                </a>
              </div>

              <div className="social-proof" onClick={() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' })}>
                <div className="avatar-stack flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 345}&mouth=smile&eyebrows=default`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-black transition-all duration-300 hover:shadow-[0_0_15px_#a855f7] hover:scale-110 hover:z-10"
                      style={{ backgroundColor: 'black' }}
                    />
                  ))}
                </div>
                <p className="text-sm ml-6">Rejoint par <strong>500+ créateurs</strong><br />dont <span style={{ color: '#a855f7' }}>KOZI, ERON...</span></p>
              </div>
            </div>

            {/* Right Video */}
            <div className="video-card-wrapper animate-float relative group">
              <div className="video-card">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <YouTube
                    key={currentVideoIndex}
                    videoId={VIDEOS[currentVideoIndex]}
                    opts={{
                      height: '100%',
                      width: '100%',
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        rel: 0,
                        modestbranding: 1,
                        loop: 1,
                        playlist: VIDEOS[currentVideoIndex],
                      },
                    }}
                    onReady={(event) => {
                      event.target.setVolume(20);
                      event.target.playVideo();
                    }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                </div>
                <div className="video-glow"></div>
              </div>

              {/* Video Toggle Arrow */}
              <button
                onClick={toggleVideo}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 z-50"
                aria-label="Next Video"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Section (Marquee) */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <p className="trust-title">Ils nous font confiance</p>
        <div className="marquee-container">
          <div className="marquee-track marquee-normal">
            {['KOZI', 'GUY2BEZBAR', 'GENEZIO', 'MAYO', 'KABBSKY', 'DMG', 'R2', '360 OTG', 'ERON', 'BELIEVE'].map((brand, idx) => (
              <span key={idx} className="marquee-item">{brand}</span>
            ))}
            {['KOZI', 'GUY2BEZBAR', 'GENEZIO', 'MAYO', 'KABBSKY', 'DMG', 'R2', '360 OTG', 'ERON', 'BELIEVE'].map((brand, idx) => (
              <span key={`dup-${idx}`} className="marquee-item">{brand}</span>
            ))}
          </div>
        </div>
      </section>



      {/* AI PLAYGROUND SECTION (NEW) */}
      {/* AI PLAYGROUND SECTION (NEW) */}
      <section className="relative z-10 border-b border-white/5 bg-black/40">
        <PromptArchitect embedded={true} />
      </section>

      {/* Transformation Demo */}
      <section className="section-padding bg-black/50">
        <div className="container">
          <h2 className="section-title">LA PUISSANCE DE <span className="text-gradient">L'IA</span></h2>
          <div className="max-w-4xl mx-auto mt-10">
            <BeforeAfter
              beforeImage="/img/eric2.png"
              afterImage="/img/eric.jpg"
            />
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">L'IA NE DOIT PAS ÊTRE <span className="text-gradient">COMPLIQUÉE</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
            Un workflow de réalisateurs pensé pour créer des vidéos IA exploitables et vendables
          </p>
          <div className="comparison-grid">
            {/* Old Way */}
            <div className="card bad">
              <h3 className="card-title text-red-400" style={{ color: '#f87171' }}>
                <span className="p-2 bg-red-500/10 rounded">❌</span> Sans l'accompagnement ou coaching
              </h3>
              <ul>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Rendu amateur et glitchs</li>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Perte de temps (installations complexes)</li>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Vidéos génériques sans âme</li>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Impossible de vendre à des pros</li>
              </ul>
            </div>

            {/* New Way */}
            <div className="card good">
              <h3 className="card-title text-purple-400" style={{ color: '#a855f7' }}>
                <span className="p-2 bg-purple-500/10 rounded">✅</span> Avec GENESIS
              </h3>
              <ul>
                <li className="list-item"><Check size={20} color="#a855f7" /> Workflow PRO (Stable Diffusion, ComfyUI)</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Style Cinématographique Unique</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Méthodes Zéro-Tech (Débutant friendly)</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Capacité à monétiser vos créations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience (NEW) */}
      <section className="py-24 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-neutral-900 to-black rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="font-orbitron text-3xl font-bold">CETTE FORMATION EST POUR VOUS SI...</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/30 shrink-0">
                    <span className="font-bold text-purple-400">01</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Vous êtes débutant</h4>
                    <p className="text-gray-400 text-sm">Vous voulez créer des visuels bluffants sans avoir de connaissances techniques préalables.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-900/50 flex items-center justify-center border border-pink-500/30 shrink-0">
                    <span className="font-bold text-pink-400">02</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Vous êtes créatif / vidéaste</h4>
                    <p className="text-gray-400 text-sm">Vous voulez intégrer l'IA dans votre workflow pour proposer des effets impossibles à filmer.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/30 shrink-0">
                    <span className="font-bold text-blue-400">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Vous voulez monétiser</h4>
                    <p className="text-gray-400 text-sm">Vous cherchez une compétence rare et demandée pour vendre des visuels bluffants.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="aspect-square rounded-2xl bg-neutral-800 relative overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
                  alt="Cyberpunk creator"
                  className="object-cover w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                  <p className="font-orbitron text-white text-center">"J'ai rentabilisé la formation en 2 clips."</p>
                  <p className="text-center text-purple-400 text-sm mt-2">- Thomas D., Freelance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="section-padding bg-black/50">
        <div className="container">
          <h2 className="section-title">LE <span className="text-gradient">PROGRAMME</span></h2>
          <div className="modules-grid">
            <ModuleCard icon={<Zap />} title="Les Bases & Outils" desc="Comprendre l'IA générative. Outils en ligne simples pour des résultats immédiats sans PC puissant." />
            <ModuleCard icon={<Monitor />} title="Workflow Avancé" desc="Maîtrisez Stable Diffusion, ComfyUI et Midjourney. Installation, prompts secrets et paramétrages." />
            <ModuleCard icon={<Film />} title="Animation Vidéo" desc="Transformez des images en vidéos fluides (Kling, Runway). Contrôle du mouvement et de la caméra." />
            <ModuleCard icon={<Users />} title="Deepfake & FaceSwap" desc="Techniques professionnelles pour l'intégration de visages (pour les clips musicaux et parodies)." />
            <ModuleCard icon={<ShieldCheck />} title="Montage & Post-Prod" desc="Upscale 4K, étalonnage couleur, effets spéciaux. Le rendu final broadcast." />
            <ModuleCard icon={<Star />} title="Bonus: Business" desc="Comment vendre vos prestations, trouver des clients et exporter pour les réseaux sociaux." />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="section-padding">
        <div className="container">
          <h2 className="section-title">CE QU'ILS EN <span className="text-gradient">PENSENT</span></h2>
          <div className="modules-grid">
            <ReviewCard name="Sergeï" role="Créateur de Contenu" text="Grâce à Genesis, j'ai pu produire mes premiers contenus de valeur sur Instagram. Ça m'a permis de trouver mes premiers clients !" />
            <ReviewCard name="Eric" role="Artiste" text="J'ai rentabilisé la formation en 2 clips. Mes vues ont explosé et l'accompagnement est top." />
            <ReviewCard name="Sarah L." role="Marque Streetwear" text="Les visuels sont uniques. J'ai créé des campagnes pubs futuristes qui ont cartonné sur TikTok. Un game changer." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="pricing-card">
            <div className="pricing-header">
              <div className="fomo-container">
                <div className="fomo-label">⚡ OFFRE DE LANCEMENT</div>
                <div className="fomo-warning">Le prix double ce soir à minuit !</div>
                <div className="fomo-countdown">
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">H</span>
                  </div>
                  <span className="countdown-sep">:</span>
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label">Min</span>
                  </div>
                  <span className="countdown-sep">:</span>
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label">Sec</span>
                  </div>
                </div>
              </div>
              <div className="fomo-urgency-tag animate-pulse-fast">
                ⚠️ PLUS QUE 5 PLACES !
              </div>
              <h3 className="font-orbitron font-bold text-2xl mt-4">GENESIS ACADEMY</h3>
              <p className="text-muted text-sm">Accès illimité à vie + Mises à jour</p>
            </div>
            <div className="p-8 text-center">
              <div className="flex-center mb-4">
                <span className="old-price">800€</span>
                <span className="price">499€</span>
              </div>

              <div className="text-left space-y-4 mb-8" style={{ maxWidth: '320px', margin: '0 auto 30px' }}>
                <li className="list-item"><Check size={20} color="#a855f7" /> +6H de formation vidéo</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> PDF Récapitulatif 32 pages</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Accès outils IA privés</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Workflow "Visuals by Genesis"</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Support Communautaire</li>
                <li className="list-item font-bold text-white"><ShieldCheck size={20} color="#22d3ee" /> On ne te lachera pas tant que tu n'auras pas atteint tes objectifs!</li>
              </div>

              <a href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }} className="btn-join-main">
                CHOISIR MON MODULE
              </a>
              <p className="flex-center text-xs text-muted mt-4">Paiement sécurisé via Stripe/PayPal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notion Embed Section (Responsive) */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="bg-[#111] border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all">
            {/* Background Glow */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_70%)] pointer-events-none"></div>

            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-purple-500/50 transition-all duration-500 relative z-10">
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white"><path d="M4.021 21.998L3 4.015l13.567-2.013 4.43 2.671v15.286l-4.463 2.039L4.021 21.998zm4.316-2.583v-12.8l-1.635.856v11.97l1.635-.026zm2.253-12.288l5.888-1.745v11.378l-5.888 2.724V7.127zm7.653 9.471l1.664-.784V5.7l-1.664-1.002v11.9z" /></svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold font-orbitron mb-4 relative z-10">PROGRAMME DÉTAILLÉ</h3>
            <p className="text-gray-400 mb-8 max-w-lg text-lg relative z-10">
              Le contenu complet de la formation, module par module, est disponible sur notre Hub Notion public.
            </p>

            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-white text-black font-bold font-orbitron rounded-xl hover:scale-105 transition-all flex items-center gap-3 overflow-hidden z-10"
            >
              <span className="relative z-10 flex items-center gap-2">ACCÉDER AU NOTION <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title">FAQ</h2>
          <div className="space-y-4">
            <FaqItem
              question="Faut-il un PC de gamer ?"
              answer="Non ! Nous montrons des méthodes Cloud qui tournent sur n'importe quel ordinateur, même un Mac. Pour la partie locale (optimale), une carte NVIDIA est recommandée mais pas obligatoire."
              isOpen={activeFaq === 0}
              onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
            />
            <FaqItem
              question="Est-ce adapté aux débutants ?"
              answer="Absolument. Nous partons de zéro. Le module 1 est dédié à la prise en main des outils. Vous créerez votre première image en 10 minutes."
              isOpen={activeFaq === 1}
              onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
            />
            <FaqItem
              question="Combien de temps dure la formation ?"
              answer="C'est une formation dense et concise pour aller droit au but. Comptez environ 6 heures de vidéo, plus le temps de pratique."
              isOpen={activeFaq === 2}
              onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
            />
            <FaqItem
              question="Y a-t-il une garantie ?"
              answer="Oui. Essayez la méthode pendant 14 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement. Aucun risque."
              isOpen={activeFaq === 3}
              onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: '1.5rem', marginBottom: '20px' }}>GENESIS</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
            </a>
          </div>
          <p className="text-muted text-sm mb-8">© 2024 Visuals by Genesis. All rights reserved.</p>
          <div className="flex-center gap-6 text-sm text-muted">
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer">Mentions Légales</a>
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer">CGV</a>
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer">RGPD</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsContactModalOpen(true); }}>Contact</a>
          </div>
        </div>
      </footer>

      {/* Modale Secrète */}
      {
        isSecretModalOpen && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsSecretModalOpen(false) }}>
            <div className="modal-content animate-fade-up">
              <button
                onClick={() => setIsSecretModalOpen(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', color: '#666' }}
              >
                <X />
              </button>
              <Lock size={48} color="#a855f7" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '1.5rem', marginBottom: '10px' }}>ACCÈS MEMBRE</h3>
              <p className="text-muted">Entrez votre code secret</p>

              <input
                type="text"
                className="secret-input"
                placeholder="CODE"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
              />
              {errorMsg && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '16px' }}>{errorMsg}</p>}

              <button onClick={verifyCode} className="btn-primary justify-center btn-unlock" style={{ width: '100%' }}>
                DÉVERROUILLER
              </button>
            </div>
          </div>
        )
      }

      {/* Tally Contact Modal */}
      {isContactModalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsContactModalOpen(false) }} style={{ alignItems: 'flex-start', paddingTop: '50px', overflowY: 'auto' }}>
          <div className="modal-content animate-fade-up" style={{ maxWidth: '600px', width: '90%', height: '80vh', padding: '0 24px', background: '#1a1a1a', overflow: 'hidden', display: 'flex', flexDirection: 'col' }}>
            <button
              onClick={() => setIsContactModalOpen(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', color: '#fff', zIndex: 10, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '5px' }}
            >
              <X size={24} />
            </button>
            <iframe
              src="https://tally.so/r/pbr5G1?utm_source=ig&utm_medium=social&utm_content=link_in_bio&transparentBackground=1&hideTitle=1&hideFooter=1&alignLeft=1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Contact Form"
              style={{ background: 'transparent', margin: 0 }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

// Components Helpers
const ModuleCard = ({ icon, title, desc }) => (
  <div className="module-card">
    <div className="module-icon">{icon}</div>
    <h3 style={{ fontFamily: 'var(--font-orbitron)', marginBottom: '10px' }}>{title}</h3>
    <p className="text-muted text-sm">{desc}</p>
  </div>
);

const ReviewCard = ({ name, role, text }) => (
  <div className="card">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="star-gold" />)}
    </div>
    <p className="italic text-muted mb-6">"{text}"</p>
    <div className="flex items-center gap-4">
      <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #a855f7, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-xs text-purple-400">{role}</p>
      </div>
    </div>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="faq-item">
    <button className="faq-question" onClick={onClick}>
      {question}
      {isOpen ? <ChevronUp color="#a855f7" /> : <ChevronDown color="#666" />}
    </button>
    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
      {answer}
    </div>
  </div>
);

// --- ROUTING & PROTECTION ---

const ProtectedRoute = ({ children }) => {
  const isAllowed = localStorage.getItem('genegym_access') === 'true';
  return isAllowed ? children : <Navigate to="/" replace />;
};

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

      {showFlashOffer && <FlashOfferModal onClose={() => setShowFlashOffer(false)} />}
    </Router>
  );
};

const FlashOfferModal = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const difference = midnight - now;
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }} style={{ zIndex: 3000 }}>
      {/* Reusing pricing card style but in modal context */}
      <div className="modal-content animate-fade-up" style={{ maxWidth: '90%', width: '400px', padding: '0', overflow: 'hidden', border: '1px solid #a855f7' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', color: '#fff', zIndex: 10, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '5px' }}
        >
          <X size={24} />
        </button>

        <div className="pricing-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none', margin: 0, maxWidth: 'none' }}>
          <div className="pricing-header" style={{ padding: '20px' }}>
            <div className="fomo-container">
              <div className="fomo-label" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>⚡ OFFRE DE LANCEMENT</div>
              <div className="fomo-warning" style={{ fontSize: '0.8rem' }}>Le prix double ce soir à minuit !</div>
              <div className="fomo-countdown" style={{ marginBottom: '10px' }}>
                <div className="countdown-item">
                  <span className="countdown-number" style={{ fontSize: '1.2rem' }}>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="countdown-label" style={{ fontSize: '0.6rem' }}>H</span>
                </div>
                <span className="countdown-sep" style={{ fontSize: '1.2rem' }}>:</span>
                <div className="countdown-item">
                  <span className="countdown-number" style={{ fontSize: '1.2rem' }}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="countdown-label" style={{ fontSize: '0.6rem' }}>Min</span>
                </div>
                <span className="countdown-sep" style={{ fontSize: '1.2rem' }}>:</span>
                <div className="countdown-item">
                  <span className="countdown-number" style={{ fontSize: '1.2rem' }}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="countdown-label" style={{ fontSize: '0.6rem' }}>Sec</span>
                </div>
              </div>
            </div>
            <div className="fomo-urgency-tag animate-pulse-fast" style={{ fontSize: '0.7rem', padding: '6px 12px', marginTop: '10px' }}>
              ⚠️ PLUS QUE 5 PLACES !
            </div>
            <h3 className="font-orbitron font-bold text-lg mt-2">GENESIS ACADEMY</h3>
            <p className="text-muted text-xs">Accès illimité à vie + Mises à jour</p>
          </div>
          <div className="p-6 text-center bg-black/50">
            <div className="flex-center mb-3">
              <span className="old-price" style={{ fontSize: '1rem' }}>800€</span>
              <span className="price" style={{ fontSize: '2rem' }}>499€</span>
            </div>

            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="btn-join-main" style={{ width: '100%', minWidth: '100%' }}>
              CHOISIR <br /> MON MODULE
            </a>
            <p className="flex-center text-xs text-muted mt-4">Paiement sécurisé via Stripe/PayPal</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;
