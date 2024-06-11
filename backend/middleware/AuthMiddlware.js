import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from the header
            token = req.headers.authorization.split(" ")[1]

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SCRET);

            // Get the user from the token
            req.user = await User.findOne(decoded.id).select("-password");
            next();
        } catch (error) {
            console.log(error);
            res.status(400);
            throw new Error("Not authorized")
        }
    }

    if(!token) {
        res.status(400);
        throw new Error("Not authorized and no token");
    }
})

export { protect };