import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/Auth";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`http://localhost:5000/api/cart/${user.id}`);
        const data = await response.json();
        
        if (data.success) {
          setCartItems(data.cart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      const all = [];
      for (const item of cartItems) {
        try {
          const response = await fetch(`http://localhost:5000/api/products`);
          const data = await response.json();
          
          if (data.success) {
            const product = data.products.find(p => p._id === item.productId);
            if (product) {
              all.push({
                ...product,
                quantity: item.quantity,
                productId: item.productId,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
      setProducts(all);
      setLoading(false);
    };
    
    if (cartItems.length > 0) {
      fetchProducts();
    } else if (cartItems.length === 0 && user) {
      setLoading(false);
    }
  }, [cartItems, user]);

  const updateQuantity = async (productId, change) => {
    if (!user?.id) return;
    
    const item = cartItems.find(item => item.productId === productId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const newCartItems = cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setCartItems(newCartItems);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user.id}/remove/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        const newCartItems = cartItems.filter((item) => item.productId !== productId);
        setCartItems(newCartItems);
        messageApi.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
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
          name: p.name || p.title,
          image: p.image || p.productImageUrl,
          price: parseFloat(p.price),
          quantity: p.quantity,
        })),
      },
    });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" style={{ color: "#1d3557" }} />
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
            {products.length === 0 ? (
              <div className="text-center text-light">
                <p>Your cart is empty</p>
              </div>
            ) : (
              products.map((item, i) => (
                <div key={i} className="card p-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <img
                        src={item.image || item.productImageUrl}
                        alt={item.name || item.title}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-9">
                      <h5 style={{ color: "#1d3557" }}>{item.name || item.title}</h5>
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
              ))
            )}
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
              <button 
                className="btn btn-danger w-100" 
                onClick={handleCheckout}
                disabled={products.length === 0}
              >
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