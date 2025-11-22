import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";

const Mobile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Backend URL
  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  const fetchMobileProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products`);
      const data = await response.json();

      if (data.success) {
        // Filter products with category "mobile"
        const mobileOnly = data.products.filter((item) =>
          item.category && item.category.toLowerCase() === "mobile"
        );
        setProducts(mobileOnly);
      } else {
        console.error("Error fetching products:", data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mobile products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMobileProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "10px" }}></div>
        <h4 className="text-danger m-0">Mobile Products</h4>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <div className="spinner-border text-danger" role="status" style={{ width: "4rem", height: "4rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">No mobile products found.</p>
      ) : (
        <div className="row g-4">
          {products.map((item, index) => (
            <div key={item._id || index} className="col-md-3 col-sm-6">
              <div className="product-box shadow-sm position-relative">
                <div className="discount-badge">-35%</div>

                <div className="product-icons">
                  <span className="icon-btn"><FaHeart /></span>
                  <span className="icon-btn" onClick={() => handleProductClick(item)}><FaEye /></span>
                </div>

                <div className="product-img-wrapper" onClick={() => handleProductClick(item)}>
                  <img src={item.image || item.productImageUrl} alt={item.name || item.title} className="product-img" />
                  <div className="add-cart-overlay">Add To Cart</div>
                </div>

                <h6 className="product-title mt-2 mb-1 text-start">
                  {(item.name || item.title).length > 40 ?
                    (item.name || item.title).slice(0, 40) + "..." :
                    (item.name || item.title)}
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

export default Mobile;