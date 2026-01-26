import React, { useEffect, useState } from 'react';
import { X, MessageSquarePlus } from 'lucide-react';

export const FeedbackModal = ({ isOpen, onClose }) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) setShouldRender(true);
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setShouldRender(false);
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onTransitionEnd={handleAnimationEnd}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content - Purple Glass */}
            <div className={`
                relative w-full max-w-2xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl overflow-hidden
                transform transition-all duration-500 ease-out
                ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}
            `}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <MessageSquarePlus className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Genesis Feedback</h3>
                            <p className="text-xs text-purple-200/60">Help us shape the future of creation</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content - Google Form Embed */}
                <div className="relative w-full h-[600px] bg-[#1a1a1a]">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSdJaG2GJhSHGQvC98/viewform?embedded=true"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        className="relative z-10 w-full h-full"
                        title="Genesis Feedback Form"
                    >
                        Chargement…
                    </iframe>
                </div>
            </div>
        </div>
    );
};
