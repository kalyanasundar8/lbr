import asyncHandler from "express-async-handler";
import Admin from "../models/AdminModel.js";
import { generateOTP } from "../services/OtpService.js";
import generateToken from "../services/TokenService.js";
import jwt from "jsonwebtoken";

//! Signup
const adminSignup = asyncHandler(async (req, res) => {
  const { companyName, adminName, companyType, mobileNumber } = req.body;

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  // Check mobile number exists
  const numberExists = await Admin.findOne({ mobileNumber });

  // Otp
  const otp = generateOTP();

  if (numberExists === null) {
    // Create a user
    const admin = await Admin.create({
      companyName: companyName,
      adminName: adminName,
      companyType: companyType,
      mobileNumber: mobileNumber,
      otp: otp,
      verified: false,
      signinOtp: null,
    });
    res.status(201).json({
      id: admin._id,
      companyName: admin.companyName,
      adminName: admin.adminName,
      companyType: admin.companyType,
      mobileNumber: admin.mobileNumber,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ err: "Mobile number already exists" });
  }
});

//! Verify Otp
const adminVerifyOtp = asyncHandler(async (req, res) => {
  const { otp, token } = req.body;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const adminId = decoded.id;

  const userExists = await Admin.findOne({ _id: adminId });

  if (userExists) {
    if (userExists.otp === otp) {
      await Admin.findOneAndUpdate(
        { _id: adminId },
        {
          verified: true,
        }
      );
      res.status(200).json({ mssg: "Verified sucessfuly" });
    } else if (userExists.signinOtp === otp) {
      res.status(200).json({
        id: userExists._id,
        companyName: userExists.companyName,
        adminName: userExists.adminName,
        companyType: userExists.companyType,
        mobileNumber: userExists.mobileNumber,
        verified: userExists.verified,
        token: generateToken(userExists._id),
      });
    } else if (userExists.otp !== otp) {
      res.status(400).json({ err: "Invalid OTP" });
    }
  }
});

//! SignIn
const adminSignin = asyncHandler(async (req, res) => {
  const { mobileNumber } = req.body;

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  // Check mobile number exists
  const numberExists = await Admin.findOne({ mobileNumber });

  if (numberExists === null) {
    res
      .status(400)
      .json({ mssg: "Mobilenumber not exists please create an account " });
  } else if (numberExists.verified === false) {
    const otp = generateOTP();
    const admin = await Admin.findOneAndUpdate(
      { _id: numberExists.id },
      { $set: { otp: otp } },
      { new: true }
    );
    res.status(200).json({
      id: admin._id,
      companyName: admin.companyName,
      adminName: admin.adminName,
      companyType: admin.companyType,
      mobileNumber: admin.mobileNumber,
      token: generateToken(admin._id),
      mssg: "We sent a OTP to you mobileNumber, Just verify and continue this account",
    });
  } else {
    const otp = generateOTP();
    const admin = await Admin.findOneAndUpdate(
      { _id: numberExists.id },
      { $set: { signinOtp: otp } },
      { new: true }
    );
    res.status(200).json({
      id: admin._id,
      companyName: admin.companyName,
      adminName: admin.adminName,
      companyType: admin.companyType,
      mobileNumber: admin.mobileNumber,
      token: generateToken(admin._id),
      mssg: "We sent a OTP to you mobileNumber",
    });
  }
});

export { adminSignup, adminVerifyOtp, adminSignin };
