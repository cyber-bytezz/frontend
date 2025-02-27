import axios from "axios";

const API_URL = "http://127.0.0.1:8000/users";
const getToken = () => localStorage.getItem("token");

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUserProfile = async (name, email) => {
  try {
    const response = await axios.put(
      `${API_URL}/profile`,
      { name, email },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/change-password`,
      { old_password: oldPassword, new_password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error.response?.data || error.message);
    throw error;
  }
};


export const getShippingAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}/address`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data.address;
    } catch (error) {
      console.error("Error fetching address:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const updateShippingAddress = async (address) => {
    try {
      const response = await axios.put(
        `${API_URL}/address`,
        { address },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error.response?.data || error.message);
      throw error;
    }
  };