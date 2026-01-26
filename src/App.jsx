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
  const [isCgvModalOpen, setIsCgvModalOpen] = useState(false);
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
            {/* <img src="/img/GENESIS.png" alt="GENESIS" className="logo-brand-img" /> */}
            <h2 className="footer-title ml-2 mt-5" >GENESIS</h2>
          </div>
          <div className="nav-links-group">
            <a href="#programme" className="link-nav nav-link-item" onClick={(e) => { e.preventDefault(); document.getElementById('programme').scrollIntoView({ behavior: 'smooth' }); }}>Programme</a>
            <a href="#reviews" className="link-nav nav-link-item" onClick={(e) => { e.preventDefault(); document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' }); }}>Avis</a>
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
            <div className="text-base hero-left-col animate-fade-up delay-100">
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
                      className="w-10 h-10 rounded-full border-2 border-black bg-black transition-all duration-300 hover:shadow-[0_0_15px_#a855f7] hover:scale-110 hover:z-10"
                    />
                  ))}
                </div>
                <p className="text-sm ml-6">Rejoint par <strong>500+ créateurs</strong><br />dont <span className="text-purple-500">KOZI, ERON...</span></p>
              </div>
            </div>

            {/* Right Video */}
            <div className="video-card-wrapper animate-float relative group">
              <div className="video-card">
                <div className="video-aspect-container">
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
                    className="video-iframe-fill"
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
      <section className="section-padding trust-section">
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
      <section className="relative z-10 border-b border-white/5 bg-black/40">
        <PromptArchitect embedded={true} />
      </section>

      {/* Transformation Demo */}
      <section className="section-padding bg-black/50">
        <div className="container">
          <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">LA PUISSANCE DE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">L'IA</span></h2>
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
          <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">L'IA NE DOIT PAS ÊTRE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">COMPLIQUÉE</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
            Un workflow de réalisateurs pensé pour créer des vidéos IA exploitables et vendables
          </p>
          <div className="comparison-grid">
            {/* Old Way */}
            <div className="card bad">
              <h3 className="card-title card-title-red">
                <span className="p-2 bg-red-500/10 rounded">❌</span> Sans l'accompagnement ou coaching
              </h3>
              <ul>
                <li className="list-item"><span className="bullet-red">•</span> Rendu amateur et glitchs</li>
                <li className="list-item"><span className="bullet-red">•</span> Perte de temps (installations complexes)</li>
                <li className="list-item"><span className="bullet-red">•</span> Vidéos génériques sans âme</li>
                <li className="list-item"><span className="bullet-red">•</span> Impossible de vendre à des pros</li>
              </ul>
            </div>

            {/* New Way */}
            <div className="card good">
              <h3 className="card-title card-title-purple">
                <span className="p-2 bg-purple-500/10 rounded">✅</span> Avec GENESIS
              </h3>
              <ul>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Workflow PRO (Stable Diffusion, ComfyUI)</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Style Cinématographique Unique</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Méthodes Zéro-Tech (Débutant friendly)</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Capacité à monétiser vos créations</li>
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
              <h2 className="text-center md:text-left mb-6 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">CETTE FORMATION EST POUR VOUS SI...</h2>

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
          <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">LE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">PROGRAMME</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
            6 étapes concrètes pour passer de zéro à autonome dans la création et la vente de vidéos IA
          </p>
          <div className="modules-grid">
            {/* Étape 1 */}
            <div className="module-card-detailed group">
              <div className="module-step-badge">ÉTAPE 1</div>
              <div className="module-icon"><Zap /></div>
              <h3 className="module-title">Clarté & Positionnement</h3>
              <p className="module-objective"><Sparkles size={14} className="inline mr-1 text-purple-400" />Savoir où aller et pourquoi</p>
              <ul className="module-list">
                <li><Check size={14} className="text-purple-400" />Analyse du profil</li>
                <li><Check size={14} className="text-purple-400" />Identification de secteurs réalistes</li>
                <li><Check size={14} className="text-purple-400" />Choix d'une niche exploitable</li>
                <li><Check size={14} className="text-purple-400" />Définition d'un objectif concret</li>
              </ul>
              <div className="module-deliverable">
                <span className="deliverable-label">Livrable:</span>
                <span>Direction claire, axe de travail défini, cadre réaliste</span>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="module-card-detailed group">
              <div className="module-step-badge">ÉTAPE 2</div>
              <div className="module-icon"><Film /></div>
              <h3 className="module-title">Compétence Vidéo IA</h3>
              <p className="module-objective"><Sparkles size={14} className="inline mr-1 text-purple-400" />Produire des vidéos IA montrables</p>
              <ul className="module-list">
                <li><Check size={14} className="text-purple-400" />Création d'images et vidéos IA</li>
                <li><Check size={14} className="text-purple-400" />Logique de rendu professionnel</li>
                <li><Check size={14} className="text-purple-400" />Cohérence visuelle</li>
                <li><Check size={14} className="text-purple-400" />Simplicité et efficacité</li>
              </ul>
              <div className="module-deliverable">
                <span className="deliverable-label">Livrable:</span>
                <span>Premiers visuels exploitables, base de portfolio</span>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="module-card-detailed group">
              <div className="module-step-badge">ÉTAPE 3</div>
              <div className="module-icon"><Monitor /></div>
              <h3 className="module-title">Structuration du Portfolio</h3>
              <p className="module-objective"><Sparkles size={14} className="inline mr-1 text-purple-400" />Crédibilité auprès des prospects</p>
              <ul className="module-list">
                <li><Check size={14} className="text-purple-400" />Sélection des bons visuels</li>
                <li><Check size={14} className="text-purple-400" />Présentation claire</li>
                <li><Check size={14} className="text-purple-400" />Logique de valeur</li>
              </ul>
              <div className="module-deliverable">
                <span className="deliverable-label">Livrable:</span>
                <span>Mini-portfolio clair et professionnel</span>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="module-card-detailed group">
              <div className="module-step-badge">ÉTAPE 4</div>
              <div className="module-icon"><ShieldCheck /></div>
              <h3 className="module-title">Construction de l'Offre</h3>
              <p className="module-objective"><Sparkles size={14} className="inline mr-1 text-purple-400" />Ne plus dire "je fais un peu de tout"</p>
              <ul className="module-list">
                <li><Check size={14} className="text-purple-400" />Définition d'une offre simple</li>
                <li><Check size={14} className="text-purple-400" />Clarification du service</li>
                <li><Check size={14} className="text-purple-400" />Cadrage du prix</li>
                <li><Check size={14} className="text-purple-400" />Message clair</li>
              </ul>
              <div className="module-deliverable">
                <span className="deliverable-label">Livrable:</span>
                <span>Offre compréhensible et discours clair</span>
              </div>
            </div>

            {/* Étape 5 */}
            <div className="module-card-detailed group">
              <div className="module-step-badge">ÉTAPE 5</div>
              <div className="module-icon"><Users /></div>
              <h3 className="module-title">Prospection & Action</h3>
              <p className="module-objective"><Sparkles size={14} className="inline mr-1 text-purple-400" />Sortir de la théorie</p>
              <ul className="module-list">
                <li><Check size={14} className="text-purple-400" />Choix des canaux adaptés</li>
                <li><Check size={14} className="text-purple-400" />Messages simples</li>
                <li><Check size={14} className="text-purple-400" />Posture professionnelle</li>
                <li><Check size={14} className="text-purple-400" />Gestion des échanges</li>
              </ul>
              <div className="module-deliverable">
                <span className="deliverable-label">Livrable:</span>
                <span>Premières démarches et conversations réelles</span>
              </div>
            </div>

            {/* Étape 6 */}
            <div className="module-card-detailed group">
              <div className="module-step-badge">ÉTAPE 6</div>
              <div className="module-icon"><Star /></div>
              <h3 className="module-title">Ajustements & Consolidation</h3>
              <p className="module-objective"><Sparkles size={14} className="inline mr-1 text-purple-400" />Solidifier ce qui fonctionne</p>
              <ul className="module-list">
                <li><Check size={14} className="text-purple-400" />Analyse des retours</li>
                <li><Check size={14} className="text-purple-400" />Ajustement de l'offre</li>
                <li><Check size={14} className="text-purple-400" />Optimisation de la méthode</li>
                <li><Check size={14} className="text-purple-400" />Projection sur la suite</li>
              </ul>
              <div className="module-deliverable">
                <span className="deliverable-label">Livrable:</span>
                <span>Système clair et autonomie renforcée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="section-padding">
        <div className="container">
          <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">CE QU'ILS EN <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">PENSENT</span></h2>
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

              <div className="text-left space-y-4 mb-8 pricing-features-container">
                <li className="list-item"><Check size={20} className="text-purple-500" /> +6H de formation vidéo</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> PDF Récapitulatif 32 pages</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Accès outils IA privés</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Workflow "Visuals by Genesis"</li>
                <li className="list-item"><Check size={20} className="text-purple-500" /> Support Communautaire</li>
                <li className="list-item font-bold text-white"><ShieldCheck size={20} className="text-cyan-400" /> On ne te lachera pas tant que tu n'auras pas atteint tes objectifs!</li>
              </div>

              <a href="#contact-form" onClick={(e) => { e.preventDefault(); document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' }); }} className="btn-join-main">
                CHOISIR MON MODULE
              </a>
              <p className="flex-center text-xs text-muted mt-4">Paiement sécurisé via Stripe/PayPal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notion Embed Section (Responsive) */}
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="w-full h-[800px] bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative px-2 md:px-0">
            <iframe
              src="https://boiled-gondola-ea5.notion.site/ebd//2837b3ecdb188150bacef0d0c737d637"
              width="100%"
              height="100%"
              frameBorder="0"
              className="iframe-transparent bg-white/5"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact / Order Form Section */}
      <section className="section-padding" id="contact-form">
        <div className="container container-narrow">
          <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">REJOINDRE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">L'AVENTURE</span></h2>
          <div className="w-full h-[600px] md:h-[800px] bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl mb-24 px-4 md:px-12">
            <iframe
              src="https://boiled-gondola-ea5.notion.site/ebd//2837b3ecdb188150bacef0d0c737d637"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Contact Form"
              className="iframe-transparent bg-white/5"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container container-narrow">
          <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">FAQ</h2>
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
          <h2 className="footer-title">GENESIS</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
            </a>
          </div>
          <p className="text-muted text-sm mb-8">© 2026 Visuals by Genesis. All rights reserved.</p>
          <div className="flex-center gap-6 text-sm text-muted">
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer">Mentions Légales</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsCgvModalOpen(true); }}>CGV</a>
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
                className="modal-close-btn"
              >
                <X />
              </button>
              <Lock size={48} className="text-purple-500 lock-icon-centered" />
              <h3 className="modal-title-orbitron">ACCÈS MEMBRE</h3>
              <p className="text-muted">Entrez votre code secret</p>

              <input
                type="text"
                className="secret-input"
                placeholder="CODE"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
              />
              {errorMsg && <p className="error-text">{errorMsg}</p>}

              <button onClick={verifyCode} className="btn-primary justify-center btn-unlock btn-full-width">
                DÉVERROUILLER
              </button>
            </div>
          </div>
        )
      }

      {/* Tally Contact Modal */}
      {isContactModalOpen && (
        <div className="modal-overlay modal-overlay-top" onClick={(e) => { if (e.target === e.currentTarget) setIsContactModalOpen(false) }}>
          <div className="modal-content animate-fade-up modal-content-contact">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="modal-close-btn-white"
            >
              <X size={24} />
            </button>
            <iframe
              src="https://boiled-gondola-ea5.notion.site/ebd//2837b3ecdb188150bacef0d0c737d637"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Contact Form"
              className="iframe-transparent bg-white/5"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* CGV Modal */}
      {isCgvModalOpen && (
        <div className="modal-overlay modal-overlay-top-sm" onClick={(e) => { if (e.target === e.currentTarget) setIsCgvModalOpen(false) }}>
          <div className="modal-content animate-fade-up modal-content-cgv">
            <div className="modal-header-cgv">
              <h3 className="modal-title-sm">CONDITIONS GÉNÉRALES DE VENTE</h3>
              <button
                onClick={() => setIsCgvModalOpen(false)}
                className="modal-close-btn-cgv"
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              src="/docs/CONDITIONS_GENERALES_DE_VENTE_GENESIS.pdf"
              width="100%"
              height="100%"
              className="iframe-flex"
              title="Conditions Générales de Vente"
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
    <h3 className="module-card-title">{title}</h3>
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
      <div className="review-avatar">
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
      {isOpen ? <ChevronUp className="text-purple-500" /> : <ChevronDown className="text-gray-500" />}
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

export const FlashOfferModal = ({ onClose }) => {
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
    <div className="modal-overlay modal-z-high" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      {/* Reusing pricing card style but in modal context */}
      <div className="modal-content animate-fade-up modal-content-flash">
        <button
          onClick={onClose}
          className="modal-close-btn-white"
        >
          <X size={24} />
        </button>

        <div className="pricing-card pricing-card-modal">
          <div className="pricing-header pricing-header-compact">
            <div className="fomo-container">
              <div className="fomo-label fomo-label-sm">⚡ OFFRE DE LANCEMENT</div>
              <div className="fomo-warning fomo-warning-sm">Le prix double ce soir à minuit !</div>
              <div className="fomo-countdown fomo-countdown-mb">
                <div className="countdown-item">
                  <span className="countdown-number countdown-number-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="countdown-label countdown-label-xs">H</span>
                </div>
                <span className="countdown-sep countdown-sep-sm">:</span>
                <div className="countdown-item">
                  <span className="countdown-number countdown-number-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="countdown-label countdown-label-xs">Min</span>
                </div>
                <span className="countdown-sep countdown-sep-sm">:</span>
                <div className="countdown-item">
                  <span className="countdown-number countdown-number-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="countdown-label countdown-label-xs">Sec</span>
                </div>
              </div>
            </div>
            <div className="fomo-urgency-tag animate-pulse-fast fomo-urgency-sm">
              ⚠️ PLUS QUE 5 PLACES !
            </div>
            <h3 className="font-orbitron font-bold text-lg mt-2">GENESIS ACADEMY</h3>
            <p className="text-muted text-xs">Accès illimité à vie + Mises à jour</p>
          </div>
          <div className="p-6 text-center bg-black/50">
            <div className="flex-center mb-3">
              <span className="old-price old-price-sm">800€</span>
              <span className="price price-lg">499€</span>
            </div>

            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="btn-join-main btn-join-full">
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
