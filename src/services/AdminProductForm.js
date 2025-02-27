import { useState } from "react";
import { createProduct } from "../services/productService";

const AdminProductForm = () => {
  const [product, setProduct] = useState({ name: "", price: 0, category: "", stock: 0, image_url: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(product);
    alert("Product added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input type="number" placeholder="Price" onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AdminProductForm;
