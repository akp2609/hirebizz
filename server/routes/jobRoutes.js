import express from 'express';
import requireAuth, { isAuthenticated } from '../middleware/authMiddleware.js';
import { createJob, deleteJob, getAllJobs, getJobById } from '../controllers/jobController.js';
import { authLimiter } from '../utils/authLimiter.js';

const router = express.Router();

router.post("/create", isAuthenticated,authLimiter, createJob);

router.delete("/delete-job/:jobId",requireAuth,deleteJob);

router.get("/",getAllJobs);

router.get("/:jobId",getJobById);

export default router;