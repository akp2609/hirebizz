import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const requireAuth = async (req, res, next) => {
    console.log("Authorization Header: " ,req.headers.authorization);
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - No token' });
  }

  const token = authorization.split(' ')[1];
  console.log("Extracted Token ",token)
  console.log("JWT_SECRET: ",process.env.JWT_SECRET)
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id).select('-password'); // exclude password
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export default requireAuth;
