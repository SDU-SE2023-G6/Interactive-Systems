// backend/routes/walkRoutes.js
const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');

// Route to get a list of walks
router.get('/', walkController.listWalks);

// Additional walk-related routes go here

module.exports = router;