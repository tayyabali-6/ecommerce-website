import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';
import { message, Button, Row, Col, Tag } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';

const ProductInfo = () => {
    const { product } = useLocation().state || {};
    const { user } = useAuthContext();
    const [messageApi, contextHolder] = message.useMessage();

    // Backend URL
    const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

    const handleAddToCart = async () => {
        if (!user?.id) {
            messageApi.error("Please login first to add items to cart");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/cart/${user.id}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id || product.id,
                    quantity: 1
                }),
            });

            const data = await response.json();

            if (data.success) {
                messageApi.success("Product added to cart successfully!");
            } else {
                messageApi.error(data.message || "Failed to add product to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            messageApi.error("Failed to add product to cart");
        }
    };

    const handleAddToWishlist = () => {
        if (!user?.id) {
            messageApi.error("Please login first to add items to wishlist");
            return;
        }
        messageApi.info("Added to wishlist!");
    };

    if (!product) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Product not found
            </div>
        );
    }

    const isInStock = product.inStock !== false;
    const discountPrice = product.discountPrice || null;
    const originalPrice = discountPrice ? product.price : null;
    const displayPrice = discountPrice || product.price;

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            {contextHolder}
            <div className="container py-5">
                <Row gutter={[40, 40]}>
                    {/* Product Image */}
                    <Col xs={24} md={12}>
                        <div style={{
                            background: '#f8f9fa',
                            borderRadius: '16px',
                            padding: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '400px',
                            border: '1px solid #e8e8e8'
                        }}>
                            <img
                                src={product.image || product.productImageUrl}
                                alt={product.name || product.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </Col>

                    {/* Product Details */}
                    <Col xs={24} md={12}>
                        <div style={{ padding: '10px 0' }}>
                            {/* Category Tag */}
                            {product.category && (
                                <Tag color="blue" style={{ 
                                    marginBottom: '16px',
                                    fontSize: '14px',
                                    padding: '4px 12px',
                                    borderRadius: '20px'
                                }}>
                                    {product.category}
                                </Tag>
                            )}

                            {/* Product Title */}
                            <h1 style={{
                                fontSize: '28px',
                                fontWeight: '600',
                                color: '#1a1a1a',
                                marginBottom: '16px',
                                lineHeight: '1.3'
                            }}>
                                {product.name || product.title}
                            </h1>

                            {/* Rating */}

                            {/* Price */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#e63946',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    Rs {displayPrice}
                                    {originalPrice && (
                                        <span style={{
                                            fontSize: '20px',
                                            color: '#999',
                                            textDecoration: 'line-through',
                                            fontWeight: '400'
                                        }}>
                                            Rs {originalPrice}
                                        </span>
                                    )}
                                </div>
                                {originalPrice && (
                                    <div style={{ 
                                        color: '#52c41a', 
                                        fontSize: '14px',
                                        marginTop: '4px'
                                    }}>
                                        You save Rs {(originalPrice - displayPrice).toFixed(2)}
                                    </div>
                                )}
                            </div>

                            {/* Stock Status */}

                            {/* Description */}
                            {product.description && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{ 
                                        fontSize: '18px', 
                                        fontWeight: '600',
                                        marginBottom: '12px',
                                        color: '#1a1a1a'
                                    }}>
                                        Description
                                    </h3>
                                    <p style={{
                                        fontSize: '16px',
                                        lineHeight: '1.6',
                                        color: '#666',
                                        margin: 0
                                    }}>
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{ marginBottom: '30px' }}>
                                <div className="d-flex gap-3">
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={handleAddToCart}
                                        disabled={!isInStock}
                                        style={{
                                            background: 'linear-gradient(135deg, #e63946 0%, #d32f2f 100%)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            height: '48px',
                                            padding: '0 32px',
                                            fontWeight: '600',
                                            fontSize: '16px',
                                            flex: 1
                                        }}
                                    >
                                        {isInStock ? "Add to Cart" : "Out of Stock"}
                                    </Button>

                                    <Button
                                        size="large"
                                        icon={<HeartOutlined />}
                                        onClick={handleAddToWishlist}
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            borderRadius: '8px',
                                            height: '48px',
                                            width: '48px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div style={{
                                padding: '20px',
                                background: '#f8f9fa',
                                borderRadius: '12px'
                            }}>
                                <h4 style={{ 
                                    fontSize: '16px', 
                                    fontWeight: '600',
                                    marginBottom: '12px',
                                    color: '#1a1a1a'
                                }}>
                                    Product Features
                                </h4>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: '#52c41a',
                                                marginRight: '8px'
                                            }}></div>
                                            <span style={{ color: '#666', fontSize: '14px' }}>
                                                High Quality
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: '#52c41a',
                                                marginRight: '8px'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: '#52c41a',
                                                marginRight: '8px'
                                            }}></div>
                                        </div>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: '#52c41a',
                                                marginRight: '8px'
                                            }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div style={{
                                marginTop: '20px',
                                padding: '16px',
                                background: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #e8e8e8'
                            }}>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProductInfo;