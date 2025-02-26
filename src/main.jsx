import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide authentication context to the entire app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
