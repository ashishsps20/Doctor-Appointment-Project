import { ai } from '../config/gemini.js';

const predictSpecialist = async (req, res) => {
    try {
        const { symptoms } = req.body; // Frontend se aayi array: ["Fever", "Cough"]

        if (!symptoms || symptoms.length === 0) {
            return res.json({ success: false, message: "No symptoms provided" });
        }

        // Array ko comma-separated string mein convert kar liya
        const symptomString = symptoms.join(", ");


        const systemPrompt = `
        You are a highly accurate medical triage system. The user will provide a list of symptoms.
        Your ONLY job is to return the exact name of the medical specialty they should visit.
        
        You MUST choose from this EXACT list:
        - Cardiologist
        - Gastroenterologist
        - Dermatologist
        - Neurologist
        - Gynecologist
        - Pediatricians
        - General physician

        RULES:
        1. Do NOT write any extra words, greetings, punctuation, or explanations. 
        2. ONLY return the exact matching string from the list above.
        3. If the symptoms are mixed, common, or ambiguous (like basic fever/cough), return "General physician".
        `;

        // AI ko call kiya (Stateless approach) with Retry Logic
        let response;
        let retries = 3;
        let delay = 3000;

        for (let i = 0; i <= retries; i++) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Symptoms: ${symptomString}`,
                    config: {
                        systemInstruction: systemPrompt,
                    }
                });
                break;
            } catch (apiError) {
                if (i < retries && apiError.message && (apiError.message.includes('503') || apiError.message.includes('429'))) {
                    console.log(`Symptom Checker High demand (Attempt ${i + 1}), retrying in ${delay}ms...`);
                    await new Promise(res => setTimeout(res, delay));
                    delay += 2000;
                } else {
                    throw apiError;
                }
            }
        }

        // 🌟 .trim() lagana sabse zaroori hai! 
        // AI kabhi-kabhi aage-peeche invisible space ya Enter (\n) maar deta hai. 
        // Trim se string ekdum clean ho jayegi taaki frontend routing fail na ho.
        const predictedDoctor = response.text.trim();

        res.json({
            success: true,
            specialist: predictedDoctor
        });

    } catch (error) {
        console.log("AI Prediction Error: ", error);
        res.json({ success: false, message: "Error communicating with AI model" });
    }
}

export { predictSpecialist }