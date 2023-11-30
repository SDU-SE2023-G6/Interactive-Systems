// backend/routes/walkRoutes.js
const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');
const verifyToken = require('../middleware/authMiddleware');

// Route to get a list of walks
router.get('/', walkController.listWalks);

// Create a new walk
router.post('/', walkController.createWalk);

// Update a specific walk
router.put('/:walkId', walkController.updateWalk);

module.exports = router;
