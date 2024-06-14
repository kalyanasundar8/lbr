import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    busList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bus" }],
    otp: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
    signinOtp: {
      type: String,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
