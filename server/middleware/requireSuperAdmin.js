export const requireSuperAdmin = (req,res,next)=>{
    if(req.user?.role === 'superadmin'){
        return next();
    }
    return res.status(403).json({message: 'Superadmin access required'});
}