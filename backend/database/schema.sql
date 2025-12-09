-- Eventify Database Schema
-- MySQL Database setup for event management system

-- Create database
CREATE DATABASE IF NOT EXISTS eventify_db;
USE eventify_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (email)

);

-- Events table
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
);

-- Bookings table
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
);

-- Sample Events Data
INSERT INTO events (title, description, date, time, location, capacity) VALUES
('React Workshop', 'Learn React basics and advanced patterns in this hands-on workshop.', '2025-12-15 10:00:00', '10:00 AM - 5:00 PM', 'Tech Hub, Downtown', 50),
('Web Development Meetup', 'Join developers from around the city for networking and talks.', '2025-12-20 18:00:00', '6:00 PM - 9:00 PM', 'Coffee & Code, Center Square', 100),
('JavaScript Conference', 'Three days of talks covering the latest in JavaScript ecosystem.', '2025-12-28 09:00:00', '9:00 AM - 6:00 PM', 'Convention Center', 500);
