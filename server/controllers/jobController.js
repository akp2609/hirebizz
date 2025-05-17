import Job from "../models/Job.js";
import Company from "../models/Company.js";
import User from "../models/User.js";

export const createJob = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        const {title,details,location,companyName,companyLogo,companyWebsite} = req.body;

        let company = await Company.findOne({name: companyName});

        if(!company){
            company = await Company.create({
                name: companyName,
                logo: companyLogo,
                website: companyWebsite,
                createdBy: user._id
            });
        }

        if( user.company.name !== companyName || user.company.logo !== comapnyLogo || user.company.website !== companyWebsite){
            user.company = {
                name: companyName,
                logo: companyLogo,
                website: companyWebsite,
            };
            await user.save();
        }

        const job = await Job.create({
            title,
            details,
            location,
            company: company._id,
            createdBy: user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Job created succesfully',
            job
        })
    }catch(error){
        res.status(500).json({success: false,
            message: 'server error',
            error: error.message
        });
    }
}

