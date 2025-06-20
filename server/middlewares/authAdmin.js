import jwt from "jsonwebtoken";




//Middleware for authentication
const authAdmin = async(req, res, next)=>{
    const {adminToken} = req.cookies;
    if(!adminToken){
        return res.json({
            success: false,
            message: "Unauthorized"
        });
    }
    try{
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        if(decoded.email === process.env.ADMIN_EMAIL){
            next();
        }
        else{
            return res.json({
                success: false,
                message: "Unauthorized"
            });
        }
    }catch(err){
        return res.json({
            success: false,
            message: err.message
        });
    }
}


export default authAdmin;