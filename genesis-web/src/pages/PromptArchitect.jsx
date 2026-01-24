'use client';
import { useState, useEffect, useReducer } from 'react';
import {
    Sparkles, Monitor, Camera, Zap, Settings, User, X,
    Terminal, Copy, Check, ChevronDown, Lock, Play, Image as ImageIcon
} from 'lucide-react';

const GENESIS_PURPLE = '#8A00C4';
const STORAGE_KEY = 'promptArchitect';

// --- INITIAL STATE ---
const initialState = {
    generationType: 'video',
    aiModel: 'veo3',
    shotType: 'medium',
    style: 'genesis-cinematic',
    duration: '5s',
    aspectRatio: '16:9',
    subject: '',
    cameraMovement: 'static',
    lighting: 'neon-noir',
    fps: '24'
};

function reducer(state, action) {
    return { ...state, [action.type]: action.value };
}

// --- MAIN COMPONENT ---
export default function PromptArchitect() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [uses, setUses] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Background blobs animation
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        setUses(data.demoUses || 0);
        setUnlocked(data.valexUnlocked && Date.now() - data.unlockTime < 24 * 60 * 60 * 1000);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(state, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden relative">

            {/* BACKGROUND AMBIANCE */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slower"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
            </div>

            {/* NAVBAR */}
            <NavBar
                onProfileClick={() => setIsLoginOpen(true)}
                unlocked={unlocked}
            />

            {/* MAIN CONTENT */}
            <main className="relative z-10 container mx-auto px-6 pt-48 pb-24 flex flex-col items-center min-h-[calc(100vh-80px)]">

                {/* HERO HEADER */}
                <div className="text-center mb-12 mt-24 space-y-4 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold font-orbitron text-purple-300 tracking-wider">PROMPT ARCHITECT v2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                        CRAFT YOUR <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">VISION!</span>
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto text-lg">
                        L'outil ultime pour générer des prompts vidéo cinématiques. <br />Exploitez la puissance de Veo3 & Kling 2.6!
                    </p>
                </div>

                {/* WORKSPACE PREVIEW */}
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up delay-100">

                    {/* LEFT: CONTROLS & INPUT */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* INPUT CARD */}
                        <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-1 transition-all hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                            <div className="bg-[#0a0a0a]/50 rounded-[28px] p-6 h-full min-h-[300px] flex flex-col">
                                <div className="flex items-center gap-3 mb-4 text-gray-400">
                                    <Terminal className="w-5 h-5" />
                                    <span className="text-sm font-bold tracking-widest uppercase">Décrivez votre scène</span>
                                </div>

                                <textarea
                                    value={state.subject}
                                    onChange={(e) => dispatch({ type: 'subject', value: e.target.value })}
                                    placeholder="Décrivez votre scène: Un samouraï cyberpunk marchant sous la pluie à néo-tokyo..."
                                    className="w-full flex-1 bg-transparent border-none outline-none text-2xl md:text-3xl font-medium text-white placeholder-white/20 resize-none font-sans leading-relaxed"
                                />

                                {/* FLOATING ACTION BAR */}
                                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                                    <div className="flex flex-wrap gap-2">
                                        <PillSelect
                                            icon={Monitor}
                                            value={state.aspectRatio}
                                            options={['16:9', '9:16', '1:1', '21:9']}
                                            onChange={(v) => dispatch({ type: 'aspectRatio', value: v })}
                                        />
                                        <PillSelect
                                            icon={Play}
                                            value={state.duration}
                                            options={['5s', '10s', '15s']}
                                            onChange={(v) => dispatch({ type: 'duration', value: v })}
                                        />
                                        <PillSelect
                                            icon={Camera}
                                            value={state.cameraMovement}
                                            options={['Static', 'Dolly Zoom', 'Pan Right', 'Tilt Up', 'FPV']}
                                            onChange={(v) => dispatch({ type: 'cameraMovement', value: v })}
                                        />
                                    </div>

                                    <div className="text-xs text-gray-500 font-mono">
                                        {state.subject.length} chars
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GENERATE BUTTON BAR */}
                        <div className="flex items-center justify-end gap-4 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px]">
                            <div className="px-6 text-sm text-gray-400 font-medium">
                                {2 - uses} essais gratuits restants
                            </div>
                            <button className="relative group bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-[20px] shadow-lg shadow-purple-600/30 transition-all hover:scale-105 hover:shadow-purple-600/50 active:scale-95 flex items-center gap-3 overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm"></div>
                                <Sparkles className="w-5 h-5 fill-current animate-pulse" />
                                GENERATE <span className="text-purple-200 text-sm font-normal opacity-80">v2.1</span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: JSON PREVIEW */}
                    <div className="lg:col-span-4">
                        <div className="h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col relative overflow-hidden group">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 ml-2">prompt_architect.json</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 overflow-auto custom-scrollbar font-mono text-xs md:text-sm text-purple-200/90 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                <pre>{JSON.stringify(state, null, 2)}</pre>
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

const NavBar = ({ onProfileClick, unlocked }) => (
    <header className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 backdrop-blur-md border-b border-white/5 bg-[#050505]/50">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-black rounded-xl border border-white/10 flex items-center justify-center shadow-lg shadow-purple-900/20">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
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
                className="flex items-center gap-2 px-4 py-2.5 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white min-w-[100px]"
            >
                <Icon size={14} className="text-purple-400" />
                <span>{value}</span>
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full left-0 mb-2 w-40 bg-[#111] border border-white/10 rounded-2xl shadow-xl shadow-black/50 overflow-hidden z-20 flex flex-col p-1 animate-in fade-in zoom-in-95 duration-200">
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt.toLowerCase()); setIsOpen(false); }}
                                className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${value.toLowerCase() === opt.toLowerCase() ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const LoginModal = ({ isOpen, onClose, unlocked }) => {
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

    // TODO: Implement actual unlock logic here if needed, but for now just console log or call a prop if passed (not passed in current code)
    const handleUnlock = () => {
        console.log("Unlocking with code:", code);
        // Add actual validation logic if available or just close/mock
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
                    <h2 className="text-2xl font-bold font-orbitron mb-2">Member Access</h2>
                    <p className="text-gray-400 text-sm">Entrez votre code secret Genesis pour débloquer toutes les fonctionnalités Pro.</p>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-1 focus-within:border-purple-500/50 transition-colors">
                        <input
                            type="password"
                            placeholder="ENTER ACCESS CODE"
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
                        <Lock size={18} /> UNLOCK PRO
                    </button>

                    <p className="text-xs text-center text-gray-500 pt-4 cursor-pointer hover:text-purple-400 transition-colors">
                        Forgot your code? Contact Support
                    </p>
                </div>
            </div>
        </div>
    );
};
