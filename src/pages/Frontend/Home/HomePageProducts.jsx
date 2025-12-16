// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../../context/Auth";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { HeartOutlined, EyeOutlined, StarFilled, RightOutlined, LeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import { Button, Card, Tag, message } from "antd";
// import "swiper/css";
// import "swiper/css/navigation";

// const HomePageProducts = () => {
//   const { getAllProduct, user } = useAuthContext();
//   const navigate = useNavigate();
//   const [messageApi, contextHolder] = message.useMessage();

//   // Backend URL
//   const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

//   const handlehomepageProduct = (product) => {
//     navigate("/productinfo", { state: { product } });
//   };

//   const handleViewAllProducts = () => {
//     navigate("/allproducts");
//   };

//   // Add to Cart Function
//   const handleAddToCart = async (product, e) => {
//     e.stopPropagation(); // Card par click se rokne ke liye
    
//     if (!user?.id) {
//       messageApi.error("Please login first to add items to cart");
//       return;
//     }

//     try {
//       const productId = product._id || product.id;
//       if (!productId) {
//         messageApi.error("Product ID not found");
//         return;
//       }

//       const response = await fetch(`${BACKEND_URL}/api/cart/${user.id}/add`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productId: productId,
//           quantity: 1
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         messageApi.success("Product added to cart successfully!");
        
//         // Cart page navigate karen 2 seconds baad
//         setTimeout(() => {
//           navigate("/cart");
//         }, 500);
//       } else {
//         messageApi.error(data.message || "Failed to add product to cart");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       messageApi.error("Failed to add product to cart");
//     }
//   };

//   return (
//     <div className="container mt-5 px-2 px-md-3 px-lg-4">
//       {contextHolder}
      
//       {/* Flash Sales Section */}
//       <section className="position-relative overflow-hidden mb-4">
//         {/* Header */}
//         <div className="d-flex align-items-center mb-4">
//           <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "12px" }}></div>
//           <h4 className="text-danger m-0 fw-bold fs-5 fs-md-4">Flash Sales</h4>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="position-absolute top-0 end-0 z-3 d-none d-md-flex">
//           <Button
//             className="swiper-button-prev me-2"
//             shape="circle"
//             size="small"
//             icon={<LeftOutlined />}
//             style={{
//               border: "1px solid #d9d9d9",
//               background: "white",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
//             }}
//           />
//           <Button
//             className="swiper-button-next"
//             shape="circle"
//             size="small"
//             icon={<RightOutlined />}
//             style={{
//               border: "1px solid #d9d9d9",
//               background: "white",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
//             }}
//           />
//         </div>

//         {/* Products Slider */}
//         <div className="position-relative">
//           <Swiper
//             modules={[Navigation]}
//             navigation={{
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             }}
//             spaceBetween={24}
//             slidesPerView={4}
//             breakpoints={{
//               0: {
//                 slidesPerView: 1,
//                 spaceBetween: 16,
//                 centeredSlides: true
//               },
//               576: {
//                 slidesPerView: 2,
//                 spaceBetween: 18
//               },
//               768: {
//                 slidesPerView: 2.5,
//                 spaceBetween: 20
//               },
//               992: {
//                 slidesPerView: 3.2,
//                 spaceBetween: 22
//               },
//               1200: {
//                 slidesPerView: 4,
//                 spaceBetween: 24
//               }
//             }}
//           >
//             {getAllProduct.map((item, index) => {
//               const { image, productImageUrl, name, title, price, discountPrice } = item;
//               const originalPrice = discountPrice ? price : null;
//               const displayPrice = discountPrice || price;

//               return (
//                 <SwiperSlide key={item._id || index}>
//                   <Card
//                     className="product-card h-100 mx-auto"
//                     style={{
//                       border: "none",
//                       borderRadius: "16px",
//                       overflow: "hidden",
//                       transition: "all 0.4s ease",
//                       maxWidth: "320px",
//                       width: "100%",
//                       background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
//                       boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                       position: "relative"
//                     }}
//                     bodyStyle={{
//                       padding: "0",
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column"
//                     }}
//                   >
//                     {/* Image Section */}
//                     <div
//                       className="image-section position-relative"
//                       onClick={() => handlehomepageProduct(item)}
//                       style={{
//                         cursor: "pointer",
//                         height: "220px",
//                         overflow: "hidden",
//                         background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
//                         position: "relative"
//                       }}
//                     >
//                       <img
//                         src={image || productImageUrl}
//                         alt={name || title}
//                         className="product-image"
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "contain",
//                           transition: "all 0.4s ease",
//                           padding: "0px"
//                         }}
//                       />

//                       {/* Discount Badge */}
//                       <Tag
//                         color="#e63946"
//                         style={{
//                           position: "absolute",
//                           top: "12px",
//                           left: "12px",
//                           fontWeight: "bold",
//                           border: "none",
//                           fontSize: "12px",
//                           padding: "4px 8px",
//                           borderRadius: "12px",
//                           boxShadow: "0 2px 8px rgba(230, 57, 70, 0.3)"
//                         }}
//                       >
//                         -35%
//                       </Tag>

//                       {/* Action Icons */}
//                       <div
//                         className="position-absolute d-flex flex-column gap-2"
//                         style={{
//                           top: "12px",
//                           right: "12px"
//                         }}
//                       >
//                         <Button
//                           type="text"
//                           icon={<HeartOutlined />}
//                           style={{
//                             background: "rgba(255,255,255,0.9)",
//                             borderRadius: "50%",
//                             width: "36px",
//                             height: "36px",
//                             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                             backdropFilter: "blur(10px)",
//                             border: "none",
//                             transition: "all 0.3s ease"
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = "#e63946";
//                             e.currentTarget.style.color = "white";
//                             e.currentTarget.style.transform = "scale(1.1)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = "rgba(255,255,255,0.9)";
//                             e.currentTarget.style.color = "inherit";
//                             e.currentTarget.style.transform = "scale(1)";
//                           }}
//                         />
//                         <Button
//                           type="text"
//                           icon={<EyeOutlined />}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handlehomepageProduct(item);
//                           }}
//                           style={{
//                             background: "rgba(255,255,255,0.9)",
//                             borderRadius: "50%",
//                             width: "36px",
//                             height: "36px",
//                             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                             backdropFilter: "blur(10px)",
//                             border: "none",
//                             transition: "all 0.3s ease"
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = "#36bffa";
//                             e.currentTarget.style.color = "white";
//                             e.currentTarget.style.transform = "scale(1.1)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = "rgba(255,255,255,0.9)";
//                             e.currentTarget.style.color = "inherit";
//                             e.currentTarget.style.transform = "scale(1)";
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* Product Info Section */}
//                     <div className="product-info p-4 d-flex flex-column">
//                       <h6
//                         className="product-name mb-2"
//                         style={{
//                           fontSize: "15px",
//                           fontWeight: "600",
//                           lineHeight: "1.4",
//                           color: "#2d3748",
//                           minHeight: "42px",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden"
//                         }}
//                       >
//                         {name || title}
//                       </h6>

//                       {/* Price Section */}
//                       <div className="price-section mb-3">
//                         <div
//                           className="current-price fw-bold"
//                           style={{
//                             fontSize: "18px",
//                             color: "#e63946"
//                           }}
//                         >
//                           Rs {displayPrice}
//                         </div>
//                         {originalPrice && (
//                           <div
//                             className="original-price text-muted text-decoration-line-through ms-2"
//                             style={{ fontSize: "14px" }}
//                           >
//                             Rs {originalPrice}
//                           </div>
//                         )}
//                       </div>

//                       {/* Rating and Add to Cart */}
//                       <div className="d-flex justify-content-between align-items-center mt-auto">
//                         <div className="rating d-flex align-items-center">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <StarFilled
//                               key={star}
//                               style={{
//                                 fontSize: "14px",
//                                 color: "#ffd700",
//                                 marginRight: "2px"
//                               }}
//                             />
//                           ))}
//                           <span
//                             className="ms-1"
//                             style={{
//                               fontSize: "12px",
//                               color: "#718096"
//                             }}
//                           >
//                             (128)
//                           </span>
//                         </div>

//                         {/* Add to Cart Button - Enhanced */}
//                         <Button
//                           type="primary"
//                           icon={<ShoppingCartOutlined />}
//                           size="small"
//                           onClick={(e) => handleAddToCart(item, e)}
//                           style={{
//                             background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
//                             border: "none",
//                             borderRadius: "20px",
//                             fontWeight: "600",
//                             fontSize: "12px",
//                             padding: "6px 16px",
//                             boxShadow: "0 4px 12px rgba(230, 57, 70, 0.3)",
//                             transition: "all 0.3s ease",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "6px"
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.transform = "scale(1.05)";
//                             e.currentTarget.style.boxShadow = "0 6px 20px rgba(230, 57, 70, 0.5)";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.transform = "scale(1)";
//                             e.currentTarget.style.boxShadow = "0 4px 12px rgba(230, 57, 70, 0.3)";
//                           }}
//                         >
//                           Add
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Quick View Button on Hover */}
//                     <div
//                       className="hover-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
//                       style={{
//                         top: 0,
//                         left: 0,
//                         background: "rgba(230, 57, 70, 0.95)",
//                         opacity: 0,
//                         transition: "all 0.3s ease",
//                         pointerEvents: "none"
//                       }}
//                     >
//                       <Button
//                         type="primary"
//                         icon={<EyeOutlined />}
//                         size="large"
//                         onClick={() => handlehomepageProduct(item)}
//                         style={{
//                           background: "white",
//                           border: "none",
//                           color: "#e63946",
//                           borderRadius: "25px",
//                           padding: "12px 24px",
//                           fontWeight: "600",
//                           transform: "translateY(20px)",
//                           transition: "all 0.3s ease",
//                           pointerEvents: "auto"
//                         }}
//                       >
//                         Quick View
//                       </Button>
//                     </div>
//                   </Card>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </div>
//       </section>

//       {/* View All Products Button */}
//       <div className="text-center my-5 py-3">
//         <Button
//           type="primary"
//           size="large"
//           onClick={handleViewAllProducts}
//           style={{
//             background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
//             border: "none",
//             borderRadius: "12px",
//             padding: "16px 48px",
//             height: "auto",
//             fontWeight: "600",
//             fontSize: "16px",
//             boxShadow: "0 8px 25px rgba(230, 57, 70, 0.3)",
//             minWidth: "220px",
//             transition: "all 0.3s ease"
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-2px)";
//             e.currentTarget.style.boxShadow = "0 12px 30px rgba(230, 57, 70, 0.4)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 8px 25px rgba(230, 57, 70, 0.3)";
//           }}
//         >
//           View All Products
//         </Button>
//       </div>

//       <hr className="my-4" />

//       {/* Hover Effects CSS */}
//     </div>
//   );
// };

// export default HomePageProducts;































import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";
import { HeartOutlined, EyeOutlined, StarFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Tag, message } from "antd";

const HomePageProducts = () => {
  const { getAllProduct, user } = useAuthContext();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  const products = getAllProduct?.slice(0, 8) || []; // max 8 products

  const handleProductDetail = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    if (!user?.id) {
      messageApi.error("Please login first to add items to cart");
      return;
    }
    try {
      const productId = product._id || product.id;
      const res = await fetch(`${BACKEND_URL}/api/cart/${user.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
      });
      const data = await res.json();
      if (data.success) {
        messageApi.success("Product added to cart!");
        setTimeout(() => navigate("/cart"), 500);
      } else {
        messageApi.error(data.message || "Failed to add product");
      }
    } catch {
      messageApi.error("Failed to add product");
    }
  };

  return (
    <div className="container mt-5 px-2 px-md-3 px-lg-4">
      {contextHolder}

      {/* Flash Sales Section */}
      <section className="mb-4">
        <div className="d-flex align-items-center mb-4">
          <div className="bg-danger" style={{ width: 4, height: 24, marginRight: 12 }}></div>
          <h4 className="text-danger m-0 fw-bold fs-5 fs-md-4">Flash Sales</h4>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {products.map((item) => {
            const displayPrice = item.discountPrice || item.price;
            const originalPrice = item.discountPrice ? item.price : null;

            return (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Card
                  hoverable
                  onClick={() => handleProductDetail(item)}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                  }}
                  bodyStyle={{ padding: 0, display: "flex", flexDirection: "column", height: "100%" }}
                >
                  {/* Image */}
                  <div style={{ flex: 1, overflow: "hidden", position: "relative", height: 200 }}>
                    <img
                      src={item.image || item.productImageUrl}
                      alt={item.name || item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {item.discountPrice && (
                      <Tag
                        color="#e63946"
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          fontWeight: "bold",
                          borderRadius: 12,
                        }}
                      >
                        -{Math.round((1 - displayPrice / originalPrice) * 100)}%
                      </Tag>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: "12px"}}>
                    <h6 style={{ fontWeight: 600 }}>{item.name || item.title}</h6>
                    <div className="d-flex gap-2 mb-2">
                      <span style={{ color: "#e63946", fontWeight: 600 }}>Rs {displayPrice}</span>
                      {originalPrice && <span style={{ textDecoration: "line-through", color: "#888" }}>Rs {originalPrice}</span>}
                    </div>

                    {/* Rating */}
                    <div className="d-flex  mb-3">
                      {[1,2,3,4,5].map((i)=>(<StarFilled key={i} style={{ color:"#ffd700", fontSize:12, marginRight:2 }} />))}
                      <span style={{ fontSize:12, color:"#718096" }}>(128)</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={(e) => handleAddToCart(item, e)}
                      style={{
                        borderRadius: 24,
                        background: "#e63946",
                        border: "none",
                        fontWeight: 600,
                        fontSize: 14,
                        padding: "8px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 6px 18px rgba(230,57,70,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-5">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/allproducts")}
            style={{
              background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "16px 48px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 8px 25px rgba(230, 57, 70, 0.3)",
              minWidth: "220px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(230, 57, 70, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(230, 57, 70, 0.3)";
            }}
          >
            View All Products
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePageProducts;
