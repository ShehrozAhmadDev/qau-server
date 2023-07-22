import express from "express";
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controller/route.controller.js";
import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Create a new Route
router.post("/", verifyToken, catchErrors(createRoute));

// Get all Routes
router.get("", verifyToken, catchErrors(getAllRoutes));

// Get a specific Route by its ID
router.get("/:id", verifyToken, catchErrors(getRouteById));

// Update a specific Route by its ID
router.put("/:id", verifyToken, catchErrors(updateRoute));

// Delete a specific Route by its ID
router.delete("/:id", verifyToken, catchErrors(deleteRoute));

export default router;
