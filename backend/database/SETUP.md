# 🗄️ Database Setup Instructions

## Files Created

1. **`schema.sql`** - Full MySQL schema with tables and sample data
2. **`init.js`** - Node.js script to initialize database automatically
3. **`README.md`** - This file

## Quick Setup (2 Steps)

### Step 1: Start MySQL Server

**Windows:**
```bash
net start MySQL80
# Or use MySQL Workbench to start MySQL
```

**Mac:**
```bash
mysql.server start
```

**Linux:**
```bash
sudo systemctl start mysql
```

### Step 2: Run Database Initialization

From the `backend/` folder:

```bash
npm run db:init
```

This will:
- ✅ Connect to MySQL server
- ✅ Create `eventify_db` database
- ✅ Create `users`, `events`, and `bookings` tables
- ✅ Insert 3 sample events
- ✅ Set up all relationships and indexes

**Expected Output:**
```
✓ Connected to MySQL server
✓ Database 'eventify_db' created/verified
✓ Connected to database 'eventify_db'
✓ Users table created/verified
✓ Events table created/verified
✓ Bookings table created/verified
✓ Sample events inserted

✅ Database initialization complete!
📊 You can now start the backend server with: npm run dev
```

---

## Manual Setup (Alternative)

If you prefer to run SQL manually:

### Option 1: MySQL Command Line
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
mysql -u root -p < backend/database/schema.sql
```

### Option 2: MySQL Workbench
1. Open MySQL Workbench
2. Open file: `backend/database/schema.sql`
3. Execute (Ctrl+Shift+Enter)

---

## Verify Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Check database exists
SHOW DATABASES;

# Use the database
USE eventify_db;

# Check tables
SHOW TABLES;

# Check users table
DESCRIBE users;

# Check sample events
SELECT * FROM events;

# Exit
EXIT;
```

---

## Environment Variables

Make sure `backend/.env` has correct credentials:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=eventify_db
DB_DIALECT=mysql
```

---

## Database Schema

### Users Table
```
id (INT) - Primary Key
name (VARCHAR) - User full name
email (VARCHAR) - Unique email
password (VARCHAR) - Hashed password
phone (VARCHAR) - Optional phone number
createdAt, updatedAt (TIMESTAMP)
```

### Events Table
```
id (INT) - Primary Key
title (VARCHAR) - Event title
description (LONGTEXT) - Event details
date (DATETIME) - Event date
time (VARCHAR) - Event time
location (VARCHAR) - Event location
capacity (INT) - Max attendees
image_url (VARCHAR) - Optional event image
createdAt, updatedAt (TIMESTAMP)
```

### Bookings Table
```
id (INT) - Primary Key
userId (INT) - Foreign Key to users
eventId (INT) - Foreign Key to events
status (ENUM) - 'registered', 'attended', 'cancelled'
createdAt, updatedAt (TIMESTAMP)
```

**Relationships:**
- User has many Bookings
- Event has many Bookings
- One booking connects one user to one event

---

## Sample Data Inserted

### Events:
1. **React Workshop** - Dec 15, 2025 at Tech Hub (50 capacity)
2. **Web Development Meetup** - Dec 20, 2025 at Coffee & Code (100 capacity)
3. **JavaScript Conference** - Dec 28, 2025 at Convention Center (500 capacity)

---

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
- Check your MySQL password in `.env`
- Make sure MySQL service is running
- Try: `mysql -u root -p` to test connection manually

### Error: "Database 'eventify_db' already exists"
- Database already created, this is normal
- Script will use existing database

### Error: "Table 'users' already exists"
- Tables already exist, this is fine
- Script uses `CREATE TABLE IF NOT EXISTS`

### Port 3306 already in use
```bash
# Find process using port 3306
netstat -ano | findstr :3306

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

---

## Next Steps

Once database is initialized:

```bash
# Start backend server
cd backend
npm run dev

# In another terminal, start frontend
cd eventify
npm run dev
```

Backend will now:
- ✅ Connect to database successfully
- ✅ Create Sequelize models
- ✅ Sync with database tables
- ✅ Listen for API requests on http://localhost:5000

---

**Database setup is complete!** 🎉
