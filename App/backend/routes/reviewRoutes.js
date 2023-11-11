// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to get a list of reviews
router.get('/', reviewController.listReviews);

// Create a new review
router.post('/', reviewController.createReview);

// Retrieve a specific review
router.get('/:reviewId', reviewController.getReview);

// Update a specific review
router.put('/:reviewId', reviewController.updateReview);

// Delete a specific review
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
