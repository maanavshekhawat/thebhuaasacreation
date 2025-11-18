# 🔧 Fix: Use Dockerfile Instead of NIXPACKS

## Problem:
NIXPACKS builds the JAR, but Maven isn't available in runtime container to run `mvn` command.

## Solution: Use Dockerfile (More Reliable)

Railway can use your Dockerfile which is more reliable for Spring Boot.

### Step 1: Update Railway Settings

1. Go to Railway: https://railway.app/
2. Click your backend service
3. Go to **Settings** → **Build**
4. **Builder**: Change from "NIXPACKS" to **"Dockerfile"**
5. Railway will auto-detect `backend/Dockerfile`
6. Click **Save**

### Step 2: Update Start Command (Optional)

1. Go to **Settings** → **Deploy**
2. **Start Command**: Can be empty (Dockerfile handles it) OR:
   ```
   java -Xmx512m -Xms256m -jar app.jar
   ```
3. Click **Save**

### Step 3: Verify Root Directory

1. Go to **Settings** → **General**
2. **Root Directory**: Should be `backend`
3. If not, set it to `backend`
4. Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"**
3. Watch **Build Logs** - should use Dockerfile now
4. Should build successfully!

## Why Dockerfile is Better:

- ✅ Maven available during build
- ✅ Java available during runtime
- ✅ More predictable
- ✅ Already configured correctly

## Alternative: Keep NIXPACKS but Fix Start Command

If you want to keep NIXPACKS:

1. **Settings** → **Deploy**
2. **Start Command**: 
   ```
   java -Xmx512m -Xms256m -jar target/ecommerce-backend-1.0.0.jar
   ```
   (Remove `mvn` command - NIXPACKS already built it)
3. Click **Save**
4. Redeploy

## ✅ Recommended: Use Dockerfile

The Dockerfile approach is more reliable. Just change builder to "Dockerfile" in Railway settings!

