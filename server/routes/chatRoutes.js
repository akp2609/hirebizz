import express from 'express';
import { checkUnseenMessages, getChat, markAsSeen, sendMessages, getUserChatThreads } from '../controllers/chatController.js';
import requireAuth from '../middleware/authMiddleware.js';
import { verifyGoogleOIDC } from '../middleware/OIDCMiddleware.js';
const router = express.Router();

router.post('/send',requireAuth,sendMessages);

router.get("/:user1/:user2", requireAuth,getChat);

router.patch('/mark-as-seen',requireAuth,markAsSeen);

router.get('/check-unseen-messages',verifyGoogleOIDC,checkUnseenMessages)

router.get('/user-threads/:userId', requireAuth, getUserChatThreads);

export default router;