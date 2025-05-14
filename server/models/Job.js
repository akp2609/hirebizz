import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt:{type:Date,default:Date.now},
});

export default mongoose.model("Job",jobSchema);