const express = require('express');
const User = require('../models/userModel');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/protected', authController.verifyToken, authController.protectedRoute);

module.exports = router;
