# Deployment Guide - The Bhuaasa Creation

This guide covers deploying both frontend and backend to free hosting services.

## Deployment Options

### Recommended Free Services:

**Frontend:**
- **Vercel** (Recommended) - Free, fast, easy
- **Netlify** - Free, great for React apps
- **GitHub Pages** - Free but limited

**Backend:**
- **Railway** (Recommended) - Free tier, easy MySQL setup
- **Render** - Free tier with limitations
- **Fly.io** - Free tier available

**Database:**
- **Railway MySQL** - Free tier
- **PlanetScale** - Free MySQL database
- **Supabase** - Free PostgreSQL (would need to change from MySQL)

## Option 1: Vercel (Frontend) + Railway (Backend + MySQL) - RECOMMENDED

### Step 1: Deploy Frontend to Vercel

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com/
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Set root directory to `frontend`
   - Build settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Environment Variables: None needed for now
   - Click "Deploy"

3. **Update API URLs**
   - After deployment, you'll get a URL like `https://your-app.vercel.app`
   - Update `frontend/vite.config.js` to point to your backend URL

### Step 2: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub
   - Click "New Project"

2. **Add MySQL Database**
   - Click "New" → "Database" → "Add MySQL"
   - Railway will create a MySQL database automatically
   - Note the connection details (host, port, database, username, password)

3. **Deploy Backend**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Set root directory to `backend`
   - Railway will auto-detect it's a Java/Maven project

4. **Configure Environment Variables**
   - Go to your backend service → Variables
   - Add these variables:
     ```
     SPRING_DATASOURCE_URL=jdbc:mysql://YOUR_MYSQL_HOST:3306/YOUR_DB_NAME
     SPRING_DATASOURCE_USERNAME=YOUR_DB_USER
     SPRING_DATASOURCE_PASSWORD=YOUR_DB_PASSWORD
     SPRING_JPA_HIBERNATE_DDL_AUTO=update
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_secret
     ```
   - Replace with actual values from Railway MySQL service

5. **Update CORS Settings**
   - Add your Vercel frontend URL to CORS allowed origins
   - Update `backend/src/main/java/com/clothing/ecommerce/config/SecurityConfig.java`

6. **Deploy**
   - Railway will automatically build and deploy
   - Note your backend URL (e.g., `https://your-backend.railway.app`)

### Step 3: Update Frontend to Use Backend URL

1. **Update Vite Config**
   - In `frontend/vite.config.js`, update the proxy or API URL
   - Or use environment variables

2. **Redeploy Frontend**
   - Push changes to GitHub
   - Vercel will auto-deploy

## Option 2: Netlify (Frontend) + Render (Backend)

### Frontend on Netlify

1. Go to https://www.netlify.com/
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Select your repo, set base directory to `frontend`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Backend on Render

1. Go to https://render.com/
2. Sign up with GitHub
3. "New" → "Web Service"
4. Connect your repo, set root directory to `backend`
5. Build command: `./mvnw clean package` (or `mvn clean package`)
6. Start command: `java -jar target/ecommerce-backend-1.0.0.jar`
7. Add PostgreSQL database (free tier)
8. Update environment variables

## Quick Setup Scripts

### For Railway Deployment

Create `railway.json` in backend folder:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/ecommerce-backend-1.0.0.jar",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### For Vercel Deployment

Create `vercel.json` in frontend folder:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.railway.app/api/$1"
    }
  ]
}
```

## Important Configuration Updates

### 1. Update Backend CORS
Update `backend/src/main/java/com/clothing/ecommerce/config/SecurityConfig.java`:
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000", 
    "http://localhost:3001",
    "https://your-frontend.vercel.app",  // Add your frontend URL
    "https://your-frontend.netlify.app"   // If using Netlify
));
```

### 2. Update Frontend API URLs
Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend.railway.app
```

Update `frontend/src/store/slices/productSlice.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api'
```

### 3. Update File Upload Paths
If using file uploads, ensure the upload directory is accessible or use cloud storage (AWS S3, Cloudinary).

## Post-Deployment Checklist

- [ ] Frontend is accessible
- [ ] Backend API is accessible
- [ ] Database connection works
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] File uploads work (if applicable)
- [ ] Payment gateway works (Razorpay keys configured)
- [ ] SSL certificates are active (HTTPS)

## Troubleshooting

### Backend won't start
- Check environment variables
- Check database connection
- Check logs in Railway/Render dashboard

### CORS errors
- Update CORS configuration in SecurityConfig
- Add frontend URL to allowed origins

### Database connection fails
- Verify database credentials
- Check if database is accessible from backend
- Ensure database is created

## Cost Estimate

**Free Tier:**
- Vercel: Free (unlimited for personal projects)
- Railway: $5/month free credit (usually enough for small apps)
- Netlify: Free (generous limits)
- Render: Free tier available

**Total: $0-5/month** for small to medium traffic

