import { useState, useEffect } from "react";
import { getOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import "../styles/orders.css"; // New CSS for Orders

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      getOrders()
        .then((data) => {
          // Ensure that the data is an array. Otherwise, set orders to an empty array.
          setOrders(Array.isArray(data) ? data : []);
        })
        .catch(() => setError("Failed to fetch orders"));
    }
  }, [token]);

  if (!token) {
    return <p>Please login to view your orders.</p>;
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {error && <p className="error">{error}</p>}
      {Array.isArray(orders) && orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.order_id} className="order-card">
              <div className="order-header">
                <h3>Order ID: {order.order_id}</h3>
                <p className="order-date">
                  <strong>Placed on:</strong> {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <p className="order-total">
                <strong>Total Price:</strong> ${order.total_price.toFixed(2)}
              </p>
              <h4>Items:</h4>
              <ul className="order-items">
                {order.products.map((item) => (
                  <li key={item.product_id}>
                    {item.name} - {item.quantity} x ${item.price.toFixed(2)} = ${item.total_price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
