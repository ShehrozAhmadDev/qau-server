import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

// Log in a user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Get the user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

//  Edit User
export const editUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password, regNo, department, phone } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.regNo = regNo;
    user.department = department;
    user.phone = phone;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
