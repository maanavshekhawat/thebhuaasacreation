# Deploy Frontend to Vercel - Step by Step

## Quick Steps:

### 1. Push Code to GitHub (If not already done)

```bash
# In the project root directory
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Sign up/Login** with your GitHub account
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure Project**:
   - **Root Directory**: Click "Edit" and set to `frontend`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

6. **Environment Variables** (Optional for now):
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = (leave empty for now, we'll add backend URL later)
   - Or add: `VITE_API_URL` = `http://localhost:8080/api` for testing

7. **Click "Deploy"**

### 3. Wait for Deployment

- Vercel will automatically:
  - Install dependencies
  - Build your app
  - Deploy to a URL like `https://your-app-name.vercel.app`

### 4. Access Your Deployed App

- Once deployed, you'll get a URL
- Visit the URL to see your app live!

### 5. Update Backend URL Later

After deploying backend, come back to Vercel:
1. Go to your project → Settings → Environment Variables
2. Update `VITE_API_URL` with your backend URL
3. Redeploy (or it will auto-redeploy)

## Alternative: Deploy via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts
```

## Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Check for TypeScript/ESLint errors

**App loads but API calls fail?**
- Check browser console for CORS errors
- Update `VITE_API_URL` environment variable
- Ensure backend is deployed and CORS is configured

**Images not loading?**
- Check image paths
- Ensure backend is running for uploaded images
- Use absolute URLs for external images

