import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    signinOtp: {
      type: String,
    }
  },
  { timestamps: true }
);

const Passenger = mongoose.model("passenger", passengerSchema);
export default Passenger;
