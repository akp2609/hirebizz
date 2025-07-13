import express from 'express';
import { applyToJob, getAssociatedApplications, getJobApplication, getMyApplications, refreshResumeUrlApplications, updateApplicationStatus, withdrawApplication } from '../controllers/applicationController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply/:jobId', requireAuth,applyToJob);

router.get('/job/:jobId', requireAuth, getJobApplication);

router.delete('/withdraw-application/:appId',requireAuth,withdrawApplication);

router.patch('/update-application-status/:appId',requireAuth,updateApplicationStatus);

router.get('/my-applications', requireAuth, getMyApplications);

router.get('/:jobId/associated-applications',requireAuth,getAssociatedApplications)

router.get(`/:applicationId/refresh-resume-url`,requireAuth,refreshResumeUrlApplications);

export default router;