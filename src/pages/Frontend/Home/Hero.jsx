import React, { useRef, useMemo } from "react";
import { Carousel, Button } from "antd";
import { ShoppingOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";

const Hero = () => {
  const { getAllProduct } = useAuthContext();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const products = useMemo(
    () => getAllProduct?.slice(0, 6) || [],
    [getAllProduct]
  );

  if (!products.length) return null;

  const goDetail = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  const CardItem = ({ item }) => (
    <div
      onClick={() => goDetail(item)}
      style={{
        height: "75vh",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "#fff",
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        transition: "transform .4s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      {/* IMAGE */}
      <div style={{ flex: 1 }}>
        <img
          src={item.image || item.productImageUrl}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ padding: 16, textAlign: "center" }}>
        <h5 style={{ fontWeight: 600 }}>{item.name || item.title}</h5>
        <h6 style={{ color: "#e63946" }}>Rs {item.price}</h6>

        <Button
          icon={<ShoppingOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            goDetail(item);
          }}
          style={{
            background: "#e63946",
            border: "none",
            borderRadius: 25,
            height: 42,
            padding: "0 24px",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 6px 20px rgba(230,57,70,.45)"
          }}
        >
          VIEW
        </Button>
      </div>
    </div>
  );

  const desktopSlides = [];
  for (let i = 0; i < products.length; i += 3) {
    desktopSlides.push(products.slice(i, i + 3));
  }

  return (
    <div className="hero-wrapper">
      {/* GLOW BLOBS */}
      <div className="blob blob-red" />
      <div className="blob blob-blue" />

      {/* DESKTOP */}
      <div className="d-none d-lg-block">
        <Carousel ref={carouselRef} dots={false}>
          {desktopSlides.map((group, i) => (
            <div key={i} className="d-flex justify-content-center gap-4 hero-slide">
              {group.map((item) => (
                <div key={item._id} style={{ width: "30%" }}>
                  <CardItem item={item} />
                </div>
              ))}
            </div>
          ))}
        </Carousel>

        <Button
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef.current.prev()}
          className="hero-nav left"
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current.next()}
          className="hero-nav right"
        />
      </div>

      {/* MOBILE */}
      <div className="d-lg-none">
        <Carousel autoplay dots={false}>
          {products.map((item) => (
            <div key={item._id} className="d-flex justify-content-center hero-mobile">
              <div style={{ width: "90%" }}>
                <CardItem item={item} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* STYLES */}
      <style>{`
        .hero-wrapper {
          position: relative;
          min-height: 100vh;
          background: radial-gradient(circle at top left, #1d3557, #0b132b);
          overflow: hidden;
          padding: 40px 0;
        }

        .hero-slide {
          min-height: 90vh;
          align-items: center;
        }

        .hero-mobile {
          min-height: 100vh;
          align-items: center;
        }

        .blob {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: .35;
          animation: float 12s infinite alternate;
        }

        .blob-red {
          background: #e63946;
          top: -120px;
          left: -120px;
        }

        .blob-blue {
          background: #457b9d;
          bottom: -120px;
          right: -120px;
        }

        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(-60px); }
        }

        .hero-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,.85);
          border: none;
          box-shadow: 0 6px 20px rgba(0,0,0,.25);
        }

        .hero-nav.left { left: 20px; }
        .hero-nav.right { right: 20px; }
      `}</style>
    </div>
  );
};

export default Hero;
