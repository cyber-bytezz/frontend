import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/adminlogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin(email, password);
      login({ email: response.email, is_admin: response.is_admin }, response.access_token);

      if (response.is_admin) {
        navigate("/admin/dashboard");
      } else {
        setError("Access Denied. Admins only!");
      }
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <h2 className="admin-login-title">Admin Login</h2>
        {error && <p className="admin-login-error">{error}</p>}
        <form className="admin-login-form" onSubmit={handleLogin}>
          <div className="admin-input-group">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="admin-input"
            />
          </div>
          <div className="admin-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-input"
            />
          </div>
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
