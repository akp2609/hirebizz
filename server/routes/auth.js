import express from 'express';

import User from '../models/User.js';
import { registerUser, loginUser } from '../contorllers/authController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', requireAuth, async (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
});

export default router;
