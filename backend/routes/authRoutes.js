const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController')
const {authenticate, authorize}  = require('../middleware/authMiddleware')

router.post('/login',authController.login)
router.post('/verify-otp',authController.verifyOtp)
router.post('/send-otp',authController.sendOtp)
router.post('/signup',authController.createUser)
router.post('/reset-password',authController.passwordReset)
router.patch('/logout',authenticate, authController.logout)

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser); 



module.exports = router