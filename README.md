# Task Management API - Full Stack Application

A scalable full-stack application with a REST API backend featuring JWT authentication, role-based access control, and a modern React frontend.

## 🚀 Features

### Backend
- ✅ **User Authentication**: JWT-based registration and login with bcrypt password hashing
- ✅ **Role-Based Access Control**: User and Admin roles with different permissions
- ✅ **CRUD Operations**: Complete task management system
- ✅ **API Versioning**: Organized as `/api/v1/...` for future scalability
- ✅ **Input Validation**: Express-validator for comprehensive input sanitization
- ✅ **Security**: Helmet, CORS, rate limiting, and security best practices
- ✅ **API Documentation**: Swagger UI for interactive API testing
- ✅ **Database**: PostgreSQL with proper schema design and indexes
- ✅ **Error Handling**: Centralized error handling with proper HTTP status codes

### Frontend
- ✅ **Modern React**: Functional components with hooks
- ✅ **Authentication Flow**: Login, register, and protected routes
- ✅ **Task Management**: Create, read, update, and delete tasks
- ✅ **Real-time Stats**: Dashboard with task statistics
- ✅ **Responsive Design**: Mobile-friendly UI
- ✅ **Error Handling**: User-friendly error and success messages

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-management-api
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=taskmanagement
# DB_USER=postgres
# DB_PASSWORD=your_password
# JWT_SECRET=your-secret-key
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb taskmanagement

# Run migrations
npm run migrate
```

### 4. Start Backend Server

```bash
npm run dev
# Server will run on http://localhost:5000
```

### 5. Frontend Setup

```bash
# Open a new terminal
cd frontend
npm install

# Start development server
npm start
# Frontend will run on http://localhost:3000
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/health

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (Protected)

#### Tasks
- `GET /api/v1/tasks` - Get all tasks (Protected)
- `POST /api/v1/tasks` - Create task (Protected)
- `GET /api/v1/tasks/:id` - Get task by ID (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)
- `GET /api/v1/tasks/stats` - Get task statistics (Protected)

#### Users (Admin Only)
- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/:id` - Get user by ID (Admin)
- `PUT /api/v1/users/:id` - Update user (Admin)
- `DELETE /api/v1/users/:id` - Delete user (Admin)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After login or registration, include the token in requests:

```bash
Authorization: Bearer <your-jwt-token>
```

### Example API Request

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'

# Create Task
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task management app",
    "priority": "high",
    "status": "in_progress"
  }'
```

## 🗄️ Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR 255)
- email (VARCHAR 255 UNIQUE)
- password (VARCHAR 255)
- role (VARCHAR 50) - 'user' or 'admin'
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tasks Table
```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR 255)
- description (TEXT)
- status (VARCHAR 50) - 'pending', 'in_progress', 'completed'
- priority (VARCHAR 50) - 'low', 'medium', 'high'
- user_id (INTEGER FOREIGN KEY)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🏗️ Project Structure

```
task-management-api/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── migrate.js
│   │   │   └── swagger.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── taskController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   ├── validators/
│   │   │   └── validators.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── PrivateRoute.js
    │   │   ├── TaskCard.js
    │   │   └── TaskModal.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── taskService.js
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── Modal.css
    │   │   ├── Navbar.css
    │   │   ├── TaskCard.css
    │   │   └── index.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔒 Security Features

1. **Password Hashing**: Bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based authentication
3. **Input Validation**: Express-validator for all inputs
4. **SQL Injection Protection**: Parameterized queries with pg
5. **Rate Limiting**: Prevents brute force attacks
6. **Helmet**: Sets security HTTP headers
7. **CORS**: Configured for specific origins
8. **Role-Based Access**: Admin-only routes protected

## 📈 Scalability Considerations

### Current Implementation
- ✅ RESTful API design
- ✅ Modular architecture (MVC pattern)
- ✅ Database indexing for performance
- ✅ Connection pooling for PostgreSQL
- ✅ API versioning for backward compatibility
- ✅ Environment-based configuration

### Future Enhancements

1. **Microservices Architecture**
   - Split into separate services (Auth, Tasks, Users)
   - API Gateway for routing
   - Service mesh for communication

2. **Caching Layer**
   - Redis for session management
   - Cache frequently accessed data
   - Implement cache invalidation strategy

3. **Load Balancing**
   - Nginx or AWS ELB for distributing traffic
   - Horizontal scaling of application servers
   - Database read replicas

4. **Message Queue**
   - RabbitMQ or AWS SQS for async operations
   - Background job processing
   - Event-driven architecture

5. **Container Orchestration**
   - Docker for containerization
   - Kubernetes for orchestration
   - Auto-scaling based on load

6. **Monitoring & Logging**
   - ELK Stack (Elasticsearch, Logstash, Kibana)
   - Prometheus and Grafana for metrics
   - Distributed tracing with Jaeger

7. **Database Optimization**
   - Sharding for horizontal scaling
   - Read/Write splitting
   - Query optimization and indexing

8. **CDN & Static Assets**
   - CloudFront or Cloudflare
   - Separate static file storage (S3)
   - Image optimization

## 🧪 Testing

### Backend Testing (Future)
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage
```

### Frontend Testing (Future)
```bash
# Component tests
npm test

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment (Optional)

```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure production database
- Enable HTTPS
- Set proper CORS origins

## 📝 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Contact

For questions or support, please reach out to the development team.

---

**Built with ❤️ using Node.js, Express, PostgreSQL, and React**
