# 🛒 E-Commerce API

A simple Node.js + Express + PostgreSQL backend for an e-commerce application with features like:

- User Registration & Login (JWT Auth)
- Product Management (with Cloudinary image upload)
- Category Management
- Cart Functionality
- Order Placement
- Order History
- Swagger API Docs

---

## 📦 Tech Stack

- Node.js
- Express.js
- PostgreSQL (Sequelize ORM)
- Multer + Cloudinary (for file uploads)
- JWT (for auth)
- Swagger (API Documentation)

---

## 🚀 Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://git@github.com:rizwan-muhd/ECOM-API.git
cd ecom-api
```

2️⃣ Install Dependencies
bash
npm install

3️⃣ Setup PostgreSQL Database Locally
Create a local PostgreSQL DB:

psql -U postgres

CREATE DATABASE ecom;

5️⃣ Start the Server

npm run dev

# swagger docs

# http://localhost:8001/api-docs/
