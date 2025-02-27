import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../services/orderService";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    alert("Order status updated!");
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id} | Status: {order.status}</p>
          <select onChange={(e) => handleStatusChange(order.id, e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderList;
