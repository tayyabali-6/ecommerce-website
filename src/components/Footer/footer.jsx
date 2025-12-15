import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography, Divider, Space, Card, message, Button } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();

  const handlePhoneClick = () => {
    navigator.clipboard.writeText('03457678128');
    messageApi.success('Phone number copied!');
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText('Medialyxstore@gmail.com');
    messageApi.success('Email copied!');
  };

  const handlePhoneDirect = () => window.location.href = 'tel:+923457678128';
  const handleEmailDirect = () => window.location.href = 'mailto:Medialyxstore@gmail.com';

  return (
    <footer style={{ background: "#0d1b2a", color: "white", padding: "60px 20px 30px", marginTop: "auto" }}>
      {contextHolder}
      <div className="container">
        <Row gutter={[32, 32]} justify="start" align="top">
          {/* Brand */}
          <Col xs={24} sm={24} md={8} style={{ textAlign: 'left' }}>
            <Space direction="vertical" size="middle" style={{ width: "100%", alignItems: 'flex-start' }}>
              <Title level={3} style={{ background: "linear-gradient(90deg, #e63946, #f77f00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
                <ShopFilled style={{ marginRight: "8px",color:"white" }} /> MediaLyx
              </Title>
              <Paragraph style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.6", margin: 0 }}>
                Your premier destination for quality products. Seamless 24/7 online shopping with MediaLyx.
              </Paragraph>
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={8} style={{ textAlign: 'left' }}>
            <Title level={5} style={{ color: "#e63946", marginBottom: "16px" }}>Quick Links</Title>
            <Space direction="vertical" style={{ width: "100%", alignItems: 'flex-start' }}>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/allProducts" className="footer-link">All Products</Link>
              <Link to="/cart" className="footer-link">Shopping Cart</Link>
              <Link to="/about" className="footer-link">About Us</Link>
            </Space>
          </Col>

          {/* Contact & Support */}
          <Col xs={24} sm={12} md={8} style={{ textAlign: 'left' }}>
            <Title level={5} style={{ color: "#e63946", marginBottom: "16px" }}>Contact & Support</Title>
            <Space direction="vertical" size="middle" style={{ width: '100%', alignItems: 'flex-start' }}>
              <Button type="text" className="contact-btn" icon={<PhoneFilled style={{ color: "#e63946", fontSize: 16 }} />} onClick={handlePhoneDirect} onContextMenu={(e) => { e.preventDefault(); handlePhoneClick(); }}>
                <Text style={{ color: "white" }}>0345 7678128</Text>
              </Button>

              <Button type="text" className="contact-btn" icon={<MailFilled style={{ color: "#e63946", fontSize: 16 }} />} onClick={handleEmailDirect} onContextMenu={(e) => { e.preventDefault(); handleEmailClick(); }}>
                <Text style={{ color: "white" }}>Medialyxstore@gmail.com</Text>
              </Button>


              <Card size="small" style={{ background: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.3)", marginTop: "8px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: 'flex-start' }}>
                  <SafetyCertificateFilled style={{ color: "#e63946" }} />
                  <Text style={{ color: "white", fontSize: 12 }}>Secure & Trusted Shopping</Text>
                </div>
              </Card>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "rgba(255,255,255,0.2)", margin: "32px 0 24px" }} />

        {/* Copyright */}
        <Row justify="start" align="middle">
          <Col>
            <Space direction="vertical" size="small" align="start">
              <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                &copy; {new Date().getFullYear()} <strong style={{ color: "#e63946" }}>MediaLyx</strong>. All rights reserved.
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                Designed for exceptional 24/7 shopping experience
              </Text>
            </Space>
          </Col>
        </Row>
      </div>

      <style>
        {`
          .footer-link {
            color: rgba(255,255,255,0.85);
            text-decoration: none;
            display: block;
            transition: all 0.3s ease;
          }
          .footer-link:hover {
            color: #f77f00 !important;
            transform: translateX(5px);
          }

          .social-icon {
            color: white;
            font-size: 20px;
            transition: all 0.3s ease;
          }
          .social-icon:hover {
            color: #f77f00;
            transform: scale(1.2);
          }

          .contact-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            justify-content: flex-start;
          }
          .contact-btn:hover {
            background: rgba(255,255,255,0.1);
            transform: translateX(4px);
          }

          @media (max-width: 768px) {
            .container { padding: 0 16px; }
            .contact-btn { justify-content: flex-start; }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
