import express from "express";
import { isAuth, loginUser, logoutUser, registerUser } from "../controller/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();


userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/is-auth",authUser, isAuth);
userRouter.get("/logout",authUser, logoutUser);


export default userRouter;