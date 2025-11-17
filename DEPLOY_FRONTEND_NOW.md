# 🚀 Deploy Frontend to Vercel - Quick Guide

## ✅ Your frontend is ready! Build completed successfully.

## Method 1: Deploy via Vercel Website (Easiest - Recommended)

### Step 1: Push Code to GitHub

1. **Create a GitHub repository** (if you don't have one):
   - Go to https://github.com/new
   - Name it: `bhuaasa-ecommerce` (or any name)
   - Make it **Public** or **Private** (your choice)
   - Click "Create repository"

2. **Push your code to GitHub**:
   ```bash
   # In the project root (FSJ folder)
   git init
   git add .
   git commit -m "Initial commit - Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/
2. **Sign up/Login**:
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

3. **Import Project**:
   - Click "Add New..." → "Project"
   - Find your repository (`bhuaasa-ecommerce` or whatever you named it)
   - Click "Import"

4. **Configure Project**:
   - **Root Directory**: Click "Edit" → Type `frontend` → Click "Continue"
   - **Framework Preset**: Should auto-detect "Vite" ✅
   - **Build Command**: `npm run build` (auto-filled) ✅
   - **Output Directory**: `dist` (auto-filled) ✅
   - **Install Command**: `npm install` (auto-filled) ✅

5. **Environment Variables** (Optional for now):
   - Click "Environment Variables"
   - Add: 
     - **Name**: `VITE_API_URL`
     - **Value**: (Leave empty for now, or use `http://localhost:8080/api` for testing)
   - Click "Add"
   - Click "Save"

6. **Deploy**:
   - Click "Deploy" button
   - Wait 1-2 minutes for build to complete
   - ✅ Your app will be live at: `https://your-app-name.vercel.app`

### Step 3: Update Backend URL (After Backend is Deployed)

Once your backend is deployed:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_API_URL` with your backend URL (e.g., `https://your-backend.railway.app/api`)
3. Go to Deployments → Click "..." → "Redeploy"

---

## Method 2: Deploy via Vercel CLI (Alternative)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (Press Enter for default)
- Directory? (Press Enter, it's already `frontend`)
- Override settings? **No**

### Step 4: Production Deploy
```bash
vercel --prod
```

---

## 🎉 Success!

Your frontend is now live! Visit the URL provided by Vercel.

## 📝 Notes:

- **First deployment** takes 1-2 minutes
- **Subsequent deployments** are automatic when you push to GitHub (if you enable GitHub integration)
- **Environment variables** can be updated anytime in Vercel dashboard
- **Custom domain** can be added later in Vercel settings

## 🔧 Troubleshooting:

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check for any console errors

**App loads but API calls fail?**
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set correctly
- Ensure backend CORS allows your Vercel domain

**Need help?** Check Vercel docs: https://vercel.com/docs

