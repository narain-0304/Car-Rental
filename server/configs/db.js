import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async()=>{
    try{
        mongoose.connection.on('connected', () => {
            console.log('Database connected');
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/rentro`);
    }catch(err){
        console.log(err.message);
    }
}

export default connectDb;