# Quick Deployment Guide

## 🚀 Deploy Frontend + Backend in 3 Steps

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy Backend (Railway - Recommended)

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory to `backend`
6. Add MySQL database:
   - Click "New" → "Database" → "Add MySQL"
7. Add Environment Variables:
   - `SPRING_DATASOURCE_URL` = (from MySQL service)
   - `SPRING_DATASOURCE_USERNAME` = (from MySQL service)
   - `SPRING_DATASOURCE_PASSWORD` = (from MySQL service)
   - `RAZORPAY_KEY_ID` = your_razorpay_key
   - `RAZORPAY_KEY_SECRET` = your_razorpay_secret
   - `ALLOWED_ORIGINS` = https://your-frontend.vercel.app
8. Note your backend URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend (Vercel - Recommended)

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "New Project" → Import your repo
4. Configure:
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.railway.app/api`
6. Click "Deploy"

### Step 4: Update Backend CORS (Important!)

After frontend is deployed, update backend environment variable:
- `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`

Redeploy backend for changes to take effect.

## ✅ Done!

Your app is now live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`

## Alternative: Netlify for Frontend

1. Go to https://www.netlify.com/
2. "Add new site" → "Import an existing project"
3. Connect GitHub repo
4. Settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variable: `VITE_API_URL`

## Troubleshooting

**CORS Errors?**
- Update `ALLOWED_ORIGINS` in backend with your frontend URL
- Include both `http://localhost:3000` (for local dev) and production URL

**Database Connection Failed?**
- Check environment variables in Railway
- Ensure MySQL service is running
- Verify connection string format

**Frontend Can't Connect to Backend?**
- Check `VITE_API_URL` environment variable
- Ensure backend URL includes `/api` at the end
- Check browser console for errors

