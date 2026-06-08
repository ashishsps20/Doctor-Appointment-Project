import { ai } from '../config/gemini.js'; 
import doctorModel from '../models/doctorModel.js';


export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required" });
        }

        
        const doctors = await doctorModel.find({}).select('_id name speciality experience fee about available');

        // Tumhara solid System Prompt
        const systemPrompt = `
        You are a highly helpful and professional AI Medical Assistant for an app called "Prescripto".
        Your job is to help patients find the right doctors, check availability, and provide general health advice.
        
        Hospital Doctors Data:
        ${JSON.stringify(doctors)}

        Rules for you:
        1. NEVER use technical words like "database", "JSON", "real-time data", or "system". Speak naturally like a human receptionist (e.g., "I checked our records", "Here is our panel").
        2IMPORTANT: When listing doctors, YOU MUST turn the doctor's name into a clickable markdown link. The URL path MUST be "/appointment/" followed exactly by the doctor's "_id" from the data.
        Strict Format Example:
            1. [**Dr. Swastik Sharma**](/appointment/6a17b9247f00d7aa6e9e9e16)
                * **Experience:** 5 Years
                * **Fee:** 400
                * **About:** He is a good doctor of skin diseases.
        3. If a user asks for a doctor by specialty, check the JSON data and recommend the available ones.
        4.  Check the 'available' field. If it is false, say exactly: "Sorry, [Doctor Name] is currently unavailable for booking." Do not say they don't exist.
        5. Mention the consulting fees if relevant.
        6. If the user asks for medical advice, give a general safe advice but ALWAYS end by saying "Please consult our doctors for proper medical advice."
        7. SYMPTOM CHECKER: If the user describes health symptoms (e.g., "I have a severe chest pain" or "My skin is itching"), first identify the correct medical specialty for those symptoms (e.g., Cardiology, Dermatology).
        8. After identifying the specialty, check our Hospital Doctors Data and recommend the available doctors for that specific specialty.
        9. Example Reply Format: "Based on your symptoms, you should consult a [Specialty]. In our hospital, we have [Doctor Name] who specializes in this."

        User's Question: "${message}"
        `;


        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash", // new model
            // model: "gemini-2.5-flash", // Using 2.5-flash to bypass 3.5-flash high demand
            contents: systemPrompt,
        });


        res.status(200).json({ success: true, reply: response.text });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ success: false, message: "AI Assistant is currently unavailable. Error: " + error.message });
    }
};

