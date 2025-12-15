import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/Auth";
import { message, Spin, Button, Card, Row, Col, Badge, Empty, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, DeleteOutlined, MinusOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  // Backend URL
  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

  // Fetch cart items from backend
  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const fetchCartItems = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/cart/${user.id}`);
      const data = await response.json();

      if (data.success && data.cart) {
        // Get product details for each cart item
        const cartWithProducts = await Promise.all(
          data.cart.map(async (cartItem) => {
            try {
              const productResponse = await fetch(`${BACKEND_URL}/api/products/${cartItem.productId}`);
              const productData = await productResponse.json();
              
              if (productData.success) {
                return {
                  ...cartItem,
                  product: productData.product
                };
              }
              return cartItem;
            } catch (error) {
              console.error("Error fetching product:", error);
              return cartItem;
            }
          })
        );
        
        setCartItems(cartWithProducts.filter(item => item.product));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      messageApi.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Update quantity function
  const updateQuantity = async (productId, change) => {
    if (!user?.id) {
      messageApi.error("Please login to update cart");
      return;
    }

    const item = cartItems.find(item => item.productId === productId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);

    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/${user.id}/update`, {
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
        // Update local state
        setCartItems(prev => prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: newQuantity }
            : item
        ));
        messageApi.success("Quantity updated");
      } else {
        messageApi.error(data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      messageApi.error("Failed to update quantity");
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!user?.id) {
      messageApi.error("Please login to remove items");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/${user.id}/remove/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setCartItems(prev => prev.filter(item => item.productId !== productId));
        messageApi.success("Item removed from cart");
      } else {
        messageApi.error(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      messageApi.error("Failed to remove item");
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product?.price || 0);
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        totalAmount: getTotalPrice(),
        cartItems: cartItems.map(item => ({
          productId: item.productId,
          name: item.product?.name || item.product?.title || "Unknown Product",
          image: item.product?.image || item.product?.productImageUrl,
          price: parseFloat(item.product?.price || 0),
          quantity: item.quantity,
        })),
      },
    });
  };

  // Handle clear cart
  const handleClearCart = async () => {
    if (!user?.id) {
      messageApi.error("Please login to clear cart");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/cart/${user.id}/clear`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setCartItems([]);
        messageApi.success("Cart cleared successfully");
      } else {
        messageApi.error(data.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      messageApi.error("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "60vh" 
      }}>
        <Spin size="large" style={{ color: "#e63946" }} />
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-4 py-lg-5 px-3 px-md-4">
      {contextHolder}
      
      {/* Header - Mobile Responsive */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="d-flex align-items-center mb-3 mb-md-0 w-100">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="me-3"
            size={screens.xs ? "small" : "middle"}
          />
          <div className="d-flex align-items-center flex-grow-1">
            <h1 className="m-0 fw-bold" style={{ 
              color: "#1d3557",
              fontSize: screens.xs ? "20px" : screens.md ? "24px" : "28px"
            }}>
              <ShoppingCartOutlined className="me-2" />
              Your Cart
            </h1>
            {cartItems.length > 0 && (
              <Badge 
                count={cartItems.length} 
                style={{ 
                  marginLeft: "12px", 
                  background: "#e63946",
                  fontSize: screens.xs ? "12px" : "14px"
                }} 
              />
            )}
          </div>
        </div>
        
        {cartItems.length > 0 && (
          <Button
            type="text"
            danger
            onClick={handleClearCart}
            size={screens.xs ? "small" : "middle"}
            style={{ 
              color: "#ff4d4f",
              whiteSpace: "nowrap",
              marginLeft: screens.xs ? "0" : "auto"
            }}
          >
            {screens.xs ? "Clear All" : "Clear Cart"}
          </Button>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {/* Cart Items - Mobile Responsive */}
        <Col xs={24} lg={16}>
          {cartItems.length === 0 ? (
            <Card className="text-center py-4 py-md-5" style={{ 
              borderRadius: "12px",
              margin: screens.xs ? "0 -12px" : "0"
            }}>
              <Empty
                image={<ShoppingCartOutlined style={{ 
                  fontSize: screens.xs ? "48px" : "64px", 
                  color: "#e6e6e6" 
                }} />}
                description={
                  <div>
                    <h3 style={{ 
                      color: "#666", 
                      marginBottom: "8px",
                      fontSize: screens.xs ? "18px" : "20px"
                    }}>
                      Your cart is empty
                    </h3>
                    <p className="text-muted" style={{
                      fontSize: screens.xs ? "14px" : "16px"
                    }}>
                      Add some amazing products to your cart!
                    </p>
                  </div>
                }
              />
              <Button
                type="primary"
                onClick={() => navigate("/")}
                size={screens.xs ? "middle" : "large"}
                style={{
                  background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: screens.xs ? "8px 24px" : "10px 32px",
                  fontSize: screens.xs ? "14px" : "16px",
                  marginTop: "24px"
                }}
              >
                Start Shopping
              </Button>
            </Card>
          ) : (
            cartItems.map((item, index) => (
              <Card 
                key={`${item.productId}-${index}`} 
                className="mb-3" 
                style={{ 
                  borderRadius: screens.xs ? "10px" : "12px",
                  border: "1px solid #e8e8e8",
                  padding: screens.xs ? "12px" : "16px"
                }}
              >
                <Row gutter={[12, 12]} align="middle">
                  {/* Product Image - Mobile Responsive */}
                  <Col xs={8} sm={6} md={6}>
                    <div 
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: screens.xs ? "80px" : screens.sm ? "100px" : "120px",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer"
                      }}
                      onClick={() => navigate("/productinfo", { state: { product: item.product } })}
                    >
                      <img
                        src={item.product?.image || item.product?.productImageUrl}
                        alt={item.product?.name || item.product?.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: screens.xs ? "4px" : "8px"
                        }}
                      />
                    </div>
                  </Col>
                  
                  {/* Product Details - Mobile Responsive */}
                  <Col xs={16} sm={18} md={18}>
                    <div className="d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start">
                        <div style={{ flex: 1, marginRight: "8px" }}>
                          <h5 
                            style={{ 
                              color: "#1d3557", 
                              fontWeight: "600", 
                              marginBottom: screens.xs ? "4px" : "8px",
                              cursor: "pointer",
                              fontSize: screens.xs ? "14px" : screens.sm ? "16px" : "18px",
                              lineHeight: 1.4
                            }}
                            onClick={() => navigate("/productinfo", { state: { product: item.product } })}
                          >
                            {screens.xs ? 
                              (item.product?.name || item.product?.title || "Product").substring(0, 30) + "..." : 
                              item.product?.name || item.product?.title || "Product"
                            }
                          </h5>
                          <div style={{ 
                            fontSize: screens.xs ? "16px" : "18px", 
                            color: "#e63946", 
                            fontWeight: "700" 
                          }}>
                            Rs {parseFloat(item.product?.price || 0).toFixed(2)}
                          </div>
                          {!screens.xs && (
                            <div className="text-muted small mt-1">
                              Price: Rs {parseFloat(item.product?.price || 0).toFixed(2)}
                            </div>
                          )}
                        </div>
                        
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeFromCart(item.productId)}
                          style={{ 
                            color: "#ff4d4f",
                            minWidth: screens.xs ? "32px" : "auto"
                          }}
                          size={screens.xs ? "small" : "middle"}
                        />
                      </div>
                      
                      <div className="mt-2 mt-md-auto d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                        {/* Quantity Controls - Mobile Responsive */}
                        <div className="d-flex align-items-center mb-2 mb-sm-0">
                          <Button
                            type="default"
                            icon={<MinusOutlined />}
                            onClick={() => updateQuantity(item.productId, -1)}
                            disabled={item.quantity <= 1}
                            size={screens.xs ? "small" : "middle"}
                            style={{ 
                              borderRadius: "6px",
                              width: screens.xs ? "28px" : "32px",
                              height: screens.xs ? "28px" : "32px",
                              minWidth: "unset"
                            }}
                          />
                          <div style={{
                            minWidth: screens.xs ? "36px" : "40px",
                            textAlign: "center",
                            fontSize: screens.xs ? "14px" : "16px",
                            fontWeight: "600",
                            margin: "0 8px"
                          }}>
                            {item.quantity}
                          </div>
                          <Button
                            type="default"
                            icon={<PlusOutlined />}
                            onClick={() => updateQuantity(item.productId, 1)}
                            size={screens.xs ? "small" : "middle"}
                            style={{ 
                              borderRadius: "6px",
                              width: screens.xs ? "28px" : "32px",
                              height: screens.xs ? "28px" : "32px",
                              minWidth: "unset"
                            }}
                          />
                        </div>
                        
                        {/* Item Total - Mobile Responsive */}
                        <div style={{ 
                          fontSize: screens.xs ? "16px" : "18px", 
                          fontWeight: "700", 
                          color: "#1d3557",
                          marginTop: screens.xs ? "8px" : "0"
                        }}>
                          Total: Rs {(parseFloat(item.product?.price || 0) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </Col>

        {/* Order Summary - Mobile Responsive */}
        <Col xs={24} lg={8}>
          <Card
            style={{ 
              borderRadius: "12px",
              border: "1px solid #e8e8e8",
              position: screens.lg ? "sticky" : "static",
              top: screens.lg ? "20px" : "auto",
              marginTop: screens.xs ? "16px" : "0"
            }}
          >
            <h5 className="fw-bold mb-3" style={{ 
              color: "#1d3557",
              fontSize: screens.xs ? "18px" : "20px"
            }}>
              Order Summary
            </h5>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted" style={{ fontSize: screens.xs ? "14px" : "16px" }}>
                  Items ({cartItems.length})
                </span>
                <span className="fw-semibold" style={{ fontSize: screens.xs ? "14px" : "16px" }}>
                  Rs {getTotalPrice()}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted" style={{ fontSize: screens.xs ? "14px" : "16px" }}>
                  Shipping
                </span>
                <span className="fw-semibold" style={{ 
                  fontSize: screens.xs ? "14px" : "16px",
                  color: "#52c41a"
                }}>
                  FREE
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted" style={{ fontSize: screens.xs ? "14px" : "16px" }}>
                  Tax
                </span>
                <span className="fw-semibold" style={{ fontSize: screens.xs ? "14px" : "16px" }}>
                  Included
                </span>
              </div>
            </div>
            
            <div className="d-flex justify-content-between mb-4 pt-2" style={{ 
              borderTop: "1px solid #e8e8e8",
              paddingTop: "16px"
            }}>
              <span className="fw-bold" style={{ 
                fontSize: screens.xs ? "18px" : "20px"
              }}>
                Total
              </span>
              <span className="fw-bold" style={{ 
                fontSize: screens.xs ? "20px" : "24px", 
                color: "#e63946" 
              }}>
                Rs {getTotalPrice()}
              </span>
            </div>
            
            <Button
              type="primary"
              size={screens.xs ? "middle" : "large"}
              block
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              style={{
                background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
                border: "none",
                borderRadius: "8px",
                height: screens.xs ? "44px" : "48px",
                fontSize: screens.xs ? "14px" : "16px",
                fontWeight: "600",
                marginBottom: "12px"
              }}
            >
              Proceed to Checkout
            </Button>
            
            <Button
              type="default"
              size={screens.xs ? "middle" : "large"}
              block
              onClick={() => navigate("/")}
              style={{
                borderRadius: "8px",
                height: screens.xs ? "44px" : "48px",
                fontSize: screens.xs ? "14px" : "16px",
                borderColor: "#d9d9d9"
              }}
            >
              Continue Shopping
            </Button>
            
            {/* Cart Summary - Mobile Responsive */}
            {cartItems.length > 0 && (
              <div className="mt-3 p-3" style={{ 
                background: "#f8f9fa", 
                borderRadius: "8px",
                fontSize: screens.xs ? "13px" : "14px"
              }}>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Total Items:</span>
                  <span className="fw-semibold">{cartItems.length}</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="text-muted">Total Quantity:</span>
                  <span className="fw-semibold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Mobile Bottom Checkout Bar */}
      {cartItems.length > 0 && screens.xs && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          padding: "12px 16px",
          borderTop: "1px solid #e8e8e8",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          zIndex: 1000
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div style={{ fontSize: "14px", color: "#666" }}>Total Amount</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#e63946" }}>
                Rs {getTotalPrice()}
              </div>
            </div>
            <Button
              type="primary"
              onClick={handleCheckout}
              style={{
                background: "linear-gradient(135deg, #e63946 0%, #d32f2f 100%)",
                border: "none",
                borderRadius: "8px",
                height: "44px",
                padding: "0 24px",
                fontSize: "16px",
                fontWeight: "600",
                minWidth: "140px"
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Padding */}
      {screens.xs && cartItems.length > 0 && (
        <div style={{ height: "80px" }}></div>
      )}
    </div>
  );
};

export default Cart;