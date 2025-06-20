import Car from "../models/Car.js";


// CREATE a new car
export const addCar = async (req, res) => {
  try {
    const {
      name, brand, model, year, type,
      fuelType, transmission, seats,
      rentPerHour, location
    } = req.body;
    console.log(req.body);
    console.log(req.files);
    

    const imageUrls = req.files.map(file => file.path); // from cloudinary


    const car = new Car({
      name, brand, model, year, type,
      fuelType, transmission, seats,
      rentPerHour, location,
      images: imageUrls,
    });
   
    await car.save();
    res.status(201).json({ success: true, message: "Car added successfully"});
  } catch (err) {
    console.error("Add Car Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getAvailableCars = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    console.log(req.query);
    
    
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "checkIn and checkOut required" });
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const allCars = await Car.find();
    
    const availableCars = allCars.filter((car) => {
      return !car.bookedDates.some((booking) => {
        const from = new Date(booking.from);
        const to = new Date(booking.to);
        return checkInDate < to && checkOutDate > from;
      });
    });
    
    res.status(200).json({ cars: availableCars });
  } catch (err) {
    console.error("Error getting available cars", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ success: true, cars });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch cars" });
  }
};


// GET single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });
    res.status(200).json({ success: true, car });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching car" });
  }
};


// UPDATE car
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });


    const {
      name, brand, model, year, type,
      fuelType, transmission, seats,
      rentPerHour, location
    } = req.body;
   
    if (req.files.length > 0) {
      const imageUrls = req.files.map(file => file.path);
      car.images = imageUrls;
    }
   
    Object.assign(car, {
      name, brand, model, year, type,
      fuelType, transmission, seats,
      rentPerHour, location,
    });


    await car.save();
    res.status(200).json({ success: true, car });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};


// DELETE car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: "Car not found" });
    res.status(200).json({ success: true, message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete error" });
  }
};
