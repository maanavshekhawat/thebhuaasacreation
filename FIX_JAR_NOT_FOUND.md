# 🔧 Fix: "Unable to access jarfile" Error on Railway

## Problem:
Railway can't find the JAR file: `target/ecommerce-backend-1.0.0.jar`

## Solution Options:

### Option 1: Update Railway Settings (Recommended)

Since Railway uses NIXPACKS which auto-detects, we need to ensure the build happens correctly.

**In Railway Dashboard:**

1. Go to your backend service
2. Go to **Settings** → **Build**
3. **Build Command**: Leave empty (let NIXPACKS auto-detect) OR set to:
   ```
   cd backend && mvn clean package -DskipTests
   ```
4. **Start Command**: Set to:
   ```
   cd backend && java -Xmx512m -Xms256m -jar target/ecommerce-backend-1.0.0.jar
   ```
5. **Root Directory**: Make sure it's set to `backend`

### Option 2: Use Dockerfile Instead

Railway can use Dockerfile which is more reliable:

1. Railway will auto-detect `Dockerfile` in `backend/` folder
2. The Dockerfile is already configured correctly ✅
3. Just make sure Root Directory is `backend`

### Option 3: Check Build Logs

1. Go to **Build Logs** tab (not Deploy Logs)
2. Check if Maven build succeeded
3. Look for: `BUILD SUCCESS` or `BUILD FAILURE`
4. If build failed, fix those errors first

## Quick Fix Steps:

### Step 1: Verify Root Directory
1. Settings → **General**
2. **Root Directory**: Should be `backend`
3. If not, set it and save

### Step 2: Update Start Command
1. Settings → **Deploy**
2. **Start Command**: 
   ```
   cd backend && mvn clean package -DskipTests && java -jar target/ecommerce-backend-1.0.0.jar
   ```
   OR if Root Directory is already `backend`:
   ```
   mvn clean package -DskipTests && java -jar target/ecommerce-backend-1.0.0.jar
   ```

### Step 3: Check Build Logs
1. Go to **Build Logs** tab
2. Verify Maven build completed
3. Should see: `Building jar: target/ecommerce-backend-1.0.0.jar`

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Watch **Build Logs** first, then **Deploy Logs**

## Alternative: Use Dockerfile

If NIXPACKS keeps having issues:

1. Railway will auto-detect `backend/Dockerfile`
2. Make sure Root Directory is `backend`
3. Railway will build using Docker
4. This is more reliable

## 🔍 Debug Steps:

1. **Check Build Logs:**
   - Did Maven build succeed?
   - Is JAR file created?
   - Any build errors?

2. **Check File Structure:**
   - Is `backend/` the root?
   - Is `pom.xml` in `backend/`?
   - Is `target/` folder created?

3. **Check Start Command:**
   - Is path correct?
   - Is JAR name correct?

## Most Likely Fix:

**In Railway Settings → Deploy:**
- **Start Command**: 
  ```
  mvn clean package -DskipTests && java -jar target/ecommerce-backend-1.0.0.jar
  ```
- Make sure **Root Directory** is `backend`

Then redeploy!

