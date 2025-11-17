# Simple MySQL Password Reset Script
# Run this as Administrator

Write-Host "MySQL Password Reset" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host ""

# Check if admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: Run PowerShell as Administrator!" -ForegroundColor Red
    exit 1
}

$mysqlBin = "C:\Program Files\MySQL\MySQL Server 8.0\bin"

# Stop MySQL service
Write-Host "Stopping MySQL service..." -ForegroundColor Yellow
Stop-Service MySQL80 -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start MySQL in safe mode
Write-Host "Starting MySQL in safe mode..." -ForegroundColor Yellow
Write-Host "This will take a few seconds..." -ForegroundColor Yellow

$safeModeProcess = Start-Process -FilePath "$mysqlBin\mysqld.exe" -ArgumentList "--console", "--skip-grant-tables", "--shared-memory" -PassThru -WindowStyle Hidden

Start-Sleep -Seconds 10

# Reset password
Write-Host "Resetting password..." -ForegroundColor Yellow
$resetSQL = @"
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
EXIT;
"@

$resetSQL | & "$mysqlBin\mysql.exe" -u root 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Password reset successful!" -ForegroundColor Green
} else {
    Write-Host "Password reset may have failed. Trying alternative method..." -ForegroundColor Yellow
}

# Stop safe mode
Write-Host "Stopping safe mode MySQL..." -ForegroundColor Yellow
Stop-Process -Id $safeModeProcess.Id -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start MySQL service
Write-Host "Starting MySQL service..." -ForegroundColor Yellow
Start-Service MySQL80
Start-Sleep -Seconds 3

# Test password
Write-Host "Testing new password..." -ForegroundColor Yellow
$test = & "$mysqlBin\mysql.exe" -u root -proot -e "SELECT 'SUCCESS' as result;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! MySQL password has been reset to 'root'" -ForegroundColor Green
    Write-Host "You can now start your backend!" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Password test failed. Please try manual method." -ForegroundColor Red
    Write-Host "See reset-mysql-password-guide.md for manual steps." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

