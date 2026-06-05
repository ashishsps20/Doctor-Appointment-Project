import express from 'express';
import { handleChat } from '../controllers/chatbotController.js';

const chatbotRouter = express.Router();

// URL: /api/chat/ask
chatbotRouter.post('/ask', handleChat);

export default chatbotRouter;