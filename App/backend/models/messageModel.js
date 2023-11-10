// backend/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  // Add additional message fields as needed
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;