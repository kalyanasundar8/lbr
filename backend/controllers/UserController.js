import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateOTP } from "../services/OtpService.js";
import generateToken from "../services/TokenService.js";

//! Signup user controller
const signupUser = asyncHandler(async (req, res) => {
  const { userName, mobileNumber } = req.body;

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  // Check mobile number exists
  const numberExists = await User.findOne({ mobileNumber });

  // Otp
  const otp = generateOTP();

  if (numberExists === null) {
    // Create a user
    const user = await User.create({
      userName: userName,
      mobileNumber: mobileNumber,
      otp: otp,
      verified: false,
      signinOtp: null,
    });
    res.status(201).json({
      id: user._id,
      userName: user.userName,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ err: "Mobile number already exists" });
  }
});

//! Otp verification controller
const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, token } = req.body;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  const userExists = await User.findOne({ _id: userId });

  if (userExists) {
    if (userExists.otp === otp) {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          verified: true,
        }
      );
      res.status(200).json({ mssg: "Verified sucessfuly" });
    } else if (userExists.signinOtp === otp) {
      res.status(200).json({
        id: userExists._id,
        userName: userExists.userName,
        mobileNumber: userExists.mobileNumber,
        verified: userExists.verified,
        token: generateToken(userExists._id),
      });
    } else if (userExists.otp !== otp) {
      res.status(400).json({ err: "Invalid OTP" });
    }
  }
});

//! Signin user controller
const signinUser = asyncHandler(async (req, res) => {
  const { mobileNumber } = req.body;

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  // Check mobile number exists
  const numberExists = await User.findOne({ mobileNumber });

  if (numberExists === null) {
    res
      .status(400)
      .json({ mssg: "Mobilenumber not exists please create an account " });
  } else if (numberExists.verified === false) {
    const otp = generateOTP();
    const user = await User.findOneAndUpdate(
      { _id: numberExists.id },
      { $set: { otp: otp } },
      { new: true }
    );
    res.status(200).json({
      id: user._id,
      userName: user.userName,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
      mssg: "We sent a OTP to you mobileNumber, Just verify and continue this account",
    });
  } else {
    const otp = generateOTP();
    const user = await User.findOneAndUpdate(
      { _id: numberExists.id },
      { $set: { signinOtp: otp } },
      { new: true }
    );
    res.status(200).json({
      id: user._id,
      userName: user.userName,
      mobileNumber: user.mobileNumber,
      token: generateToken(user._id),
      mssg: "We sent a OTP to you mobileNumber",
    });
  }
});

export { signupUser, verifyOTP, signinUser };
