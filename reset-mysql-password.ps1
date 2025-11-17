# MySQL Password Reset Script
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MySQL Root Password Reset Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

$mysqlBinPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin"
$mysqlService = "MySQL80"
$newPassword = "root"

Write-Host "Step 1: Checking MySQL service..." -ForegroundColor Yellow
$service = Get-Service -Name $mysqlService -ErrorAction SilentlyContinue

if (-not $service) {
    Write-Host "ERROR: MySQL service not found!" -ForegroundColor Red
    exit 1
}

Write-Host "MySQL service found: $($service.Status)" -ForegroundColor Green
Write-Host ""

# Step 1: Stop MySQL
Write-Host "Step 2: Stopping MySQL service..." -ForegroundColor Yellow
try {
    Stop-Service -Name $mysqlService -Force
    Start-Sleep -Seconds 3
    Write-Host "MySQL service stopped successfully." -ForegroundColor Green
} catch {
    Write-Host "ERROR: Could not stop MySQL service: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Starting MySQL in safe mode..." -ForegroundColor Yellow
Write-Host "This will open a new window. DO NOT CLOSE IT!" -ForegroundColor Cyan
Write-Host ""

# Start MySQL in safe mode in a new window
$safeModeScript = @"
cd '$mysqlBinPath'
Write-Host 'MySQL Safe Mode Started - DO NOT CLOSE THIS WINDOW!' -ForegroundColor Yellow
Write-Host 'Press Ctrl+C in this window when you are done resetting the password.' -ForegroundColor Yellow
Write-Host ''
.\mysqld.exe --console --skip-grant-tables --shared-memory
"@

$safeModeScriptPath = "$env:TEMP\mysql_safe_mode.ps1"
$safeModeScript | Out-File -FilePath $safeModeScriptPath -Encoding UTF8

Start-Process powershell -ArgumentList "-NoExit", "-File", $safeModeScriptPath

Write-Host "Waiting 5 seconds for MySQL safe mode to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Step 4: Resetting password..." -ForegroundColor Yellow

# Connect and reset password
$resetScript = @"
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$newPassword';
FLUSH PRIVILEGES;
EXIT;
"@

$resetScriptPath = "$env:TEMP\mysql_reset.sql"
$resetScript | Out-File -FilePath $resetScriptPath -Encoding UTF8

try {
    & "$mysqlBinPath\mysql.exe" -u root < $resetScriptPath
    Write-Host "Password reset command executed." -ForegroundColor Green
} catch {
    Write-Host "Note: You may need to run the SQL commands manually." -ForegroundColor Yellow
    Write-Host "See instructions below." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 5: Manual steps required:" -ForegroundColor Cyan
Write-Host "1. Open a NEW PowerShell window" -ForegroundColor White
Write-Host "2. Run: cd '$mysqlBinPath'" -ForegroundColor Green
Write-Host "3. Run: .\mysql.exe -u root" -ForegroundColor Green
Write-Host "4. In MySQL, run these commands:" -ForegroundColor White
Write-Host "   USE mysql;" -ForegroundColor Green
Write-Host "   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';" -ForegroundColor Green
Write-Host "   FLUSH PRIVILEGES;" -ForegroundColor Green
Write-Host "   EXIT;" -ForegroundColor Green
Write-Host "5. Go back to the safe mode window and press Ctrl+C" -ForegroundColor White
Write-Host "6. Then run: net start MySQL80" -ForegroundColor Green
Write-Host ""

Write-Host "Press any key after you've completed the manual steps..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Step 6: Restart MySQL
Write-Host ""
Write-Host "Step 6: Restarting MySQL service..." -ForegroundColor Yellow
try {
    Start-Service -Name $mysqlService
    Start-Sleep -Seconds 3
    Write-Host "MySQL service started successfully." -ForegroundColor Green
} catch {
    Write-Host "ERROR: Could not start MySQL service: $_" -ForegroundColor Red
    Write-Host "Please start it manually: net start MySQL80" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 7: Testing new password..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

try {
    $testResult = & "$mysqlBinPath\mysql.exe" -u root -proot -e "SELECT 'Password reset successful!' as message;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS! MySQL password has been reset to 'root'" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your backend should now be able to connect to MySQL." -ForegroundColor Cyan
    } else {
        Write-Host "Password test failed. Please verify the reset was successful." -ForegroundColor Yellow
    }
} catch {
    Write-Host "Could not test password automatically." -ForegroundColor Yellow
    Write-Host "Please test manually: mysql -u root -proot" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
