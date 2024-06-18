import express from "express";
import { addRoutes, getBusRoute } from "../controllers/BusRoutesController.js";

const pathWayRoute = express.Router();

pathWayRoute.post("/addRoute", addRoutes);
pathWayRoute.get("/getBusRoute", getBusRoute);

export default pathWayRoute;