import express from "express"
import dotenv from "dotenv"
dotenv.config()
import parser from "body-parser"
import passengerRouter from "./routes/PassengerRoutes.js";
import dbConn from "./config/dbConnection.js";
import adminRoutes from "./routes/AdminRoutes.js";
import busRoute from "./routes/BusRoutes.js";
import pathWayRoute from "./routes/Bus.Routes.js";

// App
const app = express();

// DB connection
dbConn();

// Port
const port = process.env.PORT;

// Middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Routers
app.use("/api/passengers", passengerRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/bus", busRoute);
app.use("/api/pathWays", pathWayRoute);

// Server
app.listen(port, () => {
    console.log(`Server listening port ${port}`)
})