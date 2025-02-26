import axios from "axios";

const PRODUCTS_URL = "http://127.0.0.1:8000/products";

export const getProducts = async () => {
  const response = await axios.get(PRODUCTS_URL);
  return response.data; // Fetch all products
};

export const getCategories = async () => {
  const response = await axios.get(`${PRODUCTS_URL}/categories`);
  return response.data; // Fetch unique categories
};
