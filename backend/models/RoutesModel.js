import mongoose from "mongoose";

const routesSchema = new mongoose.Schema(
  {
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus"
    },
    from: {
      type: String,
      required: true,
    },
    pathWay: [{ type: String }],
    time: [{ type: String }],
    to: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BusRoutes = mongoose.model("busroute", routesSchema);
export default BusRoutes;
