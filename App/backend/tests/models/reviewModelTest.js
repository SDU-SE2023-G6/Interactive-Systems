require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Review = require('../../models/reviewModel'); // Adjust path as needed
const User = require('../../models/userModel'); // Adjust path as needed
const Walk = require('../../models/walkModel'); // Adjust path as needed

describe('Review Model Tests', () => {
    let testReviewId, ownerId, walkId;

    before(async () => {
        await mongoose.connect(process.env.TEST_DB_URI);

        // Creating test user and walk for review
        const owner = new User({ username: 'ownerUser', email: 'owner@example.com', password: 'password', isWalker: false, fullName: 'Owner User' });
        const savedOwner = await owner.save();
        ownerId = savedOwner._id;

        const walk = new Walk({ walkerId: ownerId, ownerId: ownerId, date: new Date(), duration: 60, location: 'Park' });
        const savedWalk = await walk.save();
        walkId = savedWalk._id;
    });

    after(async () => {
        await User.findByIdAndDelete(ownerId);
        await Walk.findByIdAndDelete(walkId);
        await mongoose.disconnect();
    });

    // Create
    it('should create a new review', async () => {
        const review = new Review({
            walkId: walkId,
            ownerId: ownerId,
            rating: 4,
            comment: 'Great walk!'
        });
        const savedReview = await review.save();
        testReviewId = savedReview._id;
        expect(savedReview._id).to.not.be.null;
    });

    // Read
    it('should retrieve a review by id', async () => {
        const foundReview = await Review.findById(testReviewId);
        expect(foundReview.comment).to.equal('Great walk!');
    });

    // Update
    it('should update a review', async () => {
        const updatedReview = await Review.findByIdAndUpdate(testReviewId, { $set: { rating: 5 }}, { new: true });
        expect(updatedReview.rating).to.equal(5);
    });

    // Delete
    it('should delete a review', async () => {
        await Review.findByIdAndDelete(testReviewId);
        const deletedReview = await Review.findById(testReviewId);
        expect(deletedReview).to.be.null;
    });
});
