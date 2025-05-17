import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {type: mongoose.Schema.Types.ObjectId, 
        ref:"Job", 
        required: true},
    applicant: {type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true},
    resumeURL: {type:String,
        required:true},
    coverLetter:{type:String,
        required:true},
    status: {type:String,enum: ['pending','reviewed','accepted','rejected'],default:'pending'},
    appliedAt: {type: Date, default: Date.now},
});

export default mongoose.model("Application",applicationSchema);