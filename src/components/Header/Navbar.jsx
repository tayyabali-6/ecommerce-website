import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';
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
    const fetchCartCount = async () => {
      if (!user?.id) {
        setCartCount(0);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/cart/${user.id}`);
        const data = await response.json();
        
        if (data.success) {
          const totalQuantity = data.cart.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          setCartCount(totalQuantity);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    };

    fetchCartCount();

    // Optional: Set up polling for real-time updates (every 10 seconds)
    const interval = setInterval(fetchCartCount, 10000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 px-4 sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link
          to="/"
          className="navbar-brand fw-bold text-dark fs-4 d-flex align-items-center gap-2"
        >
          <ShopOutlined style={{ fontSize: '1.6rem', color: '#1d3557' }} />
          MediaLyx
        </Link>


         {/* <li className="nav-item"> */}
              <Link
                className="nav-link text-dark fw-medium d-flex align-items-center gap-1 position-relative"
                to="/cart"
              >
                <ShoppingCartOutlined /> Cart
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            {/* </li> */}

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
            {/* <li className="nav-item dropdown">
              <Link
                className="nav-link text-dark fw-medium d-flex align-items-center gap-1 dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <AppstoreOutlined /> Categories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/fashionProducts">Fashion</Link></li>
                <li><Link className="dropdown-item" to="/mobileProducts">Mobile</Link></li>
                <li><Link className="dropdown-item" to="/laptopProducts">Laptop</Link></li>
                <li><Link className="dropdown-item" to="/cameraProducts">Camera</Link></li>
                <li><Link className="dropdown-item" to="/techProducts">Tech</Link></li>
                <li><Link className="dropdown-item" to="/booksProducts">Books</Link></li>
              </ul>
            </li> */}
          </ul>

          <ul className="navbar-nav gap-3 align-items-center ms-auto">
            {isAuth && user?.role === 'user' && (
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                  to="/dashboard/user/userDashboard"
                >
                  <DashboardOutlined /> Dashboard
                </Link>
              </li>
            )}
            {isAuth && user?.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                  to="/dashboard/admin/adminDashboard"
                >
                  <DashboardOutlined /> Admin Panel
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link text-dark fw-medium d-flex align-items-center gap-1 position-relative"
                to="/cart"
              >
                <ShoppingCartOutlined /> Cart
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              {isAuth ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-dark fw-medium d-flex align-items-center gap-1">
                    <UserOutlined /> 
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <Button
                    type="link"
                    className="text-danger fw-semibold d-flex align-items-center gap-1"
                    onClick={() => handleLogout(navigate)}
                  >
                    <LogoutOutlined /> Logout
                  </Button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <Link
                    className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                    to="/auth/login"
                  >
                    <UserOutlined /> Login
                  </Link>
                  <span className="text-muted">|</span>
                  <Link
                    className="nav-link text-dark fw-medium d-flex align-items-center gap-1"
                    to="/auth/register"
                  >
                    <UserOutlined /> Sign Up
                  </Link>
                </div>
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
            font-size: 0.7rem;
            min-width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .dropdown-menu {
            border: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border-radius: 8px;
          }
          .dropdown-item {
            transition: all 0.2s ease;
          }
          .dropdown-item:hover {
            background-color: #1d3557;
            color: white;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;