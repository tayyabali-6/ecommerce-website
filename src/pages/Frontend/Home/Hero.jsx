import React from 'react';
import { AppleFilled } from '@ant-design/icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true, // ✅ Allow user to control
    pauseOnHover: true,
  };

  return (
    <div className="hero-carousel">
      <Slider {...settings}>
          <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-subtitle">oraimo Watch ES 2 1.95″</h2>
              <p className="hero-heading">AMOLED IP68 Smart Watch</p>
              {/* <Link to="/shop/iphone15" className="hero-link">Shop Now →</Link> */}
            </div>
            <img src="https://cdn-img.oraimo.com/fit-in/600x600/KE/product/2024/07/24/OSW-810-680-9.jpg" alt="Watch" className="hero-img" />
          </div>
        </div>

        {/* Slide 2 */}
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-subtitle">oraimo Watch ES 2 1.95″</h2>
              <p className="hero-heading">AMOLED IP68 Smart Watch</p>
              {/* <Link to="/shop/iphone15" className="hero-link">Shop Now →</Link> */}
            </div>
            <img src="https://cdn-img.oraimo.com/fit-in/600x600/KE/product/2024/07/24/OSW-810-680-9.jpg" alt="Watch" className="hero-img" />
          </div>
        </div>

        {/* Slide 3 */}
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-subtitle">Baseus D05 Bowie Wireless Headphones</h2>
              <p className="hero-heading">Bluetooth 5.3 Foldable Sport Headset</p>
              {/* <Link to="/shop/iphone15" className="hero-link">Shop Now →</Link> */}
            </div>
            <img src="https://phonetive.pk/cdn/shop/files/Sbb1c2fa4e39b43189171fc78be5b5f29i.jpg_554x554.jpg_5be38468-9421-4043-bdd1-9dfcf581470d_1024x1024.webp?v=1722931732" alt="Headphones" className="hero-img" />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
