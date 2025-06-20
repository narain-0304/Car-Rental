import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  model: String,
  year: Number,
  type: String,
  fuelType: String,
  transmission: String,
  seats: Number,
  rentPerHour: Number,
  location: String,
  images: [String], // max 4 images
  bookedDates: [
    {
      from: Date,
      to: Date
    }
  ],
  rating: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });




const Car = mongoose.models.Car || mongoose.model("Car",carSchema)


export default Car;


