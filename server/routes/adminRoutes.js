import express from 'express';
import requireAuth from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { requireSuperAdmin } from '../middleware/requireSuperAdmin.js';
import { assignUserRole, deleteUser, getAdminStats, getAllJobs, getAllUsers, getUserById, updateJobStatus } from '../controllers/adminController.js';
import { authLimiter } from '../utils/authLimiter.js';
const router = express.Router();

router.get('/get-all-users',requireAuth,requireAdmin,getAllUsers);

router.patch('/assign-role',requireAuth,requireSuperAdmin,authLimiter,assignUserRole);

router.get('/get-all-jobs',requireAuth,requireAdmin,getAllJobs)

router.patch('/update-job-status',requireAuth,requireAdmin,updateJobStatus);

router.delete('/delete-user',requireAuth,requireAdmin,authLimiter,deleteUser);

router.get('/get-user/:userId',requireAuth,requireAdmin,getUserById);

router.get('/stats',requireAuth,requireAdmin,getAdminStats)

export default router;