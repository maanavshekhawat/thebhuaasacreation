# Clothing E-Commerce Platform

A full-stack e-commerce application for selling clothing products, built with React, Tailwind CSS, Redux, Spring Boot, Hibernate (JPA), and MySQL.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Spring Data JPA** - Data persistence
- **Hibernate** - ORM framework
- **MySQL** - Relational database
- **Maven** - Dependency management

## 📁 Project Structure

```
FSJ/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   └── ...
│   └── package.json
│
└── backend/           # Spring Boot application
    ├── src/main/java/com/clothing/ecommerce/
    │   ├── config/        # Configuration classes
    │   ├── controller/    # REST controllers
    │   ├── model/         # Entity models
    │   ├── repository/    # Data repositories
    │   └── service/       # Business logic
    └── pom.xml
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) and npm
- **Java JDK 17** or higher
- **Maven** 3.6+ (or use the included Maven wrapper)
- **MySQL** 8.0+ (or use a cloud MySQL service)
- **Git** (optional, for version control)

## 📦 Installation & Setup

### 1. Database Setup

1. Install and start MySQL server
2. Create a database (or let the application create it automatically):
   ```sql
   CREATE DATABASE clothing_ecommerce;
   ```
3. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build and run the Spring Boot application:
   ```bash
   # Using Maven wrapper (Windows)
   .\mvnw.cmd spring-boot:run
   
   # Or using Maven (if installed globally)
   mvn spring-boot:run
   ```

3. The backend will start on `http://localhost:8080`
4. Sample products will be automatically created on first run

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:3000`

## 🎯 Features

- ✅ Product listing and browsing
- ✅ Product detail pages
- ✅ Shopping cart functionality
- ✅ Category-based filtering
- ✅ Responsive design
- ✅ RESTful API
- ✅ Database persistence with JPA/Hibernate

## 📝 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={name}` - Search products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## 🚢 Deployment Options

### Free Deployment Services

#### Frontend Deployment

1. **Vercel** (Recommended)
   - Free tier with excellent performance
   - Automatic deployments from Git
   - Global CDN
   - Setup: Connect your GitHub repo to Vercel
   - URL: https://vercel.com

2. **Netlify**
   - Free tier with good features
   - Easy setup with drag-and-drop or Git integration
   - URL: https://netlify.com

3. **GitHub Pages**
   - Free for public repositories
   - Simple static hosting
   - Note: Requires build step configuration

#### Backend Deployment

1. **Railway** (Recommended)
   - Free tier: $5 credit monthly
   - Easy Spring Boot deployment
   - Built-in MySQL database option
   - URL: https://railway.app

2. **Render**
   - Free tier available (with limitations)
   - Supports Spring Boot
   - Managed PostgreSQL/MySQL
   - URL: https://render.com

3. **Heroku** (Limited Free Tier)
   - Note: Heroku removed free tier, but has low-cost options
   - Easy deployment process
   - URL: https://heroku.com

4. **AWS Free Tier** (12 months free)
   - **EC2** - Free t2.micro instance
   - **RDS** - Free MySQL database (750 hours/month)
   - **Elastic Beanstalk** - Easy Spring Boot deployment
   - URL: https://aws.amazon.com/free

#### Database Options

1. **AWS RDS Free Tier** - MySQL (12 months)
2. **PlanetScale** - Free MySQL database
3. **Supabase** - Free PostgreSQL (can work with JPA)
4. **Railway** - Includes free MySQL with backend hosting

### Deployment Steps (Example: Vercel + Railway)

#### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable for API URL

#### Backend (Railway)
1. Push code to GitHub
2. Create new project in Railway
3. Add MySQL service
4. Deploy Spring Boot app
5. Update `application.properties` with Railway MySQL credentials
6. Update frontend API URL to Railway backend URL

### AWS Deployment (Full Stack)

#### Using AWS Elastic Beanstalk (Backend)
1. Install AWS CLI and EB CLI
2. Create Elastic Beanstalk application
3. Deploy Spring Boot JAR file
4. Configure RDS MySQL instance
5. Update security groups for database access

#### Using AWS S3 + CloudFront (Frontend)
1. Build frontend: `npm run build`
2. Upload `dist` folder to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

## 🔧 Configuration

### Environment Variables

#### Frontend
Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:8080/api
```

#### Backend
Update `application.properties` for production:
```properties
spring.datasource.url=jdbc:mysql://your-db-host:3306/clothing_ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=validate
```

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Hibernate Documentation](https://hibernate.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve existing code
- Fix bugs
- Enhance UI/UX

## 📄 License

This project is for educational purposes.

## 🎓 Next Steps for Learning

1. Add user authentication (JWT)
2. Implement order management
3. Add payment integration (Stripe/PayPal)
4. Implement admin dashboard
5. Add product image upload
6. Implement search and filters
7. Add product reviews and ratings
8. Implement email notifications

## 💡 Tips

- Start with local development before deploying
- Use environment variables for sensitive data
- Enable CORS properly for production
- Use HTTPS in production
- Implement proper error handling
- Add logging for debugging
- Consider using Docker for containerization

---

Happy coding! 🎉

