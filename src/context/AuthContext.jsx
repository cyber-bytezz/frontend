import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ Default to `false`

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("isAdmin");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAdmin(storedAdmin ? JSON.parse(storedAdmin) : false); // ✅ Safe parsing
      } catch (error) {
        console.error("❌ Error parsing localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        setUser(null);
        setToken(null);
        setIsAdmin(false);
      }
    }
  }, []);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    setIsAdmin(!!userData.is_admin); // ✅ Ensure it's always boolean

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
    localStorage.setItem("isAdmin", JSON.stringify(!!userData.is_admin));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
