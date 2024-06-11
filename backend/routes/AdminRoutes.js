import express from "express";
import { adminSignup } from "../controllers/AdminController.js";

const adminRoutes = express.Router();

adminRoutes.post("/", adminSignup);

export default adminRoutes;