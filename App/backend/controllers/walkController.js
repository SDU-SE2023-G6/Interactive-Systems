// backend/controllers/walkController.js
const Walk = require('../models/walkModel');

exports.listWalks = async (req, res) => {
  try {
    const walks = await Walk.find({}).populate('walkerId ownerId');
    res.json(walks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add additional controller methods as needed for CRUD operations