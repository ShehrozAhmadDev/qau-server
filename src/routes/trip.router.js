import express from "express";
const router = express.Router();

import {
  planTrip,
  generateOptimizePath,
} from "../controller/trip.controller.js";

import { verifyToken } from "../middleware/auth.js";

router.post("/tripplanning", verifyToken, planTrip);
router.post("/getPath", verifyToken, generateOptimizePath);

export default router;
