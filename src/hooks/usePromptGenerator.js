
import { useState, useEffect } from 'react';
import { FREE_MODELS } from '../data/promptData';

export const usePromptGenerator = ({ state, uses, saveUses, unlocked, setIsLoginOpen }) => {
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState(null);
    const [countdown, setCountdown] = useState(0);

    // Countdown logic
    useEffect(() => {
        let timer;
        if (generating && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [generating, countdown]);

    const handleGenerate = async () => {
        if (!unlocked && uses >= 3) {
            setIsLoginOpen(true);
            return;
        }

        if (!state.subject.trim()) {
            alert("Veuillez décrire votre scène.");
            return;
        }

        setGenerating(true);
        setCountdown(15);
        setResult(null); // Reset prev result

        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) {
            console.warn("API Key manquante. Mode simulation.");
            setTimeout(() => {
                setResult({
                    video_prompt: "Cinematic shot of " + state.subject + ", high resolution, 8k, unreal engine 5 render",
                    image_prompt: "Photorealistic image of " + state.subject + ", detailed textures, volumetric lighting",
                    technical_details: "Simulation Mode: Ensure API Key is set in .env"
                });
                setGenerating(false);
                saveUses(uses + 1);
            }, 3000);
            return;
        }

        let success = false;
        let lastError = null;

        for (const model of FREE_MODELS) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": window.location.href,
                        "X-Title": "Genesis Prompt Architect"
                    },
                    body: JSON.stringify({
                        "model": model,
                        "provider": {
                            "data_collection": "allow"
                        },
                        "messages": [
                            {
                                "role": "system",
                                "content": `Tu es un expert mondial en Prompt Engineering pour la génération vidéo (Runway Gen-3, Kling, Sora).
                                Transforme la description de l'utilisateur en un prompt technique PARFAIT.
                                
                                PARAMÈTRES ACTUELS :
                                - Type: ${state.generationType}
                                - Modèle: ${state.aiModel}
                                - Style: ${state.style} (Utilise ce style visuel !)
                                - Cadrage: ${state.shotType}
                                - Durée: ${state.duration}
                                - Mouvement: ${state.cameraMovement}
                                - Effets: ${state.cameraFX}
                                - Ambiance (Mood): ${state.lighting}

                                RÈGLES CRITIQUES :
                                1. Réponds UNIQUEMENT le JSON pur. Pas de markdown, pas de texte avant/après.
                                2. Structure JSON attendue :
                                {
                                  "video_prompt": "Description technique en anglais, mots-clés cinématiques, mouvements de caméra précis...",
                                  "image_prompt": "Version optimisée pour Midjourney/DALL-E, focus sur la composition et la lumière...",
                                  "technical_details": "Explication courte des choix techniques (1 phrase)"
                                }
                                3. Sois créatif but précis sur les termes techniques (8k, octane render, volumetric fog, etc...).`
                            },
                            {
                                "role": "user",
                                "content": `Sujet de la scène : "${state.subject}"`
                            }
                        ]
                    })
                });

                if (!response.ok) {
                    const errText = await response.text();
                    console.warn(`Modèle ${model} indisponible (${response.status}): ${errText}`);
                    lastError = new Error(`Modèle ${model} -> ${response.status}`);
                    continue;
                }

                const data = await response.json();
                if (!data.choices || !data.choices[0]) throw new Error("Réponse vide");

                let content = data.choices[0].message.content;

                // Robust JSON Extraction
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    content = jsonMatch[0];
                } else {
                    throw new Error("L'IA n'a pas retourné de JSON valide.");
                }

                const jsonResult = JSON.parse(content);
                setResult(jsonResult);
                saveUses(uses + 1);
                success = true;
                break;

            } catch (error) {
                console.warn(`Erreur technique avec ${model}:`, error);
                lastError = error;
            }
        }

        if (!success) {
            console.error("Tous les modèles ont échoué.", lastError);
            alert(`Tous les modèles gratuits sont surchargés. Veuillez réessayer dans un instant.\nDernière erreur: ${lastError?.message}`);
        }

        setGenerating(false);
    };

    return { generating, result, countdown, handleGenerate };
};
