const express = require('express');
const router = express.Router();
const walkerController = require('../controllers/walkerController');
const verifyToken = require('../middleware/authMiddleware');


// Route to get a list of walkers
router.get('/', walkerController.listWalkers);

module.exports = router;