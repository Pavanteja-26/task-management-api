# Deployment Guide

This guide covers deploying the Task Management API to various platforms.

## Table of Contents
1. [Docker Deployment](#docker-deployment)
2. [Heroku Deployment](#heroku-deployment)
3. [AWS Deployment](#aws-deployment)
4. [DigitalOcean Deployment](#digitalocean-deployment)
5. [Production Checklist](#production-checklist)

## Docker Deployment

### 1. Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

### 2. Frontend Dockerfile

Create `frontend/Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Create `frontend/nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: taskmanagement
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      NODE_ENV: production
      PORT: 5000
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: taskmanagement
      DB_USER: postgres
      DB_PASSWORD: postgres
      JWT_SECRET: your-production-secret-key-change-this
      JWT_EXPIRE: 24h
      CORS_ORIGIN: http://localhost
    ports:
      - "5000:5000"
    restart: unless-stopped

  frontend:
    build: ./frontend
    depends_on:
      - backend
    ports:
      - "80:80"
    restart: unless-stopped

volumes:
  postgres_data:
```

### 4. Deploy with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Heroku Deployment

### Backend on Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create task-api-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CORS_ORIGIN=https://your-frontend.herokuapp.com

# Deploy
cd backend
git init
heroku git:remote -a task-api-backend
git add .
git commit -m "Initial commit"
git push heroku main

# Run migrations
heroku run npm run migrate
```

Create `backend/Procfile`:
```
web: npm start
```

### Frontend on Netlify/Vercel

**Netlify**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build frontend
cd frontend
npm run build

# Deploy
netlify deploy --prod
```

**Vercel**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

Update `frontend/.env.production`:
```env
REACT_APP_API_URL=https://task-api-backend.herokuapp.com/api/v1
```

## AWS Deployment

### Using AWS Elastic Beanstalk

**Backend**:
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
cd backend
eb init -p node.js task-api

# Create environment
eb create task-api-prod

# Set environment variables
eb setenv NODE_ENV=production \
  JWT_SECRET=your-secret \
  DB_HOST=your-rds-endpoint \
  DB_NAME=taskmanagement \
  DB_USER=admin \
  DB_PASSWORD=your-password

# Deploy
eb deploy
```

**Frontend on S3 + CloudFront**:
```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name

# Configure CloudFront distribution
# Point to S3 bucket
# Set default root object: index.html
# Add error page: 404 -> /index.html
```

### Using EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Clone repository
git clone your-repo-url
cd task-management-api

# Setup backend
cd backend
npm install --production
cp .env.example .env
# Edit .env with production values

# Run migrations
npm run migrate

# Install PM2 for process management
sudo npm install -g pm2

# Start backend
pm2 start src/server.js --name task-api
pm2 save
pm2 startup

# Setup Nginx as reverse proxy
sudo apt-get install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/task-api
```

Nginx configuration for EC2:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/frontend/build;
        try_files $uri /index.html;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/task-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## DigitalOcean Deployment

### Using App Platform

1. **Create App**:
   - Go to DigitalOcean App Platform
   - Connect GitHub repository
   - Select branch

2. **Configure Backend**:
   - Type: Web Service
   - Build Command: `npm install`
   - Run Command: `npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     JWT_SECRET=your-secret
     ```

3. **Add Database**:
   - Add PostgreSQL database
   - Auto-configured connection string

4. **Configure Frontend**:
   - Type: Static Site
   - Build Command: `npm run build`
   - Output Directory: `build`

## Production Checklist

### Security
- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable database SSL connections
- [ ] Set up firewall rules
- [ ] Implement API authentication

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure database connection pooling
- [ ] Add database indexes
- [ ] Enable caching (Redis)
- [ ] Optimize images
- [ ] Minify frontend assets
- [ ] Use production build of React

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging (CloudWatch, Papertrail)
- [ ] Add uptime monitoring (UptimeRobot)
- [ ] Set up performance monitoring
- [ ] Configure alerts for errors
- [ ] Monitor database performance
- [ ] Track API response times

### Backup & Recovery
- [ ] Set up automated database backups
- [ ] Test backup restoration
- [ ] Configure backup retention policy
- [ ] Document recovery procedures
- [ ] Set up disaster recovery plan

### CI/CD
- [ ] Set up GitHub Actions
- [ ] Automated testing
- [ ] Automated deployment
- [ ] Rollback procedures
- [ ] Environment-specific configs

### Documentation
- [ ] API documentation updated
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Recovery procedures documented
- [ ] Architecture diagrams created

## Environment Variables Reference

### Backend Production
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=taskmanagement
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=your-32-character-secret-key
JWT_EXPIRE=24h
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend Production
```env
REACT_APP_API_URL=https://your-api-domain.com/api/v1
```

## Post-Deployment Testing

1. **Health Check**:
   ```bash
   curl https://your-api-domain.com/health
   ```

2. **API Test**:
   ```bash
   curl -X POST https://your-api-domain.com/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","password":"test123"}'
   ```

3. **Frontend Test**:
   - Open browser
   - Visit https://your-frontend-domain.com
   - Test registration
   - Test login
   - Test task creation

## Rollback Procedure

### Heroku
```bash
heroku releases
heroku rollback v123
```

### Docker
```bash
docker-compose down
docker-compose up -d --build
```

### Manual
```bash
git checkout previous-stable-tag
eb deploy  # or your deployment command
```

## Monitoring Commands

```bash
# Heroku logs
heroku logs --tail

# Docker logs
docker-compose logs -f backend

# PM2 logs
pm2 logs task-api

# Nginx logs
tail -f /var/log/nginx/error.log
```

## Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Check firewall rules
5. Verify SSL certificates

---

**Last Updated**: 2024
**Platform**: Production Ready
