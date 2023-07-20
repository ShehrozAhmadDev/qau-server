import express from "express";
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from "../controller/schedule.controller.js";
import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/Auth.js";

const router = express.Router();

// Create a new Schedule
router.post("/", verifyToken, catchErrors(createSchedule));

// Get all Schedules
router.get("/", verifyToken, catchErrors(getAllSchedules));

// Get a specific Schedule by its ID
router.get("/:id", verifyToken, catchErrors(getScheduleById));

// Update a specific Schedule by its ID
router.put("/:id", verifyToken, catchErrors(updateSchedule));

// Delete a specific Schedule by its ID
router.delete("/:id", verifyToken, catchErrors(deleteSchedule));

// // Route to get all bus schedules
// router.get("/scheduling/buses", schedulingController.getAllBusSchedules);

// // Route to get all driver schedules
// router.get("/scheduling/drivers", schedulingController.getAllDriverSchedules);

// // Route to schedule a bus
// router.post("/scheduling/buses", schedulingController.scheduleBus);

// // Route to schedule a driver
// router.post("/scheduling/drivers", schedulingController.scheduleDriver);
export default router;
