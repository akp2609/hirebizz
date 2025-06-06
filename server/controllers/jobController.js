import Job from "../models/Job.js";
import Company from "../models/Company.js";
import User from "../models/User.js";
import OpenAI from "openai";

const client = new OpenAI();

export const createJob = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        const {title,details,location,skills,companyName,companyLogo,companyWebsite} = req.body;

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

        const embeddingData = `${details}\nSkills required: ${skills.join(",")}`;

        const response = await client.embeddings.create({
            model: "text-embedding-3-small",
            input: embeddingData
        });

        console.log("✅ Embedding created for job");

        const embeddings = response.data[0].embedding;

        const job = await Job.create({
            title,
            details,
            location,
            skills,
            embeddings,
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

