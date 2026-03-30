// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

const listingRoutes = require('./routes/listings');
const inquiryRoutes = require('./routes/inquiries');
const favoriteRoutes = require('./routes/favorites');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Old routes (job module)
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

// New routes (marketplace module)
app.use('/listings', listingRoutes);
app.use('/inquiries', inquiryRoutes);
app.use('/favorites', favoriteRoutes);

// Test root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});