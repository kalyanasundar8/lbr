import asyncHandler from "express-async-handler";
import Bus from "../models/BusModel.js";
import Admin from "../models/AdminModel.js";

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
    await Admin.findByIdAndUpdate(companyId, { $push: { busList: bus._id } });
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

  const detailsExists = await Bus.findOne({ _id: id });

  if (detailsExists) {
    res.status(200).json({
      id: detailsExists._id,
      companyId: detailsExists.companyId,
      busName: detailsExists.busName,
      seatingCapacity: detailsExists.seatingCapacity,
      registrationNumber: detailsExists.registrationNumber,
      busNumber: detailsExists.busNumber,
    });
  } else {
    res.status(400).json({ mssg: "We coudn't find the bus details" });
  }
});

//! Get bus list
const busList = asyncHandler(async (req, res) => {
  
})

export { registerBus, getBusDetails };
