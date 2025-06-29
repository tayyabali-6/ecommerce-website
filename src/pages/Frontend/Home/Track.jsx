import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/Auth";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";

const Track = () => {

  const { getAllProduct } = useAuthContext();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate("/productinfo", { state: { product } });
  };

  // ✅ Filter top 4 products from each category
  const fashion = getAllProduct.filter(p => p.category === "fashion").slice(0, 4);
  const mobile = getAllProduct.filter(p => p.category === "mobile").slice(0, 4);
  const laptop = getAllProduct.filter(p => p.category === "laptop").slice(0, 4);
  const books = getAllProduct.filter(p => p.category === "books").slice(0, 4);

  const Section = ({ title, data }) => (
    <>
      <div className="d-flex align-items-center my-4">
        <div className="bg-danger" style={{ width: "4px", height: "24px", marginRight: "10px" }}></div>
        <h4 className="text-danger m-0">{title}</h4>
      </div>

      <div className="row g-4">
        {data.map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className="product-box position-relative">
              <div className="discount-badge">-35%</div>
              <div className="product-icons">
                <span className="icon-btn"><FaHeart /></span>
                <span className="icon-btn" onClick={() => handleProductClick(item)}><FaEye /></span>
              </div>
              <div className="product-img-wrapper" onClick={() => handleProductClick(item)}>
                <img src={item.productImageUrl} alt={item.title} className="product-img" />
                <div className="add-cart-overlay">Add To Cart</div>
              </div>
              <h6 className="product-title mt-2 mb-1 text-start">
                {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
              </h6>
              <div className="price text-start">Rs {item.price}</div>
              <div className="rating text-start mb-2">
                {[1, 2, 3, 4, 5].map(star => <FaStar key={star} size={14} color="gold" className="me-1" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container py-5">
      {/* 🔥 Home Hero Section or Banner laga lo yahan upar chaaho to */}

      <Section title="Fashion" data={fashion} />
      <Section title="Mobile" data={mobile} />
      <Section title="Laptop" data={laptop} />
      <Section title="Books" data={books} />

      <div className="text-center mt-5">
        <button className="btn btn-danger px-5 py-2 rounded-1" onClick={()=>navigate('allProducts')}>
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Track;
