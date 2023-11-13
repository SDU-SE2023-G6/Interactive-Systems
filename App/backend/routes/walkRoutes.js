// backend/routes/walkRoutes.js
const express = require('express');
const router = express.Router();
const walkController = require('../controllers/walkController');
const verifyToken = require('../middleware/authMiddleware');

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

router.get('/protected', verifyToken, (req, res) => {
    res.send('Access to protected route.');
});

module.exports = router;
