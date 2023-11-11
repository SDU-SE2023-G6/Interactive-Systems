// backend/models/walkModel.js
const mongoose = require('mongoose');

const walkSchema = new mongoose.Schema({
  walkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true, min: 1 },
  location: { type: String, required: true },
  // Add additional walk fields as needed
});

const Walk = mongoose.model('Walk', walkSchema);
module.exports = Walk;
