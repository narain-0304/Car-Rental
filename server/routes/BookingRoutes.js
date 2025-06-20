import express from "express";
import { createBooking, getAllBookings, getUserBookings } from "../controller/bookingController.js";
import authUser from "../middlewares/authUser.js";
import authAdmin from "../middlewares/authAdmin.js";

const Bookingroutes = express.Router();

Bookingroutes.post("/create", authUser, createBooking);
Bookingroutes.get("/mybookings", authUser, getUserBookings);
Bookingroutes.get("/allbookings", authAdmin, getAllBookings);
export default Bookingroutes;