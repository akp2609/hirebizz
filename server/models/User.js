const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ["candidate","employer"]
    }
},{timestamps:true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports = mongoose.model('User',userSchema);