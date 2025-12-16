// import React, { useState, useEffect } from 'react';
// import { message } from 'antd';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuthContext } from '../../../context/Auth';

// const Checkout = () => {
//   const { user } = useAuthContext();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', phone: '', address: '' });
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();

//   // Backend URL
//   const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';

//   const { totalAmount, cartItems: stateCartItems } = location.state || {};

//   useEffect(() => {
//     if (stateCartItems?.length > 0) {
//       const formatted = stateCartItems.map(item => ({
//         name: item.name || 'No name',
//         image: item.image || '',
//         price: Number(item.price) || 0,
//         quantity: item.quantity || 1
//       }));
//       setCartItems(formatted);
//     }
//   }, [stateCartItems]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Get current location function
//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       setLocationLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           // Simple address format
//           const address = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
//           setForm(prev => ({ ...prev, address }));
//           setLocationLoading(false);
//           messageApi.success('Location detected successfully!');
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           setLocationLoading(false);
//           messageApi.error('Please allow location access or enter address manually');
//         }
//       );
//     } else {
//       messageApi.error('Geolocation is not supported by this browser');
//     }
//   };

//   // Use sample location
//   const useSampleLocation = () => {
//     const sampleAddress = "D-Type Colony, Bajwa Street, Faisalabad, Pakistan";
//     setForm(prev => ({ ...prev, address: sampleAddress }));
//     messageApi.success('Sample location added!');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, phone, address } = form;
//     if (!name || !phone || !address) return messageApi.error('All fields are required');
    
//     setLoading(true);
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: user.id,
//           name,
//           phone,
//           address,
//           items: cartItems,
//           totalAmount
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         messageApi.success('Order created! Proceeding to payment...');
        
//         navigate('/payment', { 
//           state: { 
//             order: data.order, 
//             totalAmount: totalAmount 
//           } 
//         });
        
//       } else {
//         messageApi.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       messageApi.error('Failed to place order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section
//       className="py-5 d-flex align-items-center"
//       style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #1d3557, #457b9d)',
//       }}
//     >
//       {contextHolder}
//       <div className="container">
//         <div
//           className="mx-auto p-5 shadow-lg rounded-4"
//           style={{
//             maxWidth: '800px',
//             background: 'rgba(255,255,255,0.15)',
//             backdropFilter: 'blur(20px)',
//             border: '1px solid rgba(255,255,255,0.2)',
//           }}
//         >
//           <h2
//             className="text-center mb-5 fw-bold"
//             style={{ color: '#fff', letterSpacing: '1px' }}
//           >
//             Checkout
//           </h2>

//           <form onSubmit={handleSubmit} className="row g-4">
//             <div className="col-md-6">
//               <label className="form-label text-white fw-semibold">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control rounded-pill shadow-sm"
//                 placeholder="John Doe"
//                 value={form.name}
//                 onChange={handleChange}
//                 style={{ background: 'rgba(255,255,255,0.7)' }}
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label text-white fw-semibold">Phone Number</label>
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control rounded-pill shadow-sm"
//                 placeholder="03XX-XXXXXXX"
//                 value={form.phone}
//                 onChange={handleChange}
//                 style={{ background: 'rgba(255,255,255,0.7)' }}
//               />
//             </div>
            
//             <div className="col-12">
//               <label className="form-label text-white fw-semibold">Delivery Address</label>
//               <textarea
//                 name="address"
//                 rows="4"
//                 className="form-control rounded-4 shadow-sm"
//                 placeholder="Your delivery address..."
//                 value={form.address}
//                 onChange={handleChange}
//                 style={{ 
//                   background: 'rgba(255,255,255,0.7)',
//                   marginBottom: '10px'
//                 }}
//               ></textarea>
              
//               {/* Location Buttons */}
//               <div className="d-flex gap-2 flex-wrap">
//                 <button
//                   type="button"
//                   className="btn btn-outline-light btn-sm"
//                   onClick={getCurrentLocation}
//                   disabled={locationLoading}
//                   style={{ borderRadius: '20px' }}
//                 >
//                   {locationLoading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Detecting Location...
//                     </>
//                   ) : (
//                     '📍 Use Current Location'
//                   )}
//                 </button>
                
//                 <button
//                   type="button"
//                   className="btn btn-outline-warning btn-sm"
//                   onClick={useSampleLocation}
//                   style={{ borderRadius: '20px' }}
//                 >
//                   🗺️ Use Sample Location
//                 </button>
//               </div>

//               {/* Selected Location Display */}
//               {form.address && (
//                 <div className="mt-2 p-2 rounded" style={{ 
//                   background: 'rgba(255,255,255,0.2)', 
//                   border: '1px solid rgba(255,255,255,0.3)',
//                   fontSize: '14px'
//                 }}>
//                   <span className="text-white fw-semibold">Selected Address: </span>
//                   <span className="text-light">{form.address}</span>
//                 </div>
//               )}
//             </div>

//             <div className="col-12 text-end">
//               <p className="mb-2 fs-5 text-white">
//                 <b>Total Payable:</b>{' '}
//                 <span style={{ color: '#ffd700' }}>Rs. {totalAmount}</span>
//               </p>
//             </div>

//             <div className="col-12">
//               <button
//                 type="submit"
//                 className="w-100 py-3 fw-bold text-white bg-danger"
//                 style={{
//                   border: 'none',
//                   borderRadius: '50px',
//                   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
//                   fontSize: '1.2rem',
//                   transition: 'all 0.3s ease',
//                 }}
//                 disabled={loading}
//                 onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
//                 onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//               >
//                 {loading ? 'Creating Order...' : `Proceed to Payment (Rs. ${totalAmount})`}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Checkout;



























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

  const BACKEND_URL = 'https://medialyx-backend-production.up.railway.app';
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const address = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
          setForm(prev => ({ ...prev, address }));
          setLocationLoading(false);
          messageApi.success('Location detected successfully!');
        },
        () => {
          setLocationLoading(false);
          messageApi.error('Please allow location access or enter address manually');
        }
      );
    } else messageApi.error('Geolocation not supported by this browser');
  };

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
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, name, phone, address, items: cartItems, totalAmount })
      });
      const data = await res.json();
      if (data.success) {
        messageApi.success('Order created! Redirecting to payment...');
        navigate('/payment', { state: { order: data.order, totalAmount } });
      } else messageApi.error(data.message);
    } catch {
      messageApi.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="checkout-section">
      {contextHolder}

      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="03XX-XXXXXXX"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Address</label>
            <textarea
              name="address"
              rows="4"
              placeholder="Your delivery address..."
              value={form.address}
              onChange={handleChange}
            ></textarea>

            <div className="location-buttons">
              <button type="button" onClick={getCurrentLocation} disabled={locationLoading}>
                {locationLoading ? 'Detecting...' : '📍 Current Location'}
              </button>
              <button type="button" onClick={useSampleLocation}>🗺️ Sample Location</button>
            </div>

            {form.address && <div className="selected-address">{form.address}</div>}
          </div>

          <div className="total-amount">
            Total Payable: <span>Rs. {totalAmount}</span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Order...' : `Proceed to Payment (Rs. ${totalAmount})`}
          </button>
        </form>
      </div>

      <style>{`
        .checkout-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1d3557, #457b9d);
          padding: 20px;
        }

        .checkout-container {
          width: 100%;
          max-width: 600px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(25px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 40px 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .checkout-title {
          text-align: center;
          color: #fff;
          margin-bottom: 30px;
          font-size: 2rem;
          letter-spacing: 1px;
        }

        .checkout-form .form-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .checkout-form .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .checkout-form label {
          margin-bottom: 6px;
          font-weight: 600;
          color: #fff;
        }

        .checkout-form input,
        .checkout-form textarea {
          width: 100%;
          padding: 12px 20px;
          border-radius: 50px;
          border: none;
          outline: none;
          font-size: 1rem;
          background: rgba(255,255,255,0.7);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }

        .checkout-form textarea {
          border-radius: 20px;
        }

        .checkout-form input:focus,
        .checkout-form textarea:focus {
          box-shadow: 0 6px 12px rgba(0,0,0,0.25);
        }

        .location-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .location-buttons button {
          flex: 1;
          padding: 10px;
          border-radius: 25px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.25);
          color: #fff;
        }

        .location-buttons button:hover {
          background: rgba(255,255,255,0.45);
        }

        .selected-address {
          margin-top: 10px;
          padding: 8px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.2);
          color: #fff;
          font-size: 0.9rem;
          word-wrap: break-word;
        }

        .total-amount {
          text-align: right;
          margin: 15px 0;
          font-size: 1.2rem;
          color: #fff;
        }

        .total-amount span {
          color: #ffd700;
          font-weight: bold;
        }

        .checkout-form button[type="submit"] {
          width: 100%;
          padding: 15px;
          border-radius: 50px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          background: #e63946;
          color: #fff;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .checkout-form button[type="submit"]:hover {
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .checkout-container { padding: 30px 20px; }
          .checkout-title { font-size: 1.8rem; }
          .checkout-form input, .checkout-form textarea { padding: 10px 15px; font-size: 0.95rem; }
          .location-buttons button { font-size: 0.9rem; padding: 8px 12px; }
          .total-amount { font-size: 1.1rem; }
          .checkout-form button[type="submit"] { font-size: 1rem; padding: 12px; }
        }

        @media (max-width: 480px) {
          .checkout-container { padding: 20px 15px; }
          .checkout-title { font-size: 1.6rem; }
          .location-buttons { flex-direction: column; }
        }
      `}</style>
    </section>
  );
};

export default Checkout;
