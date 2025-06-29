import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const HomePageProducts = () => {
  const { getAllProduct } = useAuthContext();
  const navigate = useNavigate();

  const handlehomepageProduct = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  return (
    <div className="container p-0 mt-5">

      <section className="container position-relative overflow-hidden">
        <div className="d-flex align-items-center mb-4">
          <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "10px" }}></div>
          <h4 className="text-danger m-0">Flash Sales</h4>
        </div>
        <div className="position-absolute top-0 mt-4 me-5 border end-0 z-3">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next ms-2"></div>
        </div>
        <div className="container d-flex justify-content-center position-relative">
          {/* Swiper Navigation Top Right */}

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={30}
            slidesPerView={3.5}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 15 },
              576: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 25 },
              992: { slidesPerView: 3.5, spaceBetween: 30 },
            }}
          >
            {getAllProduct.map((item, index) => {
              const { productImageUrl, title, price } = item;
              return (
                <SwiperSlide key={index}>
                  <div className="product-card text-center position-relative">
                    <div className="discount-badge">-35%</div>
                    <div className="icon-group">
                      <div className="icon-circle"><FaHeart /></div>
                      <div className="icon-circle" onClick={() => handlehomepageProduct(item)}>
                        <FaEye />
                      </div>
                    </div>
                    <div className="image-wrapper" onClick={() => handlehomepageProduct(item)}>
                      <img src={productImageUrl} alt={title} className="product-image" />
                      <div className="add-to-cart-btn">Add To Cart</div>
                    </div>
                    <h6 className="product-title mt-2 mb-1 text-start">
                      {title.length > 40 ? title.slice(0, 40) + "..." : title}
                    </h6>
                    <div className="price-text text-start">${price}</div>
                    <div className="mb-3 text-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} size={14} color="gold" className="me-1" />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <div className="allProduct text-center">
        <button className="btn btn-danger mb-4 px-5 py-2 rounded-1" onClick={()=> navigate('/allproducts')}>
          <Link to='/allProducts' className="text-reset text-decoration-none">
            View All Products
          </Link>
        </button>
      </div>
      <hr />
    </div>
  );
};

export default HomePageProducts;
