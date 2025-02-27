import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCartItems, decreaseCartItemQuantity, removeFromCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css"; // Same CSS as before

const Cart = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      getCartItems()
        .then(setCartItems)
        .catch(() => setError("Failed to fetch cart items"));
    }
  }, [token]);

  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await removeFromCart(productId);
        setCartItems((prev) =>
          prev.filter((item) => item.product_id !== productId)
        );
      } else {
        await decreaseCartItemQuantity(productId);
        setCartItems((prev) =>
          prev.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    } catch (error) {
      setError("Failed to update cart");
    }
  };

  // Simulate a short loading state before navigating
  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  // 1. Calculate total cart amount
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  if (!token) {
    return <p>Please login to view your cart.</p>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {error && <p className="error">{error}</p>}

      {cartItems.length === 0 ? (
        <p className="empty-cart">Cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="cart-th">Product</th>
                  <th className="cart-th">Price</th>
                  <th className="cart-th">Quantity</th>
                  <th className="cart-th">Total</th>
                  <th className="cart-th">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product_id} className="cart-tr">
                    <td className="cart-td">
                      <strong>{item.name}</strong>
                    </td>
                    <td className="cart-td">${item.price.toFixed(2)}</td>
                    <td className="cart-td">{item.quantity}</td>
                    <td className="cart-td">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="cart-td">
                      <button
                        onClick={() =>
                          handleDecreaseQuantity(item.product_id, item.quantity)
                        }
                        className="cart-btn minus-btn"
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* 2. Add a table footer to display the grand total */}
              <tfoot>
                <tr>
                  {/* Spanning the first 3 columns, so total aligns nicely */}
                  <td colSpan="3"></td>
                  <td className="cart-td">
                    <strong>Grand Total</strong>
                  </td>
                  <td className="cart-td">
                    <strong>${totalAmount.toFixed(2)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <button onClick={handleCheckout} className="checkout-btn">
            {loading ? "Loading..." : "Proceed to Checkout"}
          </button>
        </>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Cart;
