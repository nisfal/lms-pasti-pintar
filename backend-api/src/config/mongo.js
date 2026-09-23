const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connectMongo = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectMongo;
