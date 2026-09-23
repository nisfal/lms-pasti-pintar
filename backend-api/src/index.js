const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const connectMongo = require('./config/mongo');
const { connectRedis } = require('./config/redis');
const mysqlPool = require('./config/mysql');

const dashboardRoutes = require('./routes/dashboard');
const packagesRoutes = require('./routes/packages');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/packages', packagesRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Main Node.js API Gateway is running',
    timestamp: new Date().toISOString()
  });
});

// Initialize databases and start server
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

  app.listen(PORT, () => {
    console.log(`Main API Server running on port ${PORT}`);
  });
};

initApp();
