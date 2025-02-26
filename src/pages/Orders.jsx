import { useState, useEffect } from "react";
import { getOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      getOrders()
        .then(setOrders)
        .catch(() => setError("Failed to fetch orders"));
    }
  }, [token]);

  if (!token) {
    return <p>Please login to view your orders.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.order_id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
              <h3>Order ID: {order.order_id}</h3>
              <p><strong>Placed on:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
              
              <h4>Items:</h4>
              <ul>
                {order.products.map((item) => (
                  <li key={item.product_id}>
                    {item.name} - {item.quantity} x ${item.price.toFixed(2)} = ${item.total_price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
