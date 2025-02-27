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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        

        {/* ✅ Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />  {/* ✅ Admin Login Page */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        

        {/* Catch-all for 404 */}
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRoutes;
