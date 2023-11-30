// backend/controllers/userController.js
const User = require('../models/userModel');


// Get a list of walkers
exports.listWalkers = async (req, res) => {
    try {
        const walkers = await User.find({ isWalker: true });
        res.status(200).json({ walkers });
    } catch (error) {
        res.status(500).json({ error });
    }
};