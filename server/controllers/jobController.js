import Job from "../models/Job.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
import OpenAI from "openai";

const client = new OpenAI();

export const createJob = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const { title, details, location, skills, compensation, companyName, companyLogo, companyWebsite } = req.body;

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

        const embeddingData = `${details}\nSkills required: ${skills.join(",")}`;

        const response = await client.embeddings.create({
            model: "text-embedding-3-small",
            input: embeddingData
        });

        console.log("✅ Embedding created for job");

        const embeddings = response.data[0].embedding;

        const job = await Job.create({
            title,
            details,
            location,
            skills,
            compensation,
            embeddings,
            company: company._id,
            createdBy: user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Job created succesfully',
            job
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
        const jobs = await Job.find().select('-embeddings');
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

export const setJobStatus = async (jobId, newStatus) => {
    try {

        if (!['not applied', 'applied'].includes(newStatus)) {
            throw new Error('Invalid status');
        }

        const job = await Job.findByIdAndUpdate({ _id: jobId }, { status: newStatus }, { new: true });

        if (!job) {
            throw new Error('job not found');
        }

        return job;
    } catch (err) {
        console.error('Failed to update job status', err);
    }
}

export const closeJob = async (jobId) => {
    try {

        const job = await Job.findByIdAndUpdate({ _id: jobId }, { isActive: false }, { new: true });

        if (!job) {
            throw new Error('job not found');
        }

        return job;
    }
    catch (err) {
        console.error('Failed to update job status', err);
    }
}

