# Push Code to GitHub - Authentication Fix

## Issue
Git is trying to use a different GitHub account. You need to authenticate with the correct account.

## Solution Options:

### Option 1: Use GitHub Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "Deployment Token"
   - Select scopes: Check `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push using the token:**
   ```bash
   git push -u origin main
   ```
   - When prompted for username: Enter `maanavshekhawat`
   - When prompted for password: Paste your **Personal Access Token** (not your password)

### Option 2: Update Git Credentials

1. **Clear old credentials:**
   ```bash
   git config --global --unset credential.helper
   ```

2. **Or update Windows Credential Manager:**
   - Press `Win + R`, type `control /name Microsoft.CredentialManager`
   - Go to "Windows Credentials"
   - Find any GitHub entries and remove them
   - Try pushing again

### Option 3: Use SSH Instead

1. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:maanavshekhawat/thebhuaasacreation.git
   ```

2. **Set up SSH key** (if not already done):
   - Follow: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Option 4: Use GitHub CLI

1. **Install GitHub CLI** (if not installed):
   ```bash
   winget install --id GitHub.cli
   ```

2. **Login:**
   ```bash
   gh auth login
   ```

3. **Push:**
   ```bash
   git push -u origin main
   ```

## After Successful Push:

Once your code is pushed to GitHub, you can deploy to Vercel:

1. Go to: https://vercel.com/
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import repository: `maanavshekhawat/thebhuaasacreation`
5. **Set Root Directory to:** `frontend`
6. Click "Deploy"

