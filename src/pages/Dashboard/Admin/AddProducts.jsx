import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { message } from "antd";
import { supabase } from "../../../config/supabase";

const categoryList = ["fashion", "camera", "mobile", "laptop", "tech", "home", "books"];

const AddProducts = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    quantity: 1,
    productImageUrl: "",
    time: Timestamp.now(),
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const filePath = `products/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("ecommerce-web")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (error) {
      console.error(error);
      messageApi.error("Upload failed");
      return null;
    }
    return `https://xxtaccjhwfxgvhkuryvr.supabase.co/storage/v1/object/public/ecommerce-web/${filePath}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    if (!product.title || !product.price || !product.category || !product.description || !file) {
      return messageApi.error("All fields are required including image");
    }

    setIsProcessing(true);
    try {
      const imageUrl = await uploadImage(file);
      if (!imageUrl) return;

      await addDoc(collection(firestore, "products"), { ...product, productImageUrl: imageUrl });
      messageApi.success("Product added successfully");
      navigate("/dashboard/admin/adminDashboard");
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

          <input
            type="text"
            placeholder="Title"
            className="form-control mb-3"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            className="form-control mb-3"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            style={inputStyle}
          />

          <input type="file" name="image" accept="image/*" className="form-control mb-3" style={inputStyle} />

          <select
            className="form-select mb-3"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            style={inputStyle}
          >
            <option value="" disabled>Select Category</option>
            {categoryList.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>

          <textarea
            rows="3"
            placeholder="Description"
            className="form-control mb-4"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            style={inputStyle}
          ></textarea>

          <button
            type="submit"
            className="btn w-100 fw-bold"
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
