import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id).select('-password'); // exclude password
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export const isAuthenticated = async (req,res,next)=>{

    const token = req.headers.authorization?.split(" ")[1];

    if(!token)return res.status(401).json({error: "Not uathenticated"});

    try{
       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       req.user = await User.findById(decoded.id);
       next(); 
    }catch(error){
        return res.status(401).json({error: 'Invalid token'});
    }
};

export default requireAuth;
