import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFashionProducts = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, "products"));
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const fashionOnly = allProducts.filter((item) => item.category === "fashion");
      setProducts(fashionOnly);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fashion products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFashionProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "10px" }}></div>
        <h4 className="text-danger m-0">Fashion Products</h4>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <div className="spinner-border text-danger" role="status" style={{ width: "4rem", height: "4rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">No fashion products found.</p>
      ) : (
        <div className="row g-4">
          {products.map((item, index) => (
            <div key={index} className="col-md-3 col-sm-6">
              <div className="product-box shadow-sm position-relative">
                <div className="discount-badge">-35%</div>

                <div className="product-icons">
                  <span className="icon-btn"><FaHeart /></span>
                  <span className="icon-btn" onClick={() => handleProductClick(item)}><FaEye /></span>
                </div>

                <div className="product-img-wrapper" onClick={() => handleProductClick(item)}>
                  <img src={item.productImageUrl} alt={item.title} className="product-img" />
                  <div className="add-cart-overlay">Add To Cart</div>
                </div>

                <h6 className="product-title mt-2 mb-1 text-start">
                  {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                </h6>
                <div className="price text-start">Rs {item.price}</div>
                <div className="rating text-start mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} size={14} color="gold" className="me-1" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fashion;
