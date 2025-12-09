const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Initialize database and create tables
 * Run this once to set up the database from scratch
 */
async function initializeDatabase() {
  let connection;

  try {
    // Connect to MySQL without selecting a database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('✓ Connected to MySQL server');

    // Create database
    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'eventify_db'}`);
      console.log(`✓ Database '${process.env.DB_NAME || 'eventify_db'}' created/verified`);
    } catch (err) {
      if (err.code === 'ER_DB_CREATE_EXISTS') {
        console.log(`✓ Database '${process.env.DB_NAME || 'eventify_db'}' already exists`);
      } else {
        throw err;
      }
    }

    // Switch to the database
    await connection.query(`USE ${process.env.DB_NAME || 'eventify_db'}`);
    console.log(`✓ Connected to database '${process.env.DB_NAME || 'eventify_db'}'`);

    // Create tables
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(15),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (email)
      )
    `;

    const createEventsTable = `
      CREATE TABLE IF NOT EXISTS events (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description LONGTEXT,
        date DATETIME NOT NULL,
        time VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        capacity INT DEFAULT 100,
        image_url VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (date),
        INDEX (title)
      )
    `;

    const createBookingsTable = `
      CREATE TABLE IF NOT EXISTS bookings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        eventId INT NOT NULL,
        status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_event (userId, eventId),
        INDEX (userId),
        INDEX (eventId),
        INDEX (status)
      )
    `;

    await connection.query(createUsersTable);
    console.log('✓ Users table created/verified');

    await connection.query(createEventsTable);
    console.log('✓ Events table created/verified');

    await connection.query(createBookingsTable);
    console.log('✓ Bookings table created/verified');

    // Insert sample events
    const checkEventsCount = await connection.query(`SELECT COUNT(*) as count FROM events`);
    
    if (checkEventsCount[0][0].count === 0) {
      const sampleEvents = `
        INSERT INTO events (title, description, date, time, location, capacity) VALUES
        ('React Workshop', 'Learn React basics and advanced patterns in this hands-on workshop.', '2025-12-15 10:00:00', '10:00 AM - 5:00 PM', 'Tech Hub, Downtown', 50),
        ('Web Development Meetup', 'Join developers from around the city for networking and talks.', '2025-12-20 18:00:00', '6:00 PM - 9:00 PM', 'Coffee & Code, Center Square', 100),
        ('JavaScript Conference', 'Three days of talks covering the latest in JavaScript ecosystem.', '2025-12-28 09:00:00', '9:00 AM - 6:00 PM', 'Convention Center', 500)
      `;
      
      await connection.query(sampleEvents);
      console.log('✓ Sample events inserted');
    } else {
      console.log('✓ Events table already has data, skipping sample data');
    }

    console.log('\n✅ Database initialization complete!');
    console.log('📊 You can now start the backend server with: npm run dev\n');

  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run if executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
