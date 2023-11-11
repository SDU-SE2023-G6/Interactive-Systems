// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  isWalker: { type: Boolean, required: true, default: false },
  fullName: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: false },
  // Add additional user fields as needed
});

const User = mongoose.model('User', userSchema);
module.exports = User;
