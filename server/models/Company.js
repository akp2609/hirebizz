import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {type:String,required:true},
    website: String,
    logo: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

export default mongoose.model("Company",companySchema);