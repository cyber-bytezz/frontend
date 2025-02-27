import { useState, useEffect } from "react";
import { addToCart } from "../services/cartService";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css"; // Updated CSS
import { getProducts, getCategories } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();

  // --- NEW: Toast State ---
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, sortBy]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts({
        search,
        category: selectedCategory,
        sortBy,
      });
      setProducts(data);
    } catch {
      setError("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      setError("Failed to fetch categories");
    }
  };

  const handleAddToCart = async (prodId) => {
    if (!token) {
      setError("Please login first!");
      return;
    }
    try {
      const result = await addToCart(prodId, 1);

      // --- Instead of alert, show a toast popup ---
      setToastMessage(result.message || "Product added to cart!");
      setShowToast(true);

      // Auto-hide the toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    } catch (err) {
      setError(err.detail || "Failed to add product to cart");
    }
  };

  return (
    <div className="home-page">
      {/* --- Hero Section / Banner --- */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">HexaMart</h1>
          <p className="hero-subtitle">Find the best deals and latest products here!</p>
        </div>
      </header>

      <div className="home-container">
        {error && <p className="error">{error}</p>}

        {/* --- Filters Section --- */}
        <div className="filters">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-bar"
            />
          </div>

          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="dropdown"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="dropdown"
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* --- Product List --- */}
        <div className="product-list">
          {products.map((prod) => (
            <div className="product-card" key={prod.id}>
              <img
                src={prod.image_url || "placeholder.png"}
                alt={prod.name}
                className="product-image"
              />
              <h3 className="product-name">{prod.name}</h3>
              <p className="product-price">${prod.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(prod.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- Toast Popup (only if showToast is true) --- */}
      {showToast && (
        <div className="toast-popup">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
