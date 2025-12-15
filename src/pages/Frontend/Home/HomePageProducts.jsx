import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";
import { HeartOutlined, EyeOutlined, StarFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Tag, message } from "antd";

const HomePageProducts = () => {
  const { getAllProduct, user } = useAuthContext();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  const products = getAllProduct?.slice(0, 8) || []; // max 8 products

  const handleProductDetail = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    if (!user?.id) {
      messageApi.error("Please login first to add items to cart");
      return;
    }
    try {
      const productId = product._id || product.id;
      const res = await fetch(`${BACKEND_URL}/api/cart/${user.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
      });
      const data = await res.json();
      if (data.success) {
        messageApi.success("Product added to cart!");
        setTimeout(() => navigate("/cart"), 500);
      } else {
        messageApi.error(data.message || "Failed to add product");
      }
    } catch {
      messageApi.error("Failed to add product");
    }
  };

  return (
    <div className="container mt-5 px-2 px-md-3 px-lg-4">
      {contextHolder}

      {/* Flash Sales Section */}
      <section className="mb-4">
        <div className="d-flex align-items-center mb-4">
          <div className="bg-danger" style={{ width: 4, height: 24, marginRight: 12 }}></div>
          <h4 className="text-danger m-0 fw-bold fs-5 fs-md-4">Flash Sales</h4>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {products.map((item) => {
            const displayPrice = item.discountPrice || item.price;
            const originalPrice = item.discountPrice ? item.price : null;

            return (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card
                  hoverable
                  onClick={() => handleProductDetail(item)}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                  }}
                  bodyStyle={{ padding: 0, display: "flex", flexDirection: "column", height: "100%" }}
                >
                  {/* Image */}
                  <div style={{ flex: 1, overflow: "hidden", position: "relative", height: 200 }}>
                    <img
                      src={item.image || item.productImageUrl}
                      alt={item.name || item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {item.discountPrice && (
                      <Tag
                        color="#e63946"
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          fontWeight: "bold",
                          borderRadius: 12,
                        }}
                      >
                        -{Math.round((1 - displayPrice / originalPrice) * 100)}%
                      </Tag>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: "12px"}}>
                    <h6 style={{ fontWeight: 600 }}>{item.name || item.title}</h6>
                    <div className="d-flex gap-2 mb-2">
                      <span style={{ color: "#e63946", fontWeight: 600 }}>Rs {displayPrice}</span>
                      {originalPrice && <span style={{ textDecoration: "line-through", color: "#888" }}>Rs {originalPrice}</span>}
                    </div>

                    {/* Rating */}
                    <div className="d-flex  mb-3">
                      {[1,2,3,4,5].map((i)=>(<StarFilled key={i} style={{ color:"#ffd700", fontSize:12, marginRight:2 }} />))}
                      <span style={{ fontSize:12, color:"#718096" }}>(128)</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={(e) => handleAddToCart(item, e)}
                      style={{
                        borderRadius: 24,
                        background: "#e63946",
                        border: "none",
                        fontWeight: 600,
                        fontSize: 14,
                        padding: "8px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(230,57,70,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-5">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/allproducts")}
            style={{
              background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "16px 48px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 8px 25px rgba(230, 57, 70, 0.3)",
              minWidth: "220px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(230, 57, 70, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(230, 57, 70, 0.3)";
            }}
          >
            View All Products
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePageProducts;
