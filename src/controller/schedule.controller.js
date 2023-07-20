// const BusSchedule = require('../models/BusSchedule');
// const DriverSchedule = require('../models/DriverSchedule');
import Schedule from "../models/Schedule.js";

// // Get all bus schedules
// exports.getAllBusSchedules = async (req, res, next) => {
//   try {
//     const busSchedules = await BusSchedule.find();
//     res.json(busSchedules);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all driver schedules
// exports.getAllDriverSchedules = async (req, res, next) => {
//   try {
//     const driverSchedules = await DriverSchedule.find();
//     res.json(driverSchedules);
//   } catch (error) {
//     next(error);
//   }
// };

// // Schedule a bus
// exports.scheduleBus = async (req, res, next) => {
//   try {
//     const { busNumber, departureTime, arrivalTime } = req.body;

//     const busSchedule = new BusSchedule({
//       busNumber,
//       departureTime,
//       arrivalTime
//     });

//     await busSchedule.save();

//     res.json({ message: 'Bus scheduled successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

// // Schedule a driver
// exports.scheduleDriver = async (req, res, next) => {
//   try {
//     const { driverName, shiftStart, shiftEnd } = req.body;

//     const driverSchedule = new DriverSchedule({
//       driverName,
//       shiftStart,
//       shiftEnd
//     });

//     await driverSchedule.save();

//     res.json({ message: 'Driver scheduled successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

// Create a new Schedule
const createSchedule = async (req, res) => {
  try {
    const { name, route, startTime, endTime, createdBy } = req.body;
    const newSchedule = new Schedule({
      name,
      route,
      startTime,
      endTime,
      createdBy,
    });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate({
        path: "route",
        populate: {
          path: "stops", // Assuming "stops" is the field containing the stops in the "route" schema
        },
      })
      .populate("createdBy");

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Schedule by its ID
const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findById(id)
      .populate("route")
      .populate("createdBy");
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Schedule by its ID
const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, route, startTime, endTime, createdBy } = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { name, route, startTime, endTime, createdBy },
      { new: true }
    )
      .populate("route")
      .populate("createdBy");
    if (!updatedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Schedule by its ID
const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await Schedule.findByIdAndRemove(id);
    if (!deletedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
