import mongoose, { Schema } from "mongoose";

const busSchema = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    busName: {
      type: String,
      required: true,
    },
    seatingCapacity: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    busNumber: {
      type: String,
    },
    busRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusRoutes" }],
    rating: {
      type: String,
    },
  },
  { timestamps: true }
);

const Bus = mongoose.model("bus", busSchema);
export default Bus;
