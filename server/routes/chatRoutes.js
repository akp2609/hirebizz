import express from 'express';
import { checkUnseenMessages, getChat, markAsSeen, sendMessages, getUserChatThreads } from '../controllers/chatController.js';
import requireAuth from '../middleware/authMiddleware.js';
import { verifyGoogleOIDC } from '../middleware/OIDCMiddleware.js';
const router = express.Router();

router.get('/check-unseen-messages',verifyGoogleOIDC,checkUnseenMessages)

router.get('/user-threads/:userId', requireAuth, getUserChatThreads);

router.get("/thread/:user1/:user2", requireAuth,getChat);

router.post('/send',requireAuth,sendMessages);

router.patch('/mark-as-seen',requireAuth,markAsSeen);


export default router;