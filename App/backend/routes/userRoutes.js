// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get a list of users
router.get('/', userController.listUsers);

// Additional user-related routes go here

module.exports = router;