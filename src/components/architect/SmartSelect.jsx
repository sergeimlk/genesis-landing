
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * SmartSelect - A generic dropdown component that handles:
 * - Smart alignment (Left/Right detection)
 * - Mobile Bottom Sheet behavior
 * - Outside click handling
 * - Animations
 */
export const SmartSelect = ({
    value,
    onChange,
    options = [],

    // Custom Renderers
    renderTrigger,      // (value, isOpen) => ReactNode
    renderOption,       // (option, isSelected) => ReactNode

    // Configuration
    widthClass = "w-64",
    gridCols = 1,
    minWidth = "min-w-[140px]",
    maxHeight = "max-h-80",

    // Icon (optional default trigger)
    icon: Icon,
    labelKey = 'name',  // Key to display if no custom render
    idKey = 'id',       // Key for ID
    tabs = null         // Tabs configuration
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const [align, setAlign] = useState('right');

    const selectedOption = options.find(o => (o[idKey] || o) === value) || options[0];

    // Smart Align Logic
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setAlign(rect.left < window.innerWidth / 2 ? 'left' : 'right');
        }
    }, [isOpen]);

    // Close on Escape Key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Default Renderers
    const defaultRenderTrigger = () => (
        <>
            {Icon && <Icon size={14} className="text-purple-400" />}
            <span className="truncate">{selectedOption?.[labelKey] || value}</span>
            <ChevronDown size={12} className={`text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </>
    );

    const defaultRenderOption = (opt, isSelected) => (
        <div className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${isSelected ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
            {opt[labelKey] || opt}
        </div>
    );

    const triggerContent = renderTrigger ? renderTrigger(selectedOption, isOpen) : defaultRenderTrigger();

    return (
        <div className={`relative ${isOpen ? 'z-[9999]' : ''}`}>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-2 px-3 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 rounded-2xl transition-all text-sm font-medium text-gray-300 hover:text-white h-11 ${minWidth}`}
            >
                {triggerContent}
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[9995]" onClick={() => setIsOpen(false)}></div>

                    {/* Dropdown / Bottom Sheet */}
                    <div className={`
                        fixed bottom-0 left-0 right-0 
                        md:absolute md:bottom-full md:top-auto 
                        ${align === 'left' ? 'md:left-0 md:right-auto' : 'md:right-0 md:left-auto'} 
                        ${widthClass} w-full 
                        rounded-t-2xl md:rounded-2xl border-t md:border border-white/10 
                        bg-[#0a0a0a] shadow-2xl shadow-black/80 md:shadow-2xl md:shadow-black/70 
                        overflow-hidden z-[9999] animate-in slide-in-from-bottom md:zoom-in-95 fade-in duration-200 
                        mb-0 md:mb-2 pb-6 md:pb-1 md:p-1
                    `}>
                        {/* Mobile Handle */}
                        <div className="md:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-2"></div>

                        {/* Content */}
                        <div className={`p-2 overflow-y-auto overflow-x-hidden genesis-scrollbar ${maxHeight}`}>
                            {/* Tabs Area */}
                            {tabs && (
                                <div className="flex p-1 mb-2 bg-white/5 rounded-xl border border-white/10">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={tab.onClick}
                                            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${tab.isActive ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div
                                className={gridCols > 1 ? 'grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2' : 'flex flex-col gap-1'}
                                style={gridCols > 1 ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` } : {}}
                            >
                                {options.map((opt) => {
                                    const optId = opt[idKey] || opt;
                                    const isSelected = value === optId;

                                    return (
                                        <button
                                            key={optId}
                                            onClick={() => { onChange(optId); setIsOpen(false); }}
                                            className="text-left w-full"
                                        >
                                            {renderOption ? renderOption(opt, isSelected) : defaultRenderOption(opt, isSelected)}
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
