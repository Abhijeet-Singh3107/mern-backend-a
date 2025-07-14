import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "secret";

// ─────────────────────────────────────────────────────────────
// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
    const user = { name, email, role, password: hashedPass };

    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ─────────────────────────────────────────────────────────────
// User Login with JWT
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPass = await bcrypt.compare(password, existingUser.password);

    if (!matchPass) {
      return res.status(403).json({ message: "Wrong password: Access Denied" });
    }

    const userObj = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
    res.status(200).json({ user: userObj, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

// ─────────────────────────────────────────────────────────────
// Get a user by ID
const getUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findById(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to fetch user" });
  }
};

// ─────────────────────────────────────────────────────────────
// Update user by ID (handles password hashing if present)
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const result = await userModel.findByIdAndUpdate(id, updates, { new: true });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update user" });
  }
};

// ─────────────────────────────────────────────────────────────
// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// ─────────────────────────────────────────────────────────────
// Get paginated + filtered user list
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const filter = { firstName: { $regex: search, $options: "i" } };
    const count = await userModel.countDocuments(filter);
    const total = Math.ceil(count / limit);

    const users = await userModel
      .find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ updatedAt: -1 });

    res.status(200).json({ users, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// ─────────────────────────────────────────────────────────────
// Export functions
export {
  register,
  login,
  getUserProfile,
  updateUser,
  deleteUser,
  getUsers
};
