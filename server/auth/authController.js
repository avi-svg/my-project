const jwt = require("jsonwebtoken");
const Session = require("../models/SessionModel");
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

  // 🔑 Access Token (קצר)
  const accessToken = createAccessToken(user.id);

  // 🔁 Refresh Token (ארוך)
  const refreshToken = createRefreshToken();
  const hashedRefresh = hashToken(refreshToken);

  // 💾 שמירה ב-DB
  await Session.create({
    user_id: user.id,
    refresh_token_hash: hashedRefresh,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    is_revoked: false,
    user_agent: req.headers["user-agent"]
  });

  // 🍪 Cookie מאובטח
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  // 🔁 Access חוזר ללקוח
  res.json({
    accessToken,
    user: {
      id: user.id,
      email: user.email
    }
  });
};
