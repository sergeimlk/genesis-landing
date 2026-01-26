
import { useEffect, useState, useRef } from 'react';
import { X, Lock, User } from 'lucide-react';

// --- INTRO OVERLAY ---
export const IntroOverlay = ({ isOpen, onClose }) => {
    const videoRef = useRef(null);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (videoRef.current && isOpen) {
            videoRef.current.playbackRate = 4.0;
        }
        // Auto-close after 1 second
        if (isOpen) {
            const timer = setTimeout(() => {
                setFading(true);
                sessionStorage.setItem('genesis_intro_shown', 'true');
                setTimeout(onClose, 300);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    const handleEnd = () => {
        setFading(true);
        // Mark as shown in sessionStorage (so it won't show again during this session)
        sessionStorage.setItem('genesis_intro_shown', 'true');
        setTimeout(onClose, 800);
    };

    if (!isOpen) return null;

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

// --- LOGIN MODAL ---
export const LoginModal = ({ isOpen, onClose, onUnlock }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

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
        if (code.toUpperCase() === 'VALEX') {
            // Save to localStorage for persistence
            localStorage.setItem('genesis_pro_unlocked', 'true');
            onUnlock?.();
            onClose();
        } else {
            setError('Code invalide. Demandez le code à Genesis.');
            setCode('');
        }
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
                    <div className={`bg-white/5 border rounded-2xl p-1 transition-colors ${error ? 'border-red-500' : 'border-white/10 focus-within:border-purple-500/50'}`}>
                        <input
                            type="password"
                            placeholder="CODE PRO"
                            className="w-full bg-transparent border-none outline-none text-center font-mono tracking-[0.5em] text-white h-12 placeholder-white/20"
                            value={code}
                            onChange={(e) => { setCode(e.target.value); setError(''); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                        />
                    </div>

                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}

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

// --- FOMO BANNER ---
export const FomoBanner = ({ onClose, onClick }) => {
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
            className="fixed top-0 inset-x-0 z-[60] py-2 px-4 flex items-center justify-center gap-3 text-sm font-medium cursor-pointer transition-all hover:scale-[1.005] shadow-[0_5px_20px_rgba(147,51,234,0.3)] backdrop-blur-md"
            style={{
                background: "linear-gradient(90deg, #6b21a8 0%, #a855f7 50%, #6b21a8 100%)",
                backgroundSize: "200% 100%",
                animation: "gradient-shift 5s ease infinite"
            }}
            onClick={onClick}
        >
            <div className="flex items-center gap-2 group">
                <span className="animate-pulse text-lg">🔥</span>
                <span className="hidden sm:inline font-bold text-white tracking-wide uppercase drop-shadow-md">OFFRE SPÉCIALE :</span>
                <span className="font-extrabold text-yellow-300 drop-shadow-md bg-black/20 px-2 py-0.5 rounded border border-white/10">-40% SUR GENESIS</span>
                <span className="hidden md:inline text-purple-200">·</span>
                <div className="flex items-center gap-1 font-mono font-bold bg-black/30 text-white px-2 py-0.5 rounded border border-white/10 shadow-inner">
                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="animate-pulse text-purple-300">:</span>
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="animate-pulse text-purple-300">:</span>
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="text-xs text-white/50 group-hover:text-white transition-colors ml-2 hidden sm:inline underline decoration-purple-400/50 underline-offset-2">(cliquer pour voir)</span>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute right-4 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all hover:rotate-90"
            >
                <X size={16} />
            </button>
        </div>
    );
};
