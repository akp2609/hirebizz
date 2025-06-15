import express from 'express';
import requireAuth from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { requireSuperAdmin } from '../middleware/requireSuperAdmin.js';
import { assignUserRole, deleteUser, getAllJobs, getAllUsers, updateJobStatus } from '../controllers/adminController.js';
import { authLimiter } from '../utils/authLimiter.js';
const router = express.Router();

router.get('/get-all-users',requireAuth,requireAdmin,getAllUsers);

router.patch('/assign-role',requireAuth,requireSuperAdmin,authLimiter,assignUserRole);

router.get('/get-all-jobs',requireAuth,requireAdmin,getAllJobs)

router.post('/update-job-status',requireAuth,requireAdmin,updateJobStatus);

router.delete('/delete-user',requireAuth,requireAdmin,authLimiter,deleteUser);

export default router;