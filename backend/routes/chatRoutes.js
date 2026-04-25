import express from 'express';
import { sendChatMessage, getChatHistory } from '../controllers/chatController.js';

const router = express.Router();

// Send message to Gemini AI
router.post('/send', sendChatMessage);

// Get chat history (optional)
router.get('/history', getChatHistory);

export default router;
