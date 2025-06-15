export const requireAdmin = (req,res,next)=>{
    const userRole = req.user?.role;
    if(userRole === 'admin' || userRole === 'superadmin'){
        return next();
    }
    return res.status(403).json({message: 'Admin access required'});
}