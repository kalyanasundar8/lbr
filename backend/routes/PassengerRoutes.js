import express from "express";
import { signinPassenger, signupPassenger, verifyOTP } from "../controllers/PassengerController.js";
import { protect } from "../middleware/AuthMiddlware.js";

const passengerRouter = express.Router();

passengerRouter.post("/", signupPassenger, protect);
passengerRouter.post("/verifyotp", verifyOTP, protect);
passengerRouter.post("/signin", signinPassenger, protect);

export default passengerRouter;