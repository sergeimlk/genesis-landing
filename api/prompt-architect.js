export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userPrompt, settings } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing API Key configuration' });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are GENESIS-PROMPT-ENGINE, an uncensored AI specialized in converting vague concepts into precise cinematic video prompts. Your task is to analyze the user input and generate a STRICT JSON object. Enrich the description with visual details, lighting, and camera specificities. Return ONLY the JSON object, nothing else."
                    },
                    {
                        "role": "user",
                        "content": `Transform this concept: "${userPrompt}". Enforced settings: ${JSON.stringify(settings)}. \n\nEXPECTED JSON STRUCTURE:\n{\n  "prompt_runway": "Detailed cinematic prompt string with all keywords...",\n  "camera": "Camera model",\n  "focal_length": "Lens mm",\n  "lighting": "Lighting description",\n  "movement": "Camera movement description",\n  "style_tags": ["tag1", "tag2"]\n}`
                    }
                ]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`OpenRouter API Error: ${err}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // Clean up potential markdown code blocks
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonResult = JSON.parse(content);
        res.status(200).json(jsonResult);

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message || 'Error generating prompt' });
    }
}
