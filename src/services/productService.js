import axios from "axios";

const API_URL = "http://127.0.0.1:8000/products";
const getToken = () => localStorage.getItem("token");

// ✅ Fetch products with optional filters
export const getProducts = async ({ search = "", category = "", sortBy = "" } = {}) => {
  try {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (sortBy) params.sort_by = sortBy; // Ensure `sort_by` matches API query name

    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a product with authorization
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    throw error;
  }
};
