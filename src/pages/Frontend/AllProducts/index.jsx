import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, HeartOutlined, StarFilled, FilterOutlined } from "@ant-design/icons";
import { Button, Card, Row, Col, Select, Spin, Tag, message, Empty } from "antd";

const { Option } = Select;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Backend URL
    const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/products`);
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            } else {
                console.error("Error fetching products:", data.message);
                message.error("Failed to load products");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            message.error("Failed to load products");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSortChange = (value) => {
        const sorted = [...products];
        if (value === "lowToHigh") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (value === "highToLow") {
            sorted.sort((a, b) => b.price - a.price);
        }
        setProducts(sorted);
    };

    const handleProductClick = (product) => {
        navigate("/productinfo", { state: { product } });
    };

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        message.success(`${product.name || product.title} added to cart!`);
        // Add your cart logic here
    };

    const handleAddToWishlist = (product, e) => {
        e.stopPropagation();
        message.success("Added to wishlist!");
        // Add your wishlist logic here
    };

    return (
        <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
            {/* Header Section */}
            <div className="container pt-5">
                <Card
                    className="mb-4 border-0"
                    style={{
                        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        borderRadius: "16px"
                    }}
                >
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
                            <Select
                                defaultValue="featured"
                                style={{ width: 200 }}
                                onChange={handleSortChange}
                                suffixIcon={<FilterOutlined />}
                                size="large"
                            >
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
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "400px"
                    }}>
                        <Spin size="large" />
                    </div>
                ) : products.length === 0 ? (
                    <Empty
                        description="No products found"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{
                            margin: "100px 0",
                            color: "#666"
                        }}
                    />
                ) : (
                    <Row gutter={[24, 24]}>
                        {products.map((product, index) => (
                            <Col
                                key={product._id || index}
                                xs={24}
                                sm={12}
                                lg={8}
                                xl={6}
                            >
                                <Card
                                    hoverable
                                    className="product-card"
                                    onClick={() => handleProductClick(product)}
                                    style={{
                                        border: "none",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        transition: "all 0.4s ease",
                                        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                        height: "100%"
                                    }}
                                    bodyStyle={{
                                        padding: "0",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    {/* Image Section */}
                                    <div
                                        className="image-section position-relative"
                                        style={{
                                            height: "240px",
                                            overflow: "hidden",
                                            background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                                            position: "relative"
                                        }}
                                    >
                                        <img
                                            src={product.image || product.productImageUrl}
                                            alt={product.name || product.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                transition: "all 0.4s ease",
                                                // padding: "20px"
                                            }}
                                        />

                                        {/* Discount Badge */}
                                        <Tag
                                            color="#e63946"
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                left: "12px",
                                                fontWeight: "bold",
                                                border: "none",
                                                fontSize: "12px",
                                                padding: "4px 8px",
                                                borderRadius: "12px"
                                            }}
                                        >
                                            -35%
                                        </Tag>

                                        {/* Action Icons */}
                                        <div
                                            className="position-absolute d-flex flex-column gap-2"
                                            style={{
                                                top: "12px",
                                                right: "12px"
                                            }}
                                        >
                                            <Button
                                                type="text"
                                                icon={<HeartOutlined />}
                                                onClick={(e) => handleAddToWishlist(product, e)}
                                                style={{
                                                    background: "rgba(255,255,255,0.9)",
                                                    borderRadius: "50%",
                                                    width: "36px",
                                                    height: "36px",
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                    backdropFilter: "blur(10px)",
                                                    border: "none"
                                                }}
                                            />
                                            <Button
                                                type="text"
                                                icon={<EyeOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProductClick(product);
                                                }}
                                                style={{
                                                    background: "rgba(255,255,255,0.9)",
                                                    borderRadius: "50%",
                                                    width: "36px",
                                                    height: "36px",
                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                    backdropFilter: "blur(10px)",
                                                    border: "none"
                                                }}
                                            />
                                        </div>

                                        {/* Hover Overlay */}
                                        <div
                                            className="hover-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                                            style={{
                                                top: 0,
                                                left: 0,
                                                background: "rgba(230, 57, 70, 0.9)",
                                                opacity: 0,
                                                transition: "all 0.3s ease"
                                            }}
                                        >
                                            <Button
                                                type="primary"
                                                size="large"
                                                onClick={(e) => handleAddToCart(product, e)}
                                                style={{
                                                    background: "white",
                                                    border: "none",
                                                    color: "#e63946",
                                                    borderRadius: "25px",
                                                    padding: "12px 24px",
                                                    fontWeight: "600",
                                                    transform: "translateY(20px)",
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Product Info Section */}
                                    <div className="product-info p-4">
                                        <h6
                                            className="product-name mb-3"
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                lineHeight: "1.4",
                                                color: "#2d3748",
                                                minHeight: "44px",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {product.name || product.title}
                                        </h6>

                                        {/* Price Section */}
                                        <div
                                            className="price mb-3 fw-bold"
                                            style={{
                                                fontSize: "20px",
                                                color: "#e63946"
                                            }}
                                        >
                                            Rs {product.price}
                                        </div>

                                        {/* Rating and Action */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="rating d-flex align-items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <StarFilled
                                                        key={star}
                                                        style={{
                                                            fontSize: "14px",
                                                            color: "#ffd700",
                                                            marginRight: "2px"
                                                        }}
                                                    />
                                                ))}
                                                <span
                                                    className="ms-2"
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#718096"
                                                    }}
                                                >
                                                    (4.5)
                                                </span>
                                            </div>

                                            {/* <Button
                                                type="primary"
                                                size="small"
                                                onClick={(e) => handleAddToCart(product, e)}
                                                style={{
                                                    background: "#e63946",
                                                    border: "none",
                                                    borderRadius: "20px",
                                                    fontWeight: "500",
                                                    fontSize: "12px",
                                                    padding: "6px 16px"
                                                }}
                                            >
                                                Add to Cart
                                            </Button> */}
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .product-card:hover {
                    transform: translateY(-8px) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
                }
                
                .image-section:hover img {
                    transform: scale(1.08) !important;
                }
                
                .product-card:hover .hover-overlay {
                    opacity: 1 !important;
                }
                
                .product-card:hover .hover-overlay button {
                    transform: translateY(0) !important;
                }
                
                @media (max-width: 576px) {
                    .image-section {
                        height: 200px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default AllProducts;