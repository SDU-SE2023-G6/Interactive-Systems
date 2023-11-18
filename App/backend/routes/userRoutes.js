// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// Route to get a list of users
router.get('/', userController.listUsers);

// Create a new user
router.post('/', userController.createUser);

// Retrieve a specific user
router.get('/:userId', userController.getUser);

// Update a specific user
router.put('/:userId', userController.updateUser);

// Delete a specific user
router.delete('/:userId', userController.deleteUser);

// Route to get a list of walkers
router.get('/walkers', userController.listWalkers);

router.get('/protected', verifyToken, (req, res) => {
    res.send('Access to protected route.');
});

module.exports = router;
