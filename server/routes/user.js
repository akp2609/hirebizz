import express from 'express';
import upload from '../middleware/multer.js';
import requireAuth from '../middleware/authMiddleware.js';
import { deleteResume, uploadResume,uploadProfilePic, saveJobs, getSavedJobs, relevantJobs} from '../controllers/userController.js';
import uploadPDF from '../middleware/upload.js';
import { appendFile } from 'fs';
import { error } from 'console';


const router = express.Router();

router.post('/upload-profile-pic',requireAuth,upload.single('image'),uploadProfilePic)

router.post('/upload-resume',requireAuth,uploadPDF.single('resume'),uploadResume);

router.delete('/delete-resume',requireAuth,deleteResume);

router.post('/:jobId/save-job',requireAuth,saveJobs);

router.get('/saved-jobs',requireAuth,getSavedJobs);

router.get('/relevant-jobs',requireAuth,relevantJobs);

export default router;