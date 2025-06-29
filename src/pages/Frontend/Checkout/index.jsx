import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';
import { firestore } from '../../../config/firebase';

const Checkout = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, address } = form;
    if (!name || !phone || !address) return messageApi.error('All fields are required');
    setLoading(true);
    try {
      await addDoc(collection(firestore, 'orders'), {
        userId: user.uid,
        name,
        phone,
        address,
        items: cartItems,
        totalAmount,
        time: Timestamp.now(),
        status: 'Pending'
      });
      await updateDoc(doc(firestore, 'carts', user.uid), { cartItems: [] });
      messageApi.success('Order placed successfully!');
      navigate('/thank-you');
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
                onChange={handleChange}
                style={{ background: 'rgba(255,255,255,0.7)' }}
              ></textarea>
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
                {loading ? 'Placing Order...' : `Place Order (Rs. ${totalAmount})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
