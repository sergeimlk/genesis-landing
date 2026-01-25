
import { User } from 'lucide-react';

export const PromptNavBar = ({ onProfileClick, unlocked, hasBanner }) => (
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
