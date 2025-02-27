import axios from "axios";

const API_URL = "http://127.0.0.1:8000/cart/";
const getToken = () => localStorage.getItem("token");

// ✅ Get all cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching cart items:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Add product to cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      API_URL,
      { product_id: productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error adding product to cart:", error.response?.data || error.message);
    throw error;
  }
};

export const decreaseCartItemQuantity = async (productId) => {
  try {
    await axios.put(`${API_URL}${productId}/decrease`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error decreasing cart item quantity:", error);
    throw error;
  }
};

// ✅ Remove from cart if quantity is 1
export const removeFromCart = async (productId) => {
  try {
    await axios.delete(`${API_URL}${productId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};