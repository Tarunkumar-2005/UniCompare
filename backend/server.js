require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/colleges');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/user', userRoutes);
//here use process.env.mongouri for local and atlasdb url for cloud
// Connect to MongoDB
mongoose.connect(process.env.ATLASDB_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
