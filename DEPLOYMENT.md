# Deployment Guide

## 🚀 Production Deployment

This guide covers deploying the MERN Weather App to various platforms.

## Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend
vercel
```

Configuration (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
```

### Option 2: Netlify

```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

netlify.toml:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend.com/api/:splat"
  status = 200
```

### Option 3: AWS S3 + CloudFront

```bash
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Backend Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create weather-app-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set OPENWEATHER_API_KEY=your_api_key
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

Procfile:
```
web: npm start
```

### Option 2: Railway

```bash
npm install -g @railway/cli

railway login
railway init
railway deploy
```

### Option 3: AWS Lambda + API Gateway

1. Create Lambda function
2. Set environment variables
3. Configure API Gateway
4. Deploy with SAM or Serverless

### Option 4: DigitalOcean App Platform

1. Connect GitHub repository
2. Specify build command: `npm install`
3. Set environment variables
4. Specify start command: `npm start`

### Option 5: Docker + Cloud Run

```bash
# Google Cloud Run
gcloud builds submit --tag gcr.io/PROJECT-ID/weather-app
gcloud run deploy weather-app --image gcr.io/PROJECT-ID/weather-app
```

## Database Deployment

### MongoDB Atlas

1. Create cluster at mongodb.com
2. Get connection string
3. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weather-app
```

## Full Stack Deployment

### Docker Compose on Linux Server

1. Install Docker & Docker Compose
2. Push docker-compose.yml to server
3. Set environment variables
4. Run: `docker-compose up -d`

### Using PM2 (Production Process Manager)

```bash
npm install -g pm2

# Start backend
cd backend
pm2 start server.js --name "weather-backend"

# Start frontend (build first)
cd frontend
npm run build
pm2 serve dist/ 3000 --name "weather-frontend"

# Save PM2 config
pm2 save
pm2 startup
```

ecosystem.config.js:
```javascript
module.exports = {
  apps: [
    {
      name: 'weather-backend',
      script: './server.js',
      cwd: './backend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'weather-frontend',
      script: 'serve',
      args: 'dist -l 3000',
      cwd: './frontend'
    }
  ]
};
```

## Environment Variables

Production `.env`:
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/weather-app

# API
OPENWEATHER_API_KEY=your_production_key

# Security
JWT_SECRET=strong_random_secret

# CORS
CORS_ORIGIN=https://yourdomain.com
```

## Security Checklist

- [ ] Use HTTPS/SSL certificates
- [ ] Set strong JWT_SECRET
- [ ] Enable database authentication
- [ ] Use environment variables for secrets
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Set security headers with Helmet
- [ ] Use MongoDB IP whitelist
- [ ] Enable database backups
- [ ] Monitor error logs
- [ ] Set up CDN for frontend assets
- [ ] Implement request logging

## Performance Optimization

### Backend
- Add caching layer (Redis)
- Implement pagination
- Use database indexes
- Enable gzip compression
- Use async/await properly

### Frontend
- Enable image optimization
- Lazy load components
- Minify assets
- Use CDN for static files
- Implement service workers

## Monitoring & Logging

### Frontend Monitoring
- Use Sentry for error tracking
- Set up analytics (Google Analytics)
- Monitor performance (Web Vitals)

### Backend Monitoring
```bash
npm install @sentry/node
npm install winston  # Logging
```

## CI/CD Pipeline

### GitHub Actions

.github/workflows/deploy.yml:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci && npm run build
      - run: npm run deploy
```

## Troubleshooting Production

### High Response Times
- Check database indexes
- Add caching
- Use CDN
- Monitor server resources

### Database Connection Issues
- Verify connection string
- Check IP whitelist (MongoDB Atlas)
- Review firewall rules
- Monitor connection pool

### CORS Errors
- Verify frontend URL in CORS config
- Check backend CORS middleware
- Review browser console

### Memory Leaks
- Use memory profiling tools
- Check for event listener cleanup
- Monitor PM2 memory usage

## Scaling

### Horizontal Scaling
- Load balance multiple instances
- Use containerization (Docker)
- Database replication

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add caching layer

## Backup & Recovery

```bash
# MongoDB backup
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore
mongorestore --uri="mongodb+srv://..." ./backup
```

## Domain & SSL

1. Point domain to server/CDN
2. Generate SSL certificate (Let's Encrypt)
3. Configure HTTPS
4. Set up auto-renewal

---

For more help, see [README.md](./README.md)
