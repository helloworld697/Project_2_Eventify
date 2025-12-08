# Eventify - Setup & Development Guide

## 🚀 Project Overview
Eventify is a full-stack web application for event management and booking, built with:
- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: MySQL/PostgreSQL

---

## 📋 Table of Contents
1. [Frontend Setup](#frontend-setup)
2. [Backend Setup](#backend-setup)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)

---

## 🎨 Frontend Setup

### Status: ✅ Complete

**Location**: `eventify/` folder

### Features Implemented:
- ✅ React 19.2 + Vite
- ✅ React Router v7 for navigation
- ✅ Reusable UI components (Button, InputField, EventCard, NavBar)
- ✅ Layout system with MainLayout
- ✅ 5 Main Pages (HomePage, EventDetailsPage, DashboardPage, LoginPage, NotFoundPage)
- ✅ API service layer with placeholder functions
- ✅ Basic CSS styling

### Commands:
```bash
cd eventify

# Development
npm run dev      # Starts on http://localhost:5174

# Production
npm run build    # Build for production
npm run preview  # Preview production build
```

### Frontend Folder Structure:
```
eventify/src/
├── components/
│   └── ui/
│       ├── Button.jsx & Button.css
│       ├── EventCard.jsx & EventCard.css
│       ├── InputField.jsx & InputField.css
│       └── NavBar.jsx & NavBar.css
├── pages/
│   ├── HomePage.jsx
│   ├── EventDetailsPage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── NotFoundPage.jsx
├── layouts/
│   └── MainLayout.jsx & MainLayout.css
├── hooks/         # (empty - ready for custom hooks)
├── context/       # (empty - ready for context API)
├── services/
│   └── api.js     # API placeholder functions
└── assets/        # (empty - ready for images/files)
```

---

## 🔧 Backend Setup

### Status: ✅ Complete (Needs Database Connection)

**Location**: `backend/` folder

### Features Implemented:
- ✅ Express.js server
- ✅ Sequelize ORM with MySQL/PostgreSQL support
- ✅ 3 Database Models: User, Event, Booking
- ✅ Controllers for events, users, and bookings
- ✅ RESTful API routes
- ✅ CORS enabled
- ✅ Environment configuration (.env)
- ✅ Seeder for sample data

### Commands:
```bash
cd backend

# Development
npm run dev      # Starts on http://localhost:5000 with nodemon

# Production
npm start        # Run without nodemon

# API Health Check
curl http://localhost:5000/api/health
```

### Backend Folder Structure:
```
backend/
├── config/
│   └── database.js           # Sequelize config
├── models/
│   ├── User.js              # User model
│   ├── Event.js             # Event model
│   ├── Booking.js           # Booking model
│   └── index.js             # Model relationships
├── controllers/
│   ├── eventController.js   # Event business logic
│   ├── userController.js    # User/Auth logic
│   └── bookingController.js # Booking logic
├── routes/
│   ├── events.js            # Event endpoints
│   ├── users.js             # User endpoints
│   └── bookings.js          # Booking endpoints
├── seeders/
│   └── seedEvents.js        # Sample event data
├── .env                     # Environment variables
├── .env.example             # Template
└── index.js                 # Express server entry point
```

---

## 💾 Database Setup

### Requirements:
- **MySQL 5.7+** OR **PostgreSQL 12+**

### Option 1: MySQL Setup

1. **Install MySQL** from https://dev.mysql.com/downloads/mysql/

2. **Start MySQL Server**:
   ```bash
   # Windows (if installed as service)
   net start MySQL80
   
   # Or use MySQL Workbench
   ```

3. **Create Database**:
   ```bash
   mysql -u root -p
   # Enter password when prompted
   
   CREATE DATABASE eventify_db;
   EXIT;
   ```

4. **Update `.env` file** in `backend/` folder:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=eventify_db
   DB_DIALECT=mysql
   ```

### Option 2: PostgreSQL Setup

1. **Install PostgreSQL** from https://www.postgresql.org/download/

2. **Create Database**:
   ```bash
   psql -U postgres
   CREATE DATABASE eventify_db;
   \q
   ```

3. **Update `.env` file**:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=eventify_db
   DB_DIALECT=postgres
   ```

---

## ▶️ Running the Application

### Terminal 1: Start Backend
```bash
cd backend
npm run dev

# Expected output:
# ✓ Database connected successfully! (or warning if DB not running)
# ✓ Server running on http://localhost:5000
```

### Terminal 2: Start Frontend
```bash
cd eventify
npm run dev

# Expected output:
# ➜ Local: http://localhost:5174/
```

### Access the App:
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📡 API Endpoints

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get event by ID |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Register for event |
| GET | `/api/bookings/user/:userId` | Get user's bookings |
| GET | `/api/bookings/event/:eventId` | Get event's bookings |
| PUT | `/api/bookings/:id` | Update booking |
| DELETE | `/api/bookings/:id` | Cancel booking |

### Example API Call:
```bash
# Create an event
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Workshop",
    "description": "Learn React",
    "date": "2025-12-15",
    "time": "10:00 AM",
    "location": "Downtown",
    "capacity": 50
  }'

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## 📁 Project Structure

```
Eventify/
├── backend/              # Node.js + Express API
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── seeders/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── eventify/            # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Security Notes (TODO)

Before deploying to production:
1. ✋ Hash passwords using `bcrypt`
2. ✋ Implement JWT authentication
3. ✋ Add input validation and sanitization
4. ✋ Use environment variables for secrets
5. ✋ Implement HTTPS
6. ✋ Add rate limiting
7. ✋ Validate CORS origins

---

## 🐛 Troubleshooting

### Backend won't connect to database
- **Solution**: Make sure MySQL/PostgreSQL is running
  ```bash
  # MySQL
  net start MySQL80
  
  # PostgreSQL
  # Start via Services or command line
  ```

### Port already in use
- **Backend (5000)**:
  ```bash
  # Find process using port 5000
  netstat -ano | findstr :5000
  # Kill process (replace PID)
  taskkill /PID <PID> /F
  ```

- **Frontend (5174)**:
  ```bash
  # Find process using port 5174
  netstat -ano | findstr :5174
  # Kill process
  taskkill /PID <PID> /F
  ```

### Database tables not created
- Run backend with database connected, tables will auto-sync
- Check `.env` file has correct credentials

---

## 📚 Next Steps

1. **Connect Frontend to Backend**:
   - Update API calls in `services/api.js`
   - Add authentication token handling

2. **Add Authentication**:
   - Implement JWT tokens
   - Add login state management

3. **Improve Styling**:
   - Add CSS framework (Bootstrap, Tailwind)
   - Create consistent design system

4. **Testing**:
   - Add unit tests
   - Add integration tests

5. **Deployment**:
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Heroku/Railway/DigitalOcean

---

## 📞 Support

For issues or questions, check:
- Backend logs in terminal
- Browser console (Frontend)
- `.env` configuration
- Database connection status

---

**Last Updated**: December 8, 2025
**Project Status**: ✅ Initial Setup Complete
