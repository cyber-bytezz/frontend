import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import "../styles/managepro.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { isAdmin } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [deletionMessage, setDeletionMessage] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) return;

    try {
      await deleteProduct(selectedProduct.id);
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
      
      // Show "Product Deleted!" message
      setDeletionMessage(true);
      
      // Slide-out animation before closing modal
      setTimeout(() => {
        setModalClosing(true);
      }, 600);

      // Fully close modal after animation
      setTimeout(() => {
        setShowModal(false);
        setModalClosing(false);
        setDeletionMessage(false);
      }, 1000);
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  return (
    <div className="manage-products-container">
      <h1 className="manage-products-title">Manage Products</h1>
      {error && <p className="manage-products-error">{error}</p>}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className={`modal ${modalClosing ? "slide-out" : ""}`}>
            {!deletionMessage ? (
              <>
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete <b>{selectedProduct.name}</b>?</p>
                <div className="modal-actions">
                  <button className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="confirm-button" onClick={handleDelete}>Delete</button>
                </div>
              </>
            ) : (
              <h3 className="deleted-message">✅ Product Deleted!</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
