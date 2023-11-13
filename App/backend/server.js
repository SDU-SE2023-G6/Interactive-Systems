const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const walkRoutes = require('./routes/walkRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/walks', walkRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

// Middleware for 404 Not Found responses for unhandled routes
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan('tiny'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set the port from the environment or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/walkpaw')
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.error('Could not connect to MongoDB:', err));


// Existing 404 and global error handling middleware continues here...

module.exports = app;
