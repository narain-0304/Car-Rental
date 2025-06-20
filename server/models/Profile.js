import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  dob: { type: Date },
  files: {
    aadharFile: { type: String }, // file path or URL
    licenseFile: { type: String },
  }
}, { timestamps: true });


const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);


export default Profile;


