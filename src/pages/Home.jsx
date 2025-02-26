import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default: Show all
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setError("Failed to fetch products"));
    getCategories().then(setCategories).catch(() => setError("Failed to fetch categories"));
  }, []);

  const handleAddToCart = async (prodId) => {
    if (!token) {
      setError("Please login first!");
      return;
    }
    try {
      const result = await addToCart(prodId, 1);
      alert(result.message || "Product added to cart!");
    } catch (err) {
      setError(err.detail || "Failed to add product to cart");
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to QuitQ E-Commerce</h1>
      {error && <p className="error">{error}</p>}

      {/* ✅ Dropdown to filter categories */}
      <div className="category-filter">
        <label>Select Category: </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="product-list">
        {products
          .filter((prod) => (selectedCategory ? prod.category === selectedCategory : true))
          .map((prod) => (
            <div className="product-card" key={prod.id}>
              <img
                src={prod.image_url || "placeholder.png"}
                alt={prod.name}
                className="product-image"
              />
              <h3>{prod.name}</h3>
              <p>${prod.price}</p>
              <button onClick={() => handleAddToCart(prod.id)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
