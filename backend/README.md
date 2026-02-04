# Backend - Task Management API

A robust REST API built with Node.js, Express, and PostgreSQL featuring JWT authentication and role-based access control.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev

# Start production server
npm start
```

## 📋 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanagement
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🏗️ Architecture

### MVC Pattern
- **Models**: Database interactions and business logic
- **Views**: JSON responses (no template engine)
- **Controllers**: Request handling and response formatting

### Middleware Chain
1. Helmet (Security headers)
2. CORS (Cross-origin resource sharing)
3. Morgan (Request logging)
4. Body Parser (JSON parsing)
5. Rate Limiter (DDoS protection)
6. Authentication (JWT verification)
7. Validation (Input sanitization)
8. Authorization (Role-based access)

## 🔐 Authentication Flow

1. **Registration**:
   - User submits credentials
   - Password hashed with bcrypt (10 rounds)
   - User created in database
   - JWT token generated and returned

2. **Login**:
   - User submits credentials
   - Email lookup in database
   - Password verification
   - JWT token generated and returned

3. **Protected Routes**:
   - Client includes JWT in Authorization header
   - Middleware verifies token
   - User info attached to request object
   - Route handler processes request

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
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
```

## 🛣️ API Routes

### Public Routes
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Protected Routes (Require Authentication)
- `GET /api/v1/auth/profile` - Get current user profile
- `GET /api/v1/tasks` - Get all tasks (user sees only their tasks)
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/:id` - Get specific task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/tasks/stats` - Get task statistics

### Admin-Only Routes
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get specific user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 🔒 Security Best Practices

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Never store plain text passwords
   - Minimum 6 characters required

2. **JWT Security**
   - Short expiration time (24h)
   - Secure secret key (change in production)
   - Proper token verification

3. **Input Validation**
   - Express-validator for all inputs
   - Sanitization to prevent XSS
   - Type checking and length limits

4. **Database Security**
   - Parameterized queries (no SQL injection)
   - Connection pooling
   - Proper error handling

5. **API Security**
   - Rate limiting (100 requests/15 minutes)
   - Helmet for security headers
   - CORS configuration
   - HTTPS in production

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 🧪 Testing API with Curl

### Register User
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

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task (with token)
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the API",
    "priority": "high",
    "status": "in_progress"
  }'
```

## 🚀 Performance Optimization

1. **Database**
   - Indexes on frequently queried columns
   - Connection pooling (max 20 connections)
   - Prepared statements

2. **Caching** (Future Enhancement)
   - Redis for session storage
   - Cache API responses
   - Implement cache headers

3. **Load Balancing** (Production)
   - Nginx reverse proxy
   - Multiple server instances
   - Health checks

## 📊 Monitoring & Logging

Current logging with Morgan:
```
GET /api/v1/tasks 200 45.123 ms - 1234
```

Future enhancements:
- Winston for structured logging
- Log aggregation (ELK stack)
- Performance monitoring
- Error tracking (Sentry)

## 🔄 API Versioning

Current version: `v1`

When breaking changes are needed:
1. Create new version folder (`v2`)
2. Maintain backward compatibility
3. Deprecate old version gradually
4. Update documentation

## 📈 Scalability Roadmap

### Phase 1 (Current)
- ✅ RESTful API
- ✅ JWT authentication
- ✅ PostgreSQL database
- ✅ Basic validation

### Phase 2 (Future)
- ⏳ Redis caching
- ⏳ Background jobs
- ⏳ File uploads (S3)
- ⏳ Email notifications

### Phase 3 (Advanced)
- ⏳ Microservices
- ⏳ GraphQL endpoint
- ⏳ WebSocket support
- ⏳ Advanced analytics

## 🐛 Debugging

Enable debug mode:
```bash
DEBUG=* npm run dev
```

Common issues:
1. **Database connection**: Check PostgreSQL is running
2. **Port in use**: Change PORT in .env
3. **JWT errors**: Verify JWT_SECRET is set

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [Swagger Documentation](https://swagger.io/)

---

**Backend API v1.0.0** - Built with Node.js & Express
