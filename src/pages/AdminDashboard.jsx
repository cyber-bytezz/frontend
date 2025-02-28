import { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBoxOpen, FaPlusCircle } from "react-icons/fa";
import "../styles/adas.css"; 

const AdminDashboard = () => {
  const { token, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !isAdmin) {
      navigate("/login"); // Redirect if not admin
    }
  }, [token, isAdmin, navigate]);
  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1 className="admin-title">Admin Panel</h1>

        <ul className="admin-menu">
          <li>
            <Link to="/admin/products" className="admin-link manage-products">
              <FaBoxOpen className="admin-icon" />
              Manage Products
            </Link>
          </li>
          <li>
            <Link to="/admin/add-product" className="admin-link add-product">
              <FaPlusCircle className="admin-icon" />
              Add Product
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
