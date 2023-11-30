// backend/controllers/walkController.js
const Walk = require('../models/walkModel');

exports.listWalks = async (req, res) => {
  try {
    const walks = await Walk.find({});
    res.json(walks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new walk
exports.createWalk = async (req, res) => {
  try {
    const newWalk = new Walk(req.body);
    await newWalk.save();
    console.log(newWalk);
    res.status(201).json(newWalk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a specific walk
exports.updateWalk = async (req, res) => {
  try {
    const updatedWalk = await Walk.findByIdAndUpdate(req.params.walkId, req.body, { new: true });
    if (!updatedWalk) {
      return res.status(404).json({ message: 'Walk not found' });
    }
    res.json(updatedWalk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
