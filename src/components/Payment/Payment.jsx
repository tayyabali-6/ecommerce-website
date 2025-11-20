import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { message, Card, Button, Row, Col, Typography, Tag, Divider, Spin } from 'antd';
import { DollarOutlined, CheckCircleOutlined, TruckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { order, totalAmount } = location.state || {};

    const [processing, setProcessing] = useState(false);

    // ✅ ONLY CASH ON DELIVERY PAYMENT
    const handlePayment = async () => {
        console.log('🔄 Payment button clicked');
        console.log('Current Order:', order);

        if (!order) {
            message.error('Order details not found');
            return;
        }

        if (!order._id || !order.userId) {
            message.error('Invalid order data');
            return;
        }

        setProcessing(true);

        try {
            const response = await fetch('http://localhost:5000/api/payments/cod', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order._id,
                    userId: order.userId
                })
            });

            const data = await response.json();

            if (data.success) {
                message.success(data.message);
                navigate('/thank-you');
            } else {
                message.error(data.message || 'Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('❌ Payment error:', error);
            message.error('Payment processing failed');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
            minHeight: '100vh',
            padding: '20px 0'
        }}>
            <div className="container" style={{ padding: '0 16px' }}>
                <Row justify="center">
                    <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                        <Card
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                            }}
                            bodyStyle={{ 
                                padding: '24px',
                                paddingBottom: '32px'
                            }}
                        >
                            {/* Header */}
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <Title 
                                    level={2} 
                                    style={{ 
                                        color: '#1d3557',
                                        margin: 0,
                                        fontWeight: 700,
                                        fontSize: 'clamp(1.5rem, 4vw, 2rem)'
                                    }}
                                >
                                    Payment
                                </Title>
                                <Text 
                                    type="secondary" 
                                    style={{ 
                                        fontSize: 'clamp(14px, 2vw, 16px)'
                                    }}
                                >
                                    Complete your order payment
                                </Text>
                            </div>

                            <Row gutter={[24, 24]}>
                                {/* Order Summary */}
                                <Col xs={24} lg={12}>
                                    <Card
                                        style={{
                                            background: '#f8f9fa',
                                            border: 'none',
                                            borderRadius: '12px'
                                        }}
                                        bodyStyle={{ 
                                            padding: '20px',
                                            paddingBottom: '24px'
                                        }}
                                    >
                                        <Title 
                                            level={4} 
                                            style={{ 
                                                color: '#1d3557', 
                                                marginBottom: '16px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            Order Summary
                                        </Title>
                                        
                                        <div style={{ marginBottom: '12px' }}>
                                            <Text strong style={{ fontSize: '14px' }}>Order ID: </Text>
                                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                                {order?._id ? order._id.toString().substring(0, 8) + '...' : 'Loading...'}
                                            </Text>
                                        </div>
                                        
                                        <div style={{ marginBottom: '16px' }}>
                                            <Text strong style={{ fontSize: '14px' }}>User ID: </Text>
                                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                                {order?.userId ? order.userId.toString().substring(0, 8) + '...' : 'Loading...'}
                                            </Text>
                                        </div>
                                        
                                        <Divider style={{ margin: '16px 0' }} />
                                        
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            padding: '16px',
                                            background: 'linear-gradient(135deg, #e63946, #d32f2f)',
                                            borderRadius: '10px',
                                            color: 'white'
                                        }}>
                                            <Text strong style={{ 
                                                color: 'white', 
                                                fontSize: 'clamp(14px, 2vw, 16px)'
                                            }}>
                                                Total Amount:
                                            </Text>
                                            <Text strong style={{ 
                                                color: 'white', 
                                                fontSize: 'clamp(18px, 3vw, 20px)'
                                            }}>
                                                Rs {totalAmount || 0}
                                            </Text>
                                        </div>
                                    </Card>
                                </Col>

                                {/* Payment Method */}
                                <Col xs={24} lg={12}>
                                    <Card
                                        style={{
                                            background: '#f8f9fa',
                                            border: 'none',
                                            borderRadius: '12px'
                                        }}
                                        bodyStyle={{ 
                                            padding: '20px',
                                            paddingBottom: '24px'
                                        }}
                                    >
                                        <Title 
                                            level={4} 
                                            style={{ 
                                                color: '#1d3557', 
                                                marginBottom: '16px',
                                                fontSize: '18px'
                                            }}
                                        >
                                            Payment Method
                                        </Title>

                                        {/* Cash on Delivery Option */}
                                        <div style={{ 
                                            padding: '16px',
                                            background: 'white',
                                            borderRadius: '10px',
                                            border: '2px solid #e63946',
                                            marginBottom: '16px'
                                        }}>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                marginBottom: '8px',
                                                flexWrap: 'wrap'
                                            }}>
                                                <CheckCircleOutlined style={{ 
                                                    color: '#e63946', 
                                                    fontSize: '18px', 
                                                    marginRight: '10px' 
                                                }} />
                                                <Text strong style={{ 
                                                    fontSize: '15px', 
                                                    color: '#1d3557'
                                                }}>
                                                    💵 Cash on Delivery
                                                </Text>
                                            </div>
                                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                                Pay when your order arrives
                                            </Text>
                                        </div>

                                        {/* Instructions */}
                                        <Card
                                            style={{
                                                background: 'rgba(230, 57, 70, 0.1)',
                                                border: '1px solid rgba(230, 57, 70, 0.2)',
                                                borderRadius: '10px'
                                            }}
                                            bodyStyle={{ 
                                                padding: '16px',
                                                paddingBottom: '20px'
                                            }}
                                        >
                                            <Title 
                                                level={5} 
                                                style={{ 
                                                    color: '#e63946', 
                                                    marginBottom: '12px',
                                                    fontSize: '16px'
                                                }}
                                            >
                                                <TruckOutlined style={{ marginRight: '6px' }} />
                                                Delivery Instructions
                                            </Title>
                                            <div style={{ color: '#666', fontSize: '14px' }}>
                                                <div style={{ marginBottom: '6px' }}>• Pay when your order arrives at your doorstep</div>
                                                <div style={{ marginBottom: '6px' }}>• Have exact change ready</div>
                                                <div style={{ marginBottom: '6px' }}>• Delivery time: 2-3 business days</div>
                                                <div>• Delivery charges: Rs 300</div>
                                            </div>
                                        </Card>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Payment Button */}
                            <div style={{ 
                                textAlign: 'center', 
                                marginTop: '32px',
                                padding: '0 8px'
                            }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<DollarOutlined />}
                                    onClick={handlePayment}
                                    loading={processing}
                                    style={{
                                        background: 'linear-gradient(135deg, #e63946 0%, #d32f2f 100%)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        height: '50px',
                                        padding: '0 32px',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        boxShadow: '0 6px 20px rgba(230, 57, 70, 0.3)',
                                        minWidth: '250px',
                                        width: '100%',
                                        maxWidth: '400px'
                                    }}
                                >
                                    {processing ? (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Spin size="small" style={{ marginRight: '8px' }} />
                                            Placing Order...
                                        </span>
                                    ) : (
                                        `Place Order - Rs ${totalAmount || 0}`
                                    )}
                                </Button>
                            </div>

                            {/* Additional Info */}
                            <div style={{ 
                                marginTop: '20px', 
                                textAlign: 'center',
                                padding: '12px 16px',
                                background: 'rgba(29, 53, 87, 0.1)',
                                borderRadius: '8px',
                                margin: '0 8px'
                            }}>
                                <Text 
                                    type="secondary" 
                                    style={{ 
                                        fontSize: '13px',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    🔒 Your order is secure. We protect your payment information.
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Responsive CSS */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .container {
                        padding: 0 12px !important;
                    }
                    
                    .ant-card-body {
                        padding: 20px 16px !important;
                    }
                    
                    .ant-row {
                        margin: 0 -8px !important;
                    }
                    
                    .ant-col {
                        padding: 0 8px !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .container {
                        padding: 0 8px !important;
                    }
                    
                    .ant-card-body {
                        padding: 16px 12px !important;
                    }
                    
                    .payment-button {
                        height: 48px !important;
                        font-size: 15px !important;
                    }
                }
                
                @media (max-width: 400px) {
                    .ant-card-body {
                        padding: 12px 8px !important;
                    }
                    
                    .payment-button {
                        height: 44px !important;
                        font-size: 14px !important;
                        min-width: 200px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Payment;