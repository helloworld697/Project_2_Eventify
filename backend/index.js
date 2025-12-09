const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/bookings', require('./routes/bookings'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;

// Try to sync database, but don't crash if it fails
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected successfully!');
    
    await sequelize.sync({ alter: false });
    console.log('✓ Database tables synced!');
  } catch (err) {
    console.warn('⚠ Database connection failed. Make sure MySQL/PostgreSQL is running.');
    console.warn('⚠ Run: mysql -u root -p (or use your DB client)');
    console.warn('⚠ Then create database: CREATE DATABASE eventify_db;');
    console.warn('Error details:', err.message);
  }
  
  // Start server regardless of database connection
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ API Health check: http://localhost:${PORT}/api/health\n`);
  });
};

startServer();
