// import { useState, useEffect } from "react";
// import { getOrderHistory } from "../services/orderService";
// import "../styles/orders.css";

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getOrderHistory()
//       .then(setOrders)
//       .catch(() => setError("Failed to fetch order history"));
//   }, []);

//   return (
//     <div className="order-history">
//       <h2>Your Order History</h2>
//       {error && <p className="error">{error}</p>}
//       {orders.length === 0 ? (
//         <p>No past orders found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Total Price</th>
//               <th>Created At</th>
//               <th>Products</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.order_id}>
//                 <td>{order.order_id}</td>
//                 <td>${order.total_price.toFixed(2)}</td>
//                 <td>{new Date(order.created_at).toLocaleString()}</td>
//                 <td>
//                   {order.products.map((product) => (
//                     <div key={product.product_id}>
//                       <strong>{product.name}</strong> - {product.quantity} × ${product.price}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
