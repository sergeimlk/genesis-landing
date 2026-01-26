/**
 * Target Audience Section Component
 * Section décrivant les profils cibles de la formation
 */
import React from 'react';

const AUDIENCE_PROFILES = [
    {
        number: '01',
        title: 'Vous êtes débutant',
        description: 'Vous voulez créer des visuels bluffants sans avoir de connaissances techniques préalables.',
        colorClass: 'purple'
    },
    {
        number: '02',
        title: 'Vous êtes créatif / vidéaste',
        description: "Vous voulez intégrer l'IA dans votre workflow pour proposer des effets impossibles à filmer.",
        colorClass: 'pink'
    },
    {
        number: '03',
        title: 'Vous voulez monétiser',
        description: 'Vous cherchez une compétence rare et demandée pour vendre des visuels bluffants.',
        colorClass: 'blue'
    }
];

const TargetAudienceSection = () => {
    return (
        <section className="py-24 z-10 relative">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-r from-neutral-900 to-black rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center gap-12">

                    {/* Left Content */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-center md:text-left mb-6 text-2xl sm:text-2xl md:text-4xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                            CETTE FORMATION EST POUR VOUS SI...
                        </h2>

                        <div className="space-y-4">
                            {AUDIENCE_PROFILES.map((profile, idx) => (
                                <ProfileItem key={idx} {...profile} />
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full max-w-md">
                        <div className="aspect-square rounded-2xl bg-neutral-800 relative overflow-hidden border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
                                alt="Créateur utilisant Genesis"
                                className="object-cover w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                                <p className="font-orbitron text-white text-center">"J'ai rentabilisé la formation en 2 clips."</p>
                                <p className="text-center text-purple-400 text-sm mt-2">- Thomas D., Freelance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sub-component for profile items
const ProfileItem = ({ number, title, description, colorClass }) => {
    const colorClasses = {
        purple: 'bg-purple-900/50 border-purple-500/30 text-purple-400',
        pink: 'bg-pink-900/50 border-pink-500/30 text-pink-400',
        blue: 'bg-blue-900/50 border-blue-500/30 text-blue-400'
    };

    return (
        <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-full ${colorClasses[colorClass]} flex items-center justify-center border shrink-0`}>
                <span className="font-bold">{number}</span>
            </div>
            <div>
                <h4 className="font-bold text-lg">{title}</h4>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default TargetAudienceSection;
