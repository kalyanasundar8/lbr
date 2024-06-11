import express from "express";
import { adminSignin, adminSignup, adminVerifyOtp } from "../controllers/AdminController.js";

const adminRoutes = express.Router();

adminRoutes.post("/", adminSignup);
adminRoutes.post("/verifyotp", adminVerifyOtp);
adminRoutes.post("/adminsignin", adminSignin);

export default adminRoutes;