import User from "../models/User.js";
import Job from "../models/Job.js";
import { get } from "mongoose";
import Application from "../models/Application.js";
import { deleteFromGCS } from "../utils/gcsUploader.js";
import Report from '../models/report.js';

export const assignUserRole = async (req, res) => {
    const { userId, newRole } = req.body;

    const allowedRole = ['candidate', 'employer', 'admin'];

    if (!allowedRole.includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role request' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: `Role updated to ${newRole}`,
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            }
        });
    }
    catch (err) {
        console.error('Role assignment error', err);
        res.status(500).json({ message: 'Failed to assign role' });
    }
}

export const getAllUsers = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find({}, 'name email profilePicture role').skip(skip).limit(limit).lean();

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            users,
            totalUsers,
            currentPage: page,
            totalPage: Math.ceil(totalUsers / limit),
        })
    }
    catch (err) {
        console.error('Failed to get all Users: ', err);
        res.status(500).json({ message: 'Failed to get all Users' });
    }
}

export const getAllJobs = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const jobs = await Job.find({}, 'title location').populate({
            path: 'company',
            select: 'name createdBy',
            populate: {
                path: 'createdBy',
                select: 'name email'
            }
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalJobs = await Job.countDocuments();

        res.status(200).json({
            jobs,
            totalJobs,
            page,
            totalTages: Math.ceil(totalJobs / limit)
        })
    }
    catch (err) {
        console.error('FAiled to get jobs', err);
        res.status(500).json({ message: 'Failed to get all jobs' });
    }
}

export const updateJobStatus = async (req, res) => {

    try {
        const { jobId, status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const job = await Job.findByIdAndUpdate(
            jobId,
            { status },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job status updated', job });

    } catch (err) {
        console.error('Failed to update job status');
        res.status(500).json({ message: 'Failed to update job status' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.resumeURL && user.objectName) {
            await deleteFromGCS(user.objectName);
        }

        await Job.deleteMany({ createdBy: userId });

        await Application.deleteMany({ applicant: userId });

        res.status(200).json({ message: 'User and related data deleted', userId });
    } catch (err) {
        console.error('Failed to delete user', err);
        res.status(500).json({ message: 'Server error deleting user' })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        return res.status(200).json({
            user
        })
    } catch (err) {
        console.error('Failed to get user', err);
        res.status(500).json({ message: 'Server error fetching user' })
    }
}

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const totalReports = await Report.countDocuments();

        res.status(200).json({
            totalUsers,
            totalJobs,
            totalApplications,
            totalReports,
        });
    } catch (err) {
        console.error("Failed to get admin stats", err);
        res.status(500).json({ message: "Failed to get stats" });
    }
};