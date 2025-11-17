# PowerShell script to set up Git and push to GitHub
# Run this script in the project root directory

Write-Host "Setting up Git for deployment..." -ForegroundColor Cyan

# Check if git is initialized
if (Test-Path .git) {
    Write-Host "Git is already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit - Ready for deployment"
    Write-Host "Changes committed!" -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a GitHub repository:" -ForegroundColor White
Write-Host "   - Go to: https://github.com/new" -ForegroundColor Gray
Write-Host "   - Name it: bhuaasa-ecommerce (or any name)" -ForegroundColor Gray
Write-Host "   - Click Create repository" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Connect and push to GitHub:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "   (Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Then deploy to Vercel:" -ForegroundColor White
Write-Host "   - Go to: https://vercel.com/" -ForegroundColor Gray
Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
Write-Host "   - Set root directory to: frontend" -ForegroundColor Gray
Write-Host "   - Click Deploy!" -ForegroundColor Gray
Write-Host ""
Write-Host "See DEPLOY_FRONTEND_NOW.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
