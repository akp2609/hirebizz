import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { registerUser, loginUser, requestPasswordReset, resetPassword, verifyEmail, getProfile } from '../controllers/authController.js';
import requireAuth from '../middleware/authMiddleware.js';
import {authLimiter} from '../utils/authLimiter.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/verify-email/:token', verifyEmail);

router.get('/profile', requireAuth, getProfile);

router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
