const express = require('express');
const router = express.Router();
const authController = require('./authController')
const refreshController = require('./refreshController');
const logoutController = require('./logoutController');
const registerController = require('./registerController');

router.post('/refresh', refreshController.refresh);
router.post("/login", authController.login);
router.post("/logout", logoutController.logout);
router.post("/register", registerController.register);
// router.get("/me", authMiddleware, me);

module.exports = router;