import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createJob } from '../controllers/jobController.js';

const router = express.Router();

router.post("/create", isAuthenticated, createJob);

export default router;