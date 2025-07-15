import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Job from "./Job.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    isEmailVerified:{
        type: Boolean
    },
    password: {
        type: String,
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    authProvider: {
        type: String,
        enum: ["local", "google", "github"],
        default: "local"
    },
    providerId: {
        type: String
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dmcnrrfxo/image/upload/v1746279568/profile_pictures/mwtyy4ucuie3pvmjj3ay.jpg'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["candidate", "employer", "admin", "superadmin"],
        default: 'candidate'
    },
    company: {
        name: String,
        website: String,
        logo: String
    },
    resumeURL: {
        type: String,
        default: null
    },
    objectName: {
        type: String,
        default: null
    },
    savedJobs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Job
        }],
        default: []
    }
}, { timestamps: true }, { collection: "users" });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export default mongoose.model('User', userSchema);