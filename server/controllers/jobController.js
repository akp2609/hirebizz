import Job from "../models/Job.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
import OpenAI from "openai";

const client = new OpenAI();

export const createJob = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const { title, description, location, skills, compensation, companyName, companyLogo, companyWebsite } = req.body;

        let company = await Company.findOne({ name: companyName });

        if (!company) {
            company = await Company.create({
                name: companyName,
                logo: companyLogo,
                website: companyWebsite,
                createdBy: user._id
            });
        }

        if (user.company.name !== companyName || user.company.logo !== companyLogo || user.company.website !== companyWebsite) {
            user.company = {
                name: companyName,
                logo: companyLogo,
                website: companyWebsite,
            };
            await user.save();
        }

        const embeddingData = `${description}\nSkills required: ${skills.join(",")}`;

        const response = await client.embeddings.create({
            model: "text-embedding-3-small",
            input: embeddingData
        });

        console.log("✅ Embedding created for job");

        const embeddings = response.data[0].embedding;

        const job = await Job.create({
            title,
            description,
            location,
            skills,
            compensation,
            embeddings,
            company: company._id,
            createdBy: user._id,
        });

        const jobData = await Job.findById(job._id).select('-embeddings').populate('company');

        res.status(201).json({
            success: true,
            message: 'Job created succesfully',
            jobData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        });
    }
}

export const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json('Job not found');
        }

        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this job' });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json('Job deleted successfully');
    }
    catch (err) {
        console.error('Failed to delete job: ', err);
        return res.status(500).json({ message: 'Failed to delete job', error: err.message });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const {
            location,
            skills,
            isActive,
            search,
            sortBy,
            minComp,
            maxComp
        } = req.query;

        const filter = {};


        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }


        if (skills) {
            const skillsArray = skills.split(',').map(s => s.trim());
            filter.skills = {
                $in: skillsArray.map(skill => new RegExp(skill, 'i'))
            };
        }

        if (typeof req.query.isActive !== 'undefined') {
            const isActiveStr = req.query.isActive.toLowerCase();
            if (isActiveStr === 'true') {
                filter.isActive = true;
            } else if (isActiveStr === 'false') {
                filter.isActive = false;
            }
        }


        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }


        if (minComp || maxComp) {
            filter.compensation = {};
            if (minComp) filter.compensation.$gte = Number(minComp);
            if (maxComp) filter.compensation.$lte = Number(maxComp);
        }


        let query = Job.find(filter).select('-embeddings').populate('company');


        if (sortBy === 'latest') {
            query = query.sort({ createdAt: -1 });
        } else if (sortBy === 'compensation') {
            query = query.sort({ compensation: -1 });
        }

        const jobs = await query;

        res.status(200).json({ success: true, jobs });
    }
    catch (err) {
        console.error('Failed to fetch jobs', err);
        return res.status(500).json({ message: 'Failed to fetch all jobs', error: err.message });
    }
}

export const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId).select('-embeddings');

        if (!job) {
            return res.status(404).json('Job not found');
        }

        return res.status(200).json({ success: true, job });
    }
    catch (err) {
        console.error('Failed to fetch job', err);
        return res.status(500).json({ message: 'Failed to fetch the job', error: err.message });
    }
}

export const closeJob = async (req,res) => {
    try {
        const {jobId} = req.params;
        const job = await Job.findByIdAndUpdate({ _id: jobId }, { isActive: false }, { new: true });

        if (!job) {
            throw new Error('job not found');
        }

        return res.status(200).json('Job closed succesfully');
    }
    catch (err) {
        console.error('Failed to update job status', err);
    }
}

export const getEmployerJob = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({message: 'Useer not found'});
        }
        const jobs = await Job.find({createdBy:req.user._id}).select('-embeddings').populate('company');

        if(!jobs){
            return res.status(401).json({message: 'No jobs by this user'});
        }

        return res.status(200).json({
            success: true,
            jobs
        });
    }catch(err){
        console.log('Failed to get employers job postings',err);
        return res.status(500).json({message: 'Failed to get employers jobs postings',error:err.message});
    }
}