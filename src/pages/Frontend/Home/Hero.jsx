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
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image for Mobile */}
      <div className="mobile-bg-image">
        <img
          src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png"
          alt="Nike Air Force 1 Shoes"
        />
      </div>

      <div className="container">
        <Row
          align="middle"
          style={{ minHeight: '100vh', position: 'relative', zIndex: 2 }}
          gutter={[48, 48]}
        >
          {/* Left Content - Becomes top content on mobile */}
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
                New Collection
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
                  onClick={handleShopNow}
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
            </Space>
          </Col>

          {/* Right Image - Hidden on mobile, shown as background */}
          <Col xs={0} lg={12}>
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
                <FireOutlined /> 
              </Tag>
            </div>
          </Col>
        </Row>
      </div>

      {/* Mobile Styles */}
      <style>
        {`
          .mobile-bg-image {
            display: none;
          }

          @media (max-width: 768px) {
            .mobile-bg-image {
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1;
              opacity: 0.15;
            }

            .mobile-bg-image img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }

            .container {
              position: relative;
              z-index: 2;
            }

            /* Adjust content for better visibility over background image */
            .ant-row {
              padding: 20px 15px;
            }

            .ant-space-vertical {
              text-align: center;
            }

            /* Make buttons more prominent */
            .ant-btn {
              backdrop-filter: blur(10px);
              background: rgba(230, 57, 70, 0.9) !important;
            }

            .ant-btn-default {
              background: rgba(255, 255, 255, 0.9) !important;
              color: #e63946 !important;
            }

            /* Enhance text visibility */
            h1, p, .ant-tag, .ant-col {
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }
          }

          @media (max-width: 480px) {
            .ant-space-vertical {
              text-align: center;
            }
            
            .ant-btn {
              width: 100%;
              margin-bottom: 10px;
            }
            
            .ant-space {
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;

















// import React, { useRef, useMemo } from "react";
// import { Carousel, Button } from "antd";
// import { ShoppingOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../../context/Auth";

// const HeroCardsCarousel = () => {
//   const { getAllProduct } = useAuthContext();
//   const navigate = useNavigate();
//   const carouselRef = useRef(null);

//   // 🔥 memo so hero re-renders when products update
//   const products = useMemo(
//     () => getAllProduct?.slice(0, 6) || [],
//     [getAllProduct]
//   );

//   if (!products.length) return null;

//   const goDetail = (product) => {
//     navigate("/productinfo", { state: { product } });
//   };

//   const CardItem = ({ item }) => (
//     <div
//       onClick={() => goDetail(item)}
//       style={{
//         height: "75vh",
//         borderRadius: 5,
//         overflow: "hidden",
//         cursor: "pointer",
//         background: "#fff",
//         boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* IMAGE */}
//       <div style={{ flex: 1 }}>
//         <img
//           src={item.image || item.productImageUrl}
//           alt={item.name}
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//       </div>

//       {/* CONTENT */}
//       <div style={{ padding: 16, textAlign: "center" }}>
//         <h5 style={{ fontWeight: 600 }}>{item.name || item.title}</h5>
//         <h6 style={{ color: "#e63946" }}>Rs {item.price}</h6>

//         {/* 🔥 BUTTON WAPIS */}
//         <Button
//           icon={<ShoppingOutlined />}
//           onClick={(e) => {
//             e.stopPropagation();
//             goDetail(item);
//           }}
//           style={{
//             background: "#e63946",
//             border: "none",
//             borderRadius: 25,
//             height: 40,
//             padding: "0 20px",
//             color: "#fff",
//             fontWeight: 500,
//           }}
//         >
//           VIEW
//         </Button>
//       </div>
//     </div>
//   );

//   // ---- Desktop slides (3 cards per slide)
//   const desktopSlides = [];
//   for (let i = 0; i < products.length; i += 3) {
//     desktopSlides.push(products.slice(i, i + 3));
//   }

//   return (
//     <div style={{ background: "linear-gradient(135deg, #1d3557d0 0%, #1d3557 100%)"
// , position: "relative" }} className="py-4">
//       {/* DESKTOP */}
//       <div className="d-none d-lg-block">
//         <Carousel ref={carouselRef} dots={false}>
//           {desktopSlides.map((group, i) => (
//             <div key={i} className="d-flex justify-content-center gap-4" style={{ minHeight: "90vh" }}>
//               {group.map((item) => (
//                 <div key={item._id} style={{ width: "30%" }}>
//                   <CardItem item={item} />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </Carousel>

//         <Button
//           shape="circle"
//           icon={<LeftOutlined />}
//           onClick={() => carouselRef.current.prev()}
//           style={{ position: "absolute", top: "50%", left: 10 }}
//         />

//         <Button
//           shape="circle"
//           icon={<RightOutlined />}
//           onClick={() => carouselRef.current.next()}
//           style={{ position: "absolute", top: "50%", right: 10 }}
//         />
//       </div>

//       {/* MOBILE */}
//       <div className="d-lg-none">
//         <Carousel autoplay dots={false}>
//           {products.map((item) => (
//             <div key={item._id} className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
//               <div style={{ width: "90%" }}>
//                 <CardItem item={item} />
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default HeroCardsCarousel;
