import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
  addCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getAvailableCars
} from "../controller/carController.js";
import carImageUpload from "../configs/carmulter.js";

const carRoutes = express.Router();

carRoutes.post("/addcar", authAdmin, carImageUpload.array("carImages", 4), addCar);
carRoutes.get("/", getAllCars);
carRoutes.get("/available", getAvailableCars); 
carRoutes.get("/:id", getCarById);
carRoutes.put("/:id", authAdmin, carImageUpload.array("carImages", 4), updateCar);
carRoutes.delete("/:id", authAdmin, deleteCar);

export default carRoutes;
