require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const User = require('../../models/userModel'); // Adjust path as needed

describe('User Model Tests', () => {
    let testUserId;

    before(async () => {
        await mongoose.connect(process.env.TEST_DB_URI);
    });

    after(async () => {
        await mongoose.disconnect();
    });

    // Create
    it('should create a new user', async () => {
        const user = new User({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            isWalker: false,
            fullName: 'Test User',
            address: '123 Test Street'
        });
        const savedUser = await user.save();
        testUserId = savedUser._id;
        expect(savedUser._id).to.not.be.null;
        expect(savedUser.username).to.equal('testuser');
    });

    // Read
    it('should retrieve a user by id', async () => {
        const foundUser = await User.findById(testUserId);
        expect(foundUser.username).to.equal('testuser');
    });

    // Update
    it('should update a user', async () => {
        const updatedUser = await User.findByIdAndUpdate(testUserId, { $set: { fullName: 'Updated Test User' }}, { new: true });
        expect(updatedUser.fullName).to.equal('Updated Test User');
    });

    // Delete
    it('should delete a user', async () => {
        await User.findByIdAndDelete(testUserId);
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).to.be.null;
    });
});
