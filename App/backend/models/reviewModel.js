// backend/models/reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  walkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Walk', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: false },
  // Add additional review fields as needed
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;