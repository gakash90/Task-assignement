import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, username, password: hash });
    const token = generateToken(user._id);
    res.status(201).json({ token, message:"Registered successfully" });
  } catch {
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ token });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};
