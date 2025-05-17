import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { uploadToGCS } from "../utils/gcsUploader.js";


export const applyToJob = async (req,res)=>{
    try{
        const {resumeURL,coverLetter} = req.body;
        const jobId = req.params.jobId;
        const userId = req.user._id;

        const existing = await Application.findOne({job: jobId, applicant: userId});

        if(existing)return res.status(400).json({message: 'Already applied to this job'});


        const application = await Application.create({
            job: jobId,
            applicant: userId,
            resumeURL,
            coverLetter
        });

        res.status(201).json({message: 'Application submitted', application});
    }catch(err){
        res.status(500).json({message: 'Error applying to job',error: err.message || err.toString()});
    }
};

export const getJobApplications = async (req,res)=>{
    try{
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if(!job) return res.status(404).json({message: 'Job not found'});

        if(job.postedBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Access denied'});
        }

        const applications = await Application.find({job: jobId}).populate('applicant','name','email').sort({appliedAt: -1});

        res.status(200).json(applications);

    }catch(err){
        res.status(500).json({message: 'Error fetching applications',error: err.message});
    }
};

const withdrawApplication = async(req,res)=>{
    
}