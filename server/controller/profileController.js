import Profile from "../models/Profile.js";
// import cloudinary from "../configs/Cloudinary.js";
import {v2 as cloudinary} from "cloudinary";


// CREATE or UPDATE profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { phone, address, dob } = req.body;
    console.log(req.body, req.files);
    const files = {};
   
    // Upload Aadhar to Cloudinary
    if (req.files?.aadharFile) {
      const aadharBuffer = req.files.aadharFile[0].buffer;
      const aadharUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_uploads" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(aadharBuffer);
      });
      files.aadharFile = aadharUrl;
    }


    // Upload License to Cloudinary
    if (req.files?.licenseFile) {
      const licenseBuffer = req.files.licenseFile[0].buffer;
      const licenseUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_uploads" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(licenseBuffer);
      });
      files.licenseFile = licenseUrl;
    }


    // Find and update OR create a new profile
    let profile = await Profile.findOne({ userId });


    if (profile) {
      profile.phone = phone;
      profile.address = address;
      profile.dob = dob;
      if (files.aadharFile) profile.files.aadharFile = files.aadharFile;
      if (files.licenseFile) profile.files.licenseFile = files.licenseFile;
      await profile.save();
    } else {
      profile = await Profile.create({
        userId,
        phone,
        address,
        dob,
        files
      });
    }


    return res.status(200).json({
      success: true,
      profile: {
        ...profile.toObject(),
        aadharUrl: profile.files?.aadharFile || null,
        licenseUrl: profile.files?.licenseFile || null
      }
    });


  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile"
    });
  }
};


// GET logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from authUser middleware


    const profile = await Profile.findOne({ userId });


    if (!profile) {
      return res.status(200).json({ success: true, profile: null });
    }


    return res.status(200).json({
      success: true,
      profile: {
        ...profile.toObject(),
        aadharUrl: profile.files?.aadharFile || null,
        licenseUrl: profile.files?.licenseFile || null
      }
    });
  } catch (err) {
    console.error("Fetch profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};
export const verifyuser = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (
      !profile ||
      !profile.phone ||
      !profile.address ||
      !profile.dob ||
      !profile.files?.aadharFile ||
      !profile.files?.licenseFile
    ) {
      return res.status(200).json({ verified: false });
    }
    
    return res.status(200).json({ verified: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};