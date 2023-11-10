// backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route to get a list of messages
router.get('/', messageController.listMessages);

// Additional message-related routes go here

module.exports = router;