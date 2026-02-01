const Session = require("../models/SessionModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createAccessToken = (userId) =>
  jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const createRefreshToken = () =>
  crypto.randomBytes(64).toString("hex");



exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // 1. אין Cookie → אין ריענון
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const hashedToken = hashToken(refreshToken);

  // 2. חיפוש Session ב-DB
  const session = await Session.findByRefreshToken(hashedToken);

  if (!session) {
    // טוקן ישן / גנוב / מבוטל
    return res.sendStatus(401);
  }

  // 3. בדיקת תוקף
  if (new Date(session.expires_at) < new Date()) {
    await Session.revokeById(session.id);
    return res.sendStatus(401);
  }

  // 4. 🔁 ROTATION
  const newRefreshToken = createRefreshToken();
  const newHashedToken = hashToken(newRefreshToken);

  await Session.rotateToken(session.id, newHashedToken);

  // 5. יצירת Access Token חדש
  const accessToken = createAccessToken(session.user_id);

  // 6. עדכון Cookie
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  // 7. החזרת Access Token
  res.json({ accessToken });
};
