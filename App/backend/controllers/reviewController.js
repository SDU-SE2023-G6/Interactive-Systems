// backend/controllers/reviewController.js
const Review = require('../models/reviewModel');

exports.listReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('walkId ownerId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add additional controller methods as needed for CRUD operations