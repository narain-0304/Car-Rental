import express from "express";
import authUser from "../middlewares/authUser.js";
import { createOrUpdateProfile, getMyProfile, verifyuser } from "../controller/profileController.js";
import upload from "../configs/Multer.js";


// Set up routes
const profileRouter = express.Router();


// Upload multiple fields (aadhar and license), each with 1 file
profileRouter.post(
  "/create-update",
  authUser,
  upload.fields([
    { name: "aadharFile", maxCount: 1 },
    { name: "licenseFile", maxCount: 1 }
  ]),
  createOrUpdateProfile
);


// Get logged-in user's profile
profileRouter.get("/me", authUser, getMyProfile);
profileRouter.get("/check-verified", authUser, verifyuser);

export default profileRouter;