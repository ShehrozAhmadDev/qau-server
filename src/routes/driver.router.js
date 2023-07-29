import express from "express";
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  deleteDriver,
  updateDriver,
} from "../controller/driver.controller.js";
import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new Driver
router.post("/", verifyToken, catchErrors(createDriver));

// Get all Drivers
router.get("/", verifyToken, catchErrors(getAllDrivers));

// Get a specific Driver by its ID
router.get("/:id", verifyToken, catchErrors(getDriverById));

// Update a specific Driver by its ID
router.put("/:id", verifyToken, catchErrors(updateDriver));

// Delete a specific Driver by its ID
router.delete("/:id", verifyToken, catchErrors(deleteDriver));

export default router;
