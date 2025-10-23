const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unicare-donations';

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    // Don't exit process, just log error for development
    console.log('Continuing without database connection for development...');
  }
};

module.exports = connectDB;