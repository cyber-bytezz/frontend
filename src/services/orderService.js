import axios from "axios";

const API_URL = "http://127.0.0.1:8000/orders/";
const getToken = () => localStorage.getItem("token");

export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const placeOrder = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
