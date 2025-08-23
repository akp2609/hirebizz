import express from 'express';
import requireAuth, { isAuthenticated } from '../middleware/authMiddleware.js';
import { analyticsDataUpdateDownloads, analyticsRecordFailedLogin, analyticsRecordLogin, analyticsRecordLogout, processAndStoreHourlyData } from '../middleware/AnalyticsController.js';
import { checkJwt } from '../middleware/azureMiddleware.js';

const router = express.Router();

router.post("/downloads-update", analyticsDataUpdateDownloads);

router.post("/record-login", requireAuth, analyticsRecordLogin);

router.post("/record-logout", requireAuth, analyticsRecordLogout);

router.post("/process-hourly-data", checkJwt, processAndStoreHourlyData);

export default router;