# Admin Panel - Bhuaasa Creation

Admin panel for managing products in the e-commerce website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The admin panel will run on `http://localhost:3001`

## Admin Credentials

- **Email:** admin@bhuaasa.com
- **Password:** admin123

## Features

- Admin login
- Dashboard with statistics
- Product management (View, Add, Edit, Delete)
- Product upload with image URL

## API Endpoints

All admin endpoints are prefixed with `/api/admin`:
- `POST /api/admin/login` - Admin login
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

