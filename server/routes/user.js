import express from 'express';
import upload from '../middleware/multer.js';
import requireAuth from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/upload-profile-pic',requireAuth,upload.single('image'),async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {profilePicture: req.file.path},
            {new: true}
        );
        res.json({message: 'Profile picture uploaded', url: user.profilePicture})
    }catch(err){
        res.status(500).json({error:'Something went wrong'});
    }
})

export default router;