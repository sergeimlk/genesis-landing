import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight, Play, X } from 'lucide-react';

export const BeforeAfter = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const containerRef = useRef(null);

    const handleMove = useCallback((event) => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const x = (event.touches ? event.touches[0].clientX : event.clientX) - containerRect.left;
        const position = (x / containerRect.width) * 100;

        setSliderPosition(Math.min(100, Math.max(0, position)));
    }, []);

    const handleStart = (event) => {
        setIsDragging(true);
        handleMove(event);
    };

    useEffect(() => {
        const handleWindowMove = (e) => {
            if (isDragging) handleMove(e);
        };
        const handleWindowUp = () => setIsDragging(false);

        window.addEventListener('mousemove', handleWindowMove);
        window.addEventListener('mouseup', handleWindowUp);
        window.addEventListener('touchmove', handleWindowMove);
        window.addEventListener('touchend', handleWindowUp);

        return () => {
            window.removeEventListener('mousemove', handleWindowMove);
            window.removeEventListener('mouseup', handleWindowUp);
            window.removeEventListener('touchmove', handleWindowMove);
            window.removeEventListener('touchend', handleWindowUp);
        };
    }, [isDragging, handleMove]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-square rounded-3xl overflow-hidden cursor-col-resize select-none border border-white/10 shadow-2xl"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            {/* Before Image (Background) */}
            <img
                src={beforeImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
            />

            {/* Label Before */}
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm z-10 border border-white/10">
                Avant (Standard)
            </div>

            {/* After Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={afterImage}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />

                {/* Label After */}
                <div className="absolute top-4 right-4 bg-[#9333ea]/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm border border-white/10">
                    Après (Genesis AI)
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform">
                    <ChevronsLeftRight className="text-black w-5 h-5" />
                </div>
            </div>

            {/* ANIMATE Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 group"
            >
                <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.9)] transition-shadow duration-300">
                    <div className="bg-black rounded-full px-8 py-3 flex items-center gap-3 transition-colors group-hover:bg-black/80">
                        <span className="font-orbitron font-bold text-white tracking-widest text-lg">ANIMATE!</span>
                        <div className="bg-white rounded-full p-1 group-hover:scale-110 transition-transform duration-300">
                            <Play size={16} className="text-purple-600 fill-purple-600 ml-0.5" />
                        </div>
                    </div>
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
                </div>
            </button>

            {/* Video Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setShowModal(false)}
                >
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src="https://drive.google.com/file/d/1Zm9EFd29OeYoFaZjEo2N5nFS0TnemR9z/preview"
                            width="100%"
                            height="100%"
                            allow="autoplay"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};
