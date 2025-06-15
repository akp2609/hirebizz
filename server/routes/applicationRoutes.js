import express from 'express';
import { applyToJob, getJobApplication, getMyApplications, updateApplicationStatus, withdrawApplication } from '../controllers/applicationController.js';
import requireAuth from '../middleware/authMiddleware.js';
import { generalLimiter } from '../utils/authLimiter.js';


const router = express.Router();

router.post('/apply/:jobId', requireAuth,applyToJob);

router.get('/job/:jobId', requireAuth, getJobApplication);

router.get('/get-applications',requireAuth,getMyApplications);

router.delete('/withdraw-application/:appId',requireAuth,generalLimiter,withdrawApplication);

router.patch('/update-application-status/:appId',requireAuth,generalLimiter,updateApplicationStatus);

router.get('/my-applications', requireAuth, getMyApplications);

export default router;