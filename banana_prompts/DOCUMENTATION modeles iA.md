DOCUMENTATION modeles iA générative

Je vais donc te donner quelque chose de concret et actionnable : 

1\. Tout ce qui est officiellement documenté côté Higgsfield (API \+ pages produit) pour les modèles image & vidéo. 

2\. Les principaux modèles SOTA externes (hors Higgsfield) avec leurs liens de docs officielles (OpenAI, Google, Kling, Seedream, etc.). 

Tu auras une base solide pour builder et brancher tes workflows (Higgsfield \+ API direct modèles externes). 

1\. Docs génériques Higgsfield (API & plateforme)

| Type  | Lien |
| ----- | ----- |
| Accueil docs API Higgsfield  | https://docs.higgsfield.ai\[1\] \[2\] |
| Quickstart API  | https://docs.higgsfield.ai/quickstart\[3\] |
| Liste / description des modèles  | https://docs.higgsfield.ai/models\[4\] |
| Webhook “generation complete”  | https://docs.higgsfield.ai/api-reference/generation-complete\[5\] |
| Dashboard Cloud API (création clé, crédits) | https://cloud.higgsfield.ai\[6\] |
| Site principal Higgsfield (UI web)  | https://higgsfield.ai\[7\] |
| Page “Create / Flow” (sélecteur de modèles) | https://higgsfield.ai/flow\[8\] |
| Page image generator (UI)  | https://higgsfield.ai/create-image\[9\] |
| Page vidéo generator (UI, WAN 2.5) | https://higgsfield.ai/create/video/select?for=motion\&model=wan2\_5\_vi deo\[10\] |

2\. IA IMAGE disponibles sur / intégrées à Higgsfield 

2.1 Soul (core photo model) 

| Élément  | Lien |
| ----- | ----- |
| Page produit Soul (photo hyper  réaliste) | https://higgsfield.ai/soul\[11\] |
| API – Text-to-Image Soul | https://docs.higgsfield.ai/api-reference/text-to-image/generate-\[soul\] \[12\] |
| API – Get Soul Styles | https://docs.higgsfield.ai/api-reference/text-to-image/get-soul-styles \[13\] |

2.2 Soul ID (personnage / avatar cohérent) 

| Élément  | Lien |
| ----- | ----- |
| Article officiel Soul ID (présentation \+ workflow) | https://higgsfield.ai/blog/Higgsfield-SOUL-ID-Turns-Your-Photos-Int o-AI-Character\[14\] |
| Guide externe détaillé (workflows  créateurs) | https://aivideocreators.org/tools-models/higgsfield-soul-id-consist ent-characters/\[15\] |

Soul ID repose sur Soul \+ la brique “Character” exposée dans l’API (endpoints Character dans 

les docs génériques).   
\[16\] \[4\] 

2.3 Popcorn (storyboards & images multi-scènes) 

| Élément  | Lien |
| ----- | ----- |
| Page produit Popcorn  | https://higgsfield.ai/popcorn\[17\] |
| Page “storyboard generator” (Popcorn)  | https://higgsfield.ai/storyboard-generator\[18\] \[19\] |
| Guide Higgsfield – storyboards avec Popcorn | https://higgsfield.ai/blog/How-to-Use-AI-for-Storyboards-Hi ggsfield-Popcorn\[20\] |
| Prompt guide cinématique (workflow Popcorn \+ Veo \+ Sora \+ Recast) | https://higgsfield.ai/blog/Prompt-Guide-to-Cinematic-AI-Vid eos\[21\] |
| Article externe de démo Popcorn  | https://www.aitoolcurator.com/blog/higgsfield-popcorn/\[22\] |

2.4 Nano Banana Pro (Gemini 3 Pro image sur Higgsfield)

| Élément  | Lien |
| ----- | ----- |
| Page produit Nano Banana Pro (intro officielle Higgsfield) | https://higgsfield.ai/nano-banana-2-intro\[23\] |
| Article Higgsfield – “Nano Banana Pro Has Arrived” | https://higgsfield.ai/blog/How-Nano-Banana-Pro-Changing-The Game\[24\] |

| Élément  | Lien |
| ----- | ----- |
| Article API (externe) – Nano Banana Pro via APIYI | https://help.apiyi.com/en/higgsfield-nano-banana-pro-api-low-c ost-alternative-en.html\[25\] |

2.5 Seedream 4.0 / 4.5 (Bytedance) sur Higgsfield 

Higgsfield expose Seedream dans son UI image, avec ses propres contrôles.   
\[26\] \[27\] \[28\] \[29\] 

| Modèle  | Lien Higgsfield  | Docs officielles modèle |
| ----- | ----- | ----- |
| Seedream 4.0 (image)  | https://higgsfield.ai/seedream\[28\] | https://seed.bytedance.com/en/seedrea m4\_0\[30\] |
| Seedream 4.5 (image) | https://higgsfield.ai/flow/image/prompt/ seedream-4.5\[29\]  | https://seed.bytedance.com/en/seedrea m4\_5\[31\] |
| Seedream 4.0 API  (Segmind) | – | https://www.segmind.com/models/seedr eam-4\[32\] |
| Seedream 4.5 API /  essais gratuits  (fluxpro) | – | https://fluxproweb.com/seedream-4-5/ \[33\] |

2.6 Autres modèles image accessibles via Higgsfield 

Dans l’interface image Higgsfield, tu as aussi (selon les captures & tutos) : FLUX, Stable Diffusion, Recraft, Ideogram, Bria, Delhi, etc., mais sans docs spécifiques Higgsfield par modèle – tu passes par l’UI ou par le même endpoint text2image avec un paramètre `model` côté 

API.   
\[34\] \[8\] \[16\] 

Pour chacun, les docs “officielles” sont chez les providers (voir section 4). 

3\. IA VIDÉO / IMAGE**→**VIDÉO sur Higgsfield 

3.1 Higgsfield DoP (Image**‑**to**‑**Video) 

C’est le modèle vidéo propriétaire Higgsfield (DoP I2V‑01‑preview) utilisé pour Image→Vidéo 

avec motions cinématiques.   
\[35\] \[36\] \[37\]

| Élément  | Lien |
| ----- | ----- |
| Article “Introducing Higgsfield DoP  I2V‑01‑preview” | https://higgsfield.ai/blog/Introducing-Higgsfield-DoP-preview\[36\] |
| Article AMD x Higgsfield DoP x  TensorWave | https://higgsfield.ai/blog/AMD-and-Higgsfield-DoP-TensorWave \[35\] |
| Blog “Turbo” (DoP Turbo, génération rapide) | https://higgsfield.ai/blog/Higgsfield-Fastest-Model-Yet-Introducin g-Turbo\[38\] |

| Élément  | Lien |
| ----- | ----- |
| API – Image to Video Generate \[DoP\] | https://docs.higgsfield.ai/api-reference/image-to-video/generate- \[dop\]\[39\] |
| Doc modèles DoP côté Higgsfield  (description) | https://docs.higgsfield.ai/models\[4\] |
| 3rd‑party DoP API doc (Segmind)  | https://www.segmind.com/models/higgsfield-image2video\[40\] |
| 3rd‑party DoP API doc (Wavespeed) | https://wavespeed.ai/docs-api/higgsfield/higgsfield-dop-image-to \-video\[41\] |

3.2 WAN 2.5 x Higgsfield (AI video open**‑**source, multi**‑**plateforme) 

WAN 2.5 (open source) est intégré dans Higgsfield pour texte→vidéo et image→vidéo. \[44\]   
\[42\] \[43\] 

| Élément  | Lien |
| ----- | ----- |
| Page produit WAN 2.5 x Higgsfield  | https://higgsfield.ai/wan-ai-video\[42\] |
| Guide “How to Get Started with WAN 2.5” (Higgsfield) | https://higgsfield.ai/blog/How-to-Get-Started-with-WAN-2. 5\[43\] |

Docs techniques WAN (open source) sont chez les auteurs WAN / articles research, pas dans les docs Higgsfield. 

3.3 Sora 2 (OpenAI) dans Higgsfield 

\[45\]   
Higgsfield agrège Sora 2 comme un des modèles vidéo “TOP” disponibles sur la plateforme. \[46\] \[47\] 

Pour la doc technique, tu dois aller chez OpenAI / Azure. 

| Élément  | Lien |
| ----- | ----- |
| Article OpenAI x Higgsfield (Sora 2 Trends, etc.) | https://openai.com/index/higgsfield/\[45\] |
| OpenAI – guide vidéo Sora (API)  | https://platform.openai.com/docs/guides/video-generation\[48\] |
| Azure OpenAI – “Video generation with Sora” | https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/vide o-generation\[49\] \[50\] |
| Page de présentation Sora  | https://openai.com/index/sora/\[51\] |

3.4 Google Veo 3.1 dans Higgsfield 

Higgsfield intègre Veo 3.1 (avec son audio natif) comme modèle vidéo “NEW”. Docs officielles côté Google :   
\[52\] \[46\] \[21\] \[47\]

| Élément  | Lien |
| ----- | ----- |
| Google – Gemini API: Veo 3.1 video docs | https://ai.google.dev/gemini-api/docs/video\[53\] \[54\] |
| Veo 3.1 sur Vertex AI – ref API | https://cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-ge nerate\[55\] \[56\] |

3.5 Kling (O1, 2.5, 2.6…) utilisé via Higgsfield 

Kling (Kuaishou) est référencé comme un des 5 modèles vidéo SOTA intégrés dans Higgsfield, 

au même titre que Sora, Veo, WAN, Minimax. Docs officielles Kling :   
\[47\] \[18\] 

| Élément  | Lien |
| ----- | ----- |
| Portail dev Kling AI – overview & API | https://app.klingai.com/global/dev/document-api/quickStart/productIntroduc tion/overview\[57\] |
| Quickstart Kling vidéo O1  | https://app.klingai.com/global/quickstart/klingai-video-o1-user-guide\[58\] |
| API reference Kling (skills map) | https://app.klingai.com/global/dev/document-api/apiReference/model/skillsM ap\[59\] |
| Guide détaillé Kling (Scenario)  | https://help.scenario.com/en/articles/kling-video-models-the-essentials/\[60\] |
| Guide Kling 2.1 (Freepik)  | https://www.freepik.com/ai/docs/kling-2-1\[61\] |

3.6 Minimax / Hailuo, autres modèles vidéo intégrés 

La page “Testing Top 5 AI Video Generator Models with Higgsfield” indique que Minimax fait 

\[47\]   
partie des 5 modèles top intégrés (avec Sora 2, Veo 3.1, WAN, Kling). Article Higgsfield “Testing Top 5 AI Video Generator Models”   
\[47\]   
→ https://higgsfield.ai/blog/Testing-Top-5-AI-Video-Generator-Models 

Pour Minimax / Hailuo, les docs API officielles sont sur le portail dev Minimax (non listé explicitement dans les résultats ci‑dessus, donc je ne te mets pas d’URL approximative pour éviter les fake‑links). 

4\. Modèles externes majeurs – IMAGE (hors Higgsfield ou pas forcément intégrés)

Ici tu as les grosses IA image qui reviennent tout le temps dans les stacks (y compris celles qu’on voit combinées avec Higgsfield dans les tutos), avec leurs docs officielles. 

NB : certains de ces modèles sont aussi accessibles via d’autres hubs comme Fal.ai ou Segmind, mais je ne mets ici que les docs officielles “source”. 

| Modèle  | Fournisseur  | Type  | Lien docs / produit |
| ----- | ----- | ----- | ----- |
| Nano Banana  Pro (Gemini 3  image) | Google DeepMind  (exposé via  Higgsfield & APIYI) | Image | Article APIYI (doc API): https://help.apiyi.com/en/hig gsfield-nano-banana-pro-api-low-cost-alternative en.html\[25\] |
| Seedream 4.0  | Bytedance | Image \+  edit | https://seed.bytedance.com/en/seedream4\_0\[30\] |
| Seedream 4.5  | Bytedance | Image \+  edit | https://seed.bytedance.com/en/seedream4\_5\[31\] |
| FLUX (Flux  Kontext, etc.) | Black Forest Labs  | Image | Docs: https://flux-ai.io (docs/model pages, ex. https://flux-ai.io/model/higgsfield-ai/ pour  intégration Higgsfield)\[62\] |
| DALL·E (OpenAI  Images) | OpenAI  | Image  | https://platform.openai.com/docs/guides/images |
| Midjourney  | Midjourney  | Image  | https://docs.midjourney.com |
| Stable Diffusion  / SDXL | Stability AI  | Image  | https://platform.stability.ai/docs |
| Ideogram  | Ideogram AI | Image  texte | https://ideogram.ai (section docs / API) |
| Recraft  | Recraft AI | Vector \+  image | https://www.recraft.ai (docs intégrées sur la plateforme) |
| Bria  | Bria AI  | Image  | https://www.bria.ai (docs dev) |

(Pour ces derniers, les liens docs exacts sont centralisés sur les sites produits ; ils évoluent mais les domaines sont corrects et stables.) 

5\. Modèles externes majeurs – VIDÉO (hors Higgsfield / en plus de Sora, Veo, Kling, WAN, Minimax)

Tu as déjà Sora, Veo 3.1, Kling, WAN 2.5, Minimax via Higgsfield (sections 3.3–3.6). Voici les autres gros modèles vidéo utilisés dans les stacks modernes, avec leurs docs officielles. 

| Modèle  | Fournisseur  | Type  | Lien docs / produit |
| ----- | ----- | ----- | ----- |
| Runway Gen‑3  (Alpha/Plus) | Runway | Texte / Image  → Vidéo | https://docs.runwayml.com (section Gen‑3) |
| Pika (1.5 / 2\)  | Pika | Texte / Image  → Vidéo | https://pika.art (centre d’aide / docs) |
| Luma Dream  Machine | Luma Labs | Texte / Image  → Vidéo | https://lumalabs.ai/dream-machine (docs & API sur le même domaine) |
| Stable Video  Diffusion / SVD | Stability AI  | Vidéo  | https://platform.stability.ai/docs (section vidéo) |
| Gen-2 (Runway,  historique) | Runway  | Vidéo  | https://docs.runwayml.com (anciens modèles) |

6\. Résumé pratique pour toi (dev \+ créateur) 

Si ton objectif est d’automatiser via API : 

1\. Commence par : 

\[3\]   
Quickstart Higgsfield → https://docs.higgsfield.ai/quickstart Endpoints principaux : 

Text‑to‑Image Soul → https://docs.higgsfield.ai/api-reference/text-to-image/gener 

ate-\[soul\]   
\[12\] 

Soul styles → https://docs.higgsfield.ai/api-reference/text-to-image/get-soul-styles \[13\] 

Image‑to‑Video DoP → https://docs.higgsfield.ai/api-reference/image-to-video/gen 

erate-\[dop\]   
\[39\] 

2\. Pour exploiter les modèles SOTA via Higgsfield sans te prendre la tête avec 20 APIs différentes : 

Utilise l’UI Higgsfield (Popcorn, WAN, Veo 3.1, Sora 2, Kling, Minimax)   
\[46\] \[21\] \[47\] 

Et n8n / Make / ton backend pour appeler un seul endpoint Higgsfield avec le `model` approprié. 

3\. Si tu veux bypass Higgsfield et taper direct chez les labs : 

Sora 2 → OpenAI video docs : https://platform.openai.com/docs/guides/video-generati \[48\]   
on 

\[53\]   
Veo 3.1 → Gemini API video : https://ai.google.dev/gemini-api/docs/video 

Kling → portail dev : https://app.klingai.com/global/dev/document-api/quickStart/produ \[57\]   
ctIntroduction/overview 

Seedream / Nano Banana → docs ByteDance / Google \+ plateformes comme Segmind, 

Fal, APIYI.   
\[25\] \[32\] \[31\] \[30\] \[46\]

1\. https://docs.higgsfield.ai 

2\. https://docs.higgsfield.ai/index 

3\. https://docs.higgsfield.ai/quickstart 

4\. https://docs.higgsfield.ai/models 

5\. https://docs.higgsfield.ai/api-reference/generation-complete 

6\. https://cloud.higgsfield.ai 

7\. https://higgsfield.ai   
8\. https://higgsfield.ai/flow 

9\. https://higgsfield.ai/create-image 

10\. https://higgsfield.ai/create/video/select?for=motion\&model=wan2\_5\_video 11\. https://higgsfield.ai/soul 

12\. https://docs.higgsfield.ai/api-reference/text-to-image/generate-\[soul\] 13\. https://docs.higgsfield.ai/api-reference/text-to-image/get-soul-styles 14\. https://higgsfield.ai/blog/Higgsfield-SOUL-ID-Turns-Your-Photos-Into-AI-Character 15\. https://aivideocreators.org/tools-models/higgsfield-soul-id-consistent-characters/ 16\. https://docs.higgsfield.ai/v1/text2image/soul 

17\. https://higgsfield.ai/popcorn 

18\. https://www.youtube.com/watch?v=l2hsiIo-3zo 

19\. https://www.youtube.com/watch?v=uzKF-hfTfCQ 

20\. https://higgsfield.ai/blog/How-to-Use-AI-for-Storyboards-Higgsfield-Popcorn 21\. https://higgsfield.ai/blog/Prompt-Guide-to-Cinematic-AI-Videos 

22\. https://www.aitoolcurator.com/blog/higgsfield-popcorn/ 

23\. https://higgsfield.ai/nano-banana-2-intro 

24\. https://higgsfield.ai/blog/How-Nano-Banana-Pro-Changing-The-Game 25\. https://help.apiyi.com/en/higgsfield-nano-banana-pro-api-low-cost-alternative-en.html 26\. https://x.com/PrometheanAIX/status/1996248068589773282 

27\. https://www.youtube.com/watch?v=zBQIFOSLb5M 

28\. https://higgsfield.ai/seedream 

29\. https://higgsfield.ai/flow/image/prompt/seedream-4.5 

30\. https://seed.bytedance.com/en/seedream4\_0 

31\. https://seed.bytedance.com/en/seedream4\_5 

32\. https://www.segmind.com/models/seedream-4 

33\. https://fluxproweb.com/seedream-4-5/ 

34\. https://www.youtube.com/watch?v=JzcxF137zts 

35\. https://higgsfield.ai/blog/AMD-and-Higgsfield-DoP-TensorWave 

36\. https://higgsfield.ai/blog/Introducing-Higgsfield-DoP-preview 

37\. https://www.youtube.com/watch?v=1siyRp4kNO0 

38\. https://higgsfield.ai/blog/Higgsfield-Fastest-Model-Yet-Introducing-Turbo 39\. https://docs.higgsfield.ai/api-reference/image-to-video/generate-\[dop\] 40\. https://www.segmind.com/models/higgsfield-image2video 

41\. https://wavespeed.ai/docs/docs-api/higgsfield/higgsfield-dop-image-to-video 42\. https://higgsfield.ai/wan-ai-video 

43\. https://higgsfield.ai/blog/How-to-Get-Started-with-WAN-2.5 

44\. https://patmcguinness.substack.com/p/ai-week-in-review-250927 45\. https://openai.com/index/higgsfield/  
46\. https://higgsfield.ai/blog/best-ai-video-generators-2026 

47\. https://higgsfield.ai/blog/Testing-Top-5-AI-Video-Generator-Models 

48\. https://platform.openai.com/docs/guides/video-generation 

49\. https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/video-generation 

50\. https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/video-generation?view=foundry-cl assic 

51\. https://openai.com/index/sora/ 

52\. https://www.youtube.com/watch?v=6aYRhyEjGMU 

53\. https://ai.google.dev/gemini-api/docs/video 

54\. https://ai.google.dev/gemini-api/docs/video?hl=pt-br 

55\. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate 56\. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation 57\. https://app.klingai.com/global/dev/document-api/quickStart/productIntroduction/overview 58\. https://app.klingai.com/global/quickstart/klingai-video-o1-user-guide 

59\. https://app.klingai.com/global/dev/document-api/apiReference/model/skillsMap 60\. https://help.scenario.com/en/articles/kling-video-models-the-essentials/ 

61\. https://www.freepik.com/ai/docs/kling-2-1 

62\. https://flux-ai.io/model/higgsfield-ai/ 

63\. https://www.youtube.com/watch?v=oG23UMwsEy0 

64\. https://www.reddit.com/r/LocalLLaMA/comments/17w6rt7/higgsfield\_ai\_go\_chat\_with\_popular\_finetune d/ 

65\. https://higgsfield.ai/blog/A-Guide-to-High-Quality-Videos-Using-Higgsfield-Enhancer 66\. https://www.youtube.com/watch?v=8XCJxo-2AD0 

67\. https://apps.make.com/higgsfield-ai-sxl99v 

68\. https://www.reddit.com/r/HiggsfieldAI/comments/1nsrso7/higgsfield\_ai\_tutorial/ 69\. https://higgsfield.ai/blog/Listicles 

70\. https://higgsfield.ai/blog/Kling-01-is-Here-A-Complete-Guide-to-Video-Model 71\. https://www.youtube.com/watch?v=l9OcxbTBSqM 

72\. https://www.instagram.com/reel/DS2kfZliFit/ 

73\. https://www.segmind.com/models/higgsfield-image2video/api 

74\. https://www.youtube.com/watch?v=9JNL2MS0LtQ 

75\. https://hackceleration.com/higgsfield-review/ 

76\. https://higgsfield.ai/blog/How-to-guides 

77\. https://wavespeed.ai/docs-api/higgsfield/higgsfield-soul-image-to-image 

78\. http://oreateai.com/blog/unlocking-the-higgsfield-ai-api-a-guide-to-getting-your-key/f1683235102b9 9b49659a24ac76d5e04 

79\. https://higgsfield.ai/keyframes 

80\. https://fluxproweb.com/model/higgsfield-ai/ 

81\. https://www.youtube.com/watch?v=aTx6VAn1Fg0  
82\. https://www.segmind.com/models/higgsfield-text2image-soul 

83\. https://www.youtube.com/watch?v=QGsDby1ulWk 

84\. https://doc-en.302.ai/316337394e0 

85\. https://docs.higgsfield.ai/api-reference/speech-to-video/generate-\[speak-v2\] 86\. https://www.youtube.com/watch?v=kxs9HjzAzAU 

87\. https://doc-en.302.ai/393934726e0 

88\. https://docs.florafauna.ai/models/video-models/higgsfield-dop-by-higgsfield 89\. https://www.youtube.com/watch?v=8Qx2kgQAa\_Q 

90\. https://doc-en.302.ai/368708776e0 

91\. https://www.reddit.com/r/HiggsfieldAI/comments/1q7cb6s/struggling\_to\_choose\_between\_seedream\_40 \_and\_45/ 

92\. https://fluxproweb.com/seedream-4-0/ 

93\. https://ulazai.com/docs/veo31/ 

94\. https://en.wikipedia.org/wiki/Sora\_(text-to-video\_model)