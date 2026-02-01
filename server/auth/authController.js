const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful" });
};