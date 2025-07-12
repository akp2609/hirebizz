import express from 'express';
import upload from '../middleware/multer.js';
import requireAuth from '../middleware/authMiddleware.js';
import { deleteResume, uploadResume,uploadProfilePic, saveJobs, getSavedJobs, relevantJobs, updateEmployerVerified, deleteSavedJobs, getUserProfile, updateUserProfile} from '../controllers/userController.js';
import uploadPDF from '../middleware/upload.js';
import { appendFile } from 'fs';
import { error } from 'console';
import { authLimiter } from '../utils/authLimiter.js';
import { getSignedUrl } from '../utils/gcsUploader.js';


const router = express.Router();

router.post('/upload-profile-pic',requireAuth,authLimiter,upload.single('image'),uploadProfilePic)

router.post('/upload-resume',requireAuth,authLimiter,uploadPDF.single('resume'),uploadResume);

router.delete('/delete-resume',requireAuth,deleteResume);

router.post('/:jobId/save-job',requireAuth,saveJobs);

router.get('/saved-jobs',requireAuth,getSavedJobs);

router.get('/relevant-jobs',requireAuth,relevantJobs);

router.post('/verify-employer',requireAuth,updateEmployerVerified)

router.delete('/saved-jobs/:jobId',requireAuth,deleteSavedJobs)

router.get('/get-profile',requireAuth,getUserProfile);

router.patch('/update-profile',requireAuth,updateUserProfile)

router.get('/resume',requireAuth,getSignedUrl)

export default router;