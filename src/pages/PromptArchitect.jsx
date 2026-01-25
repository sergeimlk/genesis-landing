import { useState, useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sparkles, Monitor, Camera, Zap, User, X,
    Terminal, Copy, Check, ChevronDown, Lock, Play, Image, Film, Aperture, Sun
} from 'lucide-react';

const STORAGE_KEY = 'promptArchitect';

const FREE_MODELS = [
    "nousresearch/deephermes-3-llama-3-8b-preview:free",
    "deepseek/deepseek-r1-distill-llama-70b:free",
    "qwen/qwen2.5-vl-32b-instruct:free",
    "google/gemini-2.0-flash-thinking-exp:free",
    "meta-llama/llama-3.3-70b-instruct:free"
];

// --- AI GENERATION MODELS ---
const AI_MODELS = {
    video: [
        { id: 'veo3', name: 'Google Veo 3', image: '/ui/perso/GenModels/video/Google-Veo-3.jpg' },
        { id: 'kling', name: 'Kling AI', image: '/ui/perso/GenModels/video/kling_ai_logo.png' },
        { id: 'runway', name: 'Runway Gen-3', image: '/ui/perso/GenModels/video/runway_gen3_logo.png' },
        { id: 'sora', name: 'OpenAI Sora', image: '/ui/perso/GenModels/video/openai_sora_logo.png' },
    ],
    image: [
        { id: 'midjourney', name: 'Midjourney', image: '/ui/perso/GenModels/image/midjourney_logo.png' },
        { id: 'dalle3', name: 'DALL-E 3', image: '/ui/perso/GenModels/image/dalle_3_logo.png' },
        { id: 'flux', name: 'Flux AI', image: '/ui/perso/GenModels/image/flux_ai_logo.png' },
        { id: 'seedream', name: 'Seedream', image: '/ui/perso/GenModels/image/seedream_logo.jpg' },
        { id: 'nanobanana', name: 'Nano Banana', image: '/ui/perso/GenModels/image/nano_banana_logo.png' },
    ]
};

const GEN_STYLES = [
    { id: 'genesis-cinematic', name: 'Cinematic', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200&auto=format&fit=crop' },
    { id: 'cyberpunk', name: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=200&auto=format&fit=crop' },
    { id: 'simpsons', name: 'Simpsons', image: 'public/ui/perso/GenModels/image/simpsons.png' },
    { id: 'minecraft', name: 'Minecraft', image: 'public/ui/perso/GenModels/image/minecraft.png' },
    { id: 'disney-pixar', name: 'Disney Pixar', image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=200&auto=format&fit=crop' },
    { id: 'studio-ghibli', name: 'Studio Ghibli', image: 'public/ui/perso/GenModels/image/ghibli.png' },
    { id: 'vaporwave', name: 'Vaporwave', image: 'public/ui/perso/GenModels/image/vaporwave.png' },
    { id: 'realistic', name: 'Realistic Photo', image: 'https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=200&auto=format&fit=crop' },
    { id: 'anime', name: 'Anime Shinkai', image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=200&auto=format&fit=crop' },
    { id: 'oil-painting', name: 'Van Gogh Oil', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=200&auto=format&fit=crop' },
];

// --- CAMERA & AI CONFIGURATION ---
const SHOT_TYPES = [
    { id: 'extreme-close-up', name: 'Extreme Close-up', desc: 'ECU', scale: 4 },
    { id: 'close-up', name: 'Close-up', desc: 'CU', scale: 3 },
    { id: 'medium-close-up', name: 'Medium Close-up', desc: 'MCU', scale: 2.2 },
    { id: 'medium-shot', name: 'Medium Shot', desc: 'MS', scale: 1.8 },
    { id: 'cowboy-shot', name: 'Cowboy Shot', desc: 'CS', scale: 1.5 },
    { id: 'medium-full', name: 'Medium Full', desc: 'MFS', scale: 1.3 },
    { id: 'full-shot', name: 'Full Shot', desc: 'FS', scale: 1.1 },
    { id: 'wide-shot', name: 'Wide Shot', desc: 'WS', scale: 0.9 },
    { id: 'extreme-wide', name: 'Extreme Wide', desc: 'EWS', scale: 0.6 },
    { id: 'top-view', name: 'Top View', desc: 'Bird Eye', scale: 0.7 },
    { id: 'low-angle', name: 'Low Angle', desc: 'LA', scale: 1.2 },
    { id: 'high-angle', name: 'High Angle', desc: 'HA', scale: 1.0 },
    { id: 'dutch-angle', name: 'Dutch Angle', desc: 'Tilted', scale: 1.1 },
    { id: 'over-shoulder', name: 'Over Shoulder', desc: 'OTS', scale: 1.4 },
    { id: 'pov', name: 'First Person POV', desc: 'POV', scale: 1.6 },
    { id: 'drone-view', name: 'Drone View', desc: 'Aerial', scale: 0.5 },
];

const CAMERA_MOVES = [
    // Standard
    { id: 'Static', label: 'Static', anim: '' },
    { id: 'Dolly In', label: 'Dolly In', anim: 'anim-dolly-in' },
    { id: 'Dolly Out', label: 'Dolly Out', anim: 'anim-dolly-out' },
    { id: 'Dolly Zoom', label: 'Dolly Zoom', anim: 'anim-dolly-in' }, // Simulating with dolly in for now
    { id: 'Truck Left', label: 'Truck Left', anim: 'anim-pan-left' },
    { id: 'Truck Right', label: 'Truck Right', anim: 'anim-pan-right' },
    { id: 'Pan Left', label: 'Pan Left', anim: 'anim-pan-left' },
    { id: 'Pan Right', label: 'Pan Right', anim: 'anim-pan-right' },
    { id: 'Tilt Up', label: 'Tilt Up', anim: 'anim-tilt-up' },
    { id: 'Tilt Down', label: 'Tilt Down', anim: 'anim-tilt-down' },
    { id: 'Orbit 360', label: 'Orbit 360', anim: 'anim-orbit' },
    { id: 'Handheld Shake', label: 'Handheld Shake', anim: 'anim-shake' },
    { id: 'Barrel Roll', label: 'Barrel Roll', anim: 'anim-roll' },
    // FPV & Others (Default static or simple scale)
    { id: 'FPV Dive', label: 'FPV Dive', anim: 'anim-tilt-down' },
    { id: 'FPV Rise', label: 'FPV Rise', anim: 'anim-tilt-up' },
    { id: 'FPV Chase', label: 'FPV Chase', anim: 'anim-dolly-in' },
    { id: 'Tracking Shot', label: 'Tracking Shot', anim: 'anim-pan-right' },
    { id: 'Crane Up', label: 'Crane Up', anim: 'anim-tilt-up' },
    { id: 'Crane Down', label: 'Crane Down', anim: 'anim-tilt-down' },
    { id: 'Whip Pan', label: 'Whip Pan', anim: 'anim-pan-left duration-75' }, // Fast pan?
];

const CAMERA_FX = [
    'None', 'Motion Blur', 'Chromatic Aberration', 'Film Grain', 'Light Leaks',
    'Lens Flare', 'Vignette', 'Bokeh', 'Double Exposure', 'Glitch Effect',
    'VHS Distortion', 'Bloom Neon', 'Camera Shockwave'
];

const LIGHTING_STYLES = [
    { id: 'natural', name: 'Natural', image: '/ui/icons/lighting/natural.png' },
    { id: 'cinematic', name: 'Cinematic', image: '/ui/icons/lighting/cinematic.png' },
    { id: 'studio', name: 'Studio', image: '/ui/icons/lighting/studio.png' },
    { id: 'neon-noir', name: 'Neon Noir', image: '/ui/icons/lighting/neon_noir.png' },
    { id: 'golden-hour', name: 'Golden Hour', image: '/ui/icons/lighting/golden_hour.png' },
    { id: 'blue-hour', name: 'Blue Hour', image: '/ui/icons/lighting/blue_hour.png' },
    { id: 'rembrandt', name: 'Rembrandt', image: '/ui/icons/lighting/rembrandt.png' },
    { id: 'volumetric-fog', name: 'Volumetric Fog', image: '/ui/icons/lighting/volumetric_fog.png' },
    { id: 'bioluminescent', name: 'Bioluminescent', image: '/ui/icons/lighting/bioluminescent.png' },
    { id: 'cyberpunk-neon', name: 'Cyberpunk Neon', image: '/ui/icons/lighting/cyberpunk_neon.png' },
];

// --- INITIAL STATE ---
const initialState = {
    generationType: 'video',
    aiModel: 'veo3',
    style: 'genesis-cinematic',
    shotType: 'wide-shot',
    duration: '5s',
    aspectRatio: '16:9',
    cameraMovement: 'Static',
    cameraFX: 'None',
    lighting: 'cinematic',
    subject: '',
    fps: '24'
};

function reducer(state, action) {
    return { ...state, [action.type]: action.value };
}

// --- MAIN COMPONENT ---
export default function PromptArchitect({ embedded = false }) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [uses, setUses] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showIntro, setShowIntro] = useState(!embedded);
    const [showFomoBanner, setShowFomoBanner] = useState(true);

    // Countdown logic
    useEffect(() => {
        let timer;
        if (generating && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [generating, countdown]);

    // Load uses and check 24h reset
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            const now = Date.now();
            if (now - data.timestamp > 24 * 60 * 60 * 1000) {
                // Reset after 24h
                setUses(0);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ uses: 0, timestamp: now }));
            } else {
                setUses(data.uses);
            }
        }
    }, []);

    // Load unlock status
    useEffect(() => {
        const isUnlocked = localStorage.getItem('genesis_pro_unlocked') === 'true';
        setUnlocked(isUnlocked);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(result || state, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Save uses to localStorage
    const saveUses = (newUses) => {
        setUses(newUses);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ uses: newUses, timestamp: Date.now() }));
    };

    const handleGenerate = async () => {
        if (!unlocked && uses >= 3) {
            setIsLoginOpen(true);
            return;
        }

        if (!state.subject.trim()) {
            alert("Veuillez décrire votre scène.");
            return;
        }

        setGenerating(true);
        setCountdown(15);

        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) {
            console.warn("API Key manquante. Mode simulation.");
            setTimeout(() => {
                setResult({
                    video_prompt: "Cinematic shot of " + state.subject + ", high resolution, 8k, unreal engine 5 render",
                    image_prompt: "Photorealistic image of " + state.subject + ", detailed textures, volumetric lighting",
                    negative_prompt: "blurry, low quality, distorted, watermark"
                });
                setGenerating(false);
                saveUses(uses + 1);
            }, 3000);
            return;
        }

        let success = false;
        let lastError = null;

        for (const model of FREE_MODELS) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.href,
                        "X-Title": "Genesis Prompt Architect"
                    },
                    body: JSON.stringify({
                        "model": model,
                        "provider": {
                            "data_collection": "allow"
                        },
                        "messages": [
                            {
                                "role": "system",
                                "content": `Tu es un expert mondial en Prompt Engineering pour la génération vidéo (Runway Gen-3, Kling, Sora).
                                Transforme la description de l'utilisateur en un prompt technique PARFAIT.
                                
                                PARAMÈTRES ACTUELS :
                                - Type: ${state.generationType}
                                - Modèle: ${state.aiModel}
                                - Style: ${state.style} (Utilise ce style visuel !)
                                - Cadrage: ${state.shotType}
                                - Durée: ${state.duration}
                                - Mouvement: ${state.cameraMovement}
                                - Effets: ${state.cameraFX}
                                - Ambiance (Mood): ${state.lighting}

                                RÈGLES CRITIQUES :
                                1. Réponds UNIQUEMENT le JSON pur. Pas de markdown, pas de texte avant/après.
                                2. Structure JSON attendue :
                                {
                                  "video_prompt": "Description technique en anglais, mots-clés cinématiques, mouvements de caméra précis...",
                                  "image_prompt": "Version optimisée pour Midjourney/DALL-E, focus sur la composition et la lumière...",
                                  "technical_details": "Explication courte des choix techniques (1 phrase)"
                                }
                                3. Sois créatif but précis sur les termes techniques (8k, octane render, volumetric fog, etc...).`
                            },
                            {
                                "role": "user",
                                "content": `Sujet de la scène : "${state.subject}"`
                            }
                        ]
                    })
                });

                if (!response.ok) {
                    const errText = await response.text();
                    console.warn(`Modèle ${model} indisponible (${response.status}): ${errText}`);
                    lastError = new Error(`Modèle ${model} -> ${response.status}`);
                    continue;
                }

                const data = await response.json();
                if (!data.choices || !data.choices[0]) throw new Error("Réponse vide");

                let content = data.choices[0].message.content;

                // Robust JSON Extraction
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    content = jsonMatch[0];
                } else {
                    throw new Error("L'IA n'a pas retourné de JSON valide.");
                }

                const jsonResult = JSON.parse(content);
                setResult(jsonResult);
                saveUses(uses + 1);
                success = true;
                break;

            } catch (error) {
                console.warn(`Erreur technique avec ${model}:`, error);
                lastError = error;
            }
        }

        if (!success) {
            console.error("Tous les modèles ont échoué.", lastError);
            alert(`Tous les modèles gratuits sont surchargés. Veuillez réessayer dans un instant.\nDernière erreur: ${lastError?.message}`);
        }

        setGenerating(false);
    };

    return (
        <div className={embedded ? "w-full text-white font-sans relative" : "min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden overflow-y-auto relative"}>

            {/* INTRO OVERLAY */}
            {showIntro && !embedded && (
                <IntroOverlay onComplete={() => setShowIntro(false)} />
            )}

            {/* BACKGROUND AMBIANCE */}
            {!embedded && (
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slower"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
                </div>
            )}

            {/* FOMO BANNER */}
            {!embedded && showFomoBanner && (
                <FomoBanner onClose={() => setShowFomoBanner(false)} />
            )}

            {/* NAVBAR */}
            {!embedded && (
                <NavBar
                    onProfileClick={() => setIsLoginOpen(true)}
                    unlocked={unlocked}
                    hasBanner={showFomoBanner}
                />
            )}

            {/* MAIN CONTENT */}
            <main className={`relative z-10 container mx-auto px-6 ${embedded ? 'py-0' : 'pt-48 pb-24'} flex flex-col items-center min-h-[calc(100vh-80px)]`}>

                {/* HERO HEADER */}
                <div className="text-center mb-5 mt-36 space-y-4 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold font-orbitron text-purple-300 tracking-wider">PROMPT ARCHITECT Pro</span>
                    </div>
                    <h1 className="text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                        VOS PROMPTS <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">OPTIMISÉS!</span>
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-md px-4">
                        L'outil ultime pour générer des prompts vidéo cinématiques.
                    </p>
                </div>

                {/* WORKSPACE PREVIEW */}
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up delay-100">

                    {/* LEFT: CONTROLS & INPUT */}
                    <div className="lg:col-span-8 flex flex-col gap-3">

                        {/* INPUT CARD */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-1 transition-all hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                            <div className="bg-[#0a0a0a]/50 rounded-[28px] p-5 h-full min-h-[100px] max-h-[450px] flex flex-col relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Terminal className="w-5 h-5" />
                                        <span className="text-sm font-bold tracking-widest uppercase">Décrivez votre scène</span>
                                    </div>
                                    {embedded && (
                                        <button
                                            onClick={() => navigate('/prompt')}
                                            className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-black text-xs font-black font-orbitron rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all transform hover:scale-105 active:scale-95 border border-yellow-300/50"
                                        >
                                            <Sparkles size={12} className="fill-black/50" />
                                            ACCÈS PRO
                                        </button>
                                    )}
                                </div>

                                <textarea
                                    value={state.subject}
                                    onChange={(e) => dispatch({ type: 'subject', value: e.target.value })}
                                    placeholder="Décrivez votre scène: Un samouraï cyberpunk marchant sous la pluie à néo-tokyo..."
                                    className="w-full flex-1 bg-transparent border-none outline-none text-2xl md:text-3xl font-medium text-white placeholder-white/20 resize-none font-sans leading-relaxed pb-24 genesis-scrollbar"
                                />

                                {/* CHARACTER COUNT */}
                                <div className="text-xs text-gray-500 font-mono text-right mt-2">
                                    {state.subject.length} chars
                                </div>

                                {/* FLOATING ACTION BAR */}
                                <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-white/5 pb-16">
                                    {/* ROW 1: Dimensions, Durée, Effet, Eclairage */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <AspectRatioSelect
                                            value={state.aspectRatio}
                                            onChange={(v) => dispatch({ type: 'aspectRatio', value: v })}
                                        />
                                        <PillSelect
                                            icon={Play}
                                            value={state.duration}
                                            options={['5s', '10s', '15s']}
                                            onChange={(v) => dispatch({ type: 'duration', value: v })}
                                        />
                                        <PillSelect
                                            icon={Zap}
                                            value={state.cameraFX}
                                            options={CAMERA_FX}
                                            onChange={(v) => dispatch({ type: 'cameraFX', value: v })}
                                        />

                                    </div>

                                    {/* ROW 2: Angle, Mouvement, Style */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <ShotTypeSelect
                                            value={state.shotType}
                                            onChange={(v) => dispatch({ type: 'shotType', value: v })}
                                        />
                                        <MotionSelect
                                            value={state.cameraMovement}
                                            onChange={(v) => dispatch({ type: 'cameraMovement', value: v })}
                                        />
                                        <StyleSelect
                                            value={state.style}
                                            onChange={(v) => dispatch({ type: 'style', value: v })}
                                        />
                                    </div>

                                    {/* ROW 3: Modèle & Mood */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex-1 min-w-[140px]">
                                            <MoodSelect
                                                value={state.lighting}
                                                onChange={(v) => dispatch({ type: 'lighting', value: v })}
                                            />
                                        </div>
                                        <div className="flex-[2] min-w-[200px]">
                                            <ModelSelect
                                                generationType={state.generationType}
                                                value={state.aiModel}
                                                onChange={(v) => dispatch({ type: 'aiModel', value: v })}
                                                onTypeChange={(v) => dispatch({ type: 'generationType', value: v })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* GENERATE BUTTON - Fixed Bottom Right */}
                                <div className="absolute bottom-6 right-6 z-10">
                                    <button
                                        onClick={handleGenerate}
                                        disabled={generating}
                                        className={`relative group bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-[16px] shadow-lg shadow-purple-600/30 transition-all hover:scale-105 hover:shadow-purple-600/50 active:scale-95 flex items-center gap-2 overflow-hidden ${generating ? 'cursor-wait ring-2 ring-purple-500/50' : ''}`}
                                    >
                                        {/* Futuristic Scanner Effect */}
                                        {generating && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                        )}

                                        <Sparkles className={`w-4 h-4 fill-current ${generating ? 'animate-spin' : 'animate-pulse'}`} />
                                        {generating ? 'PROCESSING...' : 'GENERATE'}
                                    </button>

                                    {/* Usage Badge */}
                                    <div className="absolute -top-3 -right-2 z-[100] bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-red-400 animate-bounce pointer-events-none">
                                        {uses >= 3 ? '0 ESSAI' : `${3 - uses} FREE`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: JSON PREVIEW */}
                    <div className="lg:col-span-4">
                        <div className="h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col relative overflow-hidden group">

                            {/* LOADING OVERLAY */}
                            {generating && (
                                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                                    <div className="relative w-24 h-24 mb-4">
                                        <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                                        <div className="absolute inset-2 rounded-full border-r-2 border-indigo-500 animate-spin-reverse"></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                            {countdown}
                                        </div>
                                    </div>
                                    <p className="text-purple-300 font-mono text-sm animate-pulse tracking-widest">
                                        GENERATING PROMPT...
                                    </p>
                                    <div className="mt-2 text-xs text-gray-500 font-mono">
                                        Optimization w/ {state.aiModel}
                                    </div>
                                </div>
                            )}
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 ml-2">prompt_preview.json</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar font-mono text-xs md:text-sm text-purple-200/90 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result || state, null, 2)}</pre>
                            </div>

                            {/* Decoration */}
                            <div className="absolute bottom-0 right-0 p-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
                        </div>
                    </div>

                </div>

            </main>

            {/* LOGIN MODAL */}
            {isLoginOpen && (
                <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    unlocked={unlocked}
                />
            )}

            {/* CSS Utilities inline for simplicity */}
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slower { animation: pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
        </div>
    );
}

// --- SUB COMPONENTS ---

// FOMO Banner Component
const FomoBanner = ({ onClose }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            const diff = midnight - now;
            return {
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white py-2 px-4 flex items-center justify-center gap-3 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onClose}
        >
            <span className="animate-pulse">🔥</span>
            <span className="hidden sm:inline">OFFRE DE LANCEMENT :</span>
            <span className="font-bold">-40% sur GENESIS</span>
            <span className="hidden md:inline">·</span>
            <div className="flex items-center gap-1 font-mono font-bold bg-black/20 px-2 py-0.5 rounded">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="animate-pulse">:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="animate-pulse">:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
            <span className="hidden lg:inline">avant fin de promo</span>
            <span className="text-xs opacity-70 ml-2 hidden sm:inline">(clic pour fermer)</span>
            <X size={16} className="ml-2 opacity-70 hover:opacity-100" />
        </div>
    );
};

const NavBar = ({ onProfileClick, unlocked, hasBanner }) => (
    <header className={`fixed ${hasBanner ? 'top-10' : 'top-0'} inset-x-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 backdrop-blur-md border-b border-white/5 bg-[#050505]/50 transition-all duration-300`}>
        <div className="flex items-center gap-4">
            <div className="h-[70px] aspect-[9/16] rounded-[20px] overflow-hidden border border-white/10 shadow-lg shadow-purple-900/20">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/ui/perso/animation/1G.mp4" type="video/mp4" />
                </video>
            </div>
            <span className="font-orbitron font-bold text-xl tracking-wider">GENESIS <span className="text-purple-500 text-xs align-top">LABS</span></span>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-xs font-bold text-gray-400">
                <div className={`w-2 h-2 rounded-full ${unlocked ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                {unlocked ? 'PRO MEMBER' : 'FREE TIER'}
            </div>

            <button
                onClick={onProfileClick}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all group"
            >
                <User className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </button>
        </div>
    </header>
);

const PillSelect = ({ icon: Icon, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <Icon size={14} className="text-purple-400" />
                <span>{value}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-auto min-w-full bg-[#111] border border-white/10 rounded-2xl shadow-xl shadow-black/50 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-60 overflow-y-auto genesis-scrollbar flex flex-col p-2">
                            {options.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { onChange(opt); setIsOpen(false); }}
                                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${value === opt ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// Aspect Ratio Data with visual proportions
const ASPECT_RATIOS = [
    { id: '16:9', name: '16:9', w: 16, h: 9, desc: 'Widescreen' },
    { id: '9:16', name: '9:16', w: 9, h: 16, desc: 'Vertical' },
    { id: '1:1', name: '1:1', w: 1, h: 1, desc: 'Square' },
    { id: '21:9', name: '21:9', w: 21, h: 9, desc: 'Ultrawide' },
    { id: '4:3', name: '4:3', w: 4, h: 3, desc: 'Classic' },
    { id: '3:2', name: '3:2', w: 3, h: 2, desc: 'Photo' },
    { id: '5:4', name: '5:4', w: 5, h: 4, desc: 'Large Format' },
    { id: '2:3', name: '2:3', w: 2, h: 3, desc: 'Portrait' },
    { id: '3:4', name: '3:4', w: 3, h: 4, desc: 'Portrait+' },
    { id: '4:5', name: '4:5', w: 4, h: 5, desc: 'Instagram' },
];

const AspectRatioSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentRatio = ASPECT_RATIOS.find(r => r.id === value) || ASPECT_RATIOS[0];

    // Calculate icon dimensions (max 20px)
    const getIconDimensions = (w, h) => {
        const maxSize = 18;
        const ratio = w / h;
        if (ratio >= 1) {
            return { width: maxSize, height: maxSize / ratio };
        } else {
            return { width: maxSize * ratio, height: maxSize };
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <div
                    className="border-2 border-purple-400 rounded-sm bg-purple-400/20"
                    style={getIconDimensions(currentRatio.w, currentRatio.h)}
                />
                <span>{currentRatio.name}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-80 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-xl shadow-black/50 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-2">
                            <div className="grid grid-cols-2 gap-1.5">
                                {ASPECT_RATIOS.map(ratio => {
                                    const dims = getIconDimensions(ratio.w, ratio.h);
                                    return (
                                        <button
                                            key={ratio.id}
                                            onClick={() => { onChange(ratio.id); setIsOpen(false); }}
                                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${value === ratio.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            <div
                                                className={`border-2 rounded-sm flex-shrink-0 ${value === ratio.id ? 'border-white bg-white/20' : 'border-gray-500 bg-gray-500/20'}`}
                                                style={dims}
                                            />
                                            <div className="flex flex-col items-start">
                                                <span className="font-bold">{ratio.name}</span>
                                                <span className={`text-[9px] ${value === ratio.id ? 'text-purple-200' : 'text-gray-500'}`}>{ratio.desc}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const ModelSelect = ({ generationType, value, onChange, onTypeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const models = AI_MODELS[generationType] || [];
    const currentModel = models.find(m => m.id === value) || models[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <div className="w-6 h-6 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                    {currentModel && (
                        <img
                            src={currentModel.image}
                            alt={currentModel.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <span className="hidden sm:inline">{currentModel?.name || 'Model'}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden z-[100] p-1 animate-in fade-in zoom-in-95 duration-200">
                        {/* Type Tabs */}
                        <div className="flex border-b border-white/5">
                            <button
                                onClick={() => { onTypeChange('video'); onChange(AI_MODELS.video[0].id); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-colors ${generationType === 'video' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Film size={14} />
                                VIDEO
                            </button>
                            <button
                                onClick={() => { onTypeChange('image'); onChange(AI_MODELS.image[0].id); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-colors ${generationType === 'image' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Image size={14} />
                                IMAGE
                            </button>
                        </div>

                        {/* Model List */}
                        <div className="p-2 max-h-64 overflow-y-auto genesis-scrollbar">
                            {models.map(model => (
                                <button
                                    key={model.id}
                                    onClick={() => { onChange(model.id); setIsOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${value === model.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                                        <img
                                            src={model.image}
                                            alt={model.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span>{model.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const StyleSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const textValue = (value) => {
        const style = GEN_STYLES.find(s => s.id === value);
        return style ? style.name : 'Style';
    };
    const currentStyle = GEN_STYLES.find(s => s.id === value) || GEN_STYLES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <div className="w-6 h-6 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                    <img
                        src={currentStyle.image}
                        alt={currentStyle.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="hidden sm:inline">{currentStyle.name}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden z-[100] p-1 animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-3 grid grid-cols-2 gap-2 max-h-80 overflow-y-auto genesis-scrollbar">
                            {GEN_STYLES.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => { onChange(style.id); setIsOpen(false); }}
                                    className={`relative group rounded-xl overflow-hidden border transition-all ${value === style.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}
                                >
                                    <div className="aspect-square w-full">
                                        <img
                                            src={style.image}
                                            alt={style.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                                            <span className="text-[10px] font-bold text-white truncate w-full text-center">{style.name}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const MoodSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentStyle = LIGHTING_STYLES.find(s => s.id === value) || LIGHTING_STYLES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <div className="w-6 h-6 rounded-full overflow-hidden gray-scale-0 bg-white/5 flex-shrink-0 border border-white/20">
                    <img
                        src={currentStyle.image}
                        alt={currentStyle.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="hidden sm:inline">{currentStyle.name}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden z-[100] p-1 animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-3 grid grid-cols-2 gap-2 max-h-80 overflow-y-auto genesis-scrollbar">
                            {LIGHTING_STYLES.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => { onChange(style.id); setIsOpen(false); }}
                                    className={`relative group rounded-xl overflow-hidden border transition-all ${value === style.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}
                                >
                                    <div className="aspect-square w-full relative">
                                        <img
                                            src={style.image}
                                            alt={style.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2">
                                            <span className="text-[10px] font-bold text-white truncate w-full text-center">{style.name}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const MotionSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentMove = CAMERA_MOVES.find(m => m.id === value) || CAMERA_MOVES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                    <img
                        src="/ui/perso/animation/pngvaltop.png"
                        alt="Camera Move"
                        className={`w-full h-full object-cover ${currentMove.anim}`}
                    />
                </div>
                <span className="hidden sm:inline">{currentMove.label}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-80 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-80 overflow-y-auto genesis-scrollbar p-2">
                            <div className="grid grid-cols-3 gap-2">
                                {CAMERA_MOVES.map(move => (
                                    <button
                                        key={move.id}
                                        onClick={() => { onChange(move.id); setIsOpen(false); }}
                                        className={`relative group rounded-xl border transition-all flex flex-col items-center overflow-hidden ${value === move.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}
                                    >
                                        <div className="aspect-square w-full bg-black/50 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px]"></div>
                                            <img
                                                src="/ui/perso/animation/pngvaltop.png"
                                                alt={move.label}
                                                className={`w-3/4 h-3/4 object-contain ${move.anim}`}
                                            />
                                        </div>
                                        <div className={`w-full py-1.5 px-1 text-center ${value === move.id ? 'bg-purple-600' : 'bg-black/70'}`}>
                                            <span className={`text-[9px] font-bold truncate block ${value === move.id ? 'text-white' : 'text-gray-400'}`}>{move.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const ShotTypeSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentShot = SHOT_TYPES.find(s => s.id === value) || SHOT_TYPES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 min-w-[140px]"
            >
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                    <img
                        src="/ui/perso/animation/pngvaltop.png"
                        alt="Shot Type"
                        className="object-cover"
                        style={{ transform: `scale(${currentShot.scale})` }}
                    />
                </div>
                <span className="hidden sm:inline">{currentShot.name}</span>
                <span className="sm:hidden">{currentShot.desc}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-2 w-80 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/70 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-80 overflow-y-auto genesis-scrollbar p-2">
                            <div className="grid grid-cols-3 gap-2">
                                {SHOT_TYPES.map(shot => (
                                    <button
                                        key={shot.id}
                                        onClick={() => { onChange(shot.id); setIsOpen(false); }}
                                        className={`relative group rounded-xl border transition-all flex flex-col items-center overflow-hidden ${value === shot.id ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}
                                    >
                                        <div className="aspect-square w-full bg-black/50 flex items-center justify-center relative overflow-hidden">
                                            <img
                                                src="/ui/perso/animation/pngvaltop.png"
                                                alt={shot.name}
                                                className="object-cover transition-transform"
                                                style={{ transform: `scale(${shot.scale})` }}
                                            />
                                        </div>
                                        <div className={`w-full py-1.5 px-1 text-center ${value === shot.id ? 'bg-purple-600' : 'bg-black/70'}`}>
                                            <span className={`text-[9px] font-bold truncate block ${value === shot.id ? 'text-white' : 'text-gray-400'}`}>{shot.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const IntroOverlay = ({ onComplete }) => {
    const videoRef = useRef(null);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0;
        }
    }, []);

    const handleEnd = () => {
        setFading(true);
        setTimeout(onComplete, 800);
    };

    return (
        <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}>
            <video
                ref={videoRef}
                src="/ui/perso/animation/1G.mp4"
                muted
                autoPlay
                playsInline
                onEnded={handleEnd}
                onClick={handleEnd}
                className="max-w-[90%] max-h-[90%] md:max-w-[800px] rounded-[70px] shadow-[0_0_100px_rgba(147,51,234,0.2)] object-cover border border-white/10"
            />
        </div>
    );
};

const LoginModal = ({ isOpen, onClose }) => {
    const [code, setCode] = useState('');

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleUnlock = () => {
        console.log("Unlocking with code:", code);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 shadow-2xl shadow-purple-900/20 overflow-hidden">

                {/* Glow */}
                <div className="absolute top-0 inset-x-0 h-[100px] bg-purple-600/20 blur-[60px]"></div>

                <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center text-center mt-4 mb-8">
                    <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-[24px] flex items-center justify-center mb-6 shadow-lg shadow-purple-600/30">
                        <User size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold font-orbitron mb-2">Essais Gratuits Épuisés</h2>
                    <p className="text-gray-400 text-sm">Vous avez utilisé vos 2 essais gratuits. Débloquez l'accès illimité avec la formation Genesis.</p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-1 focus-within:border-purple-500/50 transition-colors">
                        <input
                            type="password"
                            placeholder="CODE PRO"
                            className="w-full bg-transparent border-none outline-none text-center font-mono tracking-[0.5em] text-white h-12 placeholder-white/20"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                        />
                    </div>

                    <button
                        onClick={handleUnlock}
                        className="w-full bg-white text-black font-bold h-14 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Lock size={18} /> DÉBLOQUER PRO
                    </button>

                    <a
                        href="https://www.instagram.com/visuals.by.genesis/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold h-14 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 mt-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        DEMANDER LE CODE À GENESIS
                    </a>

                    <p className="text-xs text-center text-gray-500 pt-4 cursor-pointer hover:text-purple-400 transition-colors">
                        Pas de code ? <a href="/" className="text-purple-400 underline">Rejoindre la formation</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
