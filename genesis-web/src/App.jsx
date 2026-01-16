import React, { useState, useEffect } from 'react';
import {
  Play, Check, Star, ChevronDown, ChevronUp, Instagram, ArrowRight, Zap,
  Monitor, Film, Users, ShieldCheck, Clock, Quote, Lock, X, Dumbbell,
  Activity, Timer, Repeat
} from 'lucide-react';
import './App.css';

const INSTAGRAM_LINK = "https://www.instagram.com/visuals.by.genesis/";

const GenesisLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [isFitnessUnlocked, setIsFitnessUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown Timer (to Midnight Tonight)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // Midnight tonight

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
    if (secretCode.toUpperCase() === 'GENEGYM') {
      setIsFitnessUnlocked(true);
      setIsSecretModalOpen(false);
      window.scrollTo(0, 0);
    } else {
      setErrorMsg('Code invalide. Accès refusé.');
      setTimeout(() => setErrorMsg(''), 2000);
    }
  };

  if (isFitnessUnlocked) {
    return <FitnessView onClose={() => setIsFitnessUnlocked(false)} />;
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo-container" onClick={() => setIsSecretModalOpen(true)}>
            <img src="/img/Glogo.png" alt="Genesis Logo" className="t-logo" />
            <span className="logo-text text-gradient">GENESIS</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#programme" className="link-nav" style={{ color: '#9ca3af', fontWeight: 500 }}>Programme</a>
            <a href="#reviews" className="link-nav" style={{ color: '#9ca3af', fontWeight: 500 }}>Avis</a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-cta-nav">
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
          {/* 1. TOP HEADER (Centered) */}
          <div className="hero-top-header animate-fade-up">
            <div className="hero-tag mb-6">
              <span className="dot"></span>
              Formation Disponible • Accès exclusif!
            </div>
            <h1 className="hero-title-main">
              CRÉEZ DES CLIPS VIDÉO IA<br />
              <span className="text-gradient">NIVEAU CINÉMA EN 7 JOURS</span>
            </h1>
          </div>

          {/* 2. SPLIT CONTENT (30% Left / 70% Right) */}
          <div className="hero-split-layout">

            {/* Left Actions */}
            <div className="hero-left-col animate-fade-up delay-100">
              <p className="hero-desc">
                Même sans compétences techniques. Le workflow secret utilisé par les réalisateurs pour générer des revenus passifs et signer des clients premium.
              </p>
              <div className="hero-actions">
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Rejoindre l'Élite <ArrowRight size={20} />
                </a>
                <a href="#programme" className="btn-secondary">
                  <Play size={20} fill="white" /> Découvrir
                </a>
              </div>

              <div className="social-proof">
                <div className="avatar-stack">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 345}`} alt="User" />
                  ))}
                </div>
                <p>Déjà rejoint par <strong>500+ créateurs</strong> dont <span style={{ color: '#a855f7' }}>GIMS, NETFLIX...</span></p>
              </div>
            </div>

            {/* Right Video (Bigger) */}
            <div className="video-card-wrapper animate-float">
              <div className="video-card">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 opacity-20 z-10 pointer-events-none"></div>
                {/* Using iframe wrapper for responsiveness */}
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/mVfM2ogLpwc?rel=0&modestbranding=1&controls=0&autoplay=1&mute=0&loop=1&playlist=mVfM2ogLpwc"
                    title="Demo Video"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-glow"></div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Trust Section (Marquee) */}
      <section className="section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <p className="trust-title">Ils nous font confiance</p>

        <div className="marquee-container">
          <div className="marquee-track marquee-normal">
            {['KOZI', 'GIMS', 'WERENOI', 'LA FOUINE', 'SONY MUSIC', 'NETFLIX', 'UNIVERSAL', 'CANAL+', 'M6', 'Spotify'].map((brand, idx) => (
              <span key={idx} className="marquee-item">{brand}</span>
            ))}
            {['KOZI', 'GIMS', 'WERENOI', 'LA FOUINE', 'SONY MUSIC', 'NETFLIX', 'UNIVERSAL', 'CANAL+', 'M6', 'Spotify'].map((brand, idx) => (
              <span key={`dup-${idx}`} className="marquee-item">{brand}</span>
            ))}
          </div>
        </div>

        <div className="marquee-container" style={{ marginTop: '20px' }}>
          <div className="marquee-track marquee-reverse">
            {['WARNER', 'DEEZER', 'APPLE MUSIC', 'VOGUE', 'VICE', 'KONBINI', 'BOOSKA-P', 'SKYROCK', 'MOUV', 'GENERATIONS'].map((brand, idx) => (
              <span key={idx} className="marquee-item">{brand}</span>
            ))}
            {['WARNER', 'DEEZER', 'APPLE MUSIC', 'VOGUE', 'VICE', 'KONBINI', 'BOOSKA-P', 'SKYROCK', 'MOUV', 'GENERATIONS'].map((brand, idx) => (
              <span key={`dup-${idx}`} className="marquee-item">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">L'IA NE DOIT PAS ÊTRE <span className="text-gradient">COMPLIQUÉE</span></h2>

          <div className="comparison-grid">
            {/* Old Way */}
            <div className="card bad">
              <h3 className="card-title text-red-400" style={{ color: '#f87171' }}>
                <span className="p-2 bg-red-500/10 rounded">❌</span> Sans la formation
              </h3>
              <ul>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Rendu amateur et glitchy</li>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Des heures d'installation techniques</li>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Vidéos génériques sans âme</li>
                <li className="list-item"><span style={{ color: '#f87171' }}>•</span> Difficulté à monétiser</li>
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
                <li className="list-item"><Check size={20} color="#a855f7" /> Stratégies de Vente (Business)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="section-padding bg-black/50">
        <div className="container">
          <h2 className="section-title">LE <span className="text-gradient">PROGRAMME</span></h2>
          <div className="modules-grid">
            <ModuleCard icon={<Zap />} title="Les Bases & Outils" desc="Comprendre l'IA générative. Outils Cloud pour démarrer sans PC puissant dès le premier jour." />
            <ModuleCard icon={<Monitor />} title="Workflow Expert" desc="Installation et maîtrise de Stable Diffusion & ComfyUI. Les prompts secrets des pros." />
            <ModuleCard icon={<Film />} title="Animation Vidéo" desc="AnimateDiff, Runway, Kling. Transformez des images en scènes de film fluides." />
            <ModuleCard icon={<Users />} title="Deepfake & FX" desc="Techniques de FaceSwap avancées et effets spéciaux pour clips et parodies." />
            <ModuleCard icon={<ShieldCheck />} title="Post-Production" desc="Montage, Upscale 4K, Colorimétrie. Le polissage final qui fait la différence." />
            <ModuleCard icon={<Star />} title="Bonus: Business" desc="Comment trouver des clients, pricer vos prestations et vivre de votre art." />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="section-padding">
        <div className="container">
          <h2 className="section-title">CE QU'ILS EN <span className="text-gradient">PENSENT</span></h2>
          <div className="modules-grid">
            <ReviewCard name="Sergeï" role="Créateur de Contenu" text="Mes vues ont explosé grâce à Genesis. J'ai trouvé mes premiers clients en moins de 2 semaines !" />
            <ReviewCard name="Eric" role="Artiste" text="J'ai rentabilisé la formation en 2 clips. Un gain de temps monstrueux pour mes visuels." />
            <ReviewCard name="Sarah L." role="Marque Fashion" text="Enfin une formation claire. J'ai créé toute la campagne pub de ma marque avec l'IA. Incroyable." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding relative overflow-hidden">
        {/* Glow effect background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="pricing-card">
            <div className="pricing-header">
              {/* FOMO Urgency Block */}
              <div className="fomo-container">
                <div className="fomo-label">⚡ OFFRE DE LANCEMENT</div>
                <div className="fomo-warning">Le prix double ce soir à minuit !</div>
                <div className="fomo-countdown">
                  <div className="countdown-item">
                    <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">Heures</span>
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
              <h3>GENESIS ACADEMY</h3>
              <p className="text-muted text-sm">Accès à vie + Mises à jour futures</p>
            </div>
            <div className="p-8 text-center">
              <div className="flex-center mb-4">
                <span className="old-price">500€</span>
                <span className="price">299€</span>
              </div>

              <div className="text-left space-y-4 mb-8" style={{ maxWidth: '300px', margin: '0 auto 30px' }}>
                <li className="list-item"><Check size={20} color="#a855f7" /> +6H de formation vidéo 4K</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> PDF Récapitulatif (Bible IA)</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Accès Communauté Privée</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Pas besoin de PC puissant (Mode Cloud)</li>
                <li className="list-item"><Check size={20} color="#a855f7" /> Garantie Satisfait ou Remboursé (14 Jours)</li>
              </div>

              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-join-main">
                REJOINDRE MAINTENANT
              </a>
              <p className="flex-center text-xs text-muted mt-4">Paiement sécurisé via Stripe/PayPal</p>
            </div>
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
              answer="Non ! Nous montrons des méthodes Cloud qui tournent sur n'importe quel Mac ou PC standard. Si vous avez une grosse carte graphique, nous avons aussi des modules pour vous."
              isOpen={activeFaq === 0}
              onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
            />
            <FaqItem
              question="Est-ce adapté aux débutants ?"
              answer="Oui. Nous commençons par les bases absolues. Si vous savez envoyer un email, vous pouvez suivre cette formation."
              isOpen={activeFaq === 1}
              onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
            />
            <FaqItem
              question="Y a-t-il une garantie ?"
              answer="Absolument. Essayez la méthode pendant 14 jours. Si vous n'êtes pas satisfait, nous vous remboursons intégralement."
              isOpen={activeFaq === 2}
              onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontWeight: 900, fontSize: '1.5rem', marginBottom: '20px' }}>GENESIS</h2>
          <p className="text-muted text-sm mb-8">© 2024 Visuals by Genesis. All rights reserved.</p>
          <div className="flex-center gap-6 text-sm text-muted">
            <a href="#">Mentions Légales</a>
            <a href="#">CGV</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

      {/* Modale Secrète */}
      {isSecretModalOpen && (
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

// --- GENEGYM PRO (FITNESS APP) ---
const FitnessView = ({ onClose }) => {
  // Programs Data
  const programs = {
    'Superset Bodyweight': [
      { id: 1, title: 'Pompes Explosives', sets: '4 Séries', reps: '12 Reps', done: false },
      { id: 2, title: 'Tractions Pronation', sets: '4 Séries', reps: 'Max Reps', done: false },
      { id: 3, title: 'Dips aux Barres', sets: '3 Séries', reps: '15 Reps', done: false },
      { id: 4, title: 'Squats Sautés', sets: '4 Séries', reps: '20 Reps', done: false },
      { id: 5, title: 'Gainage Commando', sets: '3 Séries', reps: '1 Min', done: false }
    ],
    'Full Body': [
      { id: 10, title: 'Squat', sets: '4 Séries', reps: '8-10 Reps', done: false },
      { id: 11, title: 'Développé Couché', sets: '4 Séries', reps: '8-10 Reps', done: false },
      { id: 12, title: 'Rowing Barre', sets: '4 Séries', reps: '10 Reps', done: false },
      { id: 13, title: 'Overhead Press', sets: '3 Séries', reps: '12 Reps', done: false },
      { id: 14, title: 'Soulevé de Terre', sets: '3 Séries', reps: '5 Reps', done: false }
    ],
    'Split': [
      { id: 20, title: 'Développé Incliné', sets: '4 Séries', reps: '10 Reps', done: false },
      { id: 21, title: 'Écartés Couché', sets: '3 Séries', reps: '15 Reps', done: false },
      { id: 22, title: 'Barre au Front', sets: '4 Séries', reps: '12 Reps', done: false },
      { id: 23, title: 'Extensions Poulie', sets: '3 Séries', reps: '15 Reps', done: false }
    ],
    'PPL': [
      { id: 30, title: 'Push Ups', sets: '3 Séries', reps: 'Max', done: false },
      { id: 31, title: 'Pull Ups', sets: '3 Séries', reps: 'Max', done: false },
      { id: 32, title: 'Lunges', sets: '3 Séries', reps: '20 Reps', done: false }
    ],
    'Upper Lower': [
      { id: 40, title: 'Bench Press', sets: '4 Séries', reps: '8 Reps', done: false },
      { id: 41, title: 'Pull Downs', sets: '4 Séries', reps: '10 Reps', done: false },
      { id: 42, title: 'Shoulder Press', sets: '3 Séries', reps: '12 Reps', done: false }
    ]
  };

  const [activeProgram, setActiveProgram] = useState('Superset Bodyweight');
  const [exercises, setExercises] = useState(programs['Superset Bodyweight']);

  // Update exercises when program changes
  useEffect(() => {
    setExercises(programs[activeProgram]);
  }, [activeProgram]);

  const [timer, setTimer] = useState(120); // 2 minutes default
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [introMessage, setIntroMessage] = useState('');

  // AI Coach Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'coach', text: "Wesh l'équipe ! Prêt à charbonner ? C'est le moment de se transformer en machine." }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Init Intro Message
  useEffect(() => {
    const intros = [
      "Yo les gars ! Aujourd'hui on se fait un entraînement du turfu, créé par Mily ! Est-ce que vous êtes chauds ?",
      "Wesh l'équipe ! C'est l'heure de la séance de zinzin. On lâche rien, ok ?",
      "Salut les frères ! Grosse séance aujourd'hui. On va tout casser !",
      "Yo la famille ! Prêts à souffrir un peu pour devenir des monstres ?"
    ];
    setIntroMessage(intros[Math.floor(Math.random() * intros.length)]);
    setChatMessages([{ sender: 'coach', text: intros[Math.floor(Math.random() * intros.length)] }]);
  }, []);

  // Check Completion
  useEffect(() => {
    const allDone = exercises.every(ex => ex.done);
    if (allDone && exercises.length > 0) {
      setShowCelebration(true);
      addCoachMessage("Incroyable ! Bien joué Alexis & Valentin ! Vous avez tué la séance. Reposez-vous bien !");
    }
  }, [exercises]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setTimer(120); // Reset
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const toggleExercise = (id) => {
    setExercises(exercises.map(ex =>
      ex.id === id ? { ...ex, done: !ex.done } : ex
    ));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const addCoachMessage = (text) => {
    setChatMessages(prev => [...prev, { sender: 'coach', text }]);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);

    setTimeout(() => {
      const userText = chatInput.toLowerCase();
      let response = "T'inquiète paupiette, continue comme ça !";
      const randomReplies = [
        "C'est ça qu'on veut voir ! Lâche rien bro !",
        "Tkt frère, t'es une machine. Continue.",
        "C'est une séance de zinzin j'avoue, mais t'es au niveau.",
        "Allez on focus ! La douleur c'est l'information qui rentre dans le muscle."
      ];
      response = randomReplies[Math.floor(Math.random() * randomReplies.length)];
      addCoachMessage(response);
    }, 1000);

    setChatInput('');
  };

  return (
    <div className="fitness-app">
      <div className="fit-bg-gradient"></div>

      {/* Navbar */}
      <nav className="fit-navbar">
        <div className="fit-logo">
          <Activity className="text-purple-500 animate-pulse" />
          <span>GENEGYM <span className="text-purple-500 text-xs align-top">PRO</span></span>
        </div>
        <button onClick={onClose} className="fit-close-btn"><X /></button>
      </nav>

      <div className="container" style={{ maxWidth: '800px', paddingTop: '100px', paddingBottom: '100px' }}>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="fit-title">{activeProgram.toUpperCase()}</h1>
          <p className="text-purple-400 mt-2 font-bold tracking-widest">SÉLECTIONNEZ VOTRE PROGRAMME</p>
        </div>

        {/* Program Tabs */}
        <div className="program-tabs">
          {Object.keys(programs).map(prog => (
            <button
              key={prog}
              onClick={() => setActiveProgram(prog)}
              className={`tab-item ${activeProgram === prog ? 'active' : ''}`}
            >
              {prog}
            </button>
          ))}
        </div>

        {/* Roadmap Roadmap */}
        <div className="fit-roadmap">
          {exercises.map((ex, index) => (
            <div key={ex.id} className={`roadmap-step ${ex.done ? 'completed' : ''}`}>
              <div
                className="step-checkbox"
                onClick={() => toggleExercise(ex.id)}
              >
                {ex.done && <Check size={20} color="black" strokeWidth={4} />}
              </div>

              <div className="step-content">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`font-orbitron font-bold text-lg ${ex.done ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {ex.title}
                  </h3>
                  <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-purple-400 border border-purple-500/20">
                    {ex.sets}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{ex.reps} • Repos recommandé 2 min</p>
              </div>

              {!isTimerActive && !ex.done && (
                <button onClick={() => setIsTimerActive(true)} className="step-timer-btn">
                  <Clock size={16} /> Repos
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Floating Timer Widget */}
        {isTimerActive && (
          <div className="fit-timer-float animate-float">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Repos</div>
            <div className="font-orbitron text-4xl font-black text-white tabular-nums">
              {formatTime(timer)}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsTimerActive(false)}
                className="bg-purple-500/20 hover:bg-purple-500/40 text-purple-500 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={() => setTimer(prev => prev + 30)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
              >
                +30s
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Coach Widget */}
      <div className={`coach-widget ${isChatOpen ? 'open' : ''}`}>
        {!isChatOpen && (
          <button onClick={() => setIsChatOpen(true)} className="coach-toggle-btn animate-bounce-slow">
            <div className="relative">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CoachMily&gender=male" alt="Coach" />
              </div>
            </div>
          </button>
        )}

        {isChatOpen && (
          <div className="coach-chat-window">
            <div className="coach-header">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 border border-white overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CoachMily&gender=male" alt="Coach" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Coach Mily Bot</h4>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white"><ChevronDown /></button>
            </div>

            <div className="coach-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`message ${msg.sender === 'coach' ? 'coach' : 'user'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="coach-input-area">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pose une question..."
              />
              <button type="submit"><ArrowRight size={16} /></button>
            </form>
          </div>
        )}
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="congrats-card animate-fade-up">
            <Star className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-spin-slow" fill="currentColor" />
            <h2 className="text-4xl font-orbitron font-black mb-4">FÉLICITATIONS !</h2>
            <p className="text-xl text-gray-300 mb-8">Bravo <span className="text-purple-500 font-bold">Alexis & Valentin</span> !</p>
            <p className="text-gray-400 text-sm mb-8">Séance terminée.</p>
            <button
              onClick={() => { setShowCelebration(false); onClose(); }}
              className="btn-primary"
              style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '50px' }}
            >
              RETOURNER À L'ACCUEIL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenesisLanding;
