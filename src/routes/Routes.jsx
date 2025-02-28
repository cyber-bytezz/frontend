import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminDashboard from "../pages/AdminDashboard";
import ManageProducts from "../pages/ManageProducts";
import ManageOrders from "../pages/ManageOrders";
import AdminLogin from "../pages/AdminLogin";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminAddProduct from "../pages/AdminAddProduct";  // ✅ Import Add Product Page

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />

          {/* ✅ Admin Routes (Protected) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} /> 
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <ManageOrders />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h2>404 - Not Found</h2>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRoutes;
