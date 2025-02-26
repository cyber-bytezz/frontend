import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCartItems, decreaseCartItemQuantity, removeFromCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";

const Cart = () => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      getCartItems()
        .then(setCartItems)
        .catch(() => setError("Failed to fetch cart items"));
    }
  }, [token]);

  // ✅ Fix: Update UI instantly when decreasing quantity
  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await removeFromCart(productId);
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.product_id !== productId));
      } else {
        await decreaseCartItemQuantity(productId);
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.product_id === productId ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    } catch (error) {
      setError("Failed to update cart");
    }
  };

  const handleCheckout = async () => {
    try {
      await placeOrder();
      alert("Order placed successfully!");
      setCartItems([]);
    } catch (err) {
      setError("Failed to place order.");
    }
  };

  if (!token) {
    return <p>Please login to view your cart.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th> {/* Column for "-" button */}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product_id}>
                  <td><strong>{item.name}</strong></td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDecreaseQuantity(item.product_id, item.quantity)}
                      style={{ backgroundColor: "black", color: "white", border: "none", padding: "5px 10px" }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCheckout} style={{ marginTop: "10px" }}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;
