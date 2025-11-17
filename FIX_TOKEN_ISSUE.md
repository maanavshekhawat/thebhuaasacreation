# Fix GitHub Token Permission Issue

## The Problem
Your token is being denied access. This usually means:
1. **Token doesn't have `repo` scope** - Most common issue
2. Token expired or was revoked
3. Repository has branch protection rules

## Solution: Create a New Token with Correct Permissions

### Step 1: Create New Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Name**: `Deployment Token`
4. **Expiration**: Choose your preference (90 days, 1 year, or no expiration)
5. **Select scopes**: 
   - ✅ **`repo`** (Full control of private repositories) - **THIS IS REQUIRED**
   - ✅ `workflow` (if you plan to use GitHub Actions)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)

### Step 2: Update Remote with New Token
```bash
git remote set-url origin https://maanavshekhawat:YOUR_NEW_TOKEN@github.com/maanavshekhawat/thebhuaasacreation.git
```

### Step 3: Push Again
```bash
git push -u origin main
```

## Alternative: Use GitHub Desktop or Web Interface

If tokens keep failing, you can:
1. Use **GitHub Desktop** app
2. Or use **GitHub Web Interface** to upload files
3. Or use **SSH keys** instead of tokens

## After Successful Push

Once code is pushed, deploy to Vercel:
1. Go to: https://vercel.com/
2. Sign in with GitHub
3. Import: `maanavshekhawat/thebhuaasacreation`
4. Set Root Directory: `frontend`
5. Deploy!

