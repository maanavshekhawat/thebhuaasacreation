# 🚀 Deploy Backend to Railway - Step by Step Guide

## ✅ Backend is Ready for Deployment!

Your backend has been configured for Railway deployment with:
- ✅ Dockerfile configured
- ✅ Railway.json configured
- ✅ Environment variables ready
- ✅ CORS configured for production
- ✅ Database connection using environment variables

## Step 1: Create Railway Account

1. Go to: https://railway.app/
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (recommended)
4. Authorize Railway to access your GitHub

## Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select: **`thebhuaasacreation`**
4. Click **"Deploy Now"**

## Step 3: Configure Service

1. Railway will auto-detect it's a Java/Spring Boot project
2. **Root Directory**: Set to `backend` (important!)
3. Railway will automatically:
   - Detect `railway.json`
   - Build using Maven
   - Deploy the JAR file

## Step 4: Add MySQL Database

1. In your project, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will create a MySQL database
4. **Copy the connection details** (you'll need them)

## Step 5: Set Environment Variables

Click on your service → **"Variables"** tab → Add these:

### Database Variables (from MySQL service):
```
SPRING_DATASOURCE_URL = (Railway will auto-generate this)
SPRING_DATASOURCE_USERNAME = (Railway will auto-generate this)
SPRING_DATASOURCE_PASSWORD = (Railway will auto-generate this)
```

**OR** if Railway doesn't auto-generate, use:
```
SPRING_DATASOURCE_URL = jdbc:mysql://MYSQLHOST:3306/MYSQLDATABASE?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME = root
SPRING_DATASOURCE_PASSWORD = (your MySQL password from Railway)
```

### CORS Variables:
```
ALLOWED_ORIGINS = https://your-frontend.vercel.app,https://your-admin.vercel.app
```

**OR** leave empty to use default wildcard patterns (recommended for now)

### Razorpay Variables (Optional - for payment):
```
RAZORPAY_KEY_ID = rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET = YOUR_SECRET_KEY
```

**Note**: Get these from https://dashboard.razorpay.com/ (see RAZORPAY_SETUP.md)

### Port Variable (Railway auto-sets this):
```
PORT = 8080
```

## Step 6: Link Database to Service

1. In your MySQL service, click **"Connect"**
2. Copy the connection variables
3. In your backend service, go to **"Variables"**
4. Click **"Reference Variable"** from MySQL service
5. Select:
   - `MYSQLHOST` → Reference as `MYSQLHOST`
   - `MYSQLUSER` → Reference as `MYSQLUSER`
   - `MYSQLPASSWORD` → Reference as `MYSQLPASSWORD`
   - `MYSQLDATABASE` → Reference as `MYSQLDATABASE`
   - `MYSQLPORT` → Reference as `MYSQLPORT`

5. Then set:
```
SPRING_DATASOURCE_URL = jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME = ${MYSQLUSER}
SPRING_DATASOURCE_PASSWORD = ${MYSQLPASSWORD}
```

## Step 7: Deploy

1. Railway will automatically start building
2. Watch the build logs
3. Once deployed, Railway will give you a URL like: `https://your-app.railway.app`
4. Your backend API will be at: `https://your-app.railway.app/api`

## Step 8: Test Your Backend

1. Visit: `https://your-app.railway.app/api/products`
2. You should see your products (or empty array if database is new)
3. Check logs in Railway dashboard for any errors

## Step 9: Update Frontend & Admin URLs

After backend is deployed:

1. **Update Frontend (Vercel)**:
   - Go to Vercel → Your frontend project → Settings → Environment Variables
   - Update `VITE_API_URL` = `https://your-app.railway.app/api`

2. **Update Admin (Vercel)**:
   - Go to Vercel → Your admin project → Settings → Environment Variables
   - Update `VITE_API_URL` = `https://your-app.railway.app/api`

3. **Redeploy both** (or they'll auto-redeploy)

## 🔧 Troubleshooting

### Build Fails?
- Check build logs in Railway
- Ensure `backend` is set as root directory
- Verify `pom.xml` is correct

### Database Connection Error?
- Check MySQL service is running
- Verify environment variables are set correctly
- Check connection string format

### CORS Errors?
- Add your frontend/admin URLs to `ALLOWED_ORIGINS`
- Or use wildcard patterns (already configured)

### Port Issues?
- Railway automatically sets `PORT` environment variable
- Your app should use `PORT` or default to 8080
- Check `application.properties` uses `${PORT:8080}`

### Application Won't Start?
- Check logs in Railway dashboard
- Verify all environment variables are set
- Check Java version (should be 17)

## 📝 Important Notes

- **Free Tier**: Railway free tier includes $5 credit/month
- **Database**: MySQL is included in free tier
- **Auto-Deploy**: Railway auto-deploys on git push (if enabled)
- **Logs**: Check logs in Railway dashboard for debugging
- **Custom Domain**: Can add custom domain later in Railway settings

## 🎉 Success!

Once deployed, your backend will be live at:
- **API Base URL**: `https://your-app.railway.app/api`
- **Products**: `https://your-app.railway.app/api/products`
- **Auth**: `https://your-app.railway.app/api/auth/login`

---

**Next Steps**: 
1. Update frontend and admin `VITE_API_URL` with your Railway URL
2. Test the full application
3. Add custom domain (optional)

