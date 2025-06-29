import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../../config/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Fetch user info
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) setUser(userSnap.data());

        // Fetch orders
        const orderQuery = query(collection(firestore, 'orders'), where('userId', '==', currentUser.uid));
        const orderSnap = await getDocs(orderQuery);
        const orderList = orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(orderList);
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#1d3556", color: "#fff", fontFamily: "Poppins, sans-serif" }}>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5 text-white">
          <h1 >
            User Dashboard
          </h1>
        </div>

        {/* Profile Card */}
        <div
          className="mx-auto mb-5 p-4 shadow-lg"
          style={{
            maxWidth: "600px",
            borderRadius: "1rem",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
            textAlign: "center",
          }}
        >
          <img
            src={user?.profileImage || 'https://cdn-icons-png.flaticon.com/128/2202/2202112.png'}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover", border: "3px solid #ff4d4f" }}
          />
          <h5 className="fw-bold">{user?.name || 'Loading...'}</h5>
          <p className="mb-1"><strong>Email:</strong> {user?.email || 'Loading...'}</p>
          <p className="mb-0"><strong>Role:</strong> <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>{user?.role || 'Loading...'}</span></p>
        </div>

        {/* Orders Section */}
        <h3 className="text-center mb-4" style={{ color: "#ff4d4f" }}>Your Orders</h3>
        {orders.length === 0 ? (
          <p className="text-center text-muted">No orders placed yet.</p>
        ) : (
          orders.map(order => (
            <div
              key={order.id}
              className="mb-4 p-4 shadow-lg"
              style={{
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="row mb-3 text-center text-md-start">
                <div className="col-md-3 mb-2"><strong>Order ID:</strong> {order.id}</div>
                <div className="col-md-3 mb-2">
                  <strong>Status:</strong>{" "}
                  <span className={order.status === 'Pending' ? 'text-warning' : 'text-success'}>
                    {order.status}
                  </span>
                </div>
                <div className="col-md-3 mb-2"><strong>Total:</strong> Rs. {order.totalAmount || 0}</div>
                <div className="col-md-3 mb-2"><strong>Payment:</strong> {order.paymentMethod}</div>
              </div>

              {/* Payment Screenshot */}
              {order.paymentScreenshot && (
                <div className="mb-3">
                  <strong>Payment Screenshot:</strong>
                  <div className="mt-2">
                    <img
                      src={order.paymentScreenshot}
                      alt="Payment Proof"
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: '0.5rem',
                        border: '2px solid #ff4d4f',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Products */}
              <div className="table-responsive">
                <table className="table table-dark table-borderless mb-0">
                  <thead style={{ color: "#ff4d4f" }}>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: "0.5rem", border: "1px solid #ff4d4f" }}
                          />
                          <div>{item.name}</div>
                        </td>
                        <td>x {item.quantity || 1}</td>
                        <td>Rs. {item.price || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default UserDashboard;
