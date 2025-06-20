import express from 'express';
import { applyToJob, getJobApplication, getMyApplications, updateApplicationStatus, withdrawApplication } from '../controllers/applicationController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply/:jobId', requireAuth,applyToJob);

router.get('/job/:jobId', requireAuth, getJobApplication);

router.delete('/withdraw-application/:appId',requireAuth,withdrawApplication);

router.patch('/update-application-status/:appId',requireAuth,updateApplicationStatus);

router.get('/my-applications', requireAuth, getMyApplications);

export default router;