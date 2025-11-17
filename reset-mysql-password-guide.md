# Reset MySQL Root Password - Step by Step Guide

## Method 1: Using MySQL Command Line (If you can access it)

If you can still access MySQL somehow, run:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
```

## Method 2: Reset Password When Forgotten (Recommended)

### Step 1: Stop MySQL Service
Open PowerShell as Administrator and run:
```powershell
net stop MySQL80
```

### Step 2: Start MySQL in Safe Mode
In the same PowerShell window, navigate to MySQL bin directory and start MySQL without password:
```powershell
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
.\mysqld.exe --console --skip-grant-tables --shared-memory
```
**Keep this window open!**

### Step 3: Connect to MySQL (New Terminal)
Open a NEW PowerShell window (keep the safe mode one running) and run:
```powershell
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
.\mysql.exe -u root
```

### Step 4: Reset Password
In the MySQL prompt, run these commands:
```sql
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

### Step 5: Stop Safe Mode and Restart MySQL
1. Go back to the safe mode window and press `Ctrl+C` to stop it
2. Then restart MySQL service:
```powershell
net start MySQL80
```

### Step 6: Test New Password
```powershell
mysql -u root -proot -e "SELECT 'Password reset successful!' as message;"
```

## Quick Script (Alternative)
I can create a PowerShell script to automate this process if needed.

