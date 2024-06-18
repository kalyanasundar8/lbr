import asyncHandler from "express-async-handler";
import BusRoutes from "../models/RoutesModel.js";

const addRoutes = asyncHandler(async (req, res) => {
  const { companyId, busId, from, pathWays, times, to } = req.body;
  let pathWay = pathWays.split(",");
  let time = times.split(",");

  //  Create a route
  const routes = await BusRoutes.create({
    companyId,
    busId,
    from,
    pathWay,
    time,
    to,
  });

  if (routes) {
    res.status(201).json({
      id: routes._id,
      companyId: routes.companyId,
      busId: routes.busId,
      from: routes.from,
      pathWay: routes.pathWay,
      time: routes.time,
      to: routes.to,
    });
  } else {
    res.status(400).json({ mssg: "Routes not created" });
  }
});

const getBusRoute = asyncHandler(async (req, res) => {
  const routeId = req.query.id;

  const routeExists = await BusRoutes.findOne({ _id: routeId });

  if (routeExists) {
    res.status(200).json({
      id: routeExists._id,
      companyId: routeExists.companyId,
      busId: routeExists.busId,
      from: routeExists.from,
      pathWays: routeExists.pathWay,
      time: routeExists.time,
      to: routeExists.to,
    });
  } else {
    res.status(400).json({ mssg: "Routes not exists" });
  }
});

export { addRoutes, getBusRoute };
