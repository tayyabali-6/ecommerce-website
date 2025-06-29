import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { auth, firestore } from "../../../config/firebase";
import { collection, doc, getCountFromServer, getDoc } from "firebase/firestore";
import OrderDetails from "../../../components/AdminDetails/OrderDetails";
import ProductsDetails from "../../../components/AdminDetails/ProductsDetails";
import UsersDetails from "../../../components/AdminDetails/UsersDetails";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(firestore, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) setUser(userSnap.data());
      }

      const productsSnap = await getCountFromServer(collection(firestore, "products"));
      setTotalProducts(productsSnap.data().count);

      const ordersSnap = await getCountFromServer(collection(firestore, "orders"));
      setTotalOrders(ordersSnap.data().count);

      const usersSnap = await getCountFromServer(collection(firestore, "users"));
      setTotalUsers(usersSnap.data().count);
    };

    fetchData();
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1f", color: "#fff", fontFamily: "Poppins, sans-serif" }}>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1
            style={{
              color: "#ff4d4f",
              textShadow: "0 0 15px #ff4d4f",
              fontWeight: "900",
              letterSpacing: "1px",
            }}
          >
            Admin Dashboard
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
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
            alt="admin"
            className="mb-3"
            style={{ width: "80px" }}
          />
          <p className="mb-1">
            <strong>Name:</strong> {user?.name || "Loading..."}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {user?.email || "Loading..."}
          </p>
          <p className="mb-0">
            <strong>Role:</strong>{" "}
            <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
              {user?.role || "Loading..."}
            </span>
          </p>
        </div>

        {/* Tabs */}
        <Tabs>
          <TabList className="row text-center list-unstyled">
            <Tab className="col-md-4 col-sm-6 mb-4">
              <div className="p-4 h-100" style={tabCardStyle}>
                <div className="mb-2" style={iconStyle}>📦</div>
                <h2 className="fw-bold" style={{ color: "#ff4d4f" }}>{totalProducts}</h2>
                <p className="fw-bold" style={{ color: "#ff4d4f" }}>Total Products</p>
              </div>
            </Tab>
            <Tab className="col-md-4 col-sm-6 mb-4">
              <div className="p-4 h-100" style={tabCardStyle}>
                <div className="mb-2" style={iconStyle}>🛒</div>
                <h2 className="fw-bold" style={{ color: "#ff4d4f" }}>{totalOrders}</h2>
                <p className="fw-bold" style={{ color: "#ff4d4f" }}>Total Orders</p>
              </div>
            </Tab>
            <Tab className="col-md-4 col-sm-6 mb-4">
              <div className="p-4 h-100" style={tabCardStyle}>
                <div className="mb-2" style={iconStyle}>👥</div>
                <h2 className="fw-bold" style={{ color: "#ff4d4f" }}>{totalUsers}</h2>
                <p className="fw-bold" style={{ color: "#ff4d4f" }}>Total Users</p>
              </div>
            </Tab>
          </TabList>

          <TabPanel><ProductsDetails /></TabPanel>
          <TabPanel><OrderDetails /></TabPanel>
          <TabPanel><UsersDetails /></TabPanel>
        </Tabs>
      </div>

      <style>
        {`
        .react-tabs__tab--selected div {
          border: 2px solid #ff4d4f !important;
          transform: scale(1.05);
        }
        `}
      </style>
    </main>
  );
};

const tabCardStyle = {
  borderRadius: "1rem",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255,255,255,0.15)",
  cursor: "pointer",
  transition: "all 0.4s ease",
};

const iconStyle = {
  fontSize: "2.5rem",
  textShadow: "0 0 15px #ff4d4f",
};

export default AdminDashboard;
