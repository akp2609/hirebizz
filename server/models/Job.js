import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    company: {type: mongoose.Schema.Types.ObjectId, ref: "Company"},
    skills: {type:[String],required:true},
    embeddings: [[Number]],
    compensation:Number,
    status:{
        type:String,
        enum:['not applied','applied'],
        default:'not applied'
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt:{type:Date,default:Date.now},
});

export default mongoose.model("Job",jobSchema);