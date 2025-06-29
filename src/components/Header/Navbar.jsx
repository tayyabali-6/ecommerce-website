import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';
import { firestore } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Button } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const Navbar = () => {
  const { isAuth, user, handleLogout } = useAuthContext();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe;
    if (user?.uid) {
      const cartRef = doc(firestore, 'carts', user.uid);

      unsubscribe = onSnapshot(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          const cartItems = snapshot.data().cartItems || [];
          const totalQuantity = cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          setCartCount(totalQuantity);
        } else {
          setCartCount(0);
        }
      });
    } else {
      setCartCount(0);
    }

    return () => unsubscribe && unsubscribe();
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 px-4 sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link
          to="/"
          className="navbar-brand fw-bold text-dark fs-4 d-flex align-items-center gap-2"
        >
          <ShopOutlined style={{ fontSize: '1.6rem', color: '#1d3557' }} />
          MyShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link
                className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                to="/"
              >
                <AppstoreOutlined /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                to="/allProducts"
              >
                <AppstoreOutlined /> All Products
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav gap-3 align-items-center ms-auto">
            {isAuth && user?.role === 'user' && (
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                  to="/dashboard/user/userDashboard"
                >
                  <DashboardOutlined /> User Dashboard
                </Link>
              </li>
            )}
            {isAuth && user?.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                  to="/dashboard/admin/adminDashboard"
                >
                  <DashboardOutlined /> Admin Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                to="/cart"
              >
                <ShoppingCartOutlined /> Cart
                <span className="badge bg-danger rounded-pill ms-1">{cartCount}</span>
              </Link>
            </li>
            <li className="nav-item">
              {isAuth ? (
                <Button
                  type="link"
                  className="text-danger fw-semibold d-flex align-items-center gap-1"
                  onClick={() => handleLogout(navigate)}
                >
                  <LogoutOutlined /> Logout
                </Button>
              ) : (
                <Link
                  className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                  to="/auth/register"
                >
                  <UserOutlined /> Sign Up
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <style>
        {`
          .nav-link {
            transition: color 0.2s ease;
          }
          .nav-link:hover {
            color: #1d3557 !important;
          }
          .navbar-toggler {
            background-color: #e0e0e0;
            border-radius: 6px;
          }
          .ant-btn-link {
            padding: 0;
          }
          .badge {
            font-size: 0.75rem;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
