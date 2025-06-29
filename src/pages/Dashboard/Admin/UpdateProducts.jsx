import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../../../config/firebase';
import { message } from 'antd';
import { supabase } from '../../../config/supabase';

const categoryList = [
  { name: 'fashion' },
  { name: 'mobile' }, { name: 'laptop' }, { name: 'tech' },
  { name: 'home' }, { name: 'books' }
];

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFile, setSelectedFile] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  });

  const getSingleProductFunction = async () => {
    try {
      const productTemp = await getDoc(doc(firestore, "products", id));
      const data = productTemp.data();
      if (data) {
        setProduct({
          title: data.title || "",
          price: data.price || "",
          productImageUrl: data.productImageUrl || "",
          category: data.category || "",
          description: data.description || "",
          time: data.time || Timestamp.now(),
          date: data.date || new Date().toLocaleString()
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const uploadImageToSupabase = async (file) => {
    const filePath = `products/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("ecommerce-web").upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) {
      console.log(error);
      messageApi.error("Image upload failed");
      return null;
    }

    const { data: { publicUrl } } = supabase.storage.from("ecommerce-web").getPublicUrl(filePath);
    return publicUrl;
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      let imageUrl = product.productImageUrl;

      if (selectedFile) {
        const uploadedUrl = await uploadImageToSupabase(selectedFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      await setDoc(doc(firestore, 'products', id), {
        ...product,
        productImageUrl: imageUrl,
      });

      messageApi.success("Product Updated Successfully");
      navigate('/dashboard/admin/adminDashboard');
    } catch (error) {
      console.log(error);
      messageApi.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="border p-4 rounded shadow-sm bg-light" style={{ width: "400px" }}>
          <div className="mb-4">
            <h2 className="text-center text-primary fw-bold">Update Product</h2>
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="form-control text-primary"
              value={product.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              className="form-control text-primary"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control text-primary"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);
                  setProduct({ ...product, productImageUrl: URL.createObjectURL(file) });
                }
              }}
            />
            <small className="text-muted">Leave empty to keep existing image</small>
          </div>

          {product.productImageUrl && (
            <div className="mb-3 text-center">
              <img
                src={product.productImageUrl}
                alt="Preview"
                className="img-thumbnail"
                style={{ height: "100px", objectFit: "cover" }}
              />
            </div>
          )}

          <div className="mb-3">
            <select
              name="category"
              className="form-select text-primary"
              value={product.category}
              onChange={handleChange}
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Product Description"
              rows="5"
              className="form-control text-primary"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary w-100 fw-bold"
              onClick={updateProduct}
              disabled={loading}
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
