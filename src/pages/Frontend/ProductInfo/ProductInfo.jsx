import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useAuthContext } from '../../../context/Auth';
import { firestore } from '../../../config/firebase';

const ProductInfo = () => {
    const { product } = useLocation().state || {};
    const { user } = useAuthContext();
    const [messageApi, contextHolder] = message.useMessage();

    const handleAddToCart = async () => {
        if (!user?.uid) return messageApi.error("Login first");

        const cartRef = doc(firestore, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);

        let updatedCart = [];

        if (cartSnap.exists()) {
            const existingCart = cartSnap.data().cartItems || [];
            const isExist = existingCart.find(item => item.productId === product.id);

            if (isExist) {
                updatedCart = existingCart.map(item =>
                    item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...existingCart, { productId: product.id, quantity: 1 }];
            }
        } else {
            updatedCart = [{ productId: product.id, quantity: 1 }];
        }

        await setDoc(cartRef, { cartItems: updatedCart });
        messageApi.success("Product added to cart");
    };

    if (!product) return <div className="text-center py-5 fs-4 text-muted">Page not found</div>;

    return (
        <main>
            <section className="product-info bg-custom-blue py-5">
                {contextHolder}
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="glass-card p-4 h-100 d-flex">
                                <img
                                    src={product.productImageUrl}
                                    className="img-fluid w-100 h-100 object-fit-cover rounded-4 shadow"
                                    alt={product.title}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="glass-card p-5 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h2 className="fw-bold text-white mb-3 product-title-animate">{product.title}</h2>
                                    <p className="text-light mb-4  product-desc-animate">{product.description}</p>
                                    <h3 className="text-danger fw-bold mb-4 price-animate">Rs {product.price}</h3>
                                </div>
                                <button
                                    className="btn btn-danger btn-lg rounded-pill w-100 fw-semibold py-3 add-cart-animate"
                                    onClick={handleAddToCart}
                                >
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductInfo;