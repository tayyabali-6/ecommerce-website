import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

const categoryList = [
  { name: 'fashion' },
  { name: 'mobile' }, { name: 'laptop' }, { name: 'tech' },
  { name: 'home' }, { name: 'books' }, { name: 'camera' }, { name: 'electronics' }
];

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFile, setSelectedFile] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    inStock: true
  });

  const getSingleProductFunction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      
      if (data.success) {
        const productData = data.product;
        setProduct({
          name: productData.name || productData.title || "",
          price: productData.price || "",
          image: productData.image || productData.productImageUrl || "",
          category: productData.category || "",
          description: productData.description || "",
          inStock: productData.inStock !== undefined ? productData.inStock : true
        });
      } else {
        messageApi.error("Product not found");
        navigate('/dashboard/admin/adminDashboard');
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      messageApi.error("Error fetching product");
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.checked });
  };

  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
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

  const updateProduct = async () => {
    if (!product.name || !product.price || !product.category) {
      return messageApi.error("Please fill all required fields");
    }

    setLoading(true);
    try {
      let imageUrl = product.image;

      // If new file selected, upload it
      if (selectedFile) {
        const uploadedUrl = await uploadImageToServer(selectedFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: parseFloat(product.price),
          image: imageUrl,
          category: product.category,
          description: product.description,
          inStock: product.inStock
        }),
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success("Product Updated Successfully");
        navigate('/dashboard/admin/adminDashboard');
      } else {
        messageApi.error(data.message || "Update Failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      messageApi.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [id]);

  return (
    <>
      {contextHolder}
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: '#0a0f1f' }}>
        <div className="border p-4 rounded shadow-sm" style={{ 
          width: "450px", 
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15) !important'
        }}>
          <div className="mb-4">
            <h2 className="text-center text-white fw-bold">Update Product</h2>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="form-control"
              value={product.name}
              onChange={handleChange}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Price (Rs)</label>
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              className="form-control"
              value={product.price}
              onChange={handleChange}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                  setProduct({ ...product, image: URL.createObjectURL(file) });
                }
              }}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff'
              }}
            />
            <small className="text-muted">Leave empty to keep existing image</small>
          </div>

          {product.image && (
            <div className="mb-3 text-center">
              <img
                src={product.image}
                alt="Preview"
                className="img-thumbnail"
                style={{ height: "100px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-white">Category</label>
            <select
              name="category"
              className="form-select"
              value={product.category}
              onChange={handleChange}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff'
              }}
            >
              <option value="" disabled>Select Product Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Description</label>
            <textarea
              name="description"
              placeholder="Product Description"
              rows="4"
              className="form-control"
              value={product.description}
              onChange={handleChange}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff'
              }}
            ></textarea>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="inStock"
              className="form-check-input"
              checked={product.inStock}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label text-white">In Stock</label>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary w-100 fw-bold py-2"
              onClick={updateProduct}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #00f2ff, #1d3557)',
                border: 'none',
                borderRadius: '50px'
              }}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProducts;