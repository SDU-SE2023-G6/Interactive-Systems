// backend/routes/walkRoutes.js
const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');

// Route to get a list of walks
router.get('/', walkController.listWalks);

// Create a new walk
router.post('/', walkController.createWalk);

// Retrieve a specific walk
router.get('/:walkId', walkController.getWalk);

// Update a specific walk
router.put('/:walkId', walkController.updateWalk);

// Delete a specific walk
router.delete('/:walkId', walkController.deleteWalk);

module.exports = router;
