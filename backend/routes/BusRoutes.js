import express from "express";
import { getBusDetails, registerBus } from "../controllers/BusController.js";

const busRoute = express.Router();

busRoute.post("/", registerBus);
busRoute.get("/getBusDetails", getBusDetails);

export default busRoute;