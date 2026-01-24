import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export const BeforeAfter = ({ beforeImage, afterImage }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
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
            className="relative w-full h-[500px] rounded-3xl overflow-hidden cursor-col-resize select-none border border-white/10 shadow-2xl"
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
        </div>
    );
};
