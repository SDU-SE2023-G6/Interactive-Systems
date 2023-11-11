require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Message = require('../../models/messageModel'); // Adjust path as needed
const User = require('../../models/userModel'); // Adjust path as needed

describe('Message Model Tests', () => {
    let testMessageId, senderId, receiverId;

    before(async () => {
        await mongoose.connect(process.env.TEST_DB_URI);
        // Creating test users for sender and receiver
        const sender = new User({ username: 'senderUser', email: 'sender@example.com', password: 'password', isWalker: false, fullName: 'Sender User' });
        const receiver = new User({ username: 'receiverUser', email: 'receiver@example.com', password: 'password', isWalker: true, fullName: 'Receiver User' });
        const savedSender = await sender.save();
        const savedReceiver = await receiver.save();
        senderId = savedSender._id;
        receiverId = savedReceiver._id;
    });

    after(async () => {
        await User.findByIdAndDelete(senderId);
        await User.findByIdAndDelete(receiverId);
        await mongoose.disconnect();
    });

    // Create
    it('should create a new message', async () => {
        const message = new Message({
            senderId: senderId,
            receiverId: receiverId,
            content: 'Test message content',
            timestamp: new Date(),
            readStatus: false
        });
        const savedMessage = await message.save();
        testMessageId = savedMessage._id;
        expect(savedMessage._id).to.not.be.null;
    });

    // Read
    it('should retrieve a message by id', async () => {
        const foundMessage = await Message.findById(testMessageId);
        expect(foundMessage.content).to.equal('Test message content');
    });

    // Update
    it('should update a message', async () => {
        const updatedMessage = await Message.findByIdAndUpdate(testMessageId, { $set: { readStatus: true }}, { new: true });
        expect(updatedMessage.readStatus).to.be.true;
    });

    // Delete
    it('should delete a message', async () => {
        await Message.findByIdAndDelete(testMessageId);
        const deletedMessage = await Message.findById(testMessageId);
        expect(deletedMessage).to.be.null;
    });
});
