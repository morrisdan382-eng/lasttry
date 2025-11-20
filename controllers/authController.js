// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Case-insensitive email match + flexible role mapping
    const query = { email: { $regex: new RegExp(`^${email}$`, "i") } };
    if (role) {
      // Map frontend "client" to backend "user"
      query.role = role.toLowerCase() === "client" ? "user" : role.toLowerCase();
    }

    const user = await User.findOne(query);

    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // JWT token generation
    const secret = process.env.JWT_SECRET || "devsecret"; // fallback for testing
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "7d" });

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
