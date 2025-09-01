import {Router} from 'express';
import { detectIntent } from '../controllers/dialogflowController.js';

const router = Router();

router.post('/chatbot-bizzie',detectIntent);

export default router;