import express from "express";
import {
  register,
  login,
  getUserProfile,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get user profile by ID
router.get("/user/:id", getUserProfile);

// Update user by ID (PUT for full update, supports password hash)
router.put("/user/:id", updateUser);

// Delete user by ID
router.delete("/user/:id", deleteUser);

// Get all users (with pagination & search)
router.get("/users", getUsers);

export default router;
