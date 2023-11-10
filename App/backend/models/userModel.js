// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isWalker: { type: Boolean, required: true, default: false },
  // Add additional user fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;