// backend/models/walkModel.js
const mongoose = require('mongoose');

const walkSchema = new mongoose.Schema({
  walkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true, min: 1 },
  location: { type: String, required: true },
  status: { type: String, required: true, enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], default: 'scheduled' },
  specialRequirements: { type: String, required: false }
});

const Walk = mongoose.model('Walk', walkSchema);
module.exports = Walk;
