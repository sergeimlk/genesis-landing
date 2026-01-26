
import { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sparkles, Terminal, Copy, Check, ChevronDown, Play, Zap,
    Image, Film, Aperture, Sun
} from 'lucide-react';

// --- IMPORTS ARCHITECTURE ---
import { STORAGE_KEY, INITIAL_STATE, AI_MODELS, GEN_STYLES, SHOT_TYPES, CAMERA_MOVES, CAMERA_FX, LIGHTING_STYLES, ASPECT_RATIOS } from '../data/promptData';
import { SmartSelect } from '../components/architect/SmartSelect';
import { PromptNavBar } from '../components/architect/PromptNavBar';
import { IntroOverlay, LoginModal, FomoBanner } from '../components/architect/ArchitectOverlays';
import { usePromptGenerator } from '../hooks/usePromptGenerator';

function reducer(state, action) {
    return { ...state, [action.type]: action.value };
}

// Aspect Ratio Icon Helper
const getRatioDims = (w, h) => {
    const maxSize = 18;
    const r = w / h;
    return r >= 1
        ? { width: maxSize, height: maxSize / r }
        : { width: maxSize * r, height: maxSize };
};

export default function PromptArchitect({ embedded = false }) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    // UI States
    const [uses, setUses] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showIntro, setShowIntro] = useState(!embedded);
    const [showFomoBanner, setShowFomoBanner] = useState(true);

    // Persistence Logic
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            const now = Date.now();
            if (now - data.timestamp > 24 * 60 * 60 * 1000) {
                setUses(0);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ uses: 0, timestamp: now }));
            } else {
                setUses(data.uses);
            }
        }
        setUnlocked(localStorage.getItem('genesis_pro_unlocked') === 'true');
    }, []);

    const saveUses = (newUses) => {
        setUses(newUses);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ uses: newUses, timestamp: Date.now() }));
    };

    // Generation Logic Hook
    const { generating, result, countdown, handleGenerate } = usePromptGenerator({
        state, uses, saveUses, unlocked, setIsLoginOpen
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(result || state, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- CUSTOM RENDERERS FOR SMART SELECTS ---



    return (
        <div className={embedded ? "w-full text-white font-sans relative" : "min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden overflow-y-auto relative"}>

            {/* OVERLAYS */}
            {showIntro && !embedded && <IntroOverlay onComplete={() => setShowIntro(false)} />}
            {!embedded && showFomoBanner && <FomoBanner onClose={() => setShowFomoBanner(false)} />}
            {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} unlocked={unlocked} />}

            {/* BACKGROUND */}
            {!embedded && (
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slower"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
                </div>
            )}

            {/* NAVBAR */}
            {!embedded && <PromptNavBar onProfileClick={() => setIsLoginOpen(true)} unlocked={unlocked} hasBanner={showFomoBanner} />}

            {/* MAIN CONTENT */}
            <main className={`relative z-10 container mx-auto px-6 ${embedded ? 'py-0' : 'pt-48 pb-24'} flex flex-col items-center min-h-[calc(100vh-80px)]`}>

                {/* HERO */}
                <div className="text-center mb-5 mt-32 space-y-4 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold font-orbitron text-purple-300 tracking-wider">PROMPT ARCHITECT Pro</span>
                    </div>
                    <h1 className="text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                        VOS PROMPTS <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">OPTIMISÉS!</span>
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-md px-4">L'outil ultime pour générer des prompts vidéo cinématiques.</p>
                </div>

                {/* WORKSPACE PREVIEW */}
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up delay-100">

                    {/* CONTROL PANEL */}
                    <div className="lg:col-span-8 flex flex-col gap-3">
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-1 transition-all hover:border-purple-500/30">
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <div className="bg-[#0a0a0a]/50 rounded-[28px] p-5 h-full min-h-[100px] max-h-auto flex flex-col relative">

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Terminal className="w-5 h-5" />
                                        <span className="text-sm font-bold tracking-widest uppercase">Décrivez votre scène</span>
                                    </div>
                                    {embedded && (
                                        <button
                                            onClick={() => navigate('/prompt')}
                                            className="relative overflow-hidden group bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-black font-black font-orbitron text-[10px] tracking-wider px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all border border-yellow-300/50 flex items-center gap-1.5"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-[50%] -translate-x-[150%] animate-shimmer skew-x-12"></div>
                                            <Sparkles size={12} className="fill-black/20 text-black relative z-10" />
                                            <span className="relative z-10">ACCÈS PRO</span>
                                        </button>
                                    )}
                                </div>

                                <textarea
                                    value={state.subject}
                                    onChange={(e) => {
                                        const currentModel = AI_MODELS[state.generationType].find(m => m.id === state.aiModel);
                                        const max = currentModel?.maxChars || 2000;
                                        if (e.target.value.length <= max) {
                                            dispatch({ type: 'subject', value: e.target.value });
                                        }
                                    }}
                                    placeholder="Décrivez votre scène: Un samouraï cyberpunk marchant sous la pluie à néo-tokyo..."
                                    className="w-full flex-1 bg-transparent border-none outline-none text-2xl md:text-3xl font-medium text-white placeholder-white/20 resize-none font-sans leading-relaxed pb-24 genesis-scrollbar"
                                />
                                <div className="text-xs text-gray-500 font-mono text-right mt-2">
                                    {state.subject.length} / {AI_MODELS[state.generationType].find(m => m.id === state.aiModel)?.maxChars || 2000} chars
                                </div>

                                {/* TOOLBAR */}
                                <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-white/5 pb-16">

                                    <div className="flex flex-wrap items-center gap-2">
                                        {/* 1. Model */}
                                        <SmartSelect
                                            value={state.aiModel}
                                            options={AI_MODELS[state.generationType]}
                                            onChange={(v) => dispatch({ type: 'aiModel', value: v })}
                                            widthClass="w-64"
                                            gridCols={1}
                                            tabs={[
                                                { id: 'video', label: 'VIDEO', onClick: () => dispatch({ type: 'generationType', value: 'video' }), isActive: state.generationType === 'video' },
                                                { id: 'image', label: 'IMAGE', onClick: () => dispatch({ type: 'generationType', value: 'image' }), isActive: state.generationType === 'image' }
                                            ]}
                                            renderTrigger={(opt, isOpen) => (
                                                <>
                                                    <div className="w-6 h-6 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                                                        <img src={opt?.image} alt={opt?.name || 'Model'} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="hidden sm:inline">{opt?.name}</span>
                                                    <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                            renderOption={(model, isSelected) => (
                                                <div className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isSelected ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                                                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                                                        <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span>{model.name}</span>
                                                </div>
                                            )}
                                        />

                                        {/* 2. Aspect Ratio */}
                                        <SmartSelect
                                            value={state.aspectRatio}
                                            options={ASPECT_RATIOS}
                                            onChange={(v) => dispatch({ type: 'aspectRatio', value: v })}
                                            widthClass="w-80"
                                            gridCols={2}
                                            maxHeight="max-h-64"
                                            renderTrigger={(opt, isOpen) => (
                                                <>
                                                    <div className="border-2 border-purple-400 rounded-sm bg-purple-400/20" style={getRatioDims(opt.w, opt.h)} />
                                                    <span>{opt.name}</span>
                                                    <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                            renderOption={(ratio, isSelected) => (
                                                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${isSelected ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                                                    <div className={`border-2 rounded-sm flex-shrink-0 ${isSelected ? 'border-white bg-white/20' : 'border-gray-500 bg-gray-500/20'}`} style={getRatioDims(ratio.w, ratio.h)} />
                                                    <div className="flex flex-col items-start">
                                                        <span className="font-bold">{ratio.name}</span>
                                                        <span className={`text-[9px] ${isSelected ? 'text-purple-200' : 'text-gray-500'}`}>{ratio.desc}</span>
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        {/* 3. Shot Type */}
                                        <SmartSelect
                                            value={state.shotType}
                                            options={SHOT_TYPES}
                                            onChange={(v) => dispatch({ type: 'shotType', value: v })}
                                            widthClass="w-80"
                                            gridCols={2}
                                            maxHeight="max-h-64"
                                            renderTrigger={(opt, isOpen) => (
                                                <>
                                                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                                                        <img src="/ui/perso/animation/pngvaltop.png" alt="Shot" className="object-cover" style={{ transform: `scale(${opt.scale})` }} />
                                                    </div>
                                                    <span className="hidden sm:inline">{opt.name}</span>
                                                    <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                            renderOption={(shot, isSelected) => (
                                                <div className={`relative group rounded-xl border transition-all flex flex-col items-center overflow-hidden ${isSelected ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}>
                                                    <div className="aspect-square w-full bg-black/50 flex items-center justify-center relative overflow-hidden">
                                                        <img src="/ui/perso/animation/pngvaltop.png" alt={shot.name} className="object-cover" style={{ transform: `scale(${shot.scale})` }} />
                                                    </div>
                                                    <div className={`w-full py-1.5 px-1 text-center ${isSelected ? 'bg-purple-600' : 'bg-black/70'}`}>
                                                        <span className={`text-[9px] font-bold truncate block ${isSelected ? 'text-white' : 'text-gray-400'}`}>{shot.name}</span>
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        {/* 4. Motion */}
                                        <SmartSelect
                                            value={state.cameraMovement}
                                            options={CAMERA_MOVES}
                                            onChange={(v) => dispatch({ type: 'cameraMovement', value: v })}
                                            widthClass="w-80"
                                            gridCols={2}
                                            maxHeight="max-h-64"
                                            idKey="id"
                                            labelKey="label"
                                            renderTrigger={(opt, isOpen) => (
                                                <>
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                                                        <img src="/ui/perso/animation/pngvaltop.png" alt="Move" className={`w-full h-full object-cover ${opt.anim}`} />
                                                    </div>
                                                    <span className="hidden sm:inline">{opt.label}</span>
                                                    <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                            renderOption={(move, isSelected) => (
                                                <div className={`relative group rounded-xl border transition-all flex flex-col items-center overflow-hidden ${isSelected ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}>
                                                    <div className="aspect-square w-full bg-black/50 flex items-center justify-center relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px]"></div>
                                                        <img src="/ui/perso/animation/pngvaltop.png" alt={move.label} className={`w-3/4 h-3/4 object-contain ${move.anim}`} />
                                                    </div>
                                                    <div className={`w-full py-1.5 px-1 text-center ${isSelected ? 'bg-purple-600' : 'bg-black/70'}`}>
                                                        <span className={`text-[9px] font-bold truncate block ${isSelected ? 'text-white' : 'text-gray-400'}`}>{move.label}</span>
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        {/* 5. Camera FX */}
                                        <SmartSelect
                                            icon={Zap}
                                            value={state.cameraFX}
                                            onChange={(v) => dispatch({ type: 'cameraFX', value: v })}
                                            options={CAMERA_FX}
                                            gridCols={2}
                                            maxHeight="max-h-64"
                                            widthClass="w-64"
                                        />

                                        {/* 6. Style */}
                                        <SmartSelect
                                            value={state.style}
                                            options={GEN_STYLES}
                                            onChange={(v) => dispatch({ type: 'style', value: v })}
                                            widthClass="w-64"
                                            gridCols={2}
                                            maxHeight="max-h-64"
                                            renderTrigger={(opt, isOpen) => (
                                                <>
                                                    <div className="w-6 h-6 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                                                        <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="hidden sm:inline">{opt.name}</span>
                                                    <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                            renderOption={(style, isSelected) => (
                                                <div className={`relative group rounded-xl overflow-hidden border transition-all ${isSelected ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}>
                                                    <div className="aspect-square w-full">
                                                        <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                                                            <span className="text-[10px] font-bold text-white truncate w-full text-center">{style.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        {/* 7. Lighting */}
                                        <SmartSelect
                                            value={state.lighting}
                                            options={LIGHTING_STYLES}
                                            onChange={(v) => dispatch({ type: 'lighting', value: v })}
                                            widthClass="w-64"
                                            gridCols={2}
                                            maxHeight="max-h-64"
                                            renderTrigger={(opt, isOpen) => (
                                                <>
                                                    <div className="w-6 h-6 rounded-full overflow-hidden gray-scale-0 bg-white/5 flex-shrink-0 border border-white/20">
                                                        <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <span className="hidden sm:inline">{opt.name}</span>
                                                    <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </>
                                            )}
                                            renderOption={(style, isSelected) => (
                                                <div className={`relative group rounded-xl overflow-hidden border transition-all ${isSelected ? 'border-purple-500 ring-1 ring-purple-500' : 'border-white/10 hover:border-white/30'}`}>
                                                    <div className="aspect-square w-full relative">
                                                        <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2">
                                                            <span className="text-[10px] font-bold text-white truncate w-full text-center">{style.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* GENERATE BTN */}
                                <div className="absolute bottom-6 right-6 z-10">
                                    <button
                                        onClick={handleGenerate}
                                        disabled={generating}
                                        className={`relative group bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-[16px] shadow-lg shadow-purple-600/30 transition-all hover:scale-105 hover:shadow-purple-600/50 active:scale-95 flex items-center gap-2 overflow-hidden ${generating ? 'cursor-wait ring-2 ring-purple-500/50' : ''}`}
                                    >
                                        {generating && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full animate-[shimmer_1.5s_infinite]"></div>}
                                        <Sparkles className={`w-4 h-4 fill-current ${generating ? 'animate-spin' : 'animate-pulse'}`} />
                                        {generating ? 'PROCESSING...' : 'GENERATE'}
                                    </button>
                                    <div className="absolute -top-3 -right-2 z-[100] bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-red-400 animate-bounce pointer-events-none">
                                        {uses >= 3 ? '0 ESSAI' : `${3 - uses} FREE`}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* JSON PREVIEW */}
                    <div className="lg:col-span-4">
                        <div className="h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col relative overflow-hidden group">
                            {generating && (
                                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                                    <div className="relative w-24 h-24 mb-4">
                                        <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                                        <div className="absolute inset-2 rounded-full border-r-2 border-indigo-500 animate-spin-reverse"></div>
                                        <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">{countdown}</div>
                                    </div>
                                    <p className="text-purple-300 font-mono text-sm animate-pulse tracking-widest">GENERATING...</p>
                                </div>
                            )}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                                    <span className="text-xs font-mono text-gray-500 ml-2">prompt.json</span>
                                </div>
                                <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar font-mono text-xs md:text-sm text-purple-200/90 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(result || state, null, 2)}</pre>
                            </div>
                            <div className="absolute bottom-0 right-0 p-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </main>
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
