import express from 'express';
import { applyToJob, getJobApplications } from '../controllers/applicationController.js';
import requireAuth from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';


const router = express.Router();

router.post('/:jobId/apply', requireAuth,applyToJob);

router.get('/job/:jobId', requireAuth, getJobApplications);

export default router;