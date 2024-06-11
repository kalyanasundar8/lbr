import express from "express";
import { signinUser, signupUser, verifyOTP } from "../controllers/UserController.js";
import { protect } from "../middleware/AuthMiddlware.js";

const userRouter = express.Router();

userRouter.post("/", signupUser, protect);
userRouter.post("/verifyotp", verifyOTP, protect);
userRouter.post("/signin", signinUser, protect);

export default userRouter;