import express from 'express';
import { getChat, markAsSeen, sendMessages } from '../controllers/chatController.js';
import requireAuth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/send',requireAuth,sendMessages);

router.get("/:user1/:user2", requireAuth,getChat);

router.post('/mark-as-seen',requireAuth,markAsSeen);

export default router;