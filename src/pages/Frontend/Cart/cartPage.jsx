import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../../context/Auth";
import { firestore } from "../../../config/firebase";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState(true); // fixed typo
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      const cartRef = doc(firestore, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const items = cartSnap.data().cartItems || [];
        setCartItems(items);
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      const all = [];
      for (const item of cartItems) {
        const productRef = doc(firestore, "products", item.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          all.push({
            ...productSnap.data(),
            quantity: item.quantity,
            productId: item.productId,
          });
        }
      }
      setProducts(all);
      setLoading(false); // data fetch complete -> hide loader
    };
    if (cartItems.length > 0) {
      fetchProducts();
    } else if (cartItems.length === 0 && user) {
      // Cart empty but user logged in -> still stop loader
      setLoading(false);
    }
  }, [cartItems, user]);

  const updateQuantity = async (productId, change) => {
    const newCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(newCartItems);
    await updateDoc(doc(firestore, "carts", user.uid), { cartItems: newCartItems });
  };

  const removeFromCart = async (productId) => {
    const newCartItems = cartItems.filter((item) => item.productId !== productId);
    setCartItems(newCartItems);
    await updateDoc(doc(firestore, "carts", user.uid), { cartItems: newCartItems });
    messageApi.success("Item removed from cart");
  };

  const getTotalPrice = () => {
    return products.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        totalAmount: getTotalPrice(),
        cartItems: products.map((p) => ({
          productId: p.productId,
          name: p.title || p.name,
          image: p.productImageUrl,
          price: parseFloat(p.price),
          quantity: p.quantity,
        })),
      },
    });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" style={{ color: "#id3557" }} />
      </div>
    );
  }

  return (
    <main style={{background:'#1d3557'}}>

      <div className="container my-4" >
        {contextHolder}
        <div className="row">
          <div className="col-md-8">
            <h1 className="mb-4 text-light">
              Your Shopping Cart
            </h1>
            {products.length === 0 && (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <div className="spinner-border text-danger" role="status" style={{ width: "4rem", height: "4rem" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {products.map((item, i) => (
              <div key={i} className="card p-3 mb-3">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.productImageUrl}
                      alt={item.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-9">
                    <h5 style={{ color: "#id3557" }}>{item.title}</h5>
                    <p>
                      Price: <b>Rs. {item.price}</b>
                    </p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => updateQuantity(item.productId, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => updateQuantity(item.productId, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-link text-danger mt-2 px-0"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <h5 className="text-danger">Price Details</h5>
              <hr />
              <p>
                Total Items: <b>{products.length}</b>
              </p>
              <p>
                Total Price: <b>Rs. {getTotalPrice()}</b>
              </p>
              <button className="btn btn-danger w-100" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
