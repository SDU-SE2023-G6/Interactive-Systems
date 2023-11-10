// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to get a list of reviews
router.get('/', reviewController.listReviews);

// Additional review-related routes go here

module.exports = router;