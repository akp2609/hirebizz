const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = new bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    }
    catch(err){
        console.error('Registration error: ',err);
        res.status(500).json({message:'server error'});
    }
}

const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn: '1h'});

        res.status(200).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    }catch(err){
        console.error('Login error:',err);
        res.status(500).json({message:'Server error'});
    }
}

module.exports = {
    registerUser,
    loginUser
};