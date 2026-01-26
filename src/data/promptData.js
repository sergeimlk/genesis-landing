
import { Play, Zap } from 'lucide-react';

export const STORAGE_KEY = 'promptArchitect';

export const FREE_MODELS = [
    "nousresearch/deephermes-3-llama-3-8b-preview:free",
    "deepseek/deepseek-r1-distill-llama-70b:free",
    "qwen/qwen2.5-vl-32b-instruct:free",
    "google/gemini-2.0-flash-thinking-exp:free",
    "meta-llama/llama-3.3-70b-instruct:free"
];

// --- AI GENERATION MODELS ---
export const AI_MODELS = {
    video: [
        {
            id: 'veo3',
            name: 'Google Veo 3',
            image: '/ui/perso/GenModels/video/Google-Veo-3.jpg',
            maxChars: 1000,
            specs: "Focus on cinematic vocabulary (e.g., 'wide shot', 'dolly in', 'golden hour'). Veo 3 excels at photorealistic textures and consistent lighting. Mention camera movements clearly."
        },
        {
            id: 'kling',
            name: 'Kling AI',
            image: '/ui/perso/GenModels/video/kling_ai_logo.png',
            maxChars: 500,
            specs: "Kling requires concise prompts. Focus on the main action and subject. Avoid complex negative prompts. Good for character consistency."
        },
        {
            id: 'runway',
            name: 'Runway Gen-3',
            image: '/ui/perso/GenModels/video/runway_gen3_logo.png',
            maxChars: 500,
            specs: "Runway Gen-3 specific syntax: use 'Camera Motion: <move>' for camera control. Structural breakdown: [Camera Movement] + [Subject/Action] + [Environment] + [Lighting/Style]."
        },
        {
            id: 'sora',
            name: 'OpenAI Sora',
            image: '/ui/perso/GenModels/video/openai_sora_logo.png',
            maxChars: 1000,
            specs: "Sora understands complex physical interactions and long prompts. Describe the physics, textures, and temporal changes in detail. Supports multi-scene descriptions."
        },
        {
            id: 'higgsfield',
            name: 'Higgsfield Cinema',
            image: '/ui/perso/GenModels/video/higgsfield_logo.png',
            maxChars: 1000,
            specs: "Specialized in consistent character animation and specific camera moves. Good for detailed cinematic shots."
        },
    ],
    image: [
        {
            id: 'midjourney',
            name: 'Midjourney',
            image: '/ui/perso/GenModels/image/midjourney_logo.png',
            maxChars: 6000,
            specs: "Midjourney parameters: --ar <w:h> (aspect ratio), --v 6.0 (version), --stylize <0-1000> (artistic strength), --weird <0-3000>, --chaos <0-100>. Use comma-separated stylistic keywords."
        },
        {
            id: 'dalle3',
            name: 'DALL-E 3',
            image: '/ui/perso/GenModels/image/dalle_3_logo.png',
            maxChars: 4000,
            specs: "DALL-E 3 prefers natural conversational language over keyword soup. Describe the scene as if talking to a human artist. Mention specific details about placement and interactions."
        },
        {
            id: 'flux',
            name: 'Flux AI',
            image: '/ui/perso/GenModels/image/flux_ai_logo.png',
            maxChars: 1000,
            specs: "Flux excels at text rendering and complex compositions. Be specific about text visibility if needed."
        },
        {
            id: 'seedream',
            name: 'Seedream',
            image: '/ui/perso/GenModels/image/seedream_logo.jpg',
            maxChars: 1000,
            specs: "General Stable Diffusion based model. Use standard artstation keywords."
        },
        {
            id: 'nanobanana',
            name: 'Nano Banana',
            image: '/ui/perso/GenModels/image/nano_banana_logo.png',
            maxChars: 1000,
            specs: "Responsive and fast model. Keep prompts punchy and direct."
        },
    ]
};

export const GEN_STYLES = [
    { id: 'genesis-cinematic', name: 'Cinematic', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200&auto=format&fit=crop' },
    { id: 'cyberpunk', name: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=200&auto=format&fit=crop' },
    { id: 'simpsons', name: 'Simpsons', image: 'public/ui/perso/GenModels/image/simpsons.png' },
    { id: 'minecraft', name: 'Minecraft', image: 'public/ui/perso/GenModels/image/minecraft.png' },
    { id: 'disney-pixar', name: 'Disney Pixar', image: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=200&auto=format&fit=crop' },
    { id: 'studio-ghibli', name: 'Studio Ghibli', image: 'public/ui/perso/GenModels/image/ghibli.png' },
    { id: 'vaporwave', name: 'Vaporwave', image: 'public/ui/perso/GenModels/image/vaporwave.png' },
    { id: 'realistic', name: 'Realistic Photo', image: 'https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=200&auto=format&fit=crop' },
    { id: 'anime', name: 'Anime Shinkai', image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=200&auto=format&fit=crop' },
    { id: 'oil-painting', name: 'Van Gogh Oil', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=200&auto=format&fit=crop' },
];

export const ASPECT_RATIOS = [
    { id: '16:9', name: '16:9', w: 16, h: 9, desc: 'Widescreen' },
    { id: '9:16', name: '9:16', w: 9, h: 16, desc: 'Vertical' },
    { id: '1:1', name: '1:1', w: 1, h: 1, desc: 'Square' },
    { id: '21:9', name: '21:9', w: 21, h: 9, desc: 'Ultrawide' },
    { id: '4:3', name: '4:3', w: 4, h: 3, desc: 'Classic' },
    { id: '3:2', name: '3:2', w: 3, h: 2, desc: 'Photo' },
    { id: '5:4', name: '5:4', w: 5, h: 4, desc: 'Large Format' },
    { id: '2:3', name: '2:3', w: 2, h: 3, desc: 'Portrait' },
    { id: '3:4', name: '3:4', w: 3, h: 4, desc: 'Portrait+' },
    { id: '4:5', name: '4:5', w: 4, h: 5, desc: 'Instagram' },
];

export const SHOT_TYPES = [
    { id: 'extreme-close-up', name: 'Extreme Close-up', desc: 'ECU', scale: 4 },
    { id: 'close-up', name: 'Close-up', desc: 'CU', scale: 3 },
    { id: 'medium-close-up', name: 'Medium Close-up', desc: 'MCU', scale: 2.2 },
    { id: 'medium-shot', name: 'Medium Shot', desc: 'MS', scale: 1.8 },
    { id: 'cowboy-shot', name: 'Cowboy Shot', desc: 'CS', scale: 1.5 },
    { id: 'medium-full', name: 'Medium Full', desc: 'MFS', scale: 1.3 },
    { id: 'full-shot', name: 'Full Shot', desc: 'FS', scale: 1.1 },
    { id: 'wide-shot', name: 'Wide Shot', desc: 'WS', scale: 0.9 },
    { id: 'extreme-wide', name: 'Extreme Wide', desc: 'EWS', scale: 0.6 },
    { id: 'top-view', name: 'Top View', desc: 'Bird Eye', scale: 0.7 },
    { id: 'low-angle', name: 'Low Angle', desc: 'LA', scale: 1.2 },
    { id: 'high-angle', name: 'High Angle', desc: 'HA', scale: 1.0 },
    { id: 'dutch-angle', name: 'Dutch Angle', desc: 'Tilted', scale: 1.1 },
    { id: 'over-shoulder', name: 'Over Shoulder', desc: 'OTS', scale: 1.4 },
    { id: 'pov', name: 'First Person POV', desc: 'POV', scale: 1.6 },
    { id: 'drone-view', name: 'Drone View', desc: 'Aerial', scale: 0.5 },
];

export const CAMERA_MOVES = [
    { id: 'Static', label: 'Static', anim: '' },
    { id: 'Dolly In', label: 'Dolly In', anim: 'anim-dolly-in' },
    { id: 'Dolly Out', label: 'Dolly Out', anim: 'anim-dolly-out' },
    { id: 'Dolly Zoom', label: 'Dolly Zoom', anim: 'anim-dolly-in' },
    { id: 'Truck Left', label: 'Truck Left', anim: 'anim-pan-left' },
    { id: 'Truck Right', label: 'Truck Right', anim: 'anim-pan-right' },
    { id: 'Pan Left', label: 'Pan Left', anim: 'anim-pan-left' },
    { id: 'Pan Right', label: 'Pan Right', anim: 'anim-pan-right' },
    { id: 'Tilt Up', label: 'Tilt Up', anim: 'anim-tilt-up' },
    { id: 'Tilt Down', label: 'Tilt Down', anim: 'anim-tilt-down' },
    { id: 'Orbit 360', label: 'Orbit 360', anim: 'anim-orbit' },
    { id: 'Handheld Shake', label: 'Handheld Shake', anim: 'anim-shake' },
    { id: 'Barrel Roll', label: 'Barrel Roll', anim: 'anim-roll' },
    { id: 'FPV Dive', label: 'FPV Dive', anim: 'anim-tilt-down' },
    { id: 'FPV Rise', label: 'FPV Rise', anim: 'anim-tilt-up' },
    { id: 'FPV Chase', label: 'FPV Chase', anim: 'anim-dolly-in' },
    { id: 'Tracking Shot', label: 'Tracking Shot', anim: 'anim-pan-right' },
    { id: 'Crane Up', label: 'Crane Up', anim: 'anim-tilt-up' },
    { id: 'Crane Down', label: 'Crane Down', anim: 'anim-tilt-down' },
    { id: 'Whip Pan', label: 'Whip Pan', anim: 'anim-pan-left duration-75' },
];

export const CAMERA_FX = [
    'None', 'Motion Blur', 'Chromatic Aberration', 'Film Grain', 'Light Leaks',
    'Lens Flare', 'Vignette', 'Bokeh', 'Double Exposure', 'Glitch Effect',
    'VHS Distortion', 'Bloom Neon', 'Camera Shockwave'
];

export const LIGHTING_STYLES = [
    { id: 'natural', name: 'Natural', image: '/ui/icons/lighting/natural.png' },
    { id: 'cinematic', name: 'Cinematic', image: '/ui/icons/lighting/cinematic.png' },
    { id: 'studio', name: 'Studio', image: '/ui/icons/lighting/studio.png' },
    { id: 'neon-noir', name: 'Neon Noir', image: '/ui/icons/lighting/neon_noir.png' },
    { id: 'golden-hour', name: 'Golden Hour', image: '/ui/icons/lighting/golden_hour.png' },
    { id: 'blue-hour', name: 'Blue Hour', image: '/ui/icons/lighting/blue_hour.png' },
    { id: 'rembrandt', name: 'Rembrandt', image: '/ui/icons/lighting/rembrandt.png' },
    { id: 'volumetric-fog', name: 'Volumetric Fog', image: '/ui/icons/lighting/volumetric_fog.png' },
    { id: 'bioluminescent', name: 'Bioluminescent', image: '/ui/icons/lighting/bioluminescent.png' },
    { id: 'cyberpunk-neon', name: 'Cyberpunk Neon', image: '/ui/icons/lighting/cyberpunk_neon.png' },
];

export const INITIAL_STATE = {
    generationType: 'video',
    aiModel: 'veo3',
    style: 'genesis-cinematic',
    shotType: 'wide-shot',
    duration: '5s',
    aspectRatio: '16:9',
    cameraMovement: 'Static',
    cameraFX: 'None',
    lighting: 'cinematic',
    subject: '',
    fps: '24'
};
