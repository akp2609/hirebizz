import Report from '../models/report.js';
import User from '../models/User.js';

export const createReport = async(req,res)=>{
    try{
        const {targetType, targetId, reason, details} = req.body;
        const reporter = req.user._id;

        if (!['job', 'user'].includes(targetType)) {
              return res.status(400).json({ error: 'Invalid target type.' });
        }

        const report = await Report.create({ reporter, targetType, targetId, reason, details });
        res.status(200).json({ message: 'Report submitted successfully.', report });

    }
    catch(err){
        console.log('Failed to report: ',err);
        return res.status(500).json({message:'Failed to report',error:err.message});
    }
}

export const getAllReports = async(req,res)=>{
    try{
        const reports = await Report.find().populate('reporter', 'name email role').sort({ createdAt: -1 });
        res.status(200).json(reports);
    }
    catch(err){
        console.log('Failed to get reports',err);
        return res.status(500).json({message:'Failed to get reports',error:err.message});
    }
}

export const updateReportStatus = async(req,res)=>{
    try{
        const { reportId } = req.params;
        const { status } = req.body;

        if (!['pending', 'reviewed', 'dismissed'].includes(status)) {
           return res.status(400).json({ error: 'Invalid status value.' });
        }

        const updated = await Report.findByIdAndUpdate(reportId, { status }, { new: true });
        res.status(200).json({ message: 'Status updated.', report: updated });
    }
    catch(err){
        console.log('Failed to update report status',err);
        return res.status(500).json({message:'Failed to update report status',error:err.message});
    }
}