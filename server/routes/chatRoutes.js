import express from 'express';
import { checkUnseenMessages, getChat, markAsSeen, sendMessages } from '../controllers/chatController.js';
import requireAuth from '../middleware/authMiddleware.js';
import { verifyGoogleOIDC } from '../middleware/OIDCMiddleware.js';
const router = express.Router();

router.post('/send',requireAuth,sendMessages);

router.get("/:user1/:user2", requireAuth,getChat);

router.post('/mark-as-seen',requireAuth,markAsSeen);

router.get('/check-unseen-messages',verifyGoogleOIDC,checkUnseenMessages)

export default router;