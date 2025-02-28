import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productService";
import "../styles/adminaddproduct.css"; // Updated CSS file

const AdminAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ name, price, category, stock, image_url: imageUrl });
      setMessage("✅ Product added successfully!");
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (error) {
      setMessage("❌ Failed to add product. Check inputs.");
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2 className="add-product-title">Add New Product</h2>
        {message && <p className="add-product-message">{message}</p>}
        <form onSubmit={handleAddProduct} className="add-product-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="add-product-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
