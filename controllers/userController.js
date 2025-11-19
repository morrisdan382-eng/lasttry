const User = require('../models/User');

// Example signup
exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Example login placeholder
exports.login = async (req, res) => {
  res.json({ message: "Login logic will go here" });
};
