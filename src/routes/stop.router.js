import express from "express";
import {
  createStop,
  getAllStops,
  getStopById,
  updateStop,
  deleteStop,
} from "../controller/stop.controller.js";
import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new Stop
router.post("/", verifyToken, catchErrors(createStop));

// Get all Stops
router.get("/", verifyToken, catchErrors(getAllStops));

// Get a specific Stop by its ID
router.get("/:id", verifyToken, catchErrors(getStopById));

// Update a specific Stop by its ID
router.put("/:id", verifyToken, catchErrors(updateStop));

// Delete a specific Stop by its ID
router.delete("/:id", verifyToken, catchErrors(deleteStop));

export default router;
