### **HexaMart - Full Project Documentation**  
**Version:** 1.0  
**Prepared By:** [Aro Barath Chandru B] 
**Date:** [28-02-2025]  

---

# **Table of Contents**
1. **Project Overview**
2. **Tech Stack**
3. **Project Structure**
4. **Backend Implementation**
   - API Endpoints
   - Database Schema
   - Authentication
   - Order Management
   - Admin Features
5. **Frontend Implementation**
   - Routing
   - Components Breakdown
   - State Management
6. **Deployment Guide**
7. **Future Enhancements**
8. **Conclusion**

---

## **1. Project Overview**
QuitQ E-Commerce is a full-fledged online shopping platform that allows users to browse products, add them to the cart, and place orders. An admin dashboard is available for managing products and orders. The system is built using **FastAPI (Backend) and React (Frontend)**, with **MySQL** as the database.

---

## **2. Tech Stack**
- **Frontend:** React, React Router, Axios, Context API
- **Backend:** FastAPI, SQLAlchemy, Pydantic, JWT Authentication
- **Database:** MySQL (SQL Workbench)
- **Authentication:** JWT-based authentication
- **Deployment:** GitHub, AWS, SQL Workbench

---

## **3. Project Structure**
```
QuitQ-Ecommerce/
│── backend/
│   ├── app/
│   │   ├── database.py       # Database connection
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── routes/
│   │   │   ├── auth.py       # Authentication routes
│   │   │   ├── products.py   # Product management routes
│   │   │   ├── cart.py       # Shopping cart routes
│   │   │   ├── orders.py     # Order management routes
│   │   │   ├── admin.py      # Admin panel routes
│   │   ├── utils/
│   │   │   ├── security.py   # Authentication & password hashing
│   │   ├── schemas.py        # Pydantic models for request validation
│   ├── main.py               # FastAPI app entry point
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Navigation Bar
│   │   │   ├── Footer.jsx    # Footer component
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Home page
│   │   │   ├── Cart.jsx      # Cart page
│   │   │   ├── Orders.jsx    # User orders page
│   │   │   ├── Checkout.jsx  # Checkout page
│   │   │   ├── Profile.jsx   # Profile page
│   │   │   ├── AdminDashboard.jsx  # Admin Dashboard
│   │   │   ├── ManageProducts.jsx  # Product management (Admin)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication Context
│   │   ├── services/
│   │   │   ├── authService.js    # Login, Register APIs
│   │   │   ├── productService.js # Product APIs
│   │   │   ├── orderService.js   # Order APIs
│   │   ├── App.jsx           # React entry point
│   │   ├── index.js          # Renders React App
│── README.md
│── requirements.txt          # Python dependencies
│── package.json              # Frontend dependencies
```

---

## **4. Backend Implementation**
### **Authentication (JWT)**
- **User Registration**
- **User Login**
- **Token-based authentication using FastAPI Security**

### **API Endpoints**
| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| POST   | `/auth/register`    | Registers a new user |
| POST   | `/auth/login`       | Authenticates user and returns JWT token |
| GET    | `/products/`        | Fetches all products |
| GET    | `/products/{id}`    | Fetches product details |
| POST   | `/cart/`            | Adds a product to the cart |
| GET    | `/cart/`            | Fetches cart items |
| POST   | `/orders/`          | Places an order |
| GET    | `/orders/`          | Fetches user orders |
| PUT    | `/orders/{id}/status` | Updates order status (Admin only) |

### **Database Schema**
**User Table**
| Column      | Type    | Description |
|------------|--------|-------------|
| id         | INT    | Primary Key |
| name       | STRING | User's name |
| email      | STRING | Unique Email |
| password_hash | STRING | Hashed Password |
| is_admin   | BOOLEAN | True for admin |

**Order Table**
| Column      | Type    | Description |
|------------|--------|-------------|
| id         | INT    | Primary Key |
| user_id    | INT    | Foreign Key (User) |
| total_price | FLOAT  | Order total |
| status     | STRING | Pending, Shipped, Delivered |
| payment_status | STRING | Payment method used |

---

## **5. Frontend Implementation**
### **Routing**
| Route           | Component         | Access |
|----------------|------------------|--------|
| `/`            | Home              | Public |
| `/login`       | Login             | Public |
| `/register`    | Register          | Public |
| `/cart`        | Cart              | Private |
| `/orders`      | Orders            | Private |
| `/checkout`    | Checkout          | Private |
| `/admin`       | AdminDashboard    | Admin |
| `/admin/products` | ManageProducts | Admin |

### **State Management (Context API)**
- **AuthContext.jsx**: Manages user authentication state.
- **Cart & Orders use useState and useEffect** for dynamic updates.

### **Key Components**
- **Navbar.jsx**: Navigation Bar with Login, Logout, Profile, Cart links.
- **Cart.jsx**: Displays cart items, allows quantity modification.
- **Checkout.jsx**: Handles order placement with shipping details.
- **AdminDashboard.jsx**: Provides access to manage products and orders.
- **ManageProducts.jsx**: Allows admin to add, delete, and update products.
- **ManageOrders.jsx**: Admin can update order statuses.

---

## **6. Deployment Guide**
### **Backend**
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### **Frontend**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start React app:
   ```bash
   npm start
   ```

---

## **7. Future Enhancements**
- **Email Notifications**
- **Generate PDF invoices**
- **Analytics for Admin Dashboard**

---

## **8. Conclusion**
HexaMart is now a fully functional e-commerce platform. Users can register, browse products, manage their cart, and place orders. Admins can manage products and track orders. The project is secure, scalable, and easy to deploy.
