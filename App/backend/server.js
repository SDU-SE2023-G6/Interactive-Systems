const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const messageRoutes = require('./routes/messageRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/walks', walkRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);

// Middleware for 404 Not Found responses for unhandled routes

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    const statusCode = err.statusCode || 500; // Default to 500 server error
    res.status(statusCode).json({ message: err.message });
});

  
// Define a simple route to ensure server is working
app.get('/', (req, res) => {
    res.send('WalkPaw backend is running...');
});

// Set the port from the environment or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/walkpaw')
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});