const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/authenticate.middleware');

// Register new user
router.post('/register', authController.register);
// Login user
router.post('/login', authController.login);
// Logout user
router.post('/logout', verifyToken, authController.logout);
// Send otp
router.post('/send-otp', authController.sendOtp);
// Set user active
router.post('/set-active', verifyToken, authController.setActive);
// Set user inactive
router.post('/set-inactive', verifyToken, authController.setInactive);
// Check username availability
router.get('/check-username', authController.checkUsername);
// Validate token
router.get('/validate', verifyToken, authController.validateToken);
// Verify email
router.post('/verify', authController.verifyEmail);

module.exports = router;
