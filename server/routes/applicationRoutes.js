import express from 'express';
import { applyToJob, getJobApplications } from '../controllers/applicationController.js';
import requireAuth from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/apply/:jobId', requireAuth, applyToJob);

router.get('/job/:jobId', requireAuth, getJobApplications);

export default router;