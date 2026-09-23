const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const connectMongo = require('./config/mongo');
const { connectRedis } = require('./config/redis');
const mysqlPool = require('./config/mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize databases
const initApp = async () => {
  await connectMongo();
  await connectRedis();

  // Test MySQL connection
  try {
    const connection = await mysqlPool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('MySQL connection error:', error);
  }

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Main API is running' });
  });

  app.listen(PORT, () => {
    console.log(`Main API Server running on port ${PORT}`);
  });
};

initApp();
