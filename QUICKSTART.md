# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install MySQL
- Download and install MySQL from https://dev.mysql.com/downloads/
- Start MySQL service
- Default credentials (update in `backend/src/main/resources/application.properties` if different):
  - Username: `root`
  - Password: `root`

### Step 2: Start Backend

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Wait for: `Started EcommerceApplication in X.XXX seconds`

### Step 3: Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open Browser

Navigate to: http://localhost:3000

## ✅ You're Ready!

The application includes:
- 7 sample clothing products (Men's, Women's, Kids)
- Shopping cart functionality
- Product browsing and details

## 🔧 Troubleshooting

### Backend won't start?
- Check MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

### Frontend won't start?
- Run `npm install` again
- Check Node.js version (need v18+)
- Clear `node_modules` and reinstall

### Can't see products?
- Check backend is running on port 8080
- Check browser console for errors
- Verify CORS is configured correctly

## 📝 Next Steps

1. Customize products in `backend/src/main/java/com/clothing/ecommerce/config/DataInitializer.java`
2. Add your own product images
3. Customize the UI in `frontend/src/`
4. Add more features (see README.md)

