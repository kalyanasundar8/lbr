import asyncHandler from "express-async-handler";
import Admin from "../models/AdminModel.js";
import { generateOTP } from "../services/OtpService.js";
import generateToken from "../services/TokenService.js";

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

export { adminSignup };
