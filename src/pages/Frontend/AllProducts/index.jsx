import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarFilled, FilterOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Row,
  Col,
  Select,
  Spin,
  Tag,
  message,
  Empty
} from "antd";

const { Option } = Select;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const BACKEND_URL =
    "https://medialyx-backend-production.up.railway.app";

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        message.error("Products load nahi huay");
      }
    } catch (err) {
      console.error(err);
      message.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= SORT =================
  const handleSortChange = (value) => {
    const sorted = [...products];

    if (value === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (value === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setProducts(sorted);
  };

  // ================= CARD CLICK =================
  const handleProductClick = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  // ================= ADD TO CART (HOME PAGE JESA) =================
  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // ❗ card click ko roknay ke liye

    // 🔹 Cart logic (frontend example)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p._id === product._id);

    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    message.success("Product added to cart");

    // ✅ DIRECT CART PAGE
    setTimeout(() => {
      navigate("/cart");
    }, 300);
  };

  // ================= UI =================
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER */}
      <div className="container pt-5">
        <Card
          className="mb-4"
          style={{
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <h2 style={{ margin: 0, fontWeight: 700 }}>
                🛒 All Products
              </h2>
              <p style={{ margin: 0, color: "#777" }}>
                Discover our collection
              </p>
            </Col>

            <Col>
              <Select
                defaultValue="featured"
                style={{ width: 200 }}
                size="large"
                onChange={handleSortChange}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="featured">Featured</Option>
                <Option value="lowToHigh">
                  Price: Low to High
                </Option>
                <Option value="highToLow">
                  Price: High to Low
                </Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </div>

      {/* PRODUCTS */}
      <div className="container pb-5">
        {loading ? (
          <div className="text-center py-5">
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <Empty description="No products found" />
        ) : (
          <Row gutter={[24, 24]}>
            {products.map((item) => {
              const price =
                item.discountPrice || item.price;
              const oldPrice =
                item.discountPrice ? item.price : null;

              return (
                <Col
                  key={item._id}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                >
                  <Card
                    hoverable
                    onClick={() =>
                      handleProductClick(item)
                    }
                    style={{
                      borderRadius: 16,
                      height: "100%",
                      cursor: "pointer"
                    }}
                    bodyStyle={{ padding: 0 }}
                  >
                    {/* IMAGE */}
                    <div
                      style={{
                        height: 220,
                        background: "#f8f9fa"
                      }}
                      className="border p-0"
                    >
                      <img
                        src={
                          item.image ||
                          item.productImageUrl
                        }
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain"
                        }}
                      />
                    </div>

                    {/* INFO */}
                    <div style={{ padding: 14 }}>
                      <h6
                        style={{
                          minHeight: 40,
                          fontWeight: 600
                        }}
                      >
                        {item.name || item.title}
                      </h6>

                      <div className="mb-2">
                        <strong style={{ color: "#e63946" }}>
                          Rs {price}
                        </strong>
                        {oldPrice && (
                          <span
                            style={{
                              marginLeft: 8,
                              color: "#999",
                              textDecoration:
                                "line-through"
                            }}
                          >
                            Rs {oldPrice}
                          </span>
                        )}
                      </div>

                      {/* RATING */}
                      <div className="mb-3">
                        {[1, 2, 3, 4, 5].map(
                          (i) => (
                            <StarFilled
                              key={i}
                              style={{
                                color: "#ffd700",
                                fontSize: 12
                              }}
                            />
                          )
                        )}
                      </div>

                      {/* ADD TO CART */}
                      <Button
                        block
                        type="primary"
                        onClick={(e) =>
                          handleAddToCart(item, e)
                        }
                        style={{
                          borderRadius: 20,
                          background: "#e63946",
                          border: "none",
                          fontWeight: 600,
                          padding:"20px"
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
