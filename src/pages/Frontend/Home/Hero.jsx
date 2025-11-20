import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingOutlined, StarOutlined, TruckOutlined, FireOutlined, GiftOutlined } from '@ant-design/icons';
import { Button, Row, Col, Tag, Space } from 'antd';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/shop');
  };

  const handleAllProducts = () => {
    navigate('/products');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <div className="container">
        <Row
          align="middle"
          style={{ minHeight: '100vh' }}
          gutter={[48, 48]}
        >
          {/* Left Content */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Badge */}
              <Tag
                icon={<FireOutlined />}
                color="#e63946"
                style={{
                  fontSize: '16px',
                  padding: '8px 16px',
                  border: 'none',
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                2025 Collection
              </Tag>

              {/* Main Heading */}
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'bold',
                lineHeight: '1.2',
                margin: 0,
                color: 'white'
              }}>
                Premium Shoes{' '}
                <span style={{
                  color: '#e63946',
                  fontWeight: 'bolder'
                }}>
                  2025
                </span>
              </h1>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: '#f1faee',
                lineHeight: '1.6',
                margin: 0
              }}>
                Discover your perfect pair with the latest styles, unmatched comfort,
                and exclusive designs for every occasion.
              </p>

              {/* Buttons */}
              <Space
                size="middle"
                wrap
                style={{
                  marginTop: '2rem'
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  onClick={'/'}
                  style={{
                    background: '#e63946',
                    border: 'none',
                    borderRadius: '8px',
                    height: '50px',
                    padding: '0 2rem',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: '0 4px 15px rgba(230, 57, 70, 0.3)'
                  }}
                >
                  Shop Now
                </Button>


                <Link to="/allProducts">
                  <Button
                    size="large"
                    icon={<GiftOutlined />}

                    style={{
                      border: '2px solid #e63946',
                      borderRadius: '8px',
                      color: '#e63946',
                      background: 'transparent',
                      height: '50px',
                      padding: '0 2rem',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    All Products
                  </Button>
                </Link>
              </Space>

              {/* Features */}
              <Row
                gutter={[16, 16]}
                style={{ marginTop: '3rem' }}
              >
                <Col xs={8} sm={8}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <StarOutlined style={{ fontSize: '24px', color: '#e63946' }} />
                    <div style={{ fontWeight: 'bold', marginTop: '8px', color: 'white' }}>500+ Styles</div>
                    <small style={{ color: '#f1faee' }}>Latest Trends</small>
                  </div>
                </Col>
                <Col xs={8} sm={8}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23e63946' d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'/%3E%3C/svg%3E"
                      alt="Brands"
                      style={{ width: '24px', height: '24px' }}
                    />
                    <div style={{ fontWeight: 'bold', marginTop: '8px', color: 'white' }}>50+ Brands</div>
                    <small style={{ color: '#f1faee' }}>Premium Quality</small>
                  </div>
                </Col>
                <Col xs={8} sm={8}>
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <TruckOutlined style={{ fontSize: '24px', color: '#e63946' }} />
                    <div style={{ fontWeight: 'bold', marginTop: '8px', color: 'white' }}>Free Shipping</div>
                    <small style={{ color: '#f1faee' }}>Worldwide</small>
                  </div>
                </Col>
              </Row>
            </Space>
          </Col>

          {/* Right Image */}
          <Col xs={24} lg={12}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  padding: '20px'
                }}
              >
                <img
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png"
                  alt="Nike Air Force 1 Shoes"
                  style={{
                    width: '100%',
                    height: 'auto',
                    transform: 'rotate(-5deg)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg) scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'rotate(-5deg) scale(1)'}
                />
              </div>

              {/* Floating Badge */}
              <Tag
                color="#e63946"
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '4px 12px',
                  border: 'none',
                  borderRadius: '20px',
                  color: 'white'
                }}
              >
                <FireOutlined /> Trending
              </Tag>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hero;