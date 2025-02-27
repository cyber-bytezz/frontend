import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";
import "../styles/checkout.css"; // Updated CSS for Checkout

const Checkout = () => {
  const { token } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shippingAddress, setShippingAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const result = await placeOrder(paymentMethod, shippingAddress);
      // Set success message from API or default message
      setMessage(result.message || "Order placed successfully!");
      setLoading(false);
      setShowPopup(true);
      // After 3 seconds, navigate to /orders
      setTimeout(() => {
        window.location.href = "/orders";
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Payment failed. Try again.";
      setMessage(
        typeof errorMessage === "object"
          ? JSON.stringify(errorMessage)
          : errorMessage
      );
      setLoading(false);
    }
  };

  if (!token) {
    return <p>Please login to proceed with checkout.</p>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-card">
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            id="shippingAddress"
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <button onClick={handleCheckout} className="checkout-btn">
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>

      {/* Show error message below card if any (only when not loading or popup) */}
      {message && !loading && !showPopup && <p className="message">{message}</p>}

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Popup overlay after successful order */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{message}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
