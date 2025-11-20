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
