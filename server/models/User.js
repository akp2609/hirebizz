import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type:String,
    },
    authProvider:{
        type: String,
        enum: ["local","google","github"],
        default: "local"
    },
    providerId: {
        type:String
    },
    profilePicture:{
        type: String,
        default: 'https://res.cloudinary.com/dmcnrrfxo/image/upload/v1746279568/profile_pictures/mwtyy4ucuie3pvmjj3ay.jpg'
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ["candidate","employer"]
    },
    company:{
        name: String,
        website: String,
        logo: String
    },
},{timestamps:true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

export default mongoose.model('User',userSchema);