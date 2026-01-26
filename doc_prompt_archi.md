# Documentation Technique : Genesis Prompt Architect

## 1. Architecture du Générateur de Prompts

Le **Genesis Prompt Architect** n'est pas un simple formulaire ; c'est un **système expert** qui agit comme un "Chef Opérateur IA". Il repose sur trois piliers techniques majeurs pour garantir la qualité cinématique des prompts générés.

### A. Injection de Contexte "Hyper-Spécialisé"
Contrairement aux générateurs génériques, notre système injecte dynamiquement des connaissances techniques spécifiques au modèle choisi par l'utilisateur (Midjourney, Runway, Sora, Veo, etc.) directement dans le "System Prompt" du LLM.

*   **Mécanisme** : Le hook `usePromptGenerator` récupère les specs techniques depuis `promptData.js`.
*   **Exemple Concret** :
    *   Si **Midjourney** est sélectionné -> Le système injecte les règles de syntaxe `--ar`, `--stylize`, `--v 6.0`.
    *   Si **Runway Gen-3** est sélectionné -> Il force la structure `Bytedance` : `[Camera Movement] + [Subject] + [Environment]`.
    *   Si **Ideogram** est sélectionné -> Il optimise pour la typographie et le rendu de texte.

### B. Smart Constraints (Règles Intelligentes Invisibles)
Une couche logique intermédiaire analyse les choix de l'utilisateur (mouvement de caméra, focale, type de plan) pour ajouter des **contraintes critiques** invisibles mais essentielles pour éviter les hallucinations ou les erreurs de rendu.

*   **Règle "Drone FPV"** :
    *   *Déclencheur* : Mouvement `FPV Dive` ou `Drone View`.
    *   *Instruction Injectée* : `"CRITICAL: The camera IS the drone. Do NOT show a drone in the shot. Represent the view FROM the drone."` (Évite que l'IA ne dessine un drone dans le ciel).
*   **Règle "Focale" (8mm - 200mm)** :
    *   *Déclencheur* : `8mm` ou `Fish-eye`.
    *   *Instruction Injectée* : `"Lens: Strong barrel distortion, vignetting, ultra-wide field of view."`
*   **Règle "First Person View (POV)"** :
    *   *Instruction* : `"Show what the subject sees... never the subject's face/body from outside."`

### C. Pipeline de Construction du Prompt (Workflow)
1.  **Entrée Utilisateur** : Sujet, Modèle, Style (ex: Cyberpunk), Mouvement (ex: Dolly Zoom), Focale (ex: 35mm).
2.  **Traitement Logique** :
    *   Récupération des *Specs Modèle*.
    *   Calcul des *Smart Constraints*.
3.  **Construction du System Prompt** : Assemblage de toutes les contraintes + instruction de formatage JSON strict.
4.  **Génération LLM** : Appel à l'API (OpenRouter/Gemini) avec température basse pour la précision.
5.  **Parsing Robuste** : Extraction du JSON (nettoyage des balises Markdown parasites) pour affichage propre.

---

## 2. Pourquoi passer à Genesis Premium ? (Le mot pour l'utilisateur)

**"Arrêtez de deviner, commencez à réaliser."**

La plupart des créateurs perdent des heures et des centaines de crédits à tâtonner avec des prompts vagues comme *"cinematic shot of a car"*. Le résultat ? Des vidéos incohérentes, des bugs visuels, et une frustration constante.

Avec **Genesis Prompt Architect Premium**, vous n'achetez pas un outil, vous engagez un **Directeur de la Photographie virtuel**. 

*   **Économie réelle** : Un prompt parfait du premier coup signifie moins d'essais ratés sur Runway ou Midjourney ($$$ économisés).
*   **Qualité Hollywoodienne** : Accédez à des réglages optiques (focales 8mm, 200mm), des mouvements complexes (Dolly Zoom, FPV) et des styles exclusifs inaccessibles aux amateurs.
*   **Compatibilité Totale** : Que vous utilisiez Sora, Kling, Veo ou Midjourney, Genesis parle leur langage technique natif à votre place.

*Ne laissez plus le hasard dicter votre art. Passez en mode Architecte.*
