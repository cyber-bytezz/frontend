import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaUserCircle } from "react-icons/fa";
import "../styles/navbar.css"; // Import your new CSS

const Navbar = () => {
  const { user, token, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate logout delay
    logout();
    setIsLoggingOut(false);
    navigate("/");
  };

  return (
    <>
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <img
              src="https://cdn.worldvectorlogo.com/logos/hexaware-technologies-1.svg"
              alt="QuitQ Logo"
              className="navbar-logo-img"
            />
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>

          <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            {token ? (
              <>
                <li>
                  <Link to="/cart" onClick={() => setMenuOpen(false)}>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/orders" onClick={() => setMenuOpen(false)}>
                    Orders
                  </Link>
                </li>

                <li className="profile-dropdown">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <FaUserCircle style={{ fontSize: "22px" }} />
                  </Link>
                </li>

                {isAdmin && (
                  <li>
                    <Link to="/admin" onClick={() => setMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={handleLogout}
                    className={`logout-btn ${isLoggingOut ? "spinning" : ""}`}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Logging Out..." : "Logout"}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
