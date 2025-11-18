# 🔧 Fix: NumberFormatException - MYSQLPORT Not Resolved

## Problem:
Error: `NumberFormatException: For input string: "${MYSQLPORT}"`

Railway is not resolving `${MYSQLPORT}` in the URL string.

## Solution: Set Individual Variables in Railway

Instead of using `${MYSQLPORT}` in a string, Railway needs the actual values.

### Step 1: Reference MySQL Variables

1. Go to Railway → Your backend service → **Variables** tab
2. Click **"Reference Variable"**
3. Select your **MySQL service**
4. Reference these variables:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

### Step 2: Set Spring Boot Variables

**Option A: Use Direct Values (Easiest)**

After referencing MySQL variables, Railway should give you the actual values. Set:

**Variable 1:**
- Name: `SPRING_DATASOURCE_URL`
- Value: Click the `{}` icon next to the input field
- Select MySQL variables from the picker
- OR manually construct (Railway should show actual values):
  ```
  jdbc:mysql://[ACTUAL_HOST]:[ACTUAL_PORT]/[ACTUAL_DATABASE]?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC
  ```
  Replace `[ACTUAL_HOST]`, `[ACTUAL_PORT]`, `[ACTUAL_DATABASE]` with the actual values Railway shows you.

**Variable 2:**
- Name: `SPRING_DATASOURCE_USERNAME`
- Value: Use Railway's variable picker to select `MYSQLUSER` (should show actual value)

**Variable 3:**
- Name: `SPRING_DATASOURCE_PASSWORD`
- Value: Use Railway's variable picker to select `MYSQLPASSWORD` (should show actual value)

**Option B: Use Railway's Variable Syntax**

If Railway supports `${{}}` syntax:

```
SPRING_DATASOURCE_URL = jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME = ${{MySQL.MYSQLUSER}}
SPRING_DATASOURCE_PASSWORD = ${{MySQL.MYSQLPASSWORD}}
```

### Step 3: Get Actual Values from MySQL Service

1. Go to your **MySQL service**
2. Go to **Variables** tab
3. You should see the actual values:
   - `MYSQLHOST` = (actual host, e.g., `containers-us-west-xxx.railway.app`)
   - `MYSQLPORT` = (actual port, e.g., `3306`)
   - `MYSQLDATABASE` = (actual database name)
   - `MYSQLUSER` = (actual username)
   - `MYSQLPASSWORD` = (actual password)

4. **Copy these actual values** and use them in your backend variables

### Step 4: Set Variables with Actual Values

In your backend service → Variables:

**Variable 1:**
- Name: `SPRING_DATASOURCE_URL`
- Value: `jdbc:mysql://[paste MYSQLHOST value]:[paste MYSQLPORT value]/[paste MYSQLDATABASE value]?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC`

**Example:**
```
jdbc:mysql://containers-us-west-123.railway.app:3306/railway?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC
```

**Variable 2:**
- Name: `SPRING_DATASOURCE_USERNAME`
- Value: `[paste MYSQLUSER value]`

**Variable 3:**
- Name: `SPRING_DATASOURCE_PASSWORD`
- Value: `[paste MYSQLPASSWORD value]`

### Step 5: Redeploy

1. Save all variables
2. Go to **Deployments** tab
3. Click **"Redeploy"**
4. Watch **Deploy Logs** - should start successfully now!

## ✅ Expected Result:

After this, you should see in Deploy Logs:
- ✅ `Started EcommerceApplication`
- ✅ No more `NumberFormatException`
- ✅ Backend running successfully

## 🔍 Quick Check:

1. Go to MySQL service → Variables tab
2. Copy the **actual values** (not the variable names)
3. Paste them into backend service variables
4. Redeploy

---

**The key is: Use the ACTUAL VALUES from MySQL service, not the variable references!**

