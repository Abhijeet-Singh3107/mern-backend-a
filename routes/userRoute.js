import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
const ROUTER = express.Router();
import {register, userUpdate, showUsers, login, userDelete} from "../controllers/userController.js";
// GET all users (Admin only)
ROUTER.get("/users", authenticate, authorize("Admin"), showUsers);

// REGISTER
ROUTER.post("/register", register);

// LOGIN
ROUTER.post("/login", login);

// PATCH (Update user)
ROUTER.patch("/:id", authenticate, authorize("Admin"), userUpdate);

// DELETE
ROUTER.delete("/:id", authenticate, authorize("Admin"), userDelete);

export default ROUTER;
