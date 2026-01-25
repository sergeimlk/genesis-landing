import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home, Dumbbell, Activity, X, Plus, Save,
    Trash2, Play, Square, CheckCircle, Clock, Calendar,
    ChevronRight, Trophy, TrendingUp, Zap
} from 'lucide-react';

const PREMADE_PROGRAMS = [
    {
        id: 'upper_body',
        name: 'Upper Body Hypertrophy',
        desc: 'Focus Pectoraux, Dos, Épaules & Bras. Volume élevé pour la masse.',
        exercises: [
            { name: 'Développé Couché', sets: 4, reps: '8-10', tip: 'Gardez les omoplates serrées et contrôlez la descente pour max étirement.' },
            { name: 'Tractions', sets: 4, reps: 'Max', tip: 'Initiez le mouvement par les coudes, pas les biceps.' },
            { name: 'Développé Militaire', sets: 3, reps: '10-12', tip: 'Ne cambrez pas le dos. Gainez vos abdos.' },
            { name: 'Curl Barre', sets: 3, reps: '12-15', tip: 'Coude fixe. Contraction maximale en haut.' },
            { name: 'Triceps Extensions', sets: 3, reps: '12-15', tip: 'Barre au front ou poulie. Focus longue portion.' }
        ]
    },
    {
        id: 'lower_body',
        name: 'Lower Body Power',
        desc: 'Focus Quadriceps, Ischios & Fessiers. Charges lourdes.',
        exercises: [
            { name: 'Squat', sets: 4, reps: '6-8', tip: 'Poussez les genoux vers l\'extérieur. Dos neutre.' },
            { name: 'Soulevé de Terre Roumain', sets: 4, reps: '8-10', tip: 'Poussez les hanches en arrière jusqu\'à l\'étirement des ischios.' },
            { name: 'Fentes', sets: 3, reps: '12/jambe', tip: 'Gardez le buste droit. Genou arrière proche du sol.' },
            { name: 'Leg Extension', sets: 3, reps: '15-20', tip: 'Contrôlez la descente. Brulûre garantie.' }
        ]
    },
    {
        id: 'full_body',
        name: 'Full Body Classic',
        desc: 'Tout le corps en une séance. Idéal 3x/semaine.',
        exercises: [
            { name: 'Squat', sets: 3, reps: '8-10', tip: 'Roi des exercices. Amplitude complète.' },
            { name: 'Développé Couché', sets: 3, reps: '8-10', tip: 'Contrôle et puissance.' },
            { name: 'Rowing Barre', sets: 3, reps: '8-10', tip: 'Dos plat. Tirez vers le nombril.' },
            { name: 'Overhead Press', sets: 3, reps: '10-12', tip: 'Stabilité du tronc.' }
        ]
    },
    {
        id: 'superset_upper',
        name: 'Superset Upper',
        desc: 'Intensité maximale. Enchaînement agoniste/antagoniste.',
        exercises: [
            { name: 'D. Couché + Rowing', sets: 4, reps: '10+10', tip: 'Pas de repos entre les deux exos. 90s après le duo.' },
            { name: 'Dips + Tractions', sets: 3, reps: 'Max+Max', tip: 'Le combo ultime poids de corps.' },
            { name: 'Curl + Ext Triceps', sets: 3, reps: '15+15', tip: 'Pump des bras garanti.' }
        ]
    },
    {
        id: 'street_workout',
        name: 'Street Workout',
        desc: 'Maîtrise ton corps. Calisthenics basics.',
        exercises: [
            { name: 'Muscle Up (ou progression)', sets: 5, reps: 'Max', tip: 'Explosivité au tirage.' },
            { name: 'Dips Barre Droite', sets: 4, reps: '15-20', tip: 'Descendez bas.' },
            { name: 'Pompes Diamant', sets: 4, reps: '20', tip: 'Mains jointes sous la poitrine.' },
            { name: 'Relevé de jambes', sets: 4, reps: '15', tip: 'Jambes tendues si possible.' }
        ]
    }
];

const NUTRITION_TIPS = [
    "Après l'entraînement, une source de protéine rapide (Whey ou œufs) maximise la synthèse protéique.",
    "L'hydratation est clé. Bois au moins 500ml d'eau dans l'heure suivant ta séance.",
    "Les glucides post-workout aident à refaire les stocks de glycogène et réduisent le cortisol.",
    "Le sommeil est le meilleur stéroïde naturel. Vise 7-9h pour une récupération optimale.",
    "Les oméga-3 aident à réduire l'inflammation musculaire. Pense aux poissons gras ou compléments."
];

const GeneGym = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());

    // --- STATE MANAGEMENT ---
    const [activeSession, setActiveSession] = useState(null);
    const [history, setHistory] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);
    const [sessionTip, setSessionTip] = useState('');

    // --- STORAGE & INIT LOGIC ---
    useEffect(() => {
        const savedHistory = localStorage.getItem('genegym_history');
        if (savedHistory) setHistory(JSON.parse(savedHistory));

        const savedSession = localStorage.getItem('genegym_session');
        if (savedSession) {
            const parsed = JSON.parse(savedSession);
            const now = Date.now();
            if (now - parsed.lastUpdated < 43200000) {
                setActiveSession(parsed);
                setElapsedTime(parsed.elapsedTime || 0);
                if (parsed.status === 'in_progress') {
                    setIsTimerRunning(true);
                }
            } else {
                localStorage.removeItem('genegym_session');
            }
        }

        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    // --- PERSISTENCE ---
    useEffect(() => {
        if (activeSession) {
            const sessionToSave = {
                ...activeSession,
                lastUpdated: Date.now(),
                elapsedTime: elapsedTime
            };
            localStorage.setItem('genegym_session', JSON.stringify(sessionToSave));
        }
    }, [activeSession, elapsedTime]);

    // --- TIMER LOGIC ---
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    // --- ACTIONS ---
    const handleLogout = () => {
        if (window.confirm("Déconnexion ?")) {
            localStorage.removeItem('genegym_access');
            navigate('/');
        }
    };

    const startNewSession = (program = null) => {
        let initialExercises = [];
        let sessionName = `Séance du ${new Date().toLocaleDateString('fr-FR')}`;

        if (program) {
            sessionName = `${program.name} - ${new Date().toLocaleDateString('fr-FR')}`;
            initialExercises = program.exercises.map((ex, idx) => ({
                id: Date.now() + idx,
                name: ex.name,
                tip: ex.tip,
                sets: Array.from({ length: typeof ex.sets === 'number' ? ex.sets : 3 }).map((_, sIdx) => ({
                    id: Date.now() + idx + sIdx + 1000,
                    reps: '',
                    weight: '',
                    rpe: '',
                    done: false
                }))
            }));
        }

        const newSession = {
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'in_progress',
            name: sessionName,
            exercises: initialExercises,
            lastUpdated: Date.now(),
            elapsedTime: 0
        };
        setActiveSession(newSession);
        setElapsedTime(0);
        setIsTimerRunning(true);
        setActiveTab('workout');
    };

    const finishSession = () => {
        if (!activeSession) return;
        // Don't confirm here, confirm is implicit by clicking "Terminer" then showing logic
        // But user asked for interactive, so let's show summary directly
        setIsTimerRunning(false);
        const randomTip = NUTRITION_TIPS[Math.floor(Math.random() * NUTRITION_TIPS.length)];
        setSessionTip(randomTip);
        setSummaryModalOpen(true);
    };

    const confirmFinishSession = () => {
        const completedSession = { ...activeSession, status: 'completed', endTime: new Date().toISOString(), duration: elapsedTime };
        const newHistory = [completedSession, ...history];
        setHistory(newHistory);
        localStorage.setItem('genegym_history', JSON.stringify(newHistory));

        localStorage.removeItem('genegym_session');
        setActiveSession(null);
        setElapsedTime(0);
        setSummaryModalOpen(false);
        setActiveTab('calendar');
    };

    const cancelSession = () => {
        if (activeSession && window.confirm("Supprimer la séance en cours ? Cette action est irréversible.")) {
            setActiveSession(null);
            localStorage.removeItem('genegym_session');
            setIsTimerRunning(false);
            setElapsedTime(0);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // --- WORKOUT MANAGEMENT ---
    const addExercise = () => {
        const name = prompt("Nom de l'exercice (ex: Développé Couché)");
        if (name && activeSession) {
            const newExercise = {
                id: Date.now(),
                name,
                tip: 'Concentrez-vous sur la technique.',
                sets: [{ id: Date.now() + 1, reps: '', weight: '', rpe: '', done: false }]
            };
            setActiveSession({
                ...activeSession,
                exercises: [...activeSession.exercises, newExercise]
            });
        }
    };

    const addSet = (exerciseId) => {
        if (!activeSession) return;
        const updatedExercises = activeSession.exercises.map(ex => {
            if (ex.id === exerciseId) {
                return {
                    ...ex,
                    sets: [...ex.sets, { id: Date.now(), reps: '', weight: '', rpe: '', done: false }]
                };
            }
            return ex;
        });
        setActiveSession({ ...activeSession, exercises: updatedExercises });
    };

    const updateSet = (exerciseId, setId, field, value) => {
        if (!activeSession) return;
        const updatedExercises = activeSession.exercises.map(ex => {
            if (ex.id === exerciseId) {
                const updatedSets = ex.sets.map(set => {
                    if (set.id === setId) {
                        return { ...set, [field]: value };
                    }
                    return set;
                });
                return { ...ex, sets: updatedSets };
            }
            return ex;
        });
        setActiveSession({ ...activeSession, exercises: updatedExercises });
    };

    const removeExercise = (exerciseId) => {
        if (!activeSession) return;
        if (!window.confirm("Supprimer cet exercice ?")) return;
        setActiveSession({
            ...activeSession,
            exercises: activeSession.exercises.filter(ex => ex.id !== exerciseId)
        });
    };

    // --- VIEWS ---

    const renderStatsView = () => {
        const totalSessions = history.length;
        const totalTime = history.reduce((acc, sess) => acc + (sess.duration || 0), 0);

        return (
            <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold font-orbitron mb-6">Performances</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="text-yellow-500" />
                            <span className="text-gray-400">Total Séances</span>
                        </div>
                        <p className="text-4xl font-bold">{totalSessions}</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="text-blue-500" />
                            <span className="text-gray-400">Temps Total</span>
                        </div>
                        <p className="text-4xl font-bold">{formatTime(totalTime)}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderHistoryView = () => (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold font-orbitron mb-6">Historique</h2>
            {history.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white/5 rounded-2xl border border-white/5">
                    <p>Votre légende commence aujourd'hui.</p>
                </div>
            ) : (
                history.map(session => (
                    <div key={session.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{session.name}</h3>
                                <p className="text-sm text-gray-400">{new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm bg-white/5 px-3 py-1 rounded-full">
                                <Clock size={14} />
                                {formatTime(session.duration)}
                            </div>
                        </div>
                        <div className="space-y-2">
                            {session.exercises.map(ex => (
                                <div key={ex.id} className="text-sm text-gray-300 flex justify-between">
                                    <span>{ex.sets.length} x {ex.name}</span>
                                    <span className="text-gray-500">
                                        Max: {Math.max(...ex.sets.map(s => Number(s.weight) || 0))}kg
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const renderWorkoutView = () => {
        if (!activeSession) {
            return (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fade-in space-y-6">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                        <Dumbbell size={48} className="text-gray-600" />
                    </div>
                    <h2 className="text-3xl font-bold font-orbitron">Prêt à charbonner ?</h2>
                    <p className="text-gray-400 max-w-md">Aucune séance active. Sélectionnez un programme ou lancez une session vide.</p>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg transition-all"
                    >
                        CHOISIR UN PROGRAMME
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-6 pb-24 animate-fade-in relative z-10">
                {/* Header Workout */}
                <div className="sticky top-0 z-20 bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5 -mx-4 px-4 md:px-0 md:mx-0 flex flex-wrap gap-4 justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold font-orbitron text-red-500 flex items-center gap-3">
                            {isTimerRunning ? <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span> : <Square size={12} fill="currentColor" />}
                            {formatTime(elapsedTime)}
                        </h2>
                        <input
                            value={activeSession.name}
                            onChange={(e) => setActiveSession({ ...activeSession, name: e.target.value })}
                            className="bg-transparent border-none text-gray-400 text-sm focus:text-white focus:outline-none w-full"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white" title={isTimerRunning ? "Pause" : "Reprendre"}>
                            {isTimerRunning ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                        </button>
                        <button onClick={finishSession} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm flex items-center gap-2">
                            <Save size={18} /> TERMINER
                        </button>
                        <button onClick={cancelSession} className="p-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-500" title="Annuler">
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Exercises List */}
                <div className="space-y-4">
                    {activeSession.exercises.map((exercise) => (
                        <div key={exercise.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="p-4 bg-white/5 flex justify-between items-center border-b border-white/5">
                                <div>
                                    <h3 className="font-bold text-lg">{exercise.name}</h3>
                                    {exercise.tip && (
                                        <p className="text-xs text-purple-400 mt-1 flex items-center gap-1">
                                            <Zap size={12} fill="currentColor" /> Conseil Coach: {exercise.tip}
                                        </p>
                                    )}
                                </div>
                                <button onClick={() => removeExercise(exercise.id)} className="text-gray-500 hover:text-red-500"><X size={18} /></button>
                            </div>

                            <div className="p-2">
                                <div className="grid grid-cols-10 gap-2 mb-2 px-2 text-xs text-gray-500 uppercase font-bold text-center">
                                    <div className="col-span-1">Set</div>
                                    <div className="col-span-3">kg</div>
                                    <div className="col-span-3">Reps</div>
                                    <div className="col-span-2">RPE</div>
                                    <div className="col-span-1">OK</div>
                                </div>
                                <div className="space-y-2">
                                    {exercise.sets.map((set, i) => (
                                        <div key={set.id} className={`grid grid-cols-10 gap-2 items-center p-2 rounded-lg transition-colors ${set.done ? 'bg-green-900/10' : 'bg-white/5'}`}>
                                            <div className="col-span-1 text-center font-mono text-gray-400">{i + 1}</div>
                                            <div className="col-span-3">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full bg-transparent text-center border-b border-white/10 focus:border-red-500 outline-none p-1 font-bold"
                                                    value={set.weight}
                                                    onChange={(e) => updateSet(exercise.id, set.id, 'weight', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="w-full bg-transparent text-center border-b border-white/10 focus:border-red-500 outline-none p-1 font-bold"
                                                    value={set.reps}
                                                    onChange={(e) => updateSet(exercise.id, set.id, 'reps', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <input
                                                    type="number"
                                                    placeholder="-"
                                                    className="w-full bg-transparent text-center border-b border-white/10 focus:border-red-500 outline-none p-1 text-gray-400"
                                                    value={set.rpe}
                                                    onChange={(e) => updateSet(exercise.id, set.id, 'rpe', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-1 flex justify-center">
                                                <button
                                                    onClick={() => updateSet(exercise.id, set.id, 'done', !set.done)}
                                                    className={`w-6 h-6 rounded flex items-center justify-center transition-all ${set.done ? 'bg-green-500 text-black' : 'bg-white/10 text-transparent hover:bg-white/20'}`}
                                                >
                                                    <CheckCircle size={14} fill={set.done ? "currentColor" : "none"} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => addSet(exercise.id)}
                                    className="w-full py-3 mt-2 text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center gap-2"
                                >
                                    <Plus size={14} /> AJOUTER SÉRIE
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addExercise}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-red-500 font-bold transition-all hover:scale-[1.01]"
                    >
                        <Plus size={20} /> AJOUTER UN EXERCICE
                    </button>
                </div>
            </div>
        );
    };

    const renderDashboardView = () => (
        <div className="space-y-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-orbitron mb-2">Bon retour, <span className="text-red-500">Champion</span>.</h1>
                <p className="text-gray-400">Prêt à dépasser tes limites aujourd'hui ?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                    onClick={() => startNewSession()}
                    className="col-span-2 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl p-6 flex flex-col justify-between h-48 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden group shadow-2xl shadow-red-900/20"
                >
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform">
                        <Dumbbell size={150} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-4">
                            <TrendingUp size={12} /> MODE FREESTYLE
                        </div>
                        <h3 className="text-2xl font-bold font-orbitron">SÉANCE VIDE</h3>
                        <p className="text-red-100 text-sm opacity-80 mt-1">Créez votre propre routine de A à Z.</p>
                    </div>
                    <div className="relative z-10 flex items-center gap-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        COMMENCER <ChevronRight />
                    </div>
                </div>

                <div
                    onClick={() => setActiveTab('stats')}
                    className="bg-[#111] border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-48 cursor-pointer hover:border-red-500/50 transition-colors"
                >
                    <Activity className="text-red-500 mb-4" size={32} />
                    <div>
                        <p className="text-3xl font-bold">{history.length}</p>
                        <p className="text-sm text-gray-500">Séances totales</p>
                    </div>
                </div>
            </div>

            {/* PREMADE PROGRAMS LIST */}
            <div>
                <h2 className="text-xl font-bold font-orbitron mb-4 text-white flex items-center gap-2">
                    <Activity className="text-red-500" /> Programmes Optimisés
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PREMADE_PROGRAMS.map(prog => (
                        <div
                            key={prog.id}
                            onClick={() => startNewSession(prog)}
                            className="bg-[#111] border border-white/5 hover:border-red-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-white/5 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <Dumbbell size={20} />
                                </div>
                                <span className="bg-white/5 text-xs px-2 py-1 rounded text-gray-400">{prog.exercises.length} Exos</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1">{prog.name}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{prog.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {activeSession && (
                <div className="bg-white/5 border border-red-500/30 rounded-2xl p-6 animate-pulse-slow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-400 text-sm font-bold uppercase tracking-wider mb-1">Séance en cours</p>
                            <h3 className="text-xl font-bold">{formatTime(elapsedTime)}</h3>
                        </div>
                        <button onClick={() => setActiveTab('workout')} className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            REPRENDRE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[2000] bg-[#050505] text-white font-inter flex flex-col md:flex-row overflow-hidden">

            {/* SIDEBAR */}
            <aside className="hidden md:flex flex-col w-72 bg-[#0a0a0a] border-r border-white/5 p-6 h-screen overflow-y-auto z-50">
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-red-500/20">
                        <img src="/img/DarkLogo.png" alt="GeneGym" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-orbitron font-bold text-xl tracking-wide">GENEGYM <span className="text-red-500 text-xs align-top">PRO</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'dashboard', icon: Home, label: 'Tableau de bord' },
                        { id: 'workout', icon: Dumbbell, label: 'Séance Actuelle' },
                        { id: 'calendar', icon: Calendar, label: 'Historique' },
                        { id: 'stats', icon: Activity, label: 'Performances' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto border-t border-white/5 pt-6">
                    <p className="text-xs text-gray-500 text-center mb-4">{currentTime.toLocaleTimeString()}</p>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        <X size={20} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* MOBILE HEADER */}
            <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img src="/img/DarkLogo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-orbitron font-bold text-lg">GENEGYM</span>
                </div>
                <button onClick={handleLogout} className="p-2 bg-white/5 rounded-full text-gray-400"><X size={20} /></button>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto relative bg-[#050505] custom-scrollbar">
                <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 md:pb-8">
                    {/* Active Route View */}
                    {activeTab === 'dashboard' && renderDashboardView()}
                    {activeTab === 'workout' && renderWorkoutView()}
                    {activeTab === 'calendar' && renderHistoryView()}
                    {activeTab === 'stats' && renderStatsView()}

                </div>
            </main>

            {/* MOBILE NAV BOTTOM */}
            <div className="md:hidden fixed bottom-0 inset-x-0 bg-[#0a0a0a] border-t border-white/5 p-2 flex justify-around items-center z-50 pb-safe">
                {[
                    { id: 'dashboard', icon: Home, label: 'Accueil' },
                    { id: 'workout', icon: Dumbbell, label: 'Go' },
                    { id: 'calendar', icon: Calendar, label: 'Hist.' },
                    { id: 'stats', icon: Activity, label: 'Stats' }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === item.id ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* SUMMARY & TIPS MODAL */}
            {summaryModalOpen && (
                <div className="fixed inset-0 z-[2001] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-up">
                    <div className="bg-[#0a0a0a] border border-green-500/50 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>

                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/30">
                            <Trophy size={40} className="animate-bounce" />
                        </div>

                        <h2 className="text-3xl font-black text-white mb-2 font-orbitron">SESSION TERMINÉE</h2>
                        <p className="text-gray-400 mb-6">Tu viens de passer un cap. Reste constant.</p>

                        <div className="bg-white/5 rounded-xl p-4 text-left border border-white/10 mb-8">
                            <h4 className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                                <Zap size={16} /> Conseil Nutrition & Santé
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                "{sessionTip}"
                            </p>
                        </div>

                        <button
                            onClick={confirmFinishSession}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-900/30"
                        >
                            ENREGISTRER & FERMER
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default GeneGym;
