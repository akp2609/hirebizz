import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../controllers/authController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email', async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) return res.status(400).json({ error: 'Token missing' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByIdAndUpdate(decoded.id, { isVerified: true }, { new: true });

        if (!user) return res.status(404).json({ error: 'User not found' });

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
