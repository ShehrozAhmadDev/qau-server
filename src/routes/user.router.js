import express from "express";
import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/Auth.js";

import {
  registerUser,
  loginUser,
  getUserProfile,
  editUser,
  deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

// Route to register a new user
router.post("/register", catchErrors(registerUser));

// Route to log in a user
router.post("/login", catchErrors(loginUser));

// Route to get the user profile
router.get("/profile", verifyToken, catchErrors(getUserProfile));

// Route to edit user profile
router.put("/:userId", verifyToken, catchErrors(editUser));

// Route to delete user profile
router.delete("/:userId", verifyToken, catchErrors(deleteUser));

export default router;