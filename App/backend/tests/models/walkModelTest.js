require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Walk = require('../../models/walkModel'); // Adjust path as needed
const User = require('../../models/userModel'); // Adjust path as needed

describe('Walk Model Tests', () => {
    let testWalkId, walkerId, ownerId;

    before(async () => {
        await mongoose.connect(process.env.TEST_DB_URI);
        
        // Creating test users for walker and owner
        const walker = new User({ username: 'walkerUser', email: 'walker@example.com', password: 'password', isWalker: true, fullName: 'Walker User' });
        const owner = new User({ username: 'ownerUser', email: 'owner@example.com', password: 'password', isWalker: false, fullName: 'Owner User' });
        const savedWalker = await walker.save();
        const savedOwner = await owner.save();
        walkerId = savedWalker._id;
        ownerId = savedOwner._id;
    });

    after(async () => {
        await User.findByIdAndDelete(walkerId);
        await User.findByIdAndDelete(ownerId);
        await mongoose.disconnect();
    });

    // Create
    it('should create a new walk', async () => {
        const walk = new Walk({
            walkerId: walkerId,
            ownerId: ownerId,
            date: new Date(),
            duration: 60,
            location: 'Park'
        });
        const savedWalk = await walk.save();
        testWalkId = savedWalk._id;
        expect(savedWalk._id).to.not.be.null;
    });

    // Read
    it('should retrieve a walk by id', async () => {
        const foundWalk = await Walk.findById(testWalkId);
        expect(foundWalk.location).to.equal('Park');
    });

    // Update
    it('should update a walk', async () => {
        const updatedWalk = await Walk.findByIdAndUpdate(testWalkId, { $set: { location: 'Beach' }}, { new: true });
        expect(updatedWalk.location).to.equal('Beach');
    });

    // Delete
    it('should delete a walk', async () => {
        await Walk.findByIdAndDelete(testWalkId);
        const deletedWalk = await Walk.findById(testWalkId);
        expect(deletedWalk).to.be.null;
    });
});
