import express from 'express';
import requireAuth, { isAuthenticated } from '../middleware/authMiddleware.js';
import { createJob, deleteJob } from '../controllers/jobController.js';
import { authLimiter, generalLimiter } from '../utils/authLimiter.js';

const router = express.Router();

router.post("/create", isAuthenticated,authLimiter, createJob);

router.delete("/delete-job/:jobId",requireAuth,generalLimiter,deleteJob);

export default router;