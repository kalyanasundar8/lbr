import asyncHandler from "express-async-handler";
import Bus from "../models/BusModel.js";

//! Register a bus
const registerBus = asyncHandler(async (req, res) => {
  const { companyId, busName, seatingCapacity, registrationNumber, busNumber } =
    req.body;

  if (!busName || !seatingCapacity || !registrationNumber) {
    res.status(400).json({ mssg: "Please enter all the fields" });
  }

  const registrationNumberExists = await Bus.findOne({ registrationNumber });
  if (registrationNumberExists === null) {
    const bus = await Bus.create({
      companyId,
      busName,
      seatingCapacity,
      registrationNumber,
      busNumber,
    });
    res.status(201).json({
      id: bus._id,
      companyId: bus.companyId,
      busName: bus.busName,
      seatingCapacity: bus.seatingCapacity,
      registrationNumber: bus.registrationNumber,
      busNumber: bus.busNumber,
    });
  } else {
    res.status(400).json({ mssg: "The registration number already exists " });
  }
});

//! Get bus details
const getBusDetails = asyncHandler(async (req, res) => {
    const id = req.query.id;
    console.log(id);
})

export { registerBus, getBusDetails };
