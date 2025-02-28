# **HexaMart - Frontend Comprehensive Documentation**  
**Version:** 1.0  
**Prepared By:** Aro Barath Chandru B  
**Date:** 28=02-2025

---

## **Table of Contents**
1. [Introduction](#introduction)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Environment Setup](#environment-setup)  
5. [State Management](#state-management)  
6. [Routing and Navigation](#routing-and-navigation)  
7. [Components and Pages](#components-and-pages)  
8. [API Services](#api-services)  
9. [Authentication and Authorization](#authentication-and-authorization)  
10. [Admin Panel](#admin-panel)  
11. [Styling and UI](#styling-and-ui)  
12. [Deployment Guide](#deployment-guide)  
13. [Future Enhancements](#future-enhancements)  
14. [Conclusion](#conclusion)  

---

## **1. Introduction**
The **HexaMart Frontend** is a **React-based single-page application (SPA)** that provides users with a seamless shopping experience. It integrates with the **FastAPI backend** to handle authentication, product browsing, cart management, order processing, and an **admin panel for managing products and orders**.  
This documentation explains the **structure, components, API integrations, and UI flow** of the frontend in **depth**.

---

## **2. Tech Stack**
- **Framework:** React.js (with React Router for navigation)  
- **State Management:** Context API (for authentication and global state)  
- **UI Library:** Tailwind CSS  
- **HTTP Client:** Axios (for API communication)  
- **Authentication:** JWT (JSON Web Token)  
- **Routing:** React Router  
- **Deployment:** Vercel  

---

## **3. Project Structure**
The frontend follows **modular architecture** for better maintainability.

```
frontend/
│── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navbar with user authentication handling
│   │   ├── Footer.jsx       # Footer component
│   │   ├── ProtectedRoute.jsx # Protects admin routes
│   ├── context/             # Global context
│   │   ├── AuthContext.jsx  # Authentication state management
│   ├── pages/               # Different screens/pages
│   │   ├── Home.jsx         # Product listing
│   │   ├── Login.jsx        # User login page
│   │   ├── Register.jsx     # User registration page
│   │   ├── Cart.jsx         # Cart management
│   │   ├── Checkout.jsx     # Payment processing
│   │   ├── Orders.jsx       # View orders
│   │   ├── Profile.jsx      # User profile management
│   │   ├── AdminDashboard.jsx # Admin panel
│   │   ├── ManageProducts.jsx # Admin product management
│   │   ├── ManageOrders.jsx # Admin order management
│   ├── services/            # API communication logic
│   │   ├── authService.js   # Handles authentication API calls
│   │   ├── productService.js # Handles product API calls
│   │   ├── orderService.js  # Handles order API calls
│   │   ├── cartService.js   # Handles cart API calls
│   ├── styles/              # Styling and CSS
│   │   ├── navbar.css       # Styles for navbar
│   │   ├── home.css         # Styles for home page
│   ├── AppRoutes.jsx        # Centralized route handling
│   ├── App.js               # Main React component
│   ├── index.js             # Entry point for React application
│── package.json             # Project dependencies
│── README.md                # Project documentation
```

---

## **4. Environment Setup**
### **Step 1: Install Dependencies**
```bash
npm install
```
### **Step 2: Create a `.env` File**
```
REACT_APP_API_BASE_URL = "http://127.0.0.1:8000"
```
### **Step 3: Start the React App**
```bash
npm start
```

---

## **5. State Management**
We use the **Context API** for handling authentication and global state.

### **AuthContext.jsx**
- Stores user authentication status and token.
- Exposes **login()**, **logout()**, and **isAdmin**.
- Stores JWT token in **localStorage**.

```javascript
import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## **6. Routing and Navigation**
### **AppRoutes.jsx**
Handles the **frontend routes** and protects certain admin routes.

```javascript
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
```

---

## **7. Components and Pages**
Each page has **its own component**, making the UI **modular and reusable**.

### **Navbar Component**
- Displays navigation links dynamically based on user authentication.

```javascript
const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};
export default Navbar;
```

### **Admin Dashboard**
```javascript
const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/orders">Manage Orders</Link>
    </div>
  );
};
export default AdminDashboard;
```

---

## **8. API Services**
We use **Axios** for API requests.

### **authService.js**
```javascript
import axios from "axios";

export const login = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};
```

### **productService.js**
```javascript
export const getProducts = async () => {
  const response = await axios.get("/products/");
  return response.data;
};
```

---

## **9. Authentication and Authorization**
- **JWT Authentication** (Token stored in localStorage)
- **Protected Routes** (Admin Dashboard restricted)
- **Role-Based Access Control** (Admin can access extra features)

---

## **10. Admin Panel**
- **Manage Products** (Add, Update, Delete)
- **Manage Orders** (Update order status)

---

## **11. Styling and UI**
- **Tailwind CSS** used for responsive UI.
- **Reusable components** for buttons, forms, and tables.

---

## **12. Deployment Guide**
### **Deploy on Vercel**
```bash
npm run build
vercel deploy
```

---

## **13. Future Enhancements**
- **Dark Mode Support**
- **Live Chat Support**
- **Wishlist Feature**

---

## **14. Conclusion**
The HexaMart **frontend is fully responsive, modular, and scalable**. It **seamlessly integrates with the backend** and provides an intuitive user experience.
