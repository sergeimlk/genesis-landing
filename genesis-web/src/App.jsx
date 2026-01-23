import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  Play, Check, Star, ChevronDown, ChevronUp, ChevronRight, Instagram, ArrowRight, Zap,
  Monitor, Film, Users, ShieldCheck, Clock, Quote, Lock, X, Dumbbell,
  Activity, Timer, Repeat, Home, Sparkles, Bot, Terminal
} from 'lucide-react';
import './App.css';

const CONTACT_LINK = "https://boiled-gondola-ea5.notion.site/2837b3ecdb188150bacef0d0c737d637";
const INSTAGRAM_URL = "https://www.instagram.com/visuals.by.genesis/";
const TIKTOK_URL = "https://www.tiktok.com/@visuals.by.genesis";

import YouTube from 'react-youtube';
import { BeforeAfter } from './components/BeforeAfter';
import PromptArchitect from './pages/PromptArchitect';


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
  const [secretCode, setSecretCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  // States for AI Playground
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiPromptResult, setAiPromptResult] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const apiKey = ""; // API Key placeholder

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

  const generateGenesisPrompt = async () => {
    if (!aiPromptInput.trim()) return;
    setIsAiLoading(true);
    setAiPromptResult(null);

    const systemPrompt = "Tu es GENESIS, un expert mondial en Prompt Engineering pour l'IA générative vidéo (Midjourney, Runway Gen-3, Kling). Ton style est Cyberpunk, Dark, Néon, Cinématographique. L'utilisateur va te donner une idée simple. Tu dois la transformer en : 1. Un Prompt d'Image ultra-détaillé en Anglais (pour Stable Diffusion/Midjourney) avec des mots clés techniques (8k, octane render, volumetric lighting). 2. Un Prompt de Mouvement Caméra pour la vidéo. Réponds en JSON : { \"imagePrompt\": \"...\", \"cameraPrompt\": \"...\" }.";

    try {
      // Mocking response if no API key is provided to avoid error
      if (!apiKey) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAiPromptResult({
          imagePrompt: "Cinematic shot of " + aiPromptInput + ", cyberpunk style, neon lights, volumetric fog, octane render, 8k, highly detailed, photorealistic.",
          cameraPrompt: "Slow push in, cinematic lighting, stabilize."
        });
      } else {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Transforme cette idée en prompt PRO : "${aiPromptInput}"` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
          const result = JSON.parse(data.candidates[0].content.parts[0].text);
          setAiPromptResult(result);
        }
      }
    } catch (error) {
      console.error("Erreur IA:", error);
      setAiPromptResult({ imagePrompt: "Erreur de connexion au Neuro-Core...", cameraPrompt: "Réessayez plus tard." });
    } finally {
      setIsAiLoading(false);
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
            <a href="#programme" className="link-nav" style={{ color: '#9ca3af', fontWeight: 500 }}>Programme</a>
            <a href="#reviews" className="link-nav" style={{ color: '#9ca3af', fontWeight: 500 }} onClick={(e) => { e.preventDefault(); document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' }); }}>Avis</a>
            <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta-nav">
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
                Le workflow secret utilisé par les réalisateurs pour générer des revenus passifs et signer des clients premium. Même sans compétences techniques.
              </p>
              <div className="hero-actions">
                <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Rejoindre l'Élite <ArrowRight size={20} />
                </a>
                <a href="#programme" className="btn-secondary">
                  <Play size={20} fill="white" /> Découvrir
                </a>
              </div>

              <div className="social-proof" onClick={() => document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' })}>
                <div className="avatar-stack">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 345}`} alt="User" />
                  ))}
                </div>
                <p className="text-sm ml-6">Rejoint par <strong>500+ créateurs</strong><br />dont <span style={{ color: '#a855f7' }}>GIMS, NETFLIX...</span></p>
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
      <section className="py-24 relative z-10 border-b border-white/5 bg-black/40">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles className="w-3 h-3" /> DEMO GRATUITE
            </span>
            <h2 className="section-title">GENESIS <span className="text-gradient">PROMPT ARCHITECT</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Testez la puissance de notre workflow. Entrez une idée simple, et notre IA générera pour vous un prompt professionnel prêt à l'emploi.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Terminal Header */}
            <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-500 font-mono">genesis_terminal_v1.0</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  placeholder="Ex: Une voiture futuriste dans Paris sous la pluie..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors font-inter"
                />
                <button
                  onClick={generateGenesisPrompt}
                  disabled={isAiLoading || !aiPromptInput}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold font-orbitron flex items-center justify-center gap-2 transition-all"
                >
                  {isAiLoading ? <span className="animate-spin">⚡</span> : <Sparkles className="w-5 h-5" />}
                  GÉNÉRER
                </button>
                <button
                  onClick={() => navigate('/prompt')}
                  className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-bold font-orbitron flex items-center justify-center gap-2 transition-all"
                >
                  <Monitor className="w-5 h-5" />
                  MODE PRO
                </button>
              </div>

              {/* AI Output Area */}
              <div className="min-h-[200px] bg-black/50 rounded-xl border border-white/5 p-6 font-mono text-sm relative">
                {!aiPromptResult && !isAiLoading && (
                  <div className="text-gray-600 flex flex-col items-center justify-center h-full gap-2">
                    <Terminal className="w-8 h-8 opacity-50" />
                    <p>En attente de données...</p>
                  </div>
                )}

                {isAiLoading && (
                  <div className="space-y-3">
                    <div className="h-4 bg-purple-900/30 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-purple-900/30 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-purple-900/30 rounded w-5/6 animate-pulse"></div>
                  </div>
                )}

                {aiPromptResult && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 text-left">
                    <div>
                      <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span> IMAGE PROMPT
                      </h4>
                      <p className="text-gray-300 bg-white/5 p-3 rounded border border-white/5 selection:bg-purple-500/50">
                        {aiPromptResult.imagePrompt}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span> CAMERA MOTION
                      </h4>
                      <p className="text-gray-300 bg-white/5 p-3 rounded border border-white/5 selection:bg-blue-500/50">
                        {aiPromptResult.cameraPrompt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Demo */}
      <section className="section-padding bg-black/50">
        <div className="container">
          <h2 className="section-title">LA PUISSANCE DE <span className="text-gradient">L'IA</span></h2>
          <div className="max-w-4xl mx-auto mt-10">
            <BeforeAfter
              beforeImage="https://picsum.photos/id/646/1920/1080?grayscale"
              afterImage="https://picsum.photos/id/646/1920/1080"
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

              <a href={CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="btn-join-main">
                CHOISIR MON MODULE
              </a>
              <p className="flex-center text-xs text-muted mt-4">Paiement sécurisé via Stripe/PayPal</p>
            </div>
          </div>
        </div>
      </section >

      {/* Notion Embed Section (Responsive) */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
          <div style={{ position: 'relative', width: '100%', height: '600px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe
              src="https://boiled-gondola-ea5.notion.site/ebd//2837b3ecdb188150bacef0d0c737d637"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              title="Genesis Notion Embed"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      < section className="section-padding" >
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
      </section >

      {/* Footer */}
      < footer className="py-12 bg-black border-t border-white/10 text-center" >
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
            <a href={CONTACT_LINK} target="_blank">Mentions Légales</a>
            <a href={CONTACT_LINK} target="_blank">CGV</a>
            <a href={CONTACT_LINK} target="_blank">RGPD</a>
            <a href={CONTACT_LINK} target="_blank">Contact</a>
          </div>
        </div>
      </footer >

      {/* Modale Secrète */}
      {
        isSecretModalOpen && (
          <div className="modal-overlay">
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
    </div >
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

// --- GENEGYM PRO (DASHBOARD APP) ---
const FitnessView = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('genegym_access');
    navigate('/');
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([

    { sender: 'coach', text: "Wesh l'équipe ! Prêt à charbonner ?" }
  ]);

  // Mock Programs Data
  const programs = {
    'Superset': [
      { id: 1, title: 'Pompes Explosives', sets: '4x12', cat: 'Push' },
      { id: 2, title: 'Tractions', sets: '4xMax', cat: 'Pull' },
      { id: 3, title: 'Dips', sets: '3x15', cat: 'Push' },
    ],
    'FullBody': [
      { id: 10, title: 'Squat', sets: '4x8', cat: 'Legs' },
      { id: 11, title: 'Bench Press', sets: '4x10', cat: 'Push' },
      { id: 12, title: 'Rowing', sets: '4x10', cat: 'Pull' },
    ]
  };

  const [activeProgram, setActiveProgram] = useState('Superset');
  const [exercises, setExercises] = useState(programs['Superset'].map(e => ({ ...e, done: false })));

  // Update exercises when program changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExercises(programs[activeProgram].map(e => ({ ...e, done: false })));
  }, [activeProgram, programs]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTimerActive(false);
      setTimer(120);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const toggleExercise = (id) => {
    const newExercises = exercises.map(ex => ex.id === id ? { ...ex, done: !ex.done } : ex);
    setExercises(newExercises);
    if (newExercises.every(e => e.done)) setShowCelebration(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'coach', text: "Ça marche ! Continue comme ça champion." }]);
    }, 1000);
    setChatInput('');
  };

  // --- UI COMPONENTS ---



  return (
    <div className="fixed inset-0 z-[2000] bg-[#050505] text-white font-inter flex flex-col md:flex-row overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0a0a0a] border-r border-white/5 p-6 h-screen overflow-y-auto">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-red-500/20">
            <img src="/img/DarkLogo.png" alt="GeneGym Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-orbitron font-bold text-xl tracking-wide">GENEGYM <span className="text-red-500 text-xs align-top">PRO</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: Home, label: 'Tableau de bord' },
            { id: 'workout', icon: Dumbbell, label: 'Programme' },
            { id: 'calendar', icon: Repeat, label: 'Historique' },
            { id: 'stats', icon: Activity, label: 'Performances' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <X size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img src="/img/DarkLogo.png" alt="GeneGym Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-orbitron font-bold text-lg">GENEGYM</span>
        </div>
        <button onClick={handleLogout} className="p-2 bg-white/5 rounded-full text-gray-400"><X size={20} /></button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full overflow-y-auto bg-[#050505] relative scroll-smooth pb-24 md:pb-0">

        <div className="max-w-5xl mx-auto p-6 md:p-10">

          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> En ligne</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Salut, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">La Team!</span></h1>
            </div>
            <div className="flex gap-2">
              {Object.keys(programs).map(prog => (
                <button
                  key={prog}
                  onClick={() => setActiveProgram(prog)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${activeProgram === prog ? 'bg-white text-[#0f172a] border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                >
                  {prog}
                </button>
              ))}
            </div>
          </div>

          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Zap} label="Calories" value="840" color="text-orange-500" />
            <StatCard icon={Timer} label="Temps" value="45m" color="text-red-500" />
            <StatCard icon={Dumbbell} label="Volume" value="2.4T" color="text-purple-500" />
            <StatCard icon={Activity} label="Série" value="12 J" color="text-green-500" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* WORKOUT LIST */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold font-orbitron mb-4 text-white flex items-center gap-2">
                <Dumbbell className="text-red-500" /> Séance du jour
              </h2>

              <div className="space-y-3">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => toggleExercise(ex.id)}
                    className={`group relative overflow-hidden p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${ex.done ? 'bg-green-500/10 border-green-500/30' : 'bg-[#0a0a0a] border-white/5 hover:border-red-500/50'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${ex.done ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 group-hover:bg-red-600 group-hover:text-white'}`}>
                      {ex.done ? <Check size={24} strokeWidth={3} /> : <Dumbbell size={24} />}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${ex.done ? 'text-gray-400 line-through' : 'text-white'}`}>{ex.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <span className="bg-white/5 px-2 py-0.5 rounded text-xs">{ex.cat}</span>
                        <span>{ex.sets}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDE WIDGETS */}
            <div className="space-y-6">
              {/* TIMER WIDGET */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 to-purple-500"></div>
                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Repos</div>
                <div className="text-6xl font-mono font-bold text-white mb-6 tabular-nums tracking-tighter">
                  {formatTime(timer)}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsTimerActive(!isTimerActive)}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isTimerActive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-red-600 text-white hover:scale-105 shadow-red-600/30'}`}
                  >
                    {isTimerActive ? <span className="w-4 h-4 rounded-sm bg-current" /> : <Play size={24} fill="white" className="ml-1" />}
                  </button>
                  <button
                    onClick={() => setTimer(120)}
                    className="h-14 w-14 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <span className="font-bold text-xs">+30s</span>
                  </button>
                </div>
              </div>

              {/* COACH CHAT MINI */}
              <div className="bg-gradient-to-br from-red-800 to-purple-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Coach IA</h4>
                    <p className="text-xs text-red-100 opacity-80">Toujours disponible</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/10 text-sm leading-relaxed">
                  "N'oublie pas de bien respirer pendant les squats. Tu es une machine !"
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Posez une question..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-black/30 transition-colors"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit(e)}
                  />
                  <button onClick={handleChatSubmit} className="absolute right-1 top-1 p-1 bg-white/20 rounded hover:bg-white/40 transition-colors">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
          <NavIcon icon={Home} label="Accueil" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavIcon icon={Repeat} label="Programme" active={activeTab === 'workout'} onClick={() => setActiveTab('workout')} />

          <div className="relative -top-5">
            <button className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40 border-4 border-[#050505]">
              <Play size={24} fill="white" className="ml-1 text-white" />
            </button>
          </div>

          <NavIcon icon={Activity} label="Stats" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          <NavIcon icon={Users} label="Profil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
      </nav>

      {/* CELEBRATION OVERLAY */}
      {showCelebration && (
        <div className="fixed inset-0 z-[2001] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-up">
          <div className="bg-[#0a0a0a] border border-green-500/50 rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-green-500"></div>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <Star size={40} fill="currentColor" className="animate-spin-slow" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 font-orbitron">VICTOIRE !</h2>
            <p className="text-gray-400 mb-8">Séance terminée. Tu es un monstre.<br />Repose-toi bien.</p>
            <button
              onClick={() => { setShowCelebration(false); handleLogout(); }}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-105"
            >
              RETOUR ACCUEIL
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// UI Helpers
// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:border-white/10 transition-colors">
    <div className={`p-2 rounded-xl bg-opacity-10 ${color.replace('text-', 'bg-')} ${color}`}>
      <Icon size={20} />
    </div>
    <div className="font-bold text-xl text-white">{value}</div>
    <div className="text-xs text-gray-400 font-medium uppercase">{label}</div>
  </div>
);

// eslint-disable-next-line no-unused-vars
const NavIcon = ({ icon: Icon, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${active ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
  </button>
);

// --- ROUTING & PROTECTION ---

const ProtectedRoute = ({ children }) => {
  const isAllowed = localStorage.getItem('genegym_access') === 'true';
  return isAllowed ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenesisLanding />} />
        <Route path="/prompt" element={<PromptArchitect />} />
        <Route
          path="/genegym"
          element={
            <ProtectedRoute>
              <FitnessView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
