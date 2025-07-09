import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";      
const SECRET = "secret";
        // register function...
const register = async (req, res) => {
  const { name, email, role, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const user = {
    name,
    email,
    role,
    password: hashedPass,
  };
  const result = await userModel.create(user);
  res.status(201).json(result);
};

        // patch...
const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await userModel.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ message: "User updated successfully", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

        // show users
const showUsers = async (req, res) => {
  try {
    const result = await userModel.find();
    res.json({ result });
  } catch (err) {
    res.status(400).json({ message: "Some error..." });
  }
};

        // login function
const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found..." });
  }

  const matchPass = await bcrypt.compare(password, existingUser.password);
  if (matchPass) {
    const userObj = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
    res.status(200).json({ user: userObj, token });
  } else {
    res.status(403).json({ message: "Wrong password: Access Denied" });
  }
};


        // delete user
const userDelete =  async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully.", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

export {register, userUpdate, showUsers, login, userDelete};
