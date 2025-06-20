import express from 'express';
import { AdminLogin, isAdminAuth, logoutAdmin } from '../controller/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter=express.Router()
adminRouter.post("/login", AdminLogin);
adminRouter.get("/is-auth",authAdmin, isAdminAuth);
adminRouter.get("/logout",authAdmin, logoutAdmin);

export default adminRouter;