'use client';
import { useState, useEffect, useReducer, createContext } from 'react';

const GENESIS_PURPLE = '#8A00C4';
const STORAGE_KEY = 'promptArchitect';

// Initial state
const initialState = {
    generationType: 'video',
    aiModel: 'veo3',
    shotType: 'medium',
    style: 'genesis-style',
    duration: '15s',
    aspectRatio: '9:16',
    subject: '',
    cameraMovement: 'dolly-zoom',
    tone: 'epic'
};

function reducer(state, action) {
    return { ...state, [action.type]: action.value };
}

export default function PromptArchitect() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [uses, setUses] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        setUses(data.demoUses || 0);
        setUnlocked(data.valexUnlocked && Date.now() - data.unlockTime < 24 * 60 * 60 * 1000);
    }, []);

    const generatePrompt = () => {
        if (uses >= 2 && !unlocked) {
            setShowModal(true);
            return;
        }

        if (!unlocked) {
            const newUses = uses + 1;
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ demoUses: newUses }));
            setUses(newUses);
            if (newUses >= 2) setShowModal(true);
        }

        // Copie JSON dans clipboard
        navigator.clipboard.writeText(JSON.stringify(state, null, 2));
        alert('Prompt JSON copié ! Prêt pour Veo3/Higgsfield 🚀');
    };

    const validateCode = () => {
        if (code === 'VALEX') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
                valexUnlocked: true,
                unlockTime: Date.now()
            }));
            setUnlocked(true);
            setShowModal(false);
            setCode('');
        }
    };

    if (uses >= 2 && !unlocked && showModal) {
        return (
            <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.9)', color: 'white' }}>
                <div style={{ background: GENESIS_PURPLE, padding: '2rem', borderRadius: '20px', maxWidth: '400px', margin: 'auto' }}>
                    <h2>🔓 Accès Prompt Master</h2>
                    <input
                        type="password"
                        placeholder="Code secret"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        style={{ width: '100%', padding: '1rem', margin: '1rem 0' }}
                    />
                    <button onClick={validateCode} style={{ background: '#DBBA4D', color: 'black', padding: '1rem', border: 'none', borderRadius: '10px' }}>
                        Valider Code
                    </button>
                    <br />
                    <a href="https://www.instagram.com/visuals.by.genesis/" target="_blank" style={{ color: 'white' }}>
                        📱 Demander le code à Genesis
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
            <header style={{ textAlign: 'center', color: GENESIS_PURPLE, marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem' }}>🎬 Prompt Architect</h1>
                <p>{unlocked ? '✅ PRO Unlocked' : `${2 - uses}/2 essais gratuits restants`}</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Formulaire Gauche */}
                <div>
                    <h3>⚙️ Configurer votre Prompt</h3>
                    {Object.entries(initialState).map(([key, def]) => (
                        <div key={key} style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            {key === 'subject' ? (
                                <textarea
                                    value={state.subject}
                                    onChange={e => dispatch({ type: 'subject', value: e.target.value })}
                                    placeholder="Mario court dans un monde pixel art..."
                                    style={{ width: '100%', height: '80px', padding: '1rem' }}
                                />
                            ) : (
                                <select
                                    value={state[key]}
                                    onChange={e => dispatch({ type: key, value: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', border: `2px solid ${GENESIS_PURPLE}`, borderRadius: '10px' }}
                                >
                                    {/* Options par catégorie - à étendre */}
                                    {['realiste', 'gta', 'simpsons', 'genesis-style'].includes(key) ? (
                                        ['realiste', 'gta', 'simpsons', 'genesis-style'].map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))
                                    ) : /* autres dropdowns */ (
                                        <></>
                                    )}
                                </select>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={generatePrompt}
                        style={{
                            width: '100%',
                            padding: '1.5rem',
                            background: GENESIS_PURPLE,
                            color: 'white',
                            fontSize: '1.2rem',
                            border: 'none',
                            borderRadius: '15px',
                            cursor: 'pointer'
                        }}
                    >
                        🎯 Générer Prompt JSON Optimal
                    </button>
                </div>

                {/* Preview Droite */}
                <div>
                    <h3>👀 Preview JSON</h3>
                    <pre style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '10px', height: '400px', overflow: 'auto' }}>
                        {JSON.stringify(state, null, 2)}
                    </pre>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                        Copié automatiquement dans le clipboard 📋
                    </p>
                </div>
            </div>
        </div>
    );
}
