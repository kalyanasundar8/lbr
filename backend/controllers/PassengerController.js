import Passenger from "../models/PassengerModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateOTP } from "../services/OtpService.js";
import generateToken from "../services/TokenService.js";

//! Signup Passenger controller
const signupPassenger = asyncHandler(async (req, res) => {
  const { passengerName, mobileNumber } = req.body;

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  // Check mobile number exists
  const numberExists = await Passenger.findOne({ mobileNumber });

  // Otp
  const otp = generateOTP();

  if (numberExists === null) {
    // Create a Passenger
    const passenger = await Passenger.create({
      passengerName: passengerName,
      mobileNumber: mobileNumber,
      otp: otp,
      verified: false,
      signinOtp: null,
    });
    res.status(201).json({
      id: passenger._id,
      passengerName: passenger.passengerName,
      mobileNumber: passenger.mobileNumber,
      token: generateToken(passenger._id),
    });
  } else {
    res.status(400).json({ mssg: "Mobile number already exists" });
  }
});

//! Otp verification controller
const verifyOTP = asyncHandler(async (req, res) => {
  const { otp, token } = req.body;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const PassengerId = decoded.id;

  const PassengerExists = await Passenger.findOne({ _id: PassengerId });

  if (PassengerExists) {
    if (PassengerExists.otp === otp) {
      await Passenger.findOneAndUpdate(
        { _id: PassengerId },
        {
          verified: true,
        }
      );
      res.status(200).json({ mssg: "Verified sucessfuly" });
    } else if (PassengerExists.signinOtp === otp) {
      res.status(200).json({
        id: PassengerExists._id,
        PassengerName: PassengerExists.passengerName,
        mobileNumber: PassengerExists.mobileNumber,
        verified: PassengerExists.verified,
        token: generateToken(PassengerExists._id),
      });
    } else if (PassengerExists.otp !== otp) {
      res.status(400).json({ err: "Invalid OTP" });
    }
  }
});

//! Signin Passenger controller
const signinPassenger = asyncHandler(async (req, res) => {
  const { mobileNumber } = req.body;

  // Check mobile number format
  const mobFormat = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  const validMobNumber = mobFormat.test(mobileNumber);

  if (!validMobNumber) {
    res.status(400).json({ mssg: "Not a valid mobile number" });
  }

  // Check mobile number exists
  const numberExists = await Passenger.findOne({ mobileNumber });

  if (numberExists === null) {
    res
      .status(400)
      .json({ mssg: "Mobilenumber not exists please create an account " });
  } else if (numberExists.verified === false) {
    const otp = generateOTP();
    const passenger = await Passenger.findOneAndUpdate(
      { _id: numberExists.id },
      { $set: { otp: otp } },
      { new: true }
    );
    res.status(200).json({
      id: passenger._id,
      PassengerName: passenger.passengerName,
      mobileNumber: passenger.mobileNumber,
      token: generateToken(passenger._id),
      mssg: "We sent a OTP to you mobileNumber, Just verify and continue this account",
    });
  } else {
    const otp = generateOTP();
    const passenger = await Passenger.findOneAndUpdate(
      { _id: numberExists.id },
      { $set: { signinOtp: otp } },
      { new: true }
    );
    res.status(200).json({
      id: passenger._id,
      passengerName: passenger.passengerName,
      mobileNumber: passenger.mobileNumber,
      token: generateToken(passenger._id),
      mssg: "We sent a OTP to you mobileNumber",
    });
  }
});

export { signupPassenger, verifyOTP, signinPassenger };
