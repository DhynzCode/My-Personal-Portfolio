import express from 'express';
import { generateAIResponse } from '../services/gemini.js';
import { saveChatSession, saveChatMessage, getAllChats } from '../services/supabase.js';
import { sendTelegramNotification } from '../services/telegram.js';
import { sendEmailNotification } from '../services/email.js';

const router = express.Router();

// Get all chats (for Dashboard)
router.get('/', async (req, res) => {
  try {
    const chats = await getAllChats();
    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch chats' });
  }
});

// Handle incoming chat messages
router.post('/', async (req, res) => {
  const { visitorName, visitorEmail, sessionId, message, history } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  try {
    // 1. Save or get the Chat Session in Supabase
    let chatId = null;
    if (visitorName && visitorEmail && sessionId) {
       chatId = await saveChatSession(visitorName, visitorEmail, sessionId);
    }

    // 2. Save User Message to Supabase
    if (chatId) {
      await saveChatMessage(chatId, 'user', message);
    }

    // 3. Send Telegram & Email Notifications (Run asynchronously)
    if (visitorName && visitorEmail) {
      sendTelegramNotification(visitorName, visitorEmail, message).catch(console.error);
      sendEmailNotification(visitorName, visitorEmail, message).catch(console.error);
    }

    // 4. Get Gemini AI Response
    const aiResponseText = await generateAIResponse(history || [], message);

    // 5. Save AI Message to Supabase
    if (chatId) {
      await saveChatMessage(chatId, 'model', aiResponseText);
    }

    // 6. Return response to frontend
    res.json({
      success: true,
      reply: aiResponseText
    });

  } catch (error) {
    console.error("Chat Route Error:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
