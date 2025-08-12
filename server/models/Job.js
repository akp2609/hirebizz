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
    status: { type: String, default: "Pending" },

    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },

    weeklyStats: {                                     
        type: [
            {
                weekStart: Date,
                views: { type: Number, default: 0 },
                downloads: { type: Number, default: 0 }
            }
        ],
        default: []
    },
    monthlyStats: {                                    
        type: [
            {
                month: String, 
                views: { type: Number, default: 0 },
                downloads: { type: Number, default: 0 }
            }
        ],
        default: []
    }
});

export default mongoose.model("Job", jobSchema);