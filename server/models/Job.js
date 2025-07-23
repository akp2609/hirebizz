import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    skills: { type: [String], required: true },
    embeddings: [[Number]],
    compensation: Number,
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    status:{type:String, default: "Pending"}
});

export default mongoose.model("Job", jobSchema);