import express from "express";

import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/Auth.js";

import {
  createUpdate,
  getAllUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
} from "../controller/update.controller.js";

const router = express.Router();

// Create a new Update
router.post("/", verifyToken, catchErrors(createUpdate));

// Get all Updates
router.get("", verifyToken, catchErrors(getAllUpdates));

// Get a specific Update by its ID
router.get("/:id", verifyToken, catchErrors(getUpdateById));

// Update a specific Update by its ID
router.put("/:id", verifyToken, catchErrors(updateUpdate));

// Delete a specific Update by its ID
router.delete("/:id", verifyToken, catchErrors(deleteUpdate));

export default router;
