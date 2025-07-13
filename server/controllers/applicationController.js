import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { uploadToGCS } from "../utils/gcsUploader.js";
import { setJobStatus } from "./jobController.js";


export const applyToJob = async (req, res) => {
    try {
        const { coverLetter } = req.body;
        const jobId = req.params.jobId;
        const userId = req.user._id;

        const existing = await Application.findOne({ job: jobId, applicant: userId });

        if (existing) return res.status(400).json({ message: 'Already applied to this job' });

        const user = await User.findById(userId).select('-password');
        if (!user || !user.resumeURL) {
            return res.status(400).json({ message: "No resume found. Please upload your resume first." });
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId,
            resumeObject: user.objectName,
            coverLetter
        });

        setJobStatus(jobId, 'applied');

        res.status(201).json({ message: 'Application submitted', application });
    } catch (err) {
        res.status(500).json({ message: 'Error applying to job', error: err.message || err.toString() });
    }
};

export const getJobApplication = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if (!job) return res.status(404).json({ message: 'Job not found' });

        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const applications = await Application.find({ job: jobId }).populate('applicant', 'name email').sort({ appliedAt: -1 });

        res.status(200).json(applications);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching applications', error: err.message });
    }
};

export const withdrawApplication = async (req, res) => {
    try {
        const appId = req.params.appId;

        const application = await Application.findOneAndDelete(appId);

        if (!application) {
            return res.status(404).json({ message: "Application not found or already withdrawn" });
        }

        res.status(200).json({ message: "Application withdrawn successfully" });

    } catch (err) {
        console.log('Failed to withdraw application', err);
        res.status(500).json({ message: "Failed to withdraw application", error: err.message });
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { appId } = req.params;

        const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const application = await Application.findById(appId).populate('job');

        if (!application) return res.status(404).json({ message: 'Application not found' });

        if (application.job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized: Not the job poster' });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ message: 'Application status updated', application });
    }
    catch (err) {
        console.log('Failed to update application status', err);
        res.status(500).json({ message: 'Failed to update application status', error: err.message });
    }
}

export const getMyApplications = async (req, res) => {
    try {
        const { search = "", sortBy = "appliedAt", order = "desc" } = req.query;

        const sortOptions = {};
        sortOptions[sortBy] = order === "asc" ? 1 : -1;

        const searchRegex = new RegExp(search, "i");

        const applications = await Application.find({ applicant: req.user._id })
            .populate({
                path: 'job',
                match: { title: searchRegex },
                select: 'title company',
                populate: { path: 'company', select: 'name' }
            })
            .populate({
                path: 'applicant',
                select: 'name email profileImage'
            })
            .sort(sortOptions);

        const filtered = applications.filter(app =>
            app.coverLetter?.toLowerCase().includes(search.toLowerCase()) ||
            app.job !== null
        );


        res.status(200).json(filtered);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch your applications', error: err.message });
    }
};

export const getAssociatedApplications = async (req, res) => {
    try {
        const { jobId } = req.params;

        const applications = await Application.find({ job: jobId })
            .populate('applicant', 'name email resumeURL')
            .sort({ appliedAt: -1 });

        res.status(200).json({ success: true, applications: applications });
    }
    catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const refreshResumeUrlApplications = async (req, res) => {
    try {
        const application = await Application.findById(req.params.applicationId).lean();
        if (!application) return res.status(404).json({ message: "Application not found" });

        const resumePath = application.resumePath;
        if (!resumePath) return res.status(400).json({ message: "No resume path stored in this application" });

        const [signedUrl] = await storage
            .bucket(process.env.RESUME_BUCKET_NAME)
            .file(resumePath)
            .getSignedUrl({
                version: "v4",
                action: "read",
                expires: Date.now() + 5 * 60 * 1000,
            });

        res.status(200).json({ url: signedUrl });
    } catch (error) {
        res.status(500).json({ message: "Failed to generate signed URL", error: err.message });
    }
}