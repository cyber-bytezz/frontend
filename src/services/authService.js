import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth";

// Register new user
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

// Login user - Must send form-encoded data for OAuth2PasswordRequestForm
export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await axios.post(`${API_URL}/login`, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data;
};

export const adminLogin = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email); // Must be "username" not "email"
    formData.append("password", password);

    const response = await axios.post(`${API_URL}/login`, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data;
  } catch (error) {
    console.error("Error logging in as admin:", error.response?.data || error.message);
    throw error;
  }
};