import express from 'express';
import requireAuth from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { createReport, getAllReports, updateReportStatus } from '../controllers/reportController.js';

const router = express.Router();

router.post('/create-report', requireAuth, createReport); 
router.get('/get-all-reports', requireAuth, requireAdmin, getAllReports); 
router.patch('/:reportId/status', requireAuth, requireAdmin, updateReportStatus); 

export default router;