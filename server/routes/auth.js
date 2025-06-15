import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import requireAuth from '../middleware/authMiddleware.js';
import {authLimiter} from '../utils/authLimiter.js';


const router = express.Router();

router.post('/register',authLimiter, registerUser);
router.post('/login',authLimiter ,loginUser);
router.get('/verify-email', requireAuth ,async (req, res) => {
    try {
        res.status(200).json({ message: 'Email verified suuccessfully' });
    } catch (err) {
        console.error(err);
        res.status(301).json({ error: 'Invalid or expired token' });
    }
})

router.get('/profile', requireAuth, async (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
});

router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
