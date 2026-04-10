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
                <h2 className="text-center mb-4 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                    LA DIFFÉRENCE <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">GENESIS</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
                    Le même outil IA entre les mains de deux personnes différentes donne des résultats radicalement différents. Voici pourquoi.
                </p>

                <div className="comparison-grid">
                    {/* Without Genesis */}
                    <div className="card bad">
                        <h3 className="card-title card-title-red">
                            <span className="p-2 bg-red-500/10 rounded" aria-hidden="true">❌</span>
                            Sans méthode structurée
                        </h3>
                        <ul aria-label="Points négatifs sans accompagnement">
                            {[
                                'Rendus amateurs, glitchs visibles, résultats imprésentables',
                                'Des semaines perdues sur des installations inutiles',
                                'Vidéos génériques que tout le monde peut reproduire',
                                'Aucune différenciation, impossible de vendre à des pros',
                                'Découragement et abandon après 2 semaines'
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
                                'Workflow PRO clé en main (Runway, ComfyUI, Midjourney)',
                                'Style cinématographique unique et reconnaissable',
                                'Méthodes Zéro-Tech : opérationnel en moins de 7 jours',
                                'Portfolio professionnel prêt à montrer à des clients',
                                'Premières ventes possible dès la 2e semaine'
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
