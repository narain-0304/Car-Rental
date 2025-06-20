import {v2 as cloudinary} from "cloudinary";


const connectCloudinary = async()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    try {
        await cloudinary.api.ping();
        console.log('Cloudinary connected successfully');
      } catch (error) {
        console.error('Cloudinary connection failed:', error.message);
      }
}


export default connectCloudinary;