import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==================== SIGNUP ====================
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists (case-insensitive)
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    // Step 1: Find user by email (case-insensitive)
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Step 2: Validate role matches database
    if (role.toLowerCase() !== user.role) {
      return res.status(400).json({ message: "User not found" });
    }

    // Step 3: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // Step 4: Generate JWT token
    const secret = process.env.JWT_SECRET || "devsecret";
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "7d" });

    // Step 5: Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
