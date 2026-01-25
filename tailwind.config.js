/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                genesis: {
                    bg: '#050505',
                    card: 'rgba(255, 255, 255, 0.03)',
                    border: 'rgba(255, 255, 255, 0.1)',
                    primary: '#9333ea', // Purple-600
                    secondary: '#db2777', // Pink-600
                    accent: '#06b6d4', // Cyan-500
                },
                // Palette spécifique GeneGym Pro (App Sport)
                gg: {
                    bg: '#0f172a',    // Slate-900 (Deep Blue/Grey)
                    card: '#1e293b',  // Slate-800
                    primary: '#3b82f6', // Blue-500
                    accent: '#22d3ee',  // Cyan-400
                    success: '#10b981', // Emerald-500
                }
            },
            backgroundImage: {
                'genesis-gradient': 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                'gg-gradient': 'linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)',
                'glass': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(147, 51, 234, 0.5)',
                'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'slide-in': 'slideIn 0.4s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 4s linear infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
