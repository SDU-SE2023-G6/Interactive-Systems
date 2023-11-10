// backend/controllers/messageController.js
const Message = require('../models/messageModel');

exports.listMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).populate('senderId receiverId');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add additional controller methods as needed for CRUD operations