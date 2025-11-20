import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';
import { message, Button, Row, Col, Tag } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

const ProductInfo = () => {
    const { product } = useLocation().state || {};
    const { user } = useAuthContext();
    const [messageApi, contextHolder] = message.useMessage();

    const handleAddToCart = async () => {
        if (!user?.id) {
            messageApi.error("Please login first to add items to cart");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/cart/${user.id}/add`, {
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

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            {contextHolder}
            <div className="container" style={{ padding: '40px 20px' }}>
                <Row gutter={[40, 40]} align="top">
                    {/* Product Image */}
                    <Col xs={24} md={12}>
                        <div style={{ 
                            background: '#f8f9fa', 
                            borderRadius: '12px', 
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '400px',
                        }}>
                            <img
                                src={product.image || product.productImageUrl}
                                alt={product.name || product.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </Col>

                    {/* Product Details */}
                    <Col xs={24} md={12}>
                        <div style={{ padding: '20px 0' }}>
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

                            {/* Price */}
                            <div style={{ 
                                fontSize: '32px', 
                                fontWeight: '700',
                                color: '#e63946',
                                marginBottom: '20px'
                            }}>
                                Rs {product.price}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <p style={{ 
                                    fontSize: '16px', 
                                    lineHeight: '1.6',
                                    color: '#666',
                                    marginBottom: '24px'
                                }}>
                                    {product.description}
                                </p>
                            )}

                            {/* Product Meta */}
                            <div style={{ marginBottom: '30px' }}>
                                {/* Category */}
                                {product.category && (
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                        <span style={{ fontWeight: '500', marginRight: '8px' }}>Category:</span>
                                        <Tag color="blue">{product.category}</Tag>
                                    </div>
                                )}

                                {/* Stock Status */}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '500', marginRight: '8px' }}>Availability:</span>
                                    <Tag color={isInStock ? "green" : "red"}>
                                        {isInStock ? "In Stock" : "Out of Stock"}
                                    </Tag>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<ShoppingCartOutlined />}
                                    onClick={handleAddToCart}
                                    disabled={!isInStock}
                                    style={{
                                        background: '#e63946',
                                        border: 'none',
                                        borderRadius: '8px',
                                        height: '48px',
                                        padding: '0 32px',
                                        fontWeight: '600',
                                        fontSize: '16px'
                                    }}
                                >
                                    {isInStock ? "Add to Cart" : "Out of Stock"}
                                </Button>

                                <Button
                                    size="large"
                                    icon={<HeartOutlined />}
                                    style={{
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '8px',
                                        height: '48px',
                                        width: '48px'
                                    }}
                                />
                            </div>

                            {/* Additional Info */}
                            <div style={{ 
                                marginTop: '30px', 
                                padding: '20px',
                                background: '#f8f9fa',
                                borderRadius: '8px'
                            }}>
                                <div style={{ color: '#666', fontSize: '14px' }}>
                                    <div style={{ marginBottom: '8px' }}>✓ Free shipping on orders over Rs 5000</div>
                                    <div style={{ marginBottom: '8px' }}>✓ 30-day return policy</div>
                                    <div>✓ Secure checkout</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ProductInfo;