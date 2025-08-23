import mongoose from "mongoose";

const analyticsDataSchema = new mongoose.Schema({
    appDownloads: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    totalAndroidUsers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] },
    failedLoginAttempts: {
        type: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                ipaddress: String,
                reason:String,
                date: { type: Date, default: Date.now }
            }
        ], default: [
        ]
    },
    dailyStats: {
        type: [
            {
                date: { type: Date, default: Date.now },
                downloads: { type: Number, default: 0 },
                activeUsers: { type: Number, default: 0 }
            }
        ], default: []
    },
    monthlyStats: {
        type: [
            {
                year: Number,
                month: Number,
                downloads: { type: Number, default: 0 },
                activeUsers: { type: Number, default: 0 }
            }
        ], default: []
    },
    yearlyStats: {
        type: [
            {
                year: Number,
                downloads: { type: Number, default: 0 },
                activeUsers: { type: Number, default: 0 }
            }
        ], default: []
    },
    hourlyStats: {
        type: [
            {
                year: Number,
                month: Number, 
                day: Number,   
                hour: Number, 
                activeUsers: { type: Number, default: 0 },
                timestamp: { type: Date, default: Date.now }
            }
        ], default: []
    }

});

export default mongoose.model("AnalyticsData", analyticsDataSchema);
