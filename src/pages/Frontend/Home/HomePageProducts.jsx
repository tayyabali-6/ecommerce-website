import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HeartOutlined, EyeOutlined, StarFilled, RightOutlined, LeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Tag } from "antd";
import "swiper/css";
import "swiper/css/navigation";

const HomePageProducts = () => {
  const { getAllProduct } = useAuthContext();
  const navigate = useNavigate();

  // Backend URL
  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  const handlehomepageProduct = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  const handleViewAllProducts = () => {
    navigate("/allproducts");
  };

  return (
    <div className="container mt-5 px-2 px-md-3 px-lg-4">
      {/* Flash Sales Section */}
      <section className="position-relative overflow-hidden mb-4">
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "12px" }}></div>
          <h4 className="text-danger m-0 fw-bold fs-5 fs-md-4">Flash Sales</h4>
        </div>

        {/* Navigation Buttons */}
        <div className="position-absolute top-0 end-0 z-3 d-none d-md-flex">
          <Button
            className="swiper-button-prev me-2"
            shape="circle"
            size="small"
            icon={<LeftOutlined />}
            style={{
              border: "1px solid #d9d9d9",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
          />
          <Button
            className="swiper-button-next"
            shape="circle"
            size="small"
            icon={<RightOutlined />}
            style={{
              border: "1px solid #d9d9d9",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
          />
        </div>

        {/* Products Slider */}
        <div className="position-relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={24}
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
                centeredSlides: true
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 18
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20
              },
              992: {
                slidesPerView: 3.2,
                spaceBetween: 22
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 24
              }
            }}
          >
            {getAllProduct.map((item, index) => {
              const { image, productImageUrl, name, title, price, discountPrice } = item;
              const originalPrice = discountPrice ? price : null;
              const displayPrice = discountPrice || price;

              return (
                <SwiperSlide key={item._id || index}>
                  <Card
                    className="product-card h-100 mx-auto"
                    style={{
                      border: "none",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                      maxWidth: "320px",
                      width: "100%",
                      background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
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
                      onClick={() => handlehomepageProduct(item)}
                      style={{
                        cursor: "pointer",
                        height: "220px",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                        position: "relative"
                      }}
                    >
                      <img
                        src={image || productImageUrl}
                        alt={name || title}
                        className="product-image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "all 0.4s ease",
                          padding: "0px"
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
                          onClick={() => handlehomepageProduct(image || productImageUrl)}
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
                          icon={<ShoppingCartOutlined />}
                          size="large"
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
                          Quick View
                        </Button>
                      </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="product-info p-4">
                      <h6
                        className="product-name mb-2"
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          lineHeight: "1.4",
                          color: "#2d3748",
                          minHeight: "42px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}
                      >
                        {name || title}
                      </h6>

                      {/* Price Section */}
                      <div className="price-section mb-3">
                        <div
                          className="current-price fw-bold"
                          style={{
                            fontSize: "18px",
                            color: "#e63946"
                          }}
                        >
                          Rs {displayPrice}
                        </div>
                        {originalPrice && (
                          <div
                            className="original-price text-muted text-decoration-line-through ms-2"
                            style={{ fontSize: "14px" }}
                          >
                            Rs {originalPrice}
                          </div>
                        )}
                      </div>

                      {/* Rating and Add to Cart */}
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
                            className="ms-1"
                            style={{
                              fontSize: "12px",
                              color: "#718096"
                            }}
                          >
                            (128)
                          </span>
                        </div>

                        {/* <Button
                        onClick={handleViewAllProducts}
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          size="small"
                          style={{
                            background: "#e63946",
                            border: "none",
                            borderRadius: "20px",
                            fontWeight: "500",
                            fontSize: "12px",
                            padding: "6px 16px"
                          }}
                        >
                          Add
                        </Button> */}
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* View All Products Button */}
      <div className="text-center my-5 py-3">
        <Button
          type="primary"
          size="large"
          onClick={handleViewAllProducts}
          style={{
            background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
            border: "none",
            borderRadius: "12px",
            padding: "16px 48px",
            height: "auto",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 8px 25px rgba(230, 57, 70, 0.3)",
            minWidth: "220px"
          }}
        >
          View All Products
        </Button>
      </div>

      <hr className="my-4" />

      {/* Hover Effects CSS */}
      <style jsx>{`
        .product-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        .image-section:hover .product-image {
          transform: scale(1.08) !important;
        }
        
        .image-section:hover .hover-overlay {
          opacity: 1 !important;
        }
        
        .image-section:hover .hover-overlay button {
          transform: translateY(0) !important;
        }
        
        @media (max-width: 576px) {
          .product-card {
            max-width: 280px !important;
          }
          
          .image-section {
            height: 200px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePageProducts;