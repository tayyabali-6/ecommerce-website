import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Card
} from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  PhoneFilled,
  MailFilled,
  ShopFilled,
  ClockCircleFilled,
  SafetyCertificateFilled
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1d3557 0%, #457b9d 100%)',
      color: 'white',
      padding: '40px 0 20px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <Row gutter={[32, 32]}>

          {/* MediaLyx Brand Section */}
          <Col xs={24} md={8}>
            <Space direction="vertical" size="middle">
              <Title level={3} style={{ color: '#e63946', margin: 0 }}>
                <ShopFilled style={{ marginRight: '8px' }} />
                MediaLyx
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: '1.6' }}>
                Your premier destination for quality products. Experience seamless
                24/7 online shopping with MediaLyx.
              </Paragraph>

              <Space size="middle">
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <FacebookFilled />
                </a>
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <InstagramFilled />
                </a>
                <a href="#" style={{ color: 'white', fontSize: '20px' }}>
                  <TwitterOutlined />
                </a>
              </Space>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: '#e63946', marginBottom: '16px' }}>
              Quick Links
            </Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Link
                to="/"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Home
              </Link>
              <Link
                to="/allProducts"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                All Products
              </Link>
              <Link
                to="/cart"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Shopping Cart
              </Link>
              <Link
                to="/about"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                About Us
              </Link>
            </Space>
          </Col>

          {/* Contact & Support */}
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: '#e63946', marginBottom: '16px' }}>
              Contact & Support
            </Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PhoneFilled style={{ color: '#e63946', marginRight: '12px', fontSize: '16px' }} />
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>0345 7678128</Text>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MailFilled style={{ color: '#e63946', marginRight: '12px', fontSize: '16px' }} />
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>support@medialyx.com</Text>
              </div>

              {/* 24/7 Business Hours */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ClockCircleFilled style={{ color: '#e63946', marginRight: '12px', fontSize: '16px' }} />
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>24/7 Open</Text>
              </div>

              {/* Trust Badge */}
              <Card
                size="small"
                style={{
                  background: 'rgba(230, 57, 70, 0.1)',
                  border: '1px solid rgba(230, 57, 70, 0.3)',
                  marginTop: '8px'
                }}
                bodyStyle={{ padding: '8px 12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SafetyCertificateFilled style={{ color: '#e63946', marginRight: '8px' }} />
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                    Secure & Trusted Shopping
                  </Text>
                </div>
              </Card>
            </Space>
          </Col>

        </Row>

        {/* Divider */}
        <Divider style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '32px 0 24px' }} />

        {/* Copyright Section */}
        <Row justify="center" align="middle">
          <Col>
            <Space direction="vertical" size="small" align="center">
              <Text style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                &copy; {new Date().getFullYear()} <strong style={{ color: '#e63946' }}>MediaLyx</strong>. All rights reserved.
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', textAlign: 'center' }}>
                Designed for exceptional 24/7 shopping experience
              </Text>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Hover Effects */}
      <style>
        {`
          footer a {
            transition: all 0.3s ease;
          }
          
          footer a:hover {
            color: #e63946 !important;
            transform: translateX(5px);
          }
          
          .ant-space .anticon {
            transition: all 0.3s ease;
          }
          
          .ant-space a:hover .anticon {
            transform: translateY(-2px);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;