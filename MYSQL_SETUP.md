# MySQL Setup Guide

## ✅ MySQL Status
- **Installed**: MySQL 8.0.42 ✓
- **Service**: Running ✓

## 🔐 Setting Up MySQL Password

You need to configure MySQL credentials for the application. Here are your options:

### Option 1: Use Existing Root Password

If you remember your MySQL root password:

1. Update `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD_HERE
   ```

2. Test connection:
   ```bash
   mysql -u root -p
   ```
   (Enter your password when prompted)

### Option 2: Reset Root Password (If Forgotten)

1. Stop MySQL service:
   ```powershell
   net stop MySQL80
   ```

2. Start MySQL in safe mode (skip grant tables):
   ```powershell
   mysqld --console --skip-grant-tables --shared-memory
   ```

3. Open a new terminal and connect:
   ```bash
   mysql -u root
   ```

4. Reset password:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
   FLUSH PRIVILEGES;
   EXIT;
   ```

5. Stop the safe mode MySQL and restart the service:
   ```powershell
   # In the safe mode terminal, press Ctrl+C
   net start MySQL80
   ```

### Option 3: Create a New Database User (Recommended for Development)

1. Connect to MySQL as root:
   ```bash
   mysql -u root -p
   ```

2. Create a new user and database:
   ```sql
   CREATE DATABASE clothing_ecommerce;
   CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'ecommerce123';
   GRANT ALL PRIVILEGES ON clothing_ecommerce.* TO 'ecommerce_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. Update `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=ecommerce_user
   spring.datasource.password=ecommerce123
   ```

## 🚀 Quick Setup (Default Configuration)

If you want to use the default configuration from the project:

1. **Set root password to "root"** (or update application.properties with your password)

2. **Create the database** (optional - Spring Boot will create it automatically):
   ```bash
   mysql -u root -p
   ```
   ```sql
   CREATE DATABASE IF NOT EXISTS clothing_ecommerce;
   EXIT;
   ```

3. **Update backend/src/main/resources/application.properties**:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=root
   ```

## ✅ Verify Setup

Test your connection:
```bash
mysql -u root -p
# Enter your password
```

Then run:
```sql
SHOW DATABASES;
```

You should see `clothing_ecommerce` (or it will be created automatically when you start the Spring Boot app).

## 🔧 Troubleshooting

### Can't connect to MySQL?
- Make sure MySQL80 service is running: `Get-Service MySQL80`
- Check if MySQL is listening on port 3306: `netstat -an | findstr 3306`

### Forgot root password?
- Follow Option 2 above to reset it

### Port 3306 already in use?
- Check if another MySQL instance is running
- Or change the port in application.properties

## 📝 Next Steps

Once MySQL is configured:

1. Update `backend/src/main/resources/application.properties` with your credentials
2. Start the backend: `cd backend && .\mvnw.cmd spring-boot:run`
3. The database and tables will be created automatically!

---

**Note**: For production, always use strong passwords and create dedicated database users with limited privileges.

