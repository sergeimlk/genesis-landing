/**
 * Constants - Paths & URLs
 * Centralise tous les chemins d'assets et liens externes
 * Facilite la maintenance et évite les duplications
 */

// ==============================
// EXTERNAL LINKS
// ==============================
export const EXTERNAL_LINKS = {
    // Social Media
    INSTAGRAM_URL: 'https://www.instagram.com/visuals.by.genesis/',
    TIKTOK_URL: 'https://www.tiktok.com/@visuals.by.genesis',

    // Contact & Forms
    CONTACT_LINK: 'https://boiled-gondola-ea5.notion.site/2837b3ecdb188150bacef0d0c737d637',
    CONTACT_FORM_URL: 'https://boiled-gondola-ea5.notion.site/ebd//2837b3ecdb188150bacef0d0c737d637',
};

// ==============================
// ASSETS PATHS
// ==============================
export const ASSETS = {
    // Logo & Branding
    LOGO: {
        MAIN: '/assets/images/logo/Glogo.png',
        DARK: '/assets/images/logo/DarkLogo.png',
        GENESIS_TEXT: '/assets/images/logo/GENESIS.png',
    },

    // Icons
    ICONS: {
        FAVICON: '/assets/icons/favicon-round.svg',
        // PWA Icons
        ICON_72: '/assets/icons/icon-72x72.png',
        ICON_96: '/assets/icons/icon-96x96.png',
        ICON_128: '/assets/icons/icon-128x128.png',
        ICON_144: '/assets/icons/icon-144x144.png',
        ICON_152: '/assets/icons/icon-152x152.png',
        ICON_192: '/assets/icons/icon-192x192.png',
        ICON_384: '/assets/icons/icon-384x384.png',
        ICON_512: '/assets/icons/icon-512x512.png',
    },

    // Images
    IMAGES: {
        // Testimonials/Examples
        ERIC: '/assets/images/examples/eric.jpg',
        ERIC_BEFORE: '/assets/images/examples/eric2.png',
        ERIC_GTA: '/assets/images/examples/ericgta.png',

        // Hero images
        HERO_RED_1: '/assets/images/hero/GAredInspi1.png',
        HERO_RED_2: '/assets/images/hero/GAredInspi1 (4).png',
        HERO_RED_3: '/assets/images/hero/GAredInspi1 (5).png',
    },

    // UI Elements
    UI: {
        // Animation persona
        ANIMATION_PERSONA: '/assets/ui/animation/pngvaltop.png',
        ANIMATION_FULLBODY: '/assets/ui/animation/pngval fullbody.png',
        ANIMATION_VIDEO: '/assets/ui/animation/1G.mp4',

        // Lighting icons
        LIGHTING: {
            NATURAL: '/assets/ui/lighting/natural.png',
            CINEMATIC: '/assets/ui/lighting/cinematic.png',
            STUDIO: '/assets/ui/lighting/studio.png',
            NEON_NOIR: '/assets/ui/lighting/neon_noir.png',
            GOLDEN_HOUR: '/assets/ui/lighting/golden_hour.png',
            BLUE_HOUR: '/assets/ui/lighting/blue_hour.png',
            REMBRANDT: '/assets/ui/lighting/rembrandt.png',
            VOLUMETRIC_FOG: '/assets/ui/lighting/volumetric_fog.png',
            BIOLUMINESCENT: '/assets/ui/lighting/bioluminescent.png',
            CYBERPUNK_NEON: '/assets/ui/lighting/cyberpunk_neon.png',
        },

        // AI Models
        MODELS: {
            VIDEO: '/assets/ui/models/video/',
            IMAGE: '/assets/ui/models/image/',
            STYLES: '/assets/ui/models/styles/',
        },
    },

    // Documents
    DOCUMENTS: {
        CGV: '/assets/documents/CONDITIONS_GENERALES_DE_VENTE_GENESIS.pdf',
    },
};

// ==============================
// ROUTE PATHS
// ==============================
export const ROUTES = {
    HOME: '/',
    PROMPT_ARCHITECT: '/prompt',
    GENEGYM: '/genegym',
};

// ==============================
// NAVIGATION LINKS
// ==============================
export const NAV_LINKS = [
    { label: 'Programme', href: '#programme', sectionId: 'programme' },
    { label: 'Avis', href: '#reviews', sectionId: 'reviews' },
];
