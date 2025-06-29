import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // import navigation hook
import Loader from "../../../Loader/isLoader";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // initialize navigation

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "products"));
            const productList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const sortProducts = (type) => {
        const sorted = [...products];
        if (type === "lowToHigh") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (type === "highToLow") {
            sorted.sort((a, b) => b.price - a.price);
        }
        setProducts(sorted);
    };

    // ✅ handleProductClick: navigate to detail page with product ID
    const handleProductClick = (product) => {
        navigate("/productinfo", { state: { product } });
    };

    return (
        <>
            <div className="container my-5">
                <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 border">
                    <h2 className="fw-bold mb-3 mb-md-0 text-dark">🛒 All Products</h2>
                    <div className="d-flex gap-2 flex-wrap">
                        <button onClick={() => sortProducts("lowToHigh")} className="btn btn-outline-secondary rounded-pill px-4 fw-semibold">
                            Price Low-High
                        </button>
                        <button onClick={() => sortProducts("highToLow")} className="btn btn-dark rounded-pill px-4 fw-semibold">
                            Price High-Low
                        </button>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                        <div className="spinner-border text-danger" role="status" style={{ width: "4rem", height: "4rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center text-muted">No products found.</p>
                ) : (
                    <div className="row">
                        {products.map((product, index) => (
                            <div key={index} className="col-md-3 col-sm-6 mb-4">
                                <div className="product-box position-relative">
                                    <div className="discount-badge">-35%</div>
                                    <div className="product-icons">
                                        <span className="icon-btn"><FaHeart /></span>
                                        <span className="icon-btn" onClick={() => handleProductClick(product)}><FaEye /></span>
                                    </div>
                                    <div className="product-img-wrapper" onClick={() => handleProductClick(product)}>
                                        <img src={product.productImageUrl} alt={product.title} className="product-img" />
                                        <div className="add-cart-overlay">Add To Cart</div>
                                    </div>
                                    <h6 className="product-title mt-2 mb-1 text-start">
                                        {product.title.length > 40 ? product.title.slice(0, 40) + "..." : product.title}
                                    </h6>
                                    <div className="price text-start">Rs {product.price}</div>
                                    <div className="rating text-start mb-2">
                                        {[1, 2, 3, 4, 5].map(star => <FaStar key={star} size={14} color="gold" className="me-1" />)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AllProducts;
