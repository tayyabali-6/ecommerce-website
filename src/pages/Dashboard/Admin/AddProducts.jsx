import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const categoryList = ["fashion", "camera", "mobile", "laptop", "tech", "home", "books", "electronics"];

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    inStock: true
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Backend URL
  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.imageUrl;
      } else {
        messageApi.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      messageApi.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const file = e.target.image.files[0];
    if (!product.name || !product.price || !product.category || !product.description || !file) {
      return messageApi.error("All fields are required including image");
    }

    setIsProcessing(true);
    try {
      // Upload image to server
      const imageUrl = await uploadImageToServer(file);
      if (!imageUrl) return;

      // Create product in MERN backend
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: parseFloat(product.price),
          category: product.category,
          description: product.description,
          image: imageUrl,
          inStock: product.inStock
        }),
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success("Product added successfully");
        navigate("/dashboard/admin/adminDashboard");
      } else {
        messageApi.error(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      messageApi.error("Failed to add product");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", fontFamily: "Poppins, sans-serif", background: "#0a0f1f" }}>
      {contextHolder}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <form
          onSubmit={handleSubmit}
          className="p-5 w-100"
          style={{
            maxWidth: "500px",
            borderRadius: "1.5rem",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(25px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.15)",
            animation: "fadeIn 1s ease forwards",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{
              color: "#ff4d4f",
              textShadow: "0 0 15px #ff4d4f",
              letterSpacing: "1px",
            }}
          >
            Add Product
          </h2>

          <div className="mb-3">
            <label className="form-label text-white">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="form-control"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Price (Rs)</label>
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Product Image</label>
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              className="form-control" 
              style={inputStyle} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Category</label>
            <select
              className="form-select"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              style={inputStyle}
            >
              <option value="" disabled>Select Category</option>
              {categoryList.map((item, i) => (
                <option key={i} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Description</label>
            <textarea
              rows="4"
              placeholder="Product Description"
              className="form-control"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              style={inputStyle}
            ></textarea>
          </div>

          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={product.inStock}
              onChange={(e) => setProduct({ ...product, inStock: e.target.checked })}
            />
            <label className="form-check-label text-white">In Stock</label>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold py-2"
            disabled={isProcessing}
            style={buttonStyle}
          >
            {isProcessing ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </main>
  );
};

const inputStyle = {
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.3)",
  color: "#fff",
};

const buttonStyle = {
  background: "linear-gradient(135deg, #ff4d4f, #8b0000)",
  border: "none",
  borderRadius: "50px",
  boxShadow: "0 8px 25px rgba(255,77,79,0.6)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "all 0.4s ease",
};

export default AddProducts;