const express = require('express');
const router = express.Router();
const authController = require('./authController')

// router.post('/register', register);
router.post("/login", authController.login);
// router.post("/logout", logout);
// router.get("/me", authMiddleware, me);

module.exports = router;