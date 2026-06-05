import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ 
    apiKey: process.env.CHATBOT_API_KEY 
});

export { ai };