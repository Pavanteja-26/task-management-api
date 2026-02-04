# 🚀 Task Management API - Full Stack Application

> **Backend Developer Intern Assignment Submission**  
> A production-ready REST API with JWT authentication, role-based access control, and modern React frontend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Security Features](#-security-features)
- [Scalability](#-scalability)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🎯 Overview

This is a **full-stack Task Management Application** built as part of the Backend Developer Intern assignment. The project demonstrates proficiency in building secure, scalable REST APIs with modern authentication, database design, and clean architecture principles.

### Assignment Requirements Met ✅

- ✅ **User Authentication**: JWT-based registration and login with bcrypt password hashing
- ✅ **Role-Based Access Control**: User and Admin roles with different permissions
- ✅ **CRUD Operations**: Complete task management system with validation
- ✅ **API Versioning**: Organized as `/api/v1/` for future scalability
- ✅ **Input Validation**: Express-validator for comprehensive sanitization
- ✅ **Security**: Helmet, CORS, rate limiting, and SQL injection prevention
- ✅ **API Documentation**: Interactive Swagger/OpenAPI documentation
- ✅ **Database Design**: PostgreSQL with optimized schema and indexes
- ✅ **Error Handling**: Centralized error handling with proper HTTP status codes
- ✅ **Frontend UI**: React application to demonstrate API functionality
- ✅ **Scalable Architecture**: Modular MVC pattern ready for microservices

---

## ✨ Features

### Backend API

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **Role Management** - User and Admin access levels
- 📝 **Task Management** - Full CRUD operations with ownership validation
- 🛡️ **Security First** - Rate limiting, input sanitization, SQL injection protection
- 📊 **Statistics API** - Task analytics and reporting
- 🔄 **API Versioning** - Future-proof endpoint structure
- 📚 **Swagger Docs** - Interactive API documentation and testing
- ⚡ **Performance** - Database connection pooling and indexing
- 🎯 **Validation** - Comprehensive input validation on all endpoints
- 📧 **Error Handling** - User-friendly error messages with proper status codes

### Frontend Application

- 🎨 **Modern UI** - Clean, responsive design with gradient effects
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔐 **Protected Routes** - Authentication-based navigation
- 📊 **Dashboard** - Real-time task statistics and filtering
- ✏️ **Task Management** - Intuitive create, edit, and delete operations
- 🎯 **Status Filtering** - Filter tasks by pending, in progress, completed
- 💬 **User Feedback** - Success and error notifications
- 🌈 **Priority Badges** - Color-coded task priorities (low, medium, high)
- 👤 **User Profile** - Display current user info and role

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: Express.js 4.18
- **Database**: PostgreSQL 15
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **API Docs**: Swagger UI + swagger-jsdoc
- **Security**: Helmet, CORS, express-rate-limit
- **Database Client**: node-postgres (pg)

### Frontend
- **Framework**: React 18.2
- **Routing**: React Router DOM 6.20
- **HTTP Client**: Axios 1.6
- **State Management**: React Context API
- **Styling**: Custom CSS with CSS Variables
- **Build Tool**: Create React App

### Development Tools
- **Process Manager**: Nodemon
- **Version Control**: Git
- **API Testing**: Swagger UI, Postman
- **Code Quality**: ESLint (React)

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v12 or higher ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** package manager
- **Git** for version control

### Installation (5 Minutes)

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-management-api.git
cd task-management-api
```

#### 2. Setup Database

```bash
# Create PostgreSQL database
createdb taskmanagement

# Or using psql
psql -U postgres
CREATE DATABASE taskmanagement;
\q
```

#### 3. Configure Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# Required: DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET
```

**`.env` Configuration:**
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanagement
DB_USER=postgres
DB_PASSWORD=your_password_here

JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=24h

CORS_ORIGIN=http://localhost:3000
```

#### 4. Run Database Migrations

```bash
npm run migrate
```

**Expected Output:**
```
🔄 Starting database migration...
✅ Users table created
✅ Tasks table created
✅ Indexes created
🎉 Database migration completed successfully!
```

#### 5. Start Backend Server

```bash
npm run dev
```

**Server will start on:** `http://localhost:5000`

#### 6. Setup Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend will open at:** `http://localhost:3000`

---

## 📚 API Documentation

### Interactive Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/health
- **API Base URL**: http://localhost:5000/api/v1

### Quick API Reference

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |
| GET | `/api/v1/auth/profile` | Get user profile | ✅ |

#### Task Endpoints

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/api/v1/tasks` | Get all tasks | ✅ | ❌ |
| POST | `/api/v1/tasks` | Create task | ✅ | ❌ |
| GET | `/api/v1/tasks/:id` | Get task by ID | ✅ | ❌ |
| PUT | `/api/v1/tasks/:id` | Update task | ✅ | ❌ |
| DELETE | `/api/v1/tasks/:id` | Delete task | ✅ | ❌ |
| GET | `/api/v1/tasks/stats` | Get statistics | ✅ | ❌ |

#### User Management (Admin Only)

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/api/v1/users` | Get all users | ✅ | ✅ |
| GET | `/api/v1/users/:id` | Get user by ID | ✅ | ✅ |
| PUT | `/api/v1/users/:id` | Update user | ✅ | ✅ |
| DELETE | `/api/v1/users/:id` | Delete user | ✅ | ✅ |

### Example API Calls

#### Register User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Create Task

```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "priority": "high",
    "status": "in_progress"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "in_progress",
      "priority": "high",
      "user_id": 1,
      "created_at": "2024-02-04T10:00:00.000Z"
    }
  }
}
```

---

## 📁 Project Structure

```
task-management-api/
│
├── backend/                          # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # PostgreSQL connection
│   │   │   ├── migrate.js           # Database migrations
│   │   │   └── swagger.js           # API documentation config
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   ├── taskController.js    # Task CRUD operations
│   │   │   └── userController.js    # User management
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT authentication
│   │   │   └── validate.js          # Input validation
│   │   │
│   │   ├── models/
│   │   │   ├── User.js              # User model & methods
│   │   │   └── Task.js              # Task model & methods
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── taskRoutes.js        # Task endpoints
│   │   │   └── userRoutes.js        # User endpoints
│   │   │
│   │   ├── utils/
│   │   │   └── jwt.js               # JWT utilities
│   │   │
│   │   ├── validators/
│   │   │   └── validators.js        # Validation rules
│   │   │
│   │   └── server.js                # Express app entry point
│   │
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── README.md                    # Backend docs
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js            # Navigation component
│   │   │   ├── PrivateRoute.js      # Auth protection
│   │   │   ├── TaskCard.js          # Task display card
│   │   │   └── TaskModal.js         # Task form modal
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js       # Auth state management
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Registration page
│   │   │   └── Dashboard.js         # Main dashboard
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js       # Auth API calls
│   │   │   └── taskService.js       # Task API calls
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css            # Global styles
│   │   │   ├── Auth.css             # Login/Register styles
│   │   │   ├── Dashboard.css        # Dashboard styles
│   │   │   ├── Navbar.css           # Navigation styles
│   │   │   ├── TaskCard.css         # Task card styles
│   │   │   └── Modal.css            # Modal styles
│   │   │
│   │   ├── App.js                   # Main component
│   │   └── index.js                 # React entry point
│   │
│   ├── package.json                 # Dependencies
│   └── README.md                    # Frontend docs
│
├── README.md                         # Main documentation
├── SETUP.md                          # Quick setup guide
├── SCALABILITY.md                    # Architecture docs
├── DEPLOYMENT.md                     # Deployment guide
├── Postman_Collection.json           # API testing collection
└── .gitignore                        # Git ignore rules
```

---

## 🔒 Security Features

### Authentication & Authorization
- ✅ **JWT Tokens** - Secure, stateless authentication
- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **Token Expiration** - 24-hour token lifetime
- ✅ **Role-Based Access** - User and Admin permissions
- ✅ **Protected Routes** - Middleware authentication checks

### Input Security
- ✅ **Validation** - Express-validator on all inputs
- ✅ **Sanitization** - XSS prevention through input cleaning
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Type Checking** - Strong type validation
- ✅ **Length Limits** - Prevent buffer overflow attacks

### API Security
- ✅ **Helmet** - Security HTTP headers
- ✅ **CORS** - Controlled cross-origin access
- ✅ **Rate Limiting** - 100 requests per 15 minutes per IP
- ✅ **Request Logging** - Morgan for audit trails
- ✅ **Error Masking** - No sensitive info in error responses

### Database Security
- ✅ **Connection Pooling** - Secure connection management
- ✅ **Prepared Statements** - SQL injection prevention
- ✅ **Foreign Keys** - Data integrity enforcement
- ✅ **Constraints** - Database-level validation

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority VARCHAR(50) DEFAULT 'medium' 
    CHECK (priority IN ('low', 'medium', 'high')),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
```

### Relationships
- One-to-Many: Users → Tasks (one user can have many tasks)
- Cascade Delete: Deleting a user deletes all their tasks
- Indexed Foreign Keys: Optimized query performance

---

## ⚡ Scalability

### Current Architecture
- ✅ **Modular MVC Pattern** - Easy to refactor into microservices
- ✅ **API Versioning** - `/api/v1/` allows backward compatibility
- ✅ **Connection Pooling** - Efficient database connections (max 20)
- ✅ **Database Indexing** - Optimized queries on email, user_id, status
- ✅ **Stateless Auth** - JWT enables horizontal scaling
- ✅ **Environment Config** - Easy deployment configuration

### Scalability Roadmap

#### Phase 1: Horizontal Scaling (0-10K users)
- Load balancer (Nginx/AWS ALB)
- Multiple application instances
- Database connection pool optimization

#### Phase 2: Caching Layer (10K-100K users)
- Redis for session management
- API response caching
- Query result caching

#### Phase 3: Database Optimization (100K-1M users)
- Read replicas for queries
- Write/Read splitting
- Database sharding by user_id

#### Phase 4: Microservices (1M+ users)
- Separate Auth, Tasks, Users services
- API Gateway (Kong/AWS API Gateway)
- Message queue (RabbitMQ/Kafka)
- Service mesh (Istio)

#### Phase 5: Infrastructure
- Kubernetes orchestration
- Auto-scaling policies
- CDN for static assets
- Monitoring (Prometheus/Grafana)
- Centralized logging (ELK stack)

**Full details:** See [SCALABILITY.md](SCALABILITY.md)

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)
*Clean authentication interface with purple gradient design*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Task overview with real-time statistics and filtering*

### Task Management
![Task Management](screenshots/tasks.png)
*Intuitive CRUD operations with status badges*

### API Documentation
![Swagger UI](screenshots/swagger.png)
*Interactive API documentation and testing*

---

## 🧪 Testing

### Manual Testing

#### Using Swagger UI
1. Visit `http://localhost:5000/api-docs`
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Execute and view response

#### Using Postman
1. Import `Postman_Collection.json`
2. Set `baseUrl` variable to `http://localhost:5000/api/v1`
3. Register a user (saves token automatically)
4. Test other endpoints

#### Frontend Testing
1. Register new account at `/register`
2. Login at `/login`
3. Create tasks in dashboard
4. Test edit/delete operations
5. Test filtering by status
6. Logout and verify token removal

### Test User Accounts

Create these accounts for testing:

**Regular User:**
```json
{
  "name": "Test User",
  "email": "user@test.com",
  "password": "test123",
  "role": "user"
}
```

**Admin User:**
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin"
}
```

### Automated Testing (Future Enhancement)

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### Quick Deploy Options

#### Heroku (Backend)
```bash
heroku create task-api-backend
heroku addons:create heroku-postgresql:mini
git push heroku main
heroku run npm run migrate
```

#### Netlify/Vercel (Frontend)
```bash
cd frontend
npm run build
# Drag build/ folder to Netlify
```

#### Docker Deployment
```bash
docker-compose up -d
```

**Full deployment guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📝 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=taskmanagement
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# JWT
JWT_SECRET=your-32-char-secret-key
JWT_EXPIRE=24h

# CORS
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-api-domain.com/api/v1
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**[Your Name]**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- Assignment provided by **PrimeTrade.ai**
- Built for Backend Developer Intern position
- Inspired by modern API design best practices
- Special thanks to the Node.js and React communities

---

## 📞 Support

For issues, questions, or feedback:

1. Open an issue on GitHub
2. Email: your.email@example.com
3. Check the documentation in `/docs` folder

---

## 🎯 Future Enhancements

- [ ] Unit and integration testing
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Task due dates and reminders
- [ ] File attachments for tasks
- [ ] Real-time updates with WebSocket
- [ ] Export tasks to CSV/PDF
- [ ] Advanced search and filters
- [ ] Task tags and categories
- [ ] Activity logs and audit trail
- [ ] Two-factor authentication
- [ ] Mobile app (React Native)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Built with ❤️ for Backend Developer Intern Assignment

[Report Bug](https://github.com/yourusername/task-management-api/issues) · [Request Feature](https://github.com/yourusername/task-management-api/issues)

</div>
