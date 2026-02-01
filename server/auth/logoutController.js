const Session = require("../models/SessionModel");
const crypto = require("crypto");

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // אם אין Cookie – עדיין מחזירים 204
  if (refreshToken) {
    const hashedToken = hashToken(refreshToken);

    // מבטלים את ה-session ב-DB
    await Session.revokeByRefreshToken(hashedToken);
  }

  // מוחקים Cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  return res.sendStatus(204);
};
