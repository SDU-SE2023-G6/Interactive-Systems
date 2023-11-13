const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const verifyToken = require('../middleware/authMiddleware');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    } catch (error) {
        res.status(500).send({ message: "Error logging in", error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, fullName, username } = req.body;
        const user = new User({
            email: email,
            password: password,
            fullName: fullName,
            username: username
        });
        await user.save();
        res.status(201).send({ message: "User registered successfully", user: user });
    } catch (error) {
        res.status(500).send({ message: "Error registering user", error: error.message });
    }
};

exports.protectedRoute = (req, res) => {
    res.send('Access to protected route.');
};

exports.verifyToken = verifyToken;
