const express = require('express');
const router = express.Router();
const authController = require('./authController')
const refreshController = require('./refreshController');
const logoutController = require('./logoutController');

router.post('/refresh', refreshController.refresh);
router.post("/login", authController.login);
router.post("/logout", logoutController.logout);
// router.get("/me", authMiddleware, me);

module.exports = router;