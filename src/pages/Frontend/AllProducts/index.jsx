import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, EyeOutlined, StarFilled, ShoppingCartOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, Select, Spin, Tag, message, Empty } from "antd";
import { useAuthContext } from "../../../context/Auth";

const { Option } = Select;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/products`);
            const data = await res.json();
            if (data.success) setProducts(data.products);
            else messageApi.error("Failed to load products");
        } catch {
            messageApi.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Sorting products
    const handleSortChange = (value) => {
        const sorted = [...products];
        if (value === "lowToHigh") sorted.sort((a, b) => a.price - b.price);
        else if (value === "highToLow") sorted.sort((a, b) => b.price - a.price);
        setProducts(sorted);
    };

    // Navigate to product detail
    const handleProductDetail = (product) => {
        navigate("/productinfo", { state: { product } });
    };

    // Add product to cart
    const handleAddToCart = async (product, e) => {
        e.stopPropagation(); // prevent card click
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
        <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
            {contextHolder}

            {/* Header */}
            <div className="container pt-5">
                <Card className="mb-4 border-0" style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    borderRadius: "16px"
                }}>
                    <Row align="middle" justify="space-between">
                        <Col>
                            <h1 style={{
                                margin: 0,
                                fontSize: "28px",
                                fontWeight: "700",
                                background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                🛒 All Products
                            </h1>
                            <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: "16px" }}>
                                Discover our amazing collection
                            </p>
                        </Col>
                        <Col>
                            <Select defaultValue="featured" style={{ width: 200 }} onChange={handleSortChange} suffixIcon={<FilterOutlined />} size="large">
                                <Option value="featured">Featured</Option>
                                <Option value="lowToHigh">Price: Low to High</Option>
                                <Option value="highToLow">Price: High to Low</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>
            </div>

            {/* Products Grid */}
            <div className="container pb-5">
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
                        <Spin size="large" />
                    </div>
                ) : products.length === 0 ? (
                    <Empty description="No products found" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: "100px 0", color: "#666" }} />
                ) : (
                    <Row gutter={[24, 24]}>
                        {products.map((product) => {
                            const displayPrice = product.discountPrice || product.price;
                            const originalPrice = product.discountPrice ? product.price : null;

                            return (
                                <Col key={product._id} xs={24} sm={12} lg={8} xl={6}>
                                    <Card
                                        hoverable
                                        onClick={() => handleProductDetail(product)}
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
                                            <img src={product.image || product.productImageUrl} alt={product.name || product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            {originalPrice && (
                                                <Tag color="#e63946" style={{ position: "absolute", top: 12, left: 12, fontWeight: "bold", borderRadius: 12 }}>
                                                    -{Math.round((1 - displayPrice / originalPrice) * 100)}%
                                                </Tag>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div style={{ padding: "12px" }}>
                                            <h6 style={{ fontWeight: 600 }}>{product.name || product.title}</h6>
                                            <div className="d-flex gap-2 mb-2">
                                                <span style={{ color: "#e63946", fontWeight: 600 }}>Rs {displayPrice}</span>
                                                {originalPrice && <span style={{ textDecoration: "line-through", color: "#888" }}>Rs {originalPrice}</span>}
                                            </div>

                                            {/* Rating */}
                                            <div className="d-flex mb-3">
                                                {[1, 2, 3, 4, 5].map((i) => (<StarFilled key={i} style={{ color: "#ffd700", fontSize: 12, marginRight: 2 }} />))}
                                                <span style={{ fontSize: 12, color: "#718096" }}>(128)</span>
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
