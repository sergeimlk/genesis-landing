/**
 * Comparison Section Component
 * Section comparant "Sans Genesis" vs "Avec Genesis"
 */
import React from 'react';
import { Check } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <h2 className="text-center mb-10 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                    L'IA NE DOIT PAS ÊTRE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">COMPLIQUÉE</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
                    Un workflow de réalisateurs pensé pour créer des vidéos IA exploitables et vendables
                </p>

                <div className="comparison-grid">
                    {/* Without Genesis */}
                    <div className="card bad">
                        <h3 className="card-title card-title-red">
                            <span className="p-2 bg-red-500/10 rounded" aria-hidden="true">❌</span>
                            Sans l'accompagnement ou coaching
                        </h3>
                        <ul aria-label="Points négatifs sans accompagnement">
                            {[
                                'Rendu amateur et glitchs',
                                'Perte de temps (installations complexes)',
                                'Vidéos génériques sans âme',
                                'Impossible de vendre à des pros'
                            ].map((item, idx) => (
                                <li key={idx} className="list-item">
                                    <span className="bullet-red" aria-hidden="true">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* With Genesis */}
                    <div className="card good">
                        <h3 className="card-title card-title-purple">
                            <span className="p-2 bg-purple-500/10 rounded" aria-hidden="true">✅</span>
                            Avec GENESIS
                        </h3>
                        <ul aria-label="Avantages avec Genesis">
                            {[
                                'Workflow PRO (Stable Diffusion, ComfyUI)',
                                'Style Cinématographique Unique',
                                'Méthodes Zéro-Tech (Débutant friendly)',
                                'Capacité à monétiser vos créations'
                            ].map((item, idx) => (
                                <li key={idx} className="list-item">
                                    <Check size={20} className="text-purple-500" aria-hidden="true" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
