// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to get a list of messages
router.get('/', messageController.listMessages);

// Create a new message
router.post('/', messageController.createMessage);

// Retrieve a specific message
router.get('/:messageId', messageController.getMessage);

// Update a specific message
router.put('/:messageId', messageController.updateMessage);

// Delete a specific message
router.delete('/:messageId', messageController.deleteMessage);

module.exports = router;
