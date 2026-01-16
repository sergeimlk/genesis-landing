import React, { useState, useEffect } from 'react';
import { Play, Check, Star, ChevronDown, ChevronUp, Instagram, ArrowRight, Zap, Monitor, Film, Users, ShieldCheck, Clock, Quote, Lock, X, Dumbbell, Repeat, Activity, Timer, Sparkles, Bot, Terminal } from 'lucide-react';

const GenesisLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 23, minutes: 59, seconds: 59 });
  
  // États pour la modale secrète et le mode Fitness
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [isFitnessUnlocked, setIsFitnessUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // États pour l'IA Genesis (Prompt Architect)
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiPromptResult, setAiPromptResult] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // États pour l'IA Genefit (Coach)
  const [aiCoachAdvice, setAiCoachAdvice] = useState('');
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  // Lien Instagram unique pour tous les boutons
  const INSTAGRAM_LINK = "https://www.instagram.com/visuals.by.genesis/";
  const apiKey = ""; // La clé API est injectée automatiquement à l'exécution

  // Gestion du scroll pour la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compte à rebours
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev; 
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews');
    if(reviewsSection) reviewsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsSecretModalOpen(true);
  };

  const verifyCode = () => {
    if (secretCode.toUpperCase() === 'GENEFIT') {
      setIsFitnessUnlocked(true);
      setIsSecretModalOpen(false);
      window.scrollTo(0, 0);
    } else {
      setErrorMsg('Code invalide. Accès refusé.');
      setTimeout(() => setErrorMsg(''), 2000);
    }
  };

  // --- FONCTIONS GEMINI API ---

  const generateGenesisPrompt = async () => {
    if (!aiPromptInput.trim()) return;
    setIsAiLoading(true);
    setAiPromptResult(null);

    const systemPrompt = "Tu es GENESIS, un expert mondial en Prompt Engineering pour l'IA générative vidéo (Midjourney, Runway Gen-3, Kling). Ton style est Cyberpunk, Dark, Néon, Cinématographique. L'utilisateur va te donner une idée simple. Tu dois la transformer en : 1. Un Prompt d'Image ultra-détaillé en Anglais (pour Stable Diffusion/Midjourney) avec des mots clés techniques (8k, octane render, volumetric lighting). 2. Un Prompt de Mouvement Caméra pour la vidéo. Réponds en JSON : { \"imagePrompt\": \"...\", \"cameraPrompt\": \"...\" }.";
    
    try {
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
    } catch (error) {
      console.error("Erreur IA:", error);
      setAiPromptResult({ imagePrompt: "Erreur de connexion au Neuro-Core...", cameraPrompt: "Réessayez plus tard." });
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateCoachAdvice = async () => {
    setIsCoachLoading(true);
    const systemPrompt = "Tu es GENEFIT, un coach sportif militaire futuriste et impitoyable mais juste. Donne un conseil tactique court (1 phrase) et motivant pour quelqu'un qui est en train de faire un superset Pompes/Tractions. Ton ton est sec, direct, style 'Sergent Instructeur Cyberpunk'. Utilise des termes comme 'Soldat', 'Opérateur', 'Machine'.";

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Donne moi un boost de motivation tactique maintenant." }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        setAiCoachAdvice(data.candidates[0].content.parts[0].text);
      }
    } catch (error) {
      console.error("Erreur Coach:", error);
    } finally {
      setIsCoachLoading(false);
    }
  };

  // --- VUE COACHING SPORTIF (GENEFIT) ---
  if (isFitnessUnlocked) {
    return (
      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative selection:bg-purple-500 selection:text-white">
        {/* Background Fitness */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black z-0 pointer-events-none"></div>
        <div className="fixed top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

        {/* Navigation Fitness */}
        <nav className="relative z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0">
          <div className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white cursor-pointer" onClick={() => setIsFitnessUnlocked(false)}>
            GENEFIT <span className="text-xs text-purple-500 ml-1 align-top">PRO</span>
          </div>
          <button onClick={() => setIsFitnessUnlocked(false)} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </nav>

        <div className="container mx-auto px-4 py-8 relative z-10 max-w-md md:max-w-2xl">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-900/30 border border-purple-500/30 mb-4 animate-pulse">
               <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="font-orbitron text-3xl md:text-5xl font-black mb-2 italic">SUPERSET <span className="text-purple-500">BODYWEIGHT</span></h1>
            <p className="text-gray-400 font-inter text-sm">Programme Calisthénics • Intensité Haute</p>
          </div>

          {/* Coach IA Section */}
          <div className="mb-6">
            <button 
              onClick={generateCoachAdvice}
              disabled={isCoachLoading}
              className="w-full bg-gradient-to-r from-gray-900 to-black border border-purple-500/50 p-4 rounded-xl flex items-center justify-center gap-2 hover:border-purple-400 transition-all group relative overflow-hidden"
            >
              {isCoachLoading ? (
                 <span className="flex items-center gap-2 text-purple-400 animate-pulse font-mono text-sm">CONNEXION NEURO-LINK...</span>
              ) : (
                <>
                  <Bot className="w-5 h-5 text-purple-500 group-hover:text-white transition-colors" />
                  <span className="font-orbitron text-sm font-bold tracking-wider text-gray-300 group-hover:text-white">
                    DEMANDER UN BOOST TACTIQUE ✨
                  </span>
                </>
              )}
            </button>
            {aiCoachAdvice && (
              <div className="mt-4 p-4 bg-purple-900/20 border-l-4 border-purple-500 rounded-r-lg animate-in fade-in slide-in-from-top-4">
                <p className="font-orbitron text-sm text-purple-100 italic">"{aiCoachAdvice}"</p>
              </div>
            )}
          </div>

          {/* Carte Programme */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Dumbbell className="w-32 h-32 text-purple-500 transform rotate-12" />
            </div>

            <div className="p-8">
               <div className="flex justify-between items-start mb-8">
                 <div>
                   <h2 className="text-xl font-bold font-orbitron mb-1 text-white">POMPES + TRACTIONS</h2>
                   <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
                     <Zap className="w-4 h-4 fill-current" /> INTENSITÉ 9/10
                   </div>
                 </div>
                 <div className="bg-purple-600 px-3 py-1 rounded text-xs font-bold">X5 SERIES</div>
               </div>

               <div className="space-y-6">
                 {/* Exercice 1 */}
                 <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold border border-purple-500/20">1</div>
                    <div>
                      <h3 className="font-bold text-lg">Pompes Classiques</h3>
                      <p className="text-gray-400 text-sm">Contrôler la descente • Explosif à la montée</p>
                    </div>
                    <div className="ml-auto font-orbitron text-2xl font-bold text-white">10</div>
                 </div>

                 <div className="flex justify-center -my-2 relative z-10">
                   <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent"></div>
                 </div>

                 {/* Exercice 2 */}
                 <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold border border-blue-500/20">2</div>
                    <div>
                      <h3 className="font-bold text-lg">Tractions (Pull-ups)</h3>
                      <p className="text-gray-400 text-sm">Menton au dessus de la barre • Bras tendus</p>
                    </div>
                    <div className="ml-auto font-orbitron text-2xl font-bold text-white">MAX</div>
                 </div>
               </div>

               <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="bg-purple-900/20 border border-purple-500/20 p-4 rounded-xl text-center">
                   <div className="flex justify-center mb-2"><Timer className="w-6 h-6 text-purple-400" /></div>
                   <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Repos</div>
                   <div className="font-orbitron text-xl font-bold">2:30 MIN</div>
                 </div>
                 <div className="bg-purple-900/20 border border-purple-500/20 p-4 rounded-xl text-center">
                   <div className="flex justify-center mb-2"><Repeat className="w-6 h-6 text-purple-400" /></div>
                   <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Séries</div>
                   <div className="font-orbitron text-xl font-bold">5 FOIS</div>
                 </div>
               </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-center cursor-pointer hover:brightness-110 transition-all active:scale-[0.98]">
              <span className="font-bold font-orbitron tracking-widest">DÉMARRER LE TIMER</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LANDING PAGE ---
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden relative">
      {/* Styles globaux */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;600;800&display=swap');
        
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .glow-text { text-shadow: 0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3); }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #1f1f1f 1px, transparent 1px),
                            linear-gradient(to bottom, #1f1f1f 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: linear-gradient(to bottom, transparent, black, transparent);
        }

        .neon-border { box-shadow: 0 0 10px rgba(168, 85, 247, 0.2), inset 0 0 10px rgba(168, 85, 247, 0.1); }
      `}</style>

      {/* MODALE SECRÈTE */}
      {isSecretModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-black border border-purple-500/50 rounded-2xl p-8 relative shadow-[0_0_50px_rgba(168,85,247,0.4)]">
            <button onClick={() => setIsSecretModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <Lock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold">ACCÈS RESTREINT</h3>
              <p className="text-gray-400 text-sm mt-2">Veuillez saisir votre code d'accès membre.</p>
            </div>
            <input 
              type="text" 
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              placeholder="CODE D'ACCÈS"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-center font-orbitron tracking-widest focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 mb-4 transition-all uppercase"
              onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
            />
            {errorMsg && <p className="text-red-500 text-xs text-center mb-4">{errorMsg}</p>}
            <button 
              onClick={verifyCode}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg font-orbitron tracking-wider transition-all"
            >
              DÉVERROUILLER
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-black/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 cursor-pointer hover:opacity-80 transition-opacity select-none"
            onClick={handleLogoClick}
          >
            GENESIS
          </div>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:block bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105">
            Rejoindre la formation
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Images Personnages (Overlay Violet Forcé) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            {/* Image Gauche */}
            <div className="absolute top-0 left-[-20%] md:left-0 h-full w-[80%] md:w-[45%] opacity-40 mix-blend-screen md:opacity-60">
                <img src="GAredInspi1 (4).png" alt="" className="w-full h-full object-cover grayscale brightness-50" />
                <div className="absolute inset-0 bg-purple-900 mix-blend-overlay"></div>
            </div>
            
            {/* Image Droite */}
            <div className="absolute top-0 right-[-20%] md:right-0 h-full w-[80%] md:w-[45%] opacity-40 mix-blend-screen md:opacity-60">
                <img src="GAredInspi1 (5).png" alt="" className="w-full h-full object-cover grayscale brightness-50 scale-x-[-1]" />
                <div className="absolute inset-0 bg-purple-900 mix-blend-overlay"></div>
            </div>

            {/* Gradient Overlay Global pour fondre les images dans le noir */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Formation disponible
            </div>
            
            <h1 className="font-orbitron text-5xl md:text-7xl font-black leading-tight drop-shadow-2xl">
              DEVENEZ L'ÉLITE DE LA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 glow-text">
                VIDÉO IA
              </span>
            </h1>
            
            <p className="font-inter text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-lg">
              Maîtrisez la génération photo et vidéo IA. Du concept à la production cinématographique. Rejoignez le workflow utilisé pour les plus grands artistes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-lg transition-all duration-300 overflow-hidden text-center shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="flex items-center justify-center gap-2">
                  Accéder à la Formation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a href="#programme" className="px-8 py-4 border border-white/20 hover:border-purple-500 hover:bg-purple-500/10 rounded-lg font-bold text-lg transition-all text-white flex items-center justify-center gap-2 backdrop-blur-sm">
                <Play className="w-5 h-5 fill-current" /> Voir le programme
              </a>
            </div>

            {/* Avis Cliquables */}
            <div 
              onClick={scrollToReviews}
              className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors group"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 345}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="group-hover:underline decoration-purple-500 underline-offset-4 text-shadow-sm">Rejoint par +500 créateurs</p>
            </div>
          </div>

          {/* Visual Video Embed - Kozi Azerty */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black transform group-hover:scale-[1.01] transition-transform duration-500">
               {/* YouTube Embed */}
               <div className="aspect-[16/9] lg:aspect-[4/3] bg-black relative overflow-hidden flex items-center justify-center">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/mVfM2ogLpwc?rel=0&modestbranding=1" 
                    title="Kozi - Azerty (VISUALIZER)" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    className="w-full h-full object-cover"
                  ></iframe>
               </div>
               
               {/* Overlay Info */}
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 inline-flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="font-orbitron text-xs text-white">Création IA • Kozi - Azerty</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Social Proof */}
      <section className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm font-inter tracking-widest uppercase mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['KOZI', 'GIMS', 'WERENOI', 'LA FOUINE', 'FRANCE 2', 'SONY MUSIC'].map((brand, idx) => (
              <h3 key={idx} className="font-orbitron text-xl md:text-3xl font-bold text-white/40 hover:text-white hover:glow-text transition-colors cursor-default select-none">
                {brand}
              </h3>
            ))}
          </div>
        </div>
      </section>

      {/* NEW AI PLAYGROUND SECTION */}
      <section className="py-24 relative z-10 border-b border-white/5">
        <div className="absolute inset-0 bg-purple-900/5 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles className="w-3 h-3" /> DEMO GRATUITE
            </span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">GENESIS <span className="text-purple-500">PROMPT ARCHITECT</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Testez la puissance de notre workflow. Entrez une idée simple, et notre IA générera pour vous un prompt professionnel prêt à l'emploi (Stable Diffusion + Runway).
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
                   GÉNÉRER ✨
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
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span> IMAGE PROMPT (Midjourney/SD)
                        </h4>
                        <p className="text-gray-300 bg-white/5 p-3 rounded border border-white/5 selection:bg-purple-500/50">
                          {aiPromptResult.imagePrompt}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span> CAMERA MOTION (Runway/Kling)
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

      {/* Problem vs Solution */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">L'IA NE DOIT PAS ÊTRE <span className="text-purple-500">COMPLIQUÉE</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Arrêtez de perdre du temps avec des tutoriels obsolètes et des outils qui ne fonctionnent pas. Passez au niveau supérieur.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="p-8 rounded-2xl bg-neutral-900/50 border border-red-900/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
              <h3 className="text-red-400 font-orbitron text-xl font-bold mb-4 flex items-center gap-2">
                <span className="p-1 rounded bg-red-500/20">❌</span> Sans la formation
              </h3>
              <ul className="space-y-4 text-gray-400 font-inter">
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">•</span> Rendu amateur et incohérent (glitchs).</li>
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">•</span> Perte de temps sur des installations complexes.</li>
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">•</span> Vidéos qui ressemblent à tout le monde.</li>
                <li className="flex items-start gap-3"><span className="text-red-500 mt-1">•</span> Impossible de vendre vos services à des pros.</li>
              </ul>
            </div>

            {/* The Genesis Way */}
            <div className="p-8 rounded-2xl bg-purple-900/20 border border-purple-500/50 relative overflow-hidden neon-border group">
              <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
              <h3 className="text-purple-400 font-orbitron text-xl font-bold mb-4 flex items-center gap-2">
                <span className="p-1 rounded bg-purple-500/20">✅</span> Avec GENESIS
              </h3>
              <ul className="space-y-4 text-gray-200 font-inter">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Workflow PRO (Stable Diffusion, ComfyUI).</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Style cinématographique unique.</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Méthodes pour débutants ET experts.</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-purple-400 shrink-0" /> Capacité à monétiser vos créations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="programme" className="py-24 bg-neutral-900/30 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-16 text-center">LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">PROGRAMME</span></h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard 
              icon={<Zap className="w-8 h-8 text-purple-400" />}
              title="Les Bases & Outils"
              desc="Prise en main des IA génératives. Outils en ligne simples pour des résultats immédiats sans PC puissant."
            />
            <ModuleCard 
              icon={<Monitor className="w-8 h-8 text-pink-400" />}
              title="Workflow Avancé"
              desc="Maîtrisez Stable Diffusion, ComfyUI et Midjourney. Installation, prompts secrets et paramétrages."
            />
            <ModuleCard 
              icon={<Film className="w-8 h-8 text-blue-400" />}
              title="Animation Vidéo"
              desc="Transformez des images en vidéos fluides (Kling, Runway). Contrôle du mouvement et de la caméra."
            />
            <ModuleCard 
              icon={<Users className="w-8 h-8 text-green-400" />}
              title="Deepfake & Faceswap"
              desc="Techniques professionnelles pour l'intégration de visages (pour les clips musicaux et parodies)."
            />
            <ModuleCard 
              icon={<ShieldCheck className="w-8 h-8 text-yellow-400" />}
              title="Montage & FX"
              desc="Tutoriel complet de montage. Upscale 4K, étalonnage couleur, effets spéciaux et sound design."
            />
             <ModuleCard 
              icon={<Star className="w-8 h-8 text-purple-400" />}
              title="Bonus: Business"
              desc="Comment vendre vos prestations. Export réseaux sociaux. PDF récapitulatif de 32 pages inclus."
            />
          </div>
        </div>
      </section>

      {/* Target Audience */}
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
                    <h4 className="font-bold text-lg">Vous êtes vidéaste/créatif</h4>
                    <p className="text-gray-400 text-sm">Vous voulez intégrer l'IA dans votre workflow pour gagner du temps et proposer des effets impossibles à filmer.</p>
                  </div>
                </div>

                 <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/30 shrink-0">
                    <span className="font-bold text-blue-400">03</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Vous voulez monétiser</h4>
                    <p className="text-gray-400 text-sm">Vous cherchez une compétence rare et demandée pour vendre des clips ou des publicités.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
               <div className="aspect-square rounded-2xl bg-neutral-800 relative overflow-hidden border border-white/10">
                 {/* Decorative mock-up */}
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

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-neutral-900/30 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-16 text-center">
            CE QU'ILS EN <span className="text-purple-500">PENSENT</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ReviewCard 
              name="Sergeï" 
              role="Créateur de Contenu"
              text="Grace à Alexis et Valentin de Genesis, j'ai pu apprendre les bonnes bases, qui m'ont permis de produire mes premiers contenus de valeur sur instagram et ça m'a permis de trouver mes premiers clients! Genesis a été d'une aide crutiale, tant sur le plan stratégique que sur le plan technique."
              delay="0"
            />
            <ReviewCard 
              name="Eric" 
              role="Musicien & Artiste"
              text="J'ai rentabilisé la formation en 2 clips. En tant que musicien autodidacte, j'ai eu un vrai boost dans mon travail et mes vues ont explosé grace à Genesis qui m'a formé à la création de vidéos iA. Ils m'ont accompagné pour faire mes clips et visuels iA pour mes sons!"
              delay="100"
            />
            <ReviewCard 
              name="Sarah L." 
              role="Fondatrice Marque Streetwear"
              text="Je voulais lancer ma marque de vêtements et je voulais des visuels uniques pour TikTok. La formation de Valentin et Alexis est incroyable. J'ai créé des campagnes pubs futuristes qui ont cartonné. Ce sont clairement les meilleurs en France pour les visuels IA, un game changer !"
              delay="200"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg mx-auto bg-black/80 backdrop-blur-xl border border-purple-500 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            
            <div className="bg-gradient-to-b from-purple-900/50 to-black p-8 text-center border-b border-white/10">
              <div className="inline-block bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-pulse">
                OFFRE DE LANCEMENT
              </div>
              <h3 className="font-orbitron text-3xl font-bold mb-2">GENESIS ACADEMY</h3>
              <p className="text-gray-400 text-sm">Accès illimité à vie + Mises à jour</p>
            </div>

            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-gray-500 line-through text-2xl">500€</span>
                <span className="text-5xl font-black font-orbitron text-white">299€</span>
              </div>
              <div className="flex justify-center items-center gap-2 text-red-400 font-bold text-sm mb-8">
                <Clock className="w-4 h-4" />
                <span>Offre expire dans : {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m</span>
              </div>

              <div className="space-y-4 text-left mb-8 pl-4">
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-purple-500 w-5 h-5" /> +5H de formation vidéo</li>
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-purple-500 w-5 h-5" /> PDF Récapitulatif 32 pages</li>
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-purple-500 w-5 h-5" /> Accès aux outils IA privés</li>
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-purple-500 w-5 h-5" /> Workflow "Visuals by Genesis"</li>
                <li className="flex items-center gap-3 text-gray-300"><Check className="text-purple-500 w-5 h-5" /> Support communautaire</li>
              </div>

              <a 
                href={INSTAGRAM_LINK}
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-4 bg-white text-black font-bold text-xl rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                REJOINDRE MAINTENANT
              </a>
              <p className="text-gray-500 text-xs mt-4">Paiement sécurisé. Satisfaction garantie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-900/30 relative z-10">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-orbitron text-3xl font-bold mb-12 text-center">QUESTIONS FRÉQUENTES</h2>
          <div className="space-y-4">
            <FaqItem question="Faut-il un PC puissant ?" answer="Non, la formation couvre des outils en ligne (Cloud) qui fonctionnent sur n'importe quel ordinateur, même un Mac. Pour la partie locale (optionnelle), un PC avec carte Nvidia est recommandé." />
            <FaqItem question="Est-ce adapté aux débutants ?" answer="Absolument. Nous partons de zéro. Le module 1 est dédié à la prise en main des outils. Vous créerez votre première image en 10 minutes." />
            <FaqItem question="Combien de temps dure la formation ?" answer="C'est une formation dense et concise pour aller droit au but. Comptez environ 5 à 6 heures de vidéo, plus le temps de pratique." />
            <FaqItem question="Ai-je accès aux mises à jour ?" answer="Oui ! L'IA évolue vite. En rejoignant GENESIS maintenant, vous aurez accès aux futurs modules additionnels gratuitement." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-center relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="font-orbitron text-2xl font-bold mb-6 tracking-widest">GENESIS</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-purple-600 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <div className="text-gray-600 text-sm space-x-6 mb-8">
            <a href={INSTAGRAM_LINK} target="_blank" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href={INSTAGRAM_LINK} target="_blank" className="hover:text-white transition-colors">CGV</a>
            <a href={INSTAGRAM_LINK} target="_blank" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-700 text-xs">© 2024 GENESIS VISUALS. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

// Composants Utilitaires
const ReviewCard = ({ name, role, text, delay }) => (
  <div className="p-8 rounded-2xl bg-black border border-white/10 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col h-full relative">
    <Quote className="absolute top-6 right-6 text-purple-900/40 w-12 h-12" />
    <div className="flex items-center gap-1 mb-4 text-yellow-400">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="text-gray-300 font-inter text-sm leading-relaxed mb-6 flex-grow italic">"{text}"</p>
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{name}</h4>
        <p className="text-purple-400 text-xs">{role}</p>
      </div>
    </div>
  </div>
);

const ModuleCard = ({ icon, title, desc }) => (
  <div className="group p-6 rounded-xl bg-black border border-white/5 hover:border-purple-500/50 hover:bg-purple-900/10 transition-all duration-300 cursor-default">
    <div className="mb-4 bg-white/5 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-orbitron text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
    <p className="text-gray-500 font-inter text-sm leading-relaxed">{desc}</p>
  </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-lg bg-black overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors">
        <span className="font-bold text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-purple-500" /> : <ChevronDown className="text-gray-500" />}
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

export default GenesisLanding;