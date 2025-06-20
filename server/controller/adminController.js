import jwt from "jsonwebtoken";
import "dotenv/config";


//Login User : /api/user/login
export const AdminLogin = async(req,res)=>{
    try {
    const {email,password} = req.body;
    if(password === process.env.ADMIN_PASSWORD && email === process.env.ADMIN_EMAIL){
        const token = jwt.sign({email},process.env.JWT_SECRET , {expiresIn: "7d"});
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        });
       
        return res.json({
            success: true,
            message: "Admin logged in successfully",
        });
    }
    else{
        return res.json({
            success: false,
            message: "Invalid Email or Password"
        });
    }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

// check auth: /api/admin/is-auth
export const isAdminAuth = async (req, res) => {
  try {
    return res.json({
      success: true
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//Logout User : /api/user/logout
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
    });
    return res.json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};