import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';

const Checkout = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { totalAmount, cartItems: stateCartItems } = location.state || {};

  useEffect(() => {
    if (stateCartItems?.length > 0) {
      const formatted = stateCartItems.map(item => ({
        name: item.name || 'No name',
        image: item.image || '',
        price: Number(item.price) || 0,
        quantity: item.quantity || 1
      }));
      setCartItems(formatted);
    }
  }, [stateCartItems]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Get current location function
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Simple address format
          const address = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
          setForm(prev => ({ ...prev, address }));
          setLocationLoading(false);
          messageApi.success('Location detected successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationLoading(false);
          messageApi.error('Please allow location access or enter address manually');
        }
      );
    } else {
      messageApi.error('Geolocation is not supported by this browser');
    }
  };

  // Use sample location
  const useSampleLocation = () => {
    const sampleAddress = "D-Type Colony, Bajwa Street, Faisalabad, Pakistan";
    setForm(prev => ({ ...prev, address: sampleAddress }));
    messageApi.success('Sample location added!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, address } = form;
    if (!name || !phone || !address) return messageApi.error('All fields are required');
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          name,
          phone,
          address,
          items: cartItems,
          totalAmount
        }),
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success('Order created! Proceeding to payment...');
        
        navigate('/payment', { 
          state: { 
            order: data.order, 
            totalAmount: totalAmount 
          } 
        });
        
      } else {
        messageApi.error(data.message);
      }
    } catch (error) {
      console.error(error);
      messageApi.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-5 d-flex align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1d3557, #457b9d)',
      }}
    >
      {contextHolder}
      <div className="container">
        <div
          className="mx-auto p-5 shadow-lg rounded-4"
          style={{
            maxWidth: '800px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <h2
            className="text-center mb-5 fw-bold"
            style={{ color: '#fff', letterSpacing: '1px' }}
          >
            Checkout
          </h2>

          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-md-6">
              <label className="form-label text-white fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control rounded-pill shadow-sm"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                style={{ background: 'rgba(255,255,255,0.7)' }}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white fw-semibold">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control rounded-pill shadow-sm"
                placeholder="03XX-XXXXXXX"
                value={form.phone}
                onChange={handleChange}
                style={{ background: 'rgba(255,255,255,0.7)' }}
              />
            </div>
            
            <div className="col-12">
              <label className="form-label text-white fw-semibold">Delivery Address</label>
              <textarea
                name="address"
                rows="4"
                className="form-control rounded-4 shadow-sm"
                placeholder="Your delivery address..."
                value={form.address}
                onChange={handleChange}
                style={{ 
                  background: 'rgba(255,255,255,0.7)',
                  marginBottom: '10px'
                }}
              ></textarea>
              
              {/* Location Buttons */}
              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  style={{ borderRadius: '20px' }}
                >
                  {locationLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Detecting Location...
                    </>
                  ) : (
                    '📍 Use Current Location'
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  onClick={useSampleLocation}
                  style={{ borderRadius: '20px' }}
                >
                  🗺️ Use Sample Location
                </button>
              </div>

              {/* Selected Location Display */}
              {form.address && (
                <div className="mt-2 p-2 rounded" style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontSize: '14px'
                }}>
                  <span className="text-white fw-semibold">Selected Address: </span>
                  <span className="text-light">{form.address}</span>
                </div>
              )}
            </div>

            <div className="col-12 text-end">
              <p className="mb-2 fs-5 text-white">
                <b>Total Payable:</b>{' '}
                <span style={{ color: '#ffd700' }}>Rs. {totalAmount}</span>
              </p>
            </div>

            <div className="col-12">
              <button
                type="submit"
                className="w-100 py-3 fw-bold text-white bg-danger"
                style={{
                  border: 'none',
                  borderRadius: '50px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                }}
                disabled={loading}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {loading ? 'Creating Order...' : `Proceed to Payment (Rs. ${totalAmount})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;