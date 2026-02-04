# 🚀 Quick Setup Guide - Task Management API

## Prerequisites Checklist
- [ ] Node.js v14+ installed
- [ ] PostgreSQL v12+ installed and running
- [ ] npm or yarn package manager
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command line access

## 5-Minute Setup

### Step 1: Database Setup (2 minutes)

```bash
# Open PostgreSQL terminal
psql -U postgres

# Create database
CREATE DATABASE taskmanagement;

# Exit psql
\q
```

### Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_NAME=taskmanagement

# Run database migrations
npm run migrate

# Start backend server
npm run dev
```

✅ Backend should now be running on http://localhost:5000

### Step 3: Frontend Setup (1 minute)

```bash
# Open new terminal
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

✅ Frontend should open automatically at http://localhost:3000

## Verify Installation

### Test Backend
Visit: http://localhost:5000/health

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-02-04T..."
}
```

### Test API Documentation
Visit: http://localhost:5000/api-docs

You should see Swagger UI interface.

### Test Frontend
1. Visit http://localhost:3000
2. Click "Sign up"
3. Create an account
4. You should be redirected to the dashboard

## Default Test Account

You can create an admin account:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

## Troubleshooting

### Backend won't start
**Issue**: Port 5000 already in use
**Solution**: Change PORT in backend/.env to 5001

**Issue**: Database connection failed
**Solution**: Check PostgreSQL is running: `pg_isready`

### Frontend won't start
**Issue**: Port 3000 already in use
**Solution**: Choose a different port when prompted (Y)

**Issue**: Cannot connect to API
**Solution**: Verify backend is running on port 5000

### Database migration fails
**Issue**: Table already exists
**Solution**: Drop and recreate database:
```bash
psql -U postgres
DROP DATABASE taskmanagement;
CREATE DATABASE taskmanagement;
\q
npm run migrate
```

## Next Steps

1. ✅ Read the main README.md for detailed documentation
2. ✅ Check API documentation at /api-docs
3. ✅ Explore backend/README.md for API details
4. ✅ Explore frontend/README.md for UI details
5. ✅ Review SCALABILITY.md for architecture insights

## Testing the API

### Using Swagger UI
1. Go to http://localhost:5000/api-docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

### Using Postman
Import the collection from the Swagger JSON:
- URL: http://localhost:5000/api-docs-json

### Using curl

**Register**:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Copy the token from response, then:

**Create Task**:
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My first task",
    "description": "This is a test task",
    "priority": "high"
  }'
```

## Project Structure Quick Reference

```
task-management-api/
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── config/       # Database & Swagger config
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth & validation
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── server.js     # Main entry point
│   ├── .env.example      # Environment template
│   └── package.json
│
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.js
│   └── package.json
│
├── README.md             # Main documentation
├── SCALABILITY.md        # Architecture guide
└── SETUP.md              # This file
```

## Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Auto-restarts on file changes
```

### Frontend Development
```bash
cd frontend
npm start  # Auto-reloads on file changes
```

### Making Changes
1. Edit files in backend/src or frontend/src
2. Changes auto-reload in development mode
3. Test your changes
4. Commit to git

## Production Deployment

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
# Deploy build/ folder to static hosting
```

## Support

If you encounter issues:
1. Check the main README.md
2. Review the specific README in backend/ or frontend/
3. Check console/terminal for error messages
4. Verify all prerequisites are installed
5. Ensure database is running and accessible

## Success Checklist

- [x] PostgreSQL installed and running
- [x] Database created (taskmanagement)
- [x] Backend dependencies installed
- [x] Backend .env configured
- [x] Database migrated successfully
- [x] Backend server running (port 5000)
- [x] Frontend dependencies installed
- [x] Frontend server running (port 3000)
- [x] Can access http://localhost:3000
- [x] Can access http://localhost:5000/api-docs
- [x] Can register a user
- [x] Can login
- [x] Can create tasks

## Time Estimate

- Setup: 5 minutes
- Testing: 5 minutes
- Exploring features: 10 minutes
- **Total: ~20 minutes**

---

🎉 **Congratulations!** Your full-stack task management application is ready!

For detailed information, see:
- Main documentation: README.md
- Backend details: backend/README.md
- Frontend details: frontend/README.md
- Architecture: SCALABILITY.md
