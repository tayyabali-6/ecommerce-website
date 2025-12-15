import React, { useRef, useMemo } from "react";
import { Carousel, Button } from "antd";
import { ShoppingOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";

const HeroCardsCarousel = () => {
  const { getAllProduct } = useAuthContext();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // 🔥 memo so hero re-renders when products update
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
        borderRadius: 5,
        overflow: "hidden",
        cursor: "pointer",
        background: "#fff",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
      }}
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

        {/* 🔥 BUTTON WAPIS */}
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
            height: 40,
            padding: "0 20px",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          VIEW
        </Button>
      </div>
    </div>
  );

  // ---- Desktop slides (3 cards per slide)
  const desktopSlides = [];
  for (let i = 0; i < products.length; i += 3) {
    desktopSlides.push(products.slice(i, i + 3));
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #1d3557d0 0%, #1d3557 100%)"
, position: "relative" }} className="py-4">
      {/* DESKTOP */}
      <div className="d-none d-lg-block">
        <Carousel ref={carouselRef} dots={false}>
          {desktopSlides.map((group, i) => (
            <div key={i} className="d-flex justify-content-center gap-4" style={{ minHeight: "90vh" }}>
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
          style={{ position: "absolute", top: "50%", left: 10 }}
        />

        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current.next()}
          style={{ position: "absolute", top: "50%", right: 10 }}
        />
      </div>

      {/* MOBILE */}
      <div className="d-lg-none">
        <Carousel autoplay dots={false}>
          {products.map((item) => (
            <div key={item._id} className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
              <div style={{ width: "90%" }}>
                <CardItem item={item} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroCardsCarousel;
